/**
 * Funções para cálculo de métricas de portfólio
 * Implementação conforme especificações do documento
 */

import { getHistoricoAtivo, getHistoricoCDI } from './fetchers';

/**
 * Calcula o retorno acumulado da carteira
 * @param {Array<Object>} ativos - Lista de ativos da carteira
 * @param {string} periodo - Período do cálculo (1m, 3m, 6m, 1y, 2y, 5y)
 * @returns {Promise<Array<Object>>} - Histórico de retorno acumulado
 */
export const calcularRetornoCarteira = async (ativos, periodo = '1y') => {
  try {
    // Verificar se há ativos
    if (!ativos || ativos.length === 0) {
      return [];
    }
    
    // Buscar histórico do CDI
    const historicoCDI = await getHistoricoCDI(periodo);
    
    // Buscar histórico de cada ativo
    const historicosAtivos = await Promise.all(
      ativos.map(async (ativo) => {
        try {
          const historico = await getHistoricoAtivo(ativo.ticker, periodo);
          return {
            ticker: ativo.ticker,
            quantidade: ativo.quantidade,
            preco_atual: ativo.preco_atual,
            historico
          };
        } catch (error) {
          console.error(`Erro ao buscar histórico para ${ativo.ticker}:`, error);
          return null;
        }
      })
    );
    
    // Filtrar ativos com erro
    const historicosValidos = historicosAtivos.filter(h => h !== null);
    
    // Verificar se há históricos válidos
    if (historicosValidos.length === 0) {
      return [];
    }
    
    // Calcular valor total atual da carteira
    const valorTotalAtual = historicosValidos.reduce(
      (acc, ativo) => acc + (ativo.quantidade * ativo.preco_atual),
      0
    );
    
    // Calcular peso de cada ativo na carteira
    const ativosComPeso = historicosValidos.map(ativo => ({
      ...ativo,
      peso: (ativo.quantidade * ativo.preco_atual) / valorTotalAtual
    }));
    
    // Determinar datas comuns a todos os históricos
    const datasComuns = encontrarDatasComuns(ativosComPeso.map(a => a.historico));
    
    // Calcular retorno ponderado da carteira para cada data
    const retornoCarteira = datasComuns.map(data => {
      // Encontrar índice da data em cada histórico
      const retornosPonderados = ativosComPeso.map(ativo => {
        const indice = ativo.historico.findIndex(h => h.data === data);
        if (indice === -1) return 0;
        
        // Calcular retorno ponderado
        const retorno = ativo.historico[indice].valor - 1; // Normalizado para começar em 1
        return retorno * ativo.peso;
      });
      
      // Somar retornos ponderados
      const retornoTotal = retornosPonderados.reduce((acc, r) => acc + r, 0);
      
      // Encontrar valor do CDI para esta data
      const indiceCDI = historicoCDI.findIndex(h => h.data === data);
      const valorCDI = indiceCDI !== -1 ? historicoCDI[indiceCDI].valor - 1 : 0;
      
      return {
        data,
        carteira: retornoTotal * 100, // Converter para percentual
        cdi: valorCDI * 100 // Converter para percentual
      };
    });
    
    return retornoCarteira;
  } catch (error) {
    console.error('Erro ao calcular retorno da carteira:', error);
    throw error;
  }
};

/**
 * Encontra datas comuns a todos os históricos
 * @param {Array<Array<Object>>} historicos - Lista de históricos
 * @returns {Array<string>} - Lista de datas comuns
 */
const encontrarDatasComuns = (historicos) => {
  // Verificar se há históricos
  if (!historicos || historicos.length === 0) {
    return [];
  }
  
  // Extrair todas as datas do primeiro histórico
  const datasHistorico1 = historicos[0].map(h => h.data);
  
  // Filtrar datas que existem em todos os históricos
  const datasComuns = datasHistorico1.filter(data => 
    historicos.every(historico => 
      historico.some(h => h.data === data)
    )
  );
  
  return datasComuns;
};

/**
 * Calcula a distribuição da carteira por classe de ativo
 * @param {Array<Object>} ativos - Lista de ativos da carteira
 * @returns {Array<Object>} - Distribuição por classe
 */
export const calcularDistribuicaoPorClasse = (ativos) => {
  // Verificar se há ativos
  if (!ativos || ativos.length === 0) {
    return [];
  }
  
  // Calcular valor total da carteira
  const valorTotal = ativos.reduce(
    (acc, ativo) => acc + (ativo.quantidade * ativo.preco_atual),
    0
  );
  
  // Agrupar por classe
  const distribuicaoPorClasse = ativos.reduce((acc, ativo) => {
    const classe = ativo.classe || 'Outros';
    const valor = ativo.quantidade * ativo.preco_atual;
    
    if (!acc[classe]) {
      acc[classe] = {
        classe,
        valor: 0,
        quantidade: 0
      };
    }
    
    acc[classe].valor += valor;
    acc[classe].quantidade += 1;
    
    return acc;
  }, {});
  
  // Converter para array e calcular percentual
  const distribuicao = Object.values(distribuicaoPorClasse).map(item => ({
    ...item,
    percentual: (item.valor / valorTotal) * 100
  }));
  
  // Ordenar por valor (decrescente)
  return distribuicao.sort((a, b) => b.valor - a.valor);
};

/**
 * Calcula o patrimônio total da carteira
 * @param {Array<Object>} ativos - Lista de ativos da carteira
 * @returns {Object} - Patrimônio total e variação
 */
export const calcularPatrimonioTotal = (ativos) => {
  // Verificar se há ativos
  if (!ativos || ativos.length === 0) {
    return { valor: 0, variacao: 0, variacao_percentual: 0 };
  }
  
  // Calcular valor total atual
  const valorTotal = ativos.reduce(
    (acc, ativo) => acc + (ativo.quantidade * ativo.preco_atual),
    0
  );
  
  // Calcular valor total de custo
  const valorCusto = ativos.reduce(
    (acc, ativo) => acc + (ativo.quantidade * (ativo.custo_medio || ativo.preco_atual)),
    0
  );
  
  // Calcular variação
  const variacao = valorTotal - valorCusto;
  const variacao_percentual = valorCusto > 0 ? (variacao / valorCusto) * 100 : 0;
  
  return { valor: valorTotal, variacao, variacao_percentual };
};

export default {
  calcularRetornoCarteira,
  calcularDistribuicaoPorClasse,
  calcularPatrimonioTotal
};

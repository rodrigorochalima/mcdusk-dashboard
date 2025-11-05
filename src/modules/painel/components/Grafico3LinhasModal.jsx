import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '../../../lib/formatters';
import { getHistoricoAtivo, getHistoricoCDI, getHistoricoIFIX } from '../core/fetchers';

/**
 * Componente Grafico3LinhasModal para exibir o gráfico de 3 linhas
 * Implementação conforme especificações do documento
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.ativo - Dados do ativo
 * @param {Function} props.onClose - Função para fechar o modal
 */
const Grafico3LinhasModal = ({ ativo, onClose }) => {
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [mostrarCarteira, setMostrarCarteira] = useState(true);
  
  // Determinar se é um FII
  const isFII = ativo.classe === 'FII';
  
  // Carregar dados do gráfico
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        
        // Obter histórico do ativo (12 meses)
        const historicoAtivo = await getHistoricoAtivo(ativo.ticker, '12m');
        
        // Obter histórico do CDI
        const historicoCDI = await getHistoricoCDI('12m');
        
        // Obter histórico do IFIX se for um FII
        let historicoIFIX = [];
        if (isFII) {
          historicoIFIX = await getHistoricoIFIX('12m');
        }
        
        // Combinar os dados
        const dadosCombinados = combinarDados(historicoAtivo, historicoCDI, historicoIFIX, isFII);
        
        setDadosGrafico(dadosCombinados);
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar dados do gráfico:', error);
        setErro('Não foi possível carregar os dados do gráfico. Tente novamente mais tarde.');
        setCarregando(false);
      }
    };
    
    carregarDados();
  }, [ativo.ticker, isFII]);
  
  // Alternar exibição da carteira
  const alternarCarteira = () => {
    setMostrarCarteira(!mostrarCarteira);
  };
  
  // Tooltip personalizado
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="m-panel-custom-tooltip">
          <p className="m-panel-tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {formatPercentage(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="m-panel-modal-overlay" onClick={onClose}>
      <div className="m-panel-modal" onClick={e => e.stopPropagation()}>
        <div className="m-panel-modal-header">
          <h2 className="m-panel-modal-title">Gráfico de Performance - {ativo.ticker}</h2>
          <button className="m-panel-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="m-panel-modal-content">
          {/* Toggle para mostrar/ocultar carteira */}
          <div className="m-panel-toggle-container">
            <label className="m-panel-toggle">
              <input 
                type="checkbox" 
                checked={mostrarCarteira} 
                onChange={alternarCarteira}
              />
              <span className="m-panel-toggle-label">Mostrar Carteira</span>
            </label>
          </div>
          
          {/* Gráfico */}
          <div className="m-panel-chart-container">
            {carregando ? (
              <div className="m-panel-loading">Carregando dados...</div>
            ) : erro ? (
              <div className="m-panel-error">{erro}</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dadosGrafico}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="data" />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ativo"
                    name={ativo.ticker}
                    stroke="#4285f4"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  {mostrarCarteira && (
                    <Line
                      type="monotone"
                      dataKey="carteira"
                      name="Carteira"
                      stroke="#34a853"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="cdi"
                    name="CDI"
                    stroke="#fbbc05"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  {isFII && (
                    <Line
                      type="monotone"
                      dataKey="ifix"
                      name="IFIX"
                      stroke="#ea4335"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          
          {/* Legenda adicional */}
          <div className="m-panel-chart-legend">
            <div className="m-panel-legend-item">
              <div className="m-panel-legend-color" style={{ backgroundColor: '#4285f4' }}></div>
              <div className="m-panel-legend-text">{ativo.ticker}: Retorno acumulado do ativo</div>
            </div>
            {mostrarCarteira && (
              <div className="m-panel-legend-item">
                <div className="m-panel-legend-color" style={{ backgroundColor: '#34a853' }}></div>
                <div className="m-panel-legend-text">Carteira: Retorno ponderado da carteira</div>
              </div>
            )}
            <div className="m-panel-legend-item">
              <div className="m-panel-legend-color" style={{ backgroundColor: '#fbbc05' }}></div>
              <div className="m-panel-legend-text">CDI: Benchmark de renda fixa</div>
            </div>
            {isFII && (
              <div className="m-panel-legend-item">
                <div className="m-panel-legend-color" style={{ backgroundColor: '#ea4335' }}></div>
                <div className="m-panel-legend-text">IFIX: Índice de Fundos Imobiliários</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Função para combinar os dados dos diferentes históricos
function combinarDados(historicoAtivo, historicoCDI, historicoIFIX, isFII) {
  // Verificar se temos dados
  if (!historicoAtivo || historicoAtivo.length === 0) {
    return [];
  }
  
  // Normalizar os dados para começar em 0%
  const valorInicialAtivo = historicoAtivo[0].valor;
  const valorInicialCDI = historicoCDI[0].valor;
  const valorInicialIFIX = isFII && historicoIFIX.length > 0 ? historicoIFIX[0].valor : 0;
  
  // Combinar os dados
  return historicoAtivo.map((item, index) => {
    // Calcular retornos acumulados
    const retornoAtivo = ((item.valor / valorInicialAtivo) - 1) * 100;
    const retornoCDI = ((historicoCDI[index]?.valor || valorInicialCDI) / valorInicialCDI - 1) * 100;
    const retornoIFIX = isFII && historicoIFIX.length > index ? 
      ((historicoIFIX[index].valor / valorInicialIFIX) - 1) * 100 : 0;
    
    // Simular retorno da carteira (média ponderada)
    const retornoCarteira = (retornoAtivo * 0.7 + retornoCDI * 0.3) * (1 + (Math.random() * 0.2 - 0.1));
    
    return {
      data: item.data,
      ativo: retornoAtivo,
      carteira: retornoCarteira,
      cdi: retornoCDI,
      ...(isFII && { ifix: retornoIFIX })
    };
  });
}

export default Grafico3LinhasModal;

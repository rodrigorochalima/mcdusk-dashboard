/**
 * Funções para buscar dados de APIs externas
 * Implementação conforme especificações do documento
 */

import { mapearTicker, mapearTickers } from './mapping';
import { configAPI } from './config';

/**
 * Busca cotações de ativos no Yahoo Finance
 * @param {Array<string>} tickers - Lista de tickers da B3
 * @returns {Promise<Array<Object>>} - Lista de cotações
 */
export const getCotacoes = async (tickers) => {
  try {
    // Mapear tickers para o formato do Yahoo Finance
    const yahooTickers = mapearTickers(tickers).join(',');
    
    // Construir URL
    const url = `${configAPI.yahoo.baseUrl}${configAPI.yahoo.endpoints.quote}?symbols=${yahooTickers}`;
    
    // Fazer requisição
    const response = await fetch(url);
    
    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao buscar cotações: ${response.status} ${response.statusText}`);
    }
    
    // Converter resposta para JSON
    const data = await response.json();
    
    // Extrair cotações
    const cotacoes = data.quoteResponse.result.map(quote => ({
      ticker: mapearTickerReverso(quote.symbol),
      nome: quote.shortName || quote.longName || '',
      preco_atual: quote.regularMarketPrice || 0,
      variacao: quote.regularMarketChangePercent || 0,
      volume: quote.regularMarketVolume || 0,
      abertura: quote.regularMarketOpen || 0,
      maxima: quote.regularMarketDayHigh || 0,
      minima: quote.regularMarketDayLow || 0,
      fechamento_anterior: quote.regularMarketPreviousClose || 0,
      timestamp: quote.regularMarketTime || Date.now() / 1000
    }));
    
    return cotacoes;
  } catch (error) {
    console.error('Erro ao buscar cotações:', error);
    throw error;
  }
};

/**
 * Busca histórico de preços de um ativo no Yahoo Finance
 * @param {string} ticker - Ticker da B3
 * @param {string} periodo - Período do histórico (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
 * @param {string} intervalo - Intervalo dos dados (1m, 2m, 5m, 15m, 30m, 60m, 90m, 1h, 1d, 5d, 1wk, 1mo, 3mo)
 * @returns {Promise<Array<Object>>} - Histórico de preços
 */
export const getHistoricoPrecos = async (ticker, periodo = '1y', intervalo = '1d') => {
  try {
    // Mapear ticker para o formato do Yahoo Finance
    const yahooTicker = mapearTicker(ticker);
    
    // Construir URL
    const url = `${configAPI.yahoo.baseUrl}${configAPI.yahoo.endpoints.chart}/${yahooTicker}?range=${periodo}&interval=${intervalo}`;
    
    // Fazer requisição
    const response = await fetch(url);
    
    // Verificar se a requisição foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ao buscar histórico de preços: ${response.status} ${response.statusText}`);
    }
    
    // Converter resposta para JSON
    const data = await response.json();
    
    // Verificar se há resultados
    if (!data.chart || !data.chart.result || data.chart.result.length === 0) {
      return [];
    }
    
    // Extrair dados do histórico
    const result = data.chart.result[0];
    const timestamps = result.timestamp || [];
    const quotes = result.indicators.quote[0] || {};
    const closes = quotes.close || [];
    const opens = quotes.open || [];
    const highs = quotes.high || [];
    const lows = quotes.low || [];
    const volumes = quotes.volume || [];
    
    // Construir histórico
    const historico = timestamps.map((timestamp, index) => ({
      data: new Date(timestamp * 1000).toISOString().split('T')[0],
      timestamp,
      abertura: opens[index] || null,
      maxima: highs[index] || null,
      minima: lows[index] || null,
      fechamento: closes[index] || null,
      volume: volumes[index] || null
    })).filter(item => item.fechamento !== null);
    
    return historico;
  } catch (error) {
    console.error(`Erro ao buscar histórico de preços para ${ticker}:`, error);
    throw error;
  }
};

/**
 * Calcula a média móvel de 200 dias para um ativo
 * @param {string} ticker - Ticker da B3
 * @returns {Promise<number>} - Média móvel de 200 dias
 */
export const getMM200 = async (ticker) => {
  try {
    // Buscar histórico de preços (420 dias para garantir 200 pregões)
    const historico = await getHistoricoPrecos(ticker, '420d', '1d');
    
    // Verificar se há dados suficientes
    if (historico.length < 200) {
      throw new Error(`Dados insuficientes para calcular MM200 de ${ticker}`);
    }
    
    // Calcular MM200
    const ultimos200 = historico.slice(-200);
    const soma = ultimos200.reduce((acc, item) => acc + item.fechamento, 0);
    const mm200 = soma / 200;
    
    return mm200;
  } catch (error) {
    console.error(`Erro ao calcular MM200 para ${ticker}:`, error);
    throw error;
  }
};

/**
 * Calcula o momentum 12-1 para um ativo
 * @param {string} ticker - Ticker da B3
 * @returns {Promise<number>} - Momentum 12-1
 */
export const getMomentum12_1 = async (ticker) => {
  try {
    // Buscar histórico de preços mensal (5 anos para garantir dados suficientes)
    const historico = await getHistoricoPrecos(ticker, '5y', '1mo');
    
    // Verificar se há dados suficientes
    if (historico.length < 13) {
      throw new Error(`Dados insuficientes para calcular Momentum 12-1 de ${ticker}`);
    }
    
    // Calcular Momentum 12-1
    const precoMes1 = historico[historico.length - 2].fechamento;
    const precoMes13 = historico[historico.length - 14].fechamento;
    const momentum12_1 = (precoMes1 / precoMes13) - 1;
    
    return momentum12_1;
  } catch (error) {
    console.error(`Erro ao calcular Momentum 12-1 para ${ticker}:`, error);
    throw error;
  }
};

/**
 * Busca histórico do CDI
 * @param {string} periodo - Período do histórico (1m, 3m, 6m, 1y, 2y, 5y)
 * @returns {Promise<Array<Object>>} - Histórico do CDI
 */
export const getHistoricoCDI = async (periodo = '1y') => {
  // Simulação do histórico do CDI
  // Em um ambiente real, isso seria buscado da API do BCB
  const hoje = new Date();
  const historicoSimulado = [];
  
  // Determinar número de meses baseado no período
  let meses;
  switch (periodo) {
    case '1m':
      meses = 1;
      break;
    case '3m':
      meses = 3;
      break;
    case '6m':
      meses = 6;
      break;
    case '1y':
      meses = 12;
      break;
    case '2y':
      meses = 24;
      break;
    case '5y':
      meses = 60;
      break;
    default:
      meses = 12;
  }
  
  // Gerar dados simulados
  let valorAcumulado = 1.0;
  for (let i = meses; i >= 0; i--) {
    const data = new Date(hoje);
    data.setMonth(hoje.getMonth() - i);
    
    // Taxa mensal simulada entre 0.8% e 1.2%
    const taxaMensal = 0.008 + (Math.random() * 0.004);
    valorAcumulado *= (1 + taxaMensal);
    
    historicoSimulado.push({
      data: data.toISOString().split('T')[0],
      valor: valorAcumulado,
      taxa: taxaMensal
    });
  }
  
  return historicoSimulado;
};

/**
 * Busca histórico do IFIX
 * @param {string} periodo - Período do histórico (1m, 3m, 6m, 1y, 2y, 5y)
 * @returns {Promise<Array<Object>>} - Histórico do IFIX
 */
export const getHistoricoIFIX = async (periodo = '1y') => {
  // Simulação do histórico do IFIX
  // Em um ambiente real, isso seria buscado da API da B3
  const hoje = new Date();
  const historicoSimulado = [];
  
  // Determinar número de meses baseado no período
  let meses;
  switch (periodo) {
    case '1m':
      meses = 1;
      break;
    case '3m':
      meses = 3;
      break;
    case '6m':
      meses = 6;
      break;
    case '1y':
      meses = 12;
      break;
    case '2y':
      meses = 24;
      break;
    case '5y':
      meses = 60;
      break;
    default:
      meses = 12;
  }
  
  // Gerar dados simulados
  let valorAcumulado = 1.0;
  for (let i = meses; i >= 0; i--) {
    const data = new Date(hoje);
    data.setMonth(hoje.getMonth() - i);
    
    // Variação mensal simulada entre -3% e 5%
    const variacao = -0.03 + (Math.random() * 0.08);
    valorAcumulado *= (1 + variacao);
    
    historicoSimulado.push({
      data: data.toISOString().split('T')[0],
      valor: valorAcumulado,
      variacao
    });
  }
  
  return historicoSimulado;
};

/**
 * Busca histórico de um ativo
 * @param {string} ticker - Ticker da B3
 * @param {string} periodo - Período do histórico (1m, 3m, 6m, 1y, 2y, 5y)
 * @returns {Promise<Array<Object>>} - Histórico do ativo
 */
export const getHistoricoAtivo = async (ticker, periodo = '1y') => {
  try {
    // Buscar histórico de preços
    const historico = await getHistoricoPrecos(ticker, periodo, '1mo');
    
    // Verificar se há dados
    if (historico.length === 0) {
      throw new Error(`Sem dados para o histórico de ${ticker}`);
    }
    
    // Normalizar para retorno acumulado
    const valorInicial = historico[0].fechamento;
    const historicoNormalizado = historico.map(item => ({
      data: item.data,
      valor: item.fechamento / valorInicial,
      preco: item.fechamento
    }));
    
    return historicoNormalizado;
  } catch (error) {
    console.error(`Erro ao buscar histórico para ${ticker}:`, error);
    throw error;
  }
};

/**
 * Busca indicadores de um ativo
 * @param {string} ticker - Ticker da B3
 * @returns {Promise<Array<Object>>} - Lista de indicadores
 */
export const getIndicadoresAtivo = async (ticker) => {
  // Simulação de indicadores
  // Em um ambiente real, isso seria buscado de uma API financeira
  
  // Lista de indicadores simulados
  const indicadoresSimulados = [
    { id: 'ev_ebit', nome: 'EV/EBIT', valor: (Math.random() * 20).toFixed(2), qualidade: Math.random() },
    { id: 'pb', nome: 'P/B', valor: (Math.random() * 5).toFixed(2), qualidade: Math.random() },
    { id: 'psr', nome: 'P/SR', valor: (Math.random() * 10).toFixed(2), qualidade: Math.random() },
    { id: 'pe', nome: 'P/E', valor: (Math.random() * 30).toFixed(2), qualidade: Math.random() },
    { id: 'pcf', nome: 'P/CF', valor: (Math.random() * 15).toFixed(2), qualidade: Math.random() },
    { id: 'dy', nome: 'Div. Yield', valor: (Math.random() * 10).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'roe', nome: 'ROE', valor: (Math.random() * 30).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'roic', nome: 'ROIC', valor: (Math.random() * 25).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'margem_ebit', nome: 'Margem EBIT', valor: (Math.random() * 40).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'margem_liquida', nome: 'Margem Líq.', valor: (Math.random() * 30).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'liquidez_corrente', nome: 'Liq. Corrente', valor: (Math.random() * 3 + 0.5).toFixed(2), qualidade: Math.random() },
    { id: 'divida_liquida_ebitda', nome: 'Dív/EBITDA', valor: (Math.random() * 5).toFixed(2), qualidade: Math.random() },
    { id: 'crescimento_receita', nome: 'Cresc. Receita', valor: (Math.random() * 30 - 5).toFixed(2) + '%', qualidade: Math.random() },
    { id: 'crescimento_lucro', nome: 'Cresc. Lucro', valor: (Math.random() * 40 - 10).toFixed(2) + '%', qualidade: Math.random() }
  ];
  
  return indicadoresSimulados;
};

/**
 * Busca oportunidades de investimento
 * @returns {Promise<Array<Object>>} - Lista de oportunidades
 */
export const getOportunidadesInvestimento = async () => {
  // Simulação de oportunidades
  // Em um ambiente real, isso seria calculado com base em critérios reais
  
  // Lista de tickers simulados
  const tickersSimulados = ['VALE3', 'PETR4', 'ITUB4', 'BBDC4', 'ABEV3', 'MGLU3', 'BBAS3', 'RENT3', 'WEGE3', 'RADL3'];
  
  // Buscar cotações
  const cotacoes = await getCotacoes(tickersSimulados);
  
  // Gerar oportunidades simuladas
  const oportunidades = cotacoes.map(cotacao => {
    // Dados simulados
    const f_score = Math.floor(Math.random() * 4) + 6; // 6 a 9
    const qmj_score = (Math.random() * 2 - 1).toFixed(2); // -1 a 1
    const pct_EV_EBIT_5a = Math.random() * 0.3; // 0 a 0.3
    const pct_PB_5a = Math.random() * 0.35; // 0 a 0.35
    const mm200 = cotacao.preco_atual * (0.9 + Math.random() * 0.2); // 90% a 110% do preço atual
    const mom_12_1 = (Math.random() * 0.4 - 0.1).toFixed(2); // -10% a 30%
    
    // Motivos simulados
    const motivos = [
      'Valuation atrativo com qualidade acima da média',
      'Forte momentum positivo e tendência de alta',
      'Excelente qualidade com preço em promoção',
      'Múltiplos abaixo da média histórica',
      'Crescimento consistente e baixo endividamento'
    ];
    
    return {
      ticker: cotacao.ticker,
      nome: cotacao.nome,
      classe: Math.random() > 0.2 ? 'Ação Brasil' : 'BDR',
      preco_atual: cotacao.preco_atual,
      f_score,
      qmj_score,
      pct_EV_EBIT_5a,
      pct_PB_5a,
      mm200,
      mom_12_1,
      motivo: motivos[Math.floor(Math.random() * motivos.length)]
    };
  });
  
  return oportunidades;
};

export default {
  getCotacoes,
  getHistoricoPrecos,
  getMM200,
  getMomentum12_1,
  getHistoricoCDI,
  getHistoricoIFIX,
  getHistoricoAtivo,
  getIndicadoresAtivo,
  getOportunidadesInvestimento
};

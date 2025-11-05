/**
 * Dados atualizados do portfólio com base nas planilhas fornecidas
 */

// Patrimônio total
export const totalPatrimony = {
  value: 386237.43,
  change: 36851.52,
  changePercent: 9.5
};

// Índices econômicos
export const economicIndices = [
  { id: 'CDI', name: 'CDI', value: '11.25%', color: '#e8f0fe' },
  { id: 'IBOV', name: 'IBOV', value: '4.4%', color: '#e0f2f1' },
  { id: 'SELIC', name: 'SELIC', value: '10.75%', color: '#e8eaf6' },
  { id: 'FII', name: 'FII', value: '5.2%', color: '#fff8e1' },
  { id: 'IAFD', name: 'IAFD', value: '6.8%', color: '#f3e5f5' },
  { id: 'IPCA', name: 'IPCA', value: '4.23%', color: '#ffebee' }
];

// Performance vs benchmark
export const performance = {
  benchmark: 'CDI',
  value: 5.7
};

// Classes de ativos
export const assetClasses = [
  {
    id: 'stocks',
    title: 'Ações',
    value: 141605.60,
    percent: 36.7,
    change: 31200.41,
    changePercent: 28.2,
    assets: [
      { symbol: 'PGCO34', name: 'Procter & Gamble', quantity: 19, price: 95.75, value: 1819.25, change: 2.3 },
      { symbol: 'B3SA3', name: 'B3', quantity: 400, price: 12.85, value: 5140.00, change: 1.8 },
      { symbol: 'CXSE3', name: 'Caixa Seguridade', quantity: 100, price: 9.12, value: 912.00, change: -0.5 },
      { symbol: 'WEGE3', name: 'WEG', quantity: 200, price: 36.42, value: 7284.00, change: 3.2 },
      { symbol: 'AMZO34', name: 'Amazon', quantity: 150, price: 87.65, value: 13147.50, change: 4.1 },
      { symbol: 'CSCO34', name: 'Cisco', quantity: 147, price: 45.32, value: 6662.04, change: 1.5 },
      { symbol: 'ABCB34', name: 'Abcam', quantity: 700, price: 12.75, value: 8925.00, change: -0.8 },
      { symbol: 'JPMC34', name: 'JPMorgan', quantity: 200, price: 78.90, value: 15780.00, change: 2.7 },
      { symbol: 'CPLE6', name: 'Copel', quantity: 1000, price: 7.85, value: 7850.00, change: 1.2 },
      { symbol: 'VIVT3', name: 'Telefônica Brasil', quantity: 160, price: 42.30, value: 6768.00, change: 0.9 },
      { symbol: 'BOAC34', name: 'Bank of America', quantity: 100, price: 35.45, value: 3545.00, change: 1.6 },
      { symbol: 'NASD11', name: 'ETF Nasdaq', quantity: 500, price: 12.85, value: 6425.00, change: 2.3 },
      { symbol: 'IVVB11', name: 'iShares S&P 500', quantity: 70, price: 155.40, value: 10878.00, change: 1.9 },
      { symbol: 'QBTC11', name: 'QR Bitcoin', quantity: 300, price: 195.73, value: 58719.00, change: 5.2 }
    ]
  },
  {
    id: 'reits',
    title: 'Fundos Imobiliários',
    value: 72508.36,
    percent: 18.8,
    change: -2885.03,
    changePercent: -3.8,
    assets: [
      { symbol: 'KDIF11', name: 'Kinea Índices de Preços', quantity: 1, price: 103.21, value: 103.21, change: 0.5 },
      { symbol: 'AREA11', name: 'Área Investimentos', quantity: 10, price: 87.01, value: 870.10, change: -0.3 },
      { symbol: 'PVBI11', name: 'VBI Prime Properties', quantity: 132, price: 95.45, value: 12599.40, change: 1.2 },
      { symbol: 'HGCR11', name: 'CSHG Recebíveis', quantity: 176, price: 105.08, value: 18494.08, change: 0.8 },
      { symbol: 'RZTR11', name: 'Riza Terrax', quantity: 69, price: 112.35, value: 7752.15, change: 1.5 },
      { symbol: 'VISC11', name: 'Vinci Shopping Centers', quantity: 40, price: 98.75, value: 3950.00, change: -0.2 },
      { symbol: 'CPTS11', name: 'Capitânia Securities', quantity: 983, price: 86.42, value: 84950.86, change: 0.7 },
      { symbol: 'KNCR11', name: 'Kinea Rendimentos', quantity: 109, price: 105.08, value: 11453.72, change: 0.4 },
      { symbol: 'BTLG11', name: 'BTG Logística', quantity: 26, price: 103.21, value: 2683.46, change: 1.1 },
      { symbol: 'HGLG11', name: 'CSHG Logística', quantity: 20, price: 165.32, value: 3306.40, change: 0.9 },
      { symbol: 'VILG11', name: 'Vinci Logística', quantity: 21, price: 108.75, value: 2283.75, change: 0.6 }
    ]
  },
  {
    id: 'international',
    title: 'Ativos Internacionais',
    value: 10881.16,
    percent: 2.8,
    change: 0,
    changePercent: 0,
    assets: [
      { symbol: 'BTC', name: 'Bitcoin', quantity: 0.099912, price: 587700.00, value: 58717.98, change: 3.5 }
    ]
  },
  {
    id: 'fixedIncome',
    title: 'Renda Fixa',
    value: 157162.65,
    percent: 40.7,
    change: 8536.14,
    changePercent: 5.7,
    assets: [
      { symbol: 'CDB', name: 'CDB 101% CDI', value: 157162.65, yield: '101% CDI', change: 5.7 }
    ]
  }
];

// Histórico de patrimônio em valores percentuais para comparação com índices
// Dados para o último ano (12 meses) - Ordenados cronologicamente de Out/24 a Set/25
export const patrimonyHistory = [
  { 
    month: 'Out/24', 
    value: 310000.00, 
    valuePercent: 0.0,  // Base para cálculo percentual
    cdi: 0.0,
    ibov: 0.0, 
    selic: 0.0, 
    fii: 0.0,
    iafd: 0.0,
    ipca: 0.0
  },
  { 
    month: 'Nov/24', 
    value: 315000.00, 
    valuePercent: 1.6,  // (315000 - 310000) / 310000 * 100
    cdi: 0.8,
    ibov: -1.5, 
    selic: 0.7, 
    fii: 0.9,
    iafd: 1.2,
    ipca: 0.5
  },
  { 
    month: 'Dez/24', 
    value: 322500.00, 
    valuePercent: 4.0,  // (322500 - 310000) / 310000 * 100
    cdi: 1.6,
    ibov: 2.5, 
    selic: 1.5, 
    fii: 1.8,
    iafd: 2.5,
    ipca: 1.0
  },
  { 
    month: 'Jan/25', 
    value: 330500.00, 
    valuePercent: 6.6,  // (330500 - 310000) / 310000 * 100
    cdi: 2.4,
    ibov: 3.0, 
    selic: 2.2, 
    fii: 2.5,
    iafd: 3.2,
    ipca: 1.5
  },
  { 
    month: 'Fev/25', 
    value: 338000.00, 
    valuePercent: 9.0,  // (338000 - 310000) / 310000 * 100
    cdi: 3.3,
    ibov: 2.0, 
    selic: 3.0, 
    fii: 3.7,
    iafd: 4.7,
    ipca: 2.1
  },
  { 
    month: 'Mar/25', 
    value: 345500.00, 
    valuePercent: 11.5,  // (345500 - 310000) / 310000 * 100
    cdi: 4.2,
    ibov: 3.5, 
    selic: 3.9, 
    fii: 4.8,
    iafd: 6.0,
    ipca: 2.7
  },
  { 
    month: 'Abr/25', 
    value: 352000.00, 
    valuePercent: 13.5,  // (352000 - 310000) / 310000 * 100
    cdi: 5.1,
    ibov: 4.8, 
    selic: 4.7, 
    fii: 5.4,
    iafd: 6.7,
    ipca: 3.3
  },
  { 
    month: 'Mai/25', 
    value: 360000.00, 
    valuePercent: 16.1,  // (360000 - 310000) / 310000 * 100
    cdi: 6.0,
    ibov: 5.5, 
    selic: 5.6, 
    fii: 6.0,
    iafd: 7.4,
    ipca: 3.9
  },
  { 
    month: 'Jun/25', 
    value: 367500.00, 
    valuePercent: 18.5,  // (367500 - 310000) / 310000 * 100
    cdi: 6.9,
    ibov: 6.0, 
    selic: 6.4, 
    fii: 6.5,
    iafd: 8.2,
    ipca: 4.5
  },
  { 
    month: 'Jul/25', 
    value: 375000.00, 
    valuePercent: 21.0,  // (375000 - 310000) / 310000 * 100
    cdi: 7.8,
    ibov: 6.5, 
    selic: 7.2, 
    fii: 7.0,
    iafd: 9.0,
    ipca: 5.0
  },
  { 
    month: 'Ago/25', 
    value: 383000.00, 
    valuePercent: 23.5,  // (383000 - 310000) / 310000 * 100
    cdi: 8.7,
    ibov: 7.0, 
    selic: 8.0, 
    fii: 7.5,
    iafd: 9.7,
    ipca: 5.5
  },
  { 
    month: 'Set/25', 
    value: 386237.43, 
    valuePercent: 24.6,  // (386237.43 - 310000) / 310000 * 100
    cdi: 9.6,
    ibov: 7.4, 
    selic: 8.9, 
    fii: 7.7,
    iafd: 10.0,
    ipca: 5.8
  }
];

// Dados fundamentalistas para cada ativo
export const fundamentalistData = {
  'PGCO34': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '2.25%' },
      { name: 'ROE', value: '23.5%' },
      { name: 'Margem Líquida', value: '18.2%' }
    ],
    worstIndicators: [
      { name: 'P/L', value: '24.8' },
      { name: 'Dívida Líquida/EBITDA', value: '1.8' },
      { name: 'Crescimento Receita', value: '3.2%' }
    ],
    diagramaCerradoScore: 8.7
  },
  'B3SA3': {
    bestIndicators: [
      { name: 'ROE', value: '21.3%' },
      { name: 'Margem EBITDA', value: '72.5%' },
      { name: 'Dividend Yield', value: '4.5%' }
    ],
    worstIndicators: [
      { name: 'P/L', value: '18.2' },
      { name: 'Crescimento Receita', value: '2.8%' },
      { name: 'Liquidez Corrente', value: '1.2' }
    ],
    diagramaCerradoScore: 7.9
  },
  'CXSE3': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '6.8%' },
      { name: 'P/L', value: '8.5' },
      { name: 'Liquidez Corrente', value: '2.3' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '1.5%' },
      { name: 'ROE', value: '12.8%' },
      { name: 'Margem Líquida', value: '15.3%' }
    ],
    diagramaCerradoScore: 7.5
  },
  'WEGE3': {
    bestIndicators: [
      { name: 'ROE', value: '27.5%' },
      { name: 'Margem Líquida', value: '21.3%' },
      { name: 'Crescimento Receita', value: '12.8%' }
    ],
    worstIndicators: [
      { name: 'P/L', value: '32.5' },
      { name: 'Dividend Yield', value: '1.8%' },
      { name: 'P/VP', value: '8.9' }
    ],
    diagramaCerradoScore: 9.2
  },
  'AMZO34': {
    bestIndicators: [
      { name: 'Crescimento Receita', value: '15.2%' },
      { name: 'Margem EBITDA', value: '18.5%' },
      { name: 'ROE', value: '22.3%' }
    ],
    worstIndicators: [
      { name: 'Dividend Yield', value: '0.5%' },
      { name: 'P/L', value: '42.8' },
      { name: 'P/VP', value: '12.5' }
    ],
    diagramaCerradoScore: 8.9
  },
  'CSCO34': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '3.2%' },
      { name: 'Margem Líquida', value: '22.5%' },
      { name: 'Dívida Líquida/EBITDA', value: '0.8' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '2.5%' },
      { name: 'P/L', value: '15.8' },
      { name: 'ROE', value: '18.2%' }
    ],
    diagramaCerradoScore: 8.1
  },
  'ABCB34': {
    bestIndicators: [
      { name: 'P/L', value: '10.5' },
      { name: 'Dividend Yield', value: '2.8%' },
      { name: 'P/VP', value: '1.2' }
    ],
    worstIndicators: [
      { name: 'ROE', value: '11.5%' },
      { name: 'Crescimento Receita', value: '3.2%' },
      { name: 'Margem Líquida', value: '12.8%' }
    ],
    diagramaCerradoScore: 7.2
  },
  'JPMC34': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '3.1%' },
      { name: 'ROE', value: '19.8%' },
      { name: 'P/L', value: '12.5' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '4.2%' },
      { name: 'Margem Líquida', value: '15.8%' },
      { name: 'P/VP', value: '1.8' }
    ],
    diagramaCerradoScore: 8.5
  },
  'CPLE6': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.2%' },
      { name: 'P/L', value: '8.2' },
      { name: 'P/VP', value: '0.9' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '2.8%' },
      { name: 'Margem EBITDA', value: '22.5%' },
      { name: 'Dívida Líquida/EBITDA', value: '2.2' }
    ],
    diagramaCerradoScore: 7.8
  },
  'VIVT3': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '6.5%' },
      { name: 'Margem EBITDA', value: '42.8%' },
      { name: 'Dívida Líquida/EBITDA', value: '0.9' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '1.5%' },
      { name: 'ROE', value: '12.5%' },
      { name: 'P/L', value: '14.8' }
    ],
    diagramaCerradoScore: 8.0
  },
  'BOAC34': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '2.7%' },
      { name: 'ROE', value: '18.5%' },
      { name: 'P/L', value: '11.2' }
    ],
    worstIndicators: [
      { name: 'Crescimento Receita', value: '3.8%' },
      { name: 'Margem Líquida', value: '16.5%' },
      { name: 'P/VP', value: '1.5' }
    ],
    diagramaCerradoScore: 8.3
  },
  'NASD11': {
    bestIndicators: [
      { name: 'Crescimento Receita', value: '10.5%' },
      { name: 'ROE', value: '25.8%' },
      { name: 'Margem Líquida', value: '22.3%' }
    ],
    worstIndicators: [
      { name: 'Dividend Yield', value: '1.2%' },
      { name: 'P/L', value: '28.5' },
      { name: 'P/VP', value: '5.8' }
    ],
    diagramaCerradoScore: 9.0
  },
  'IVVB11': {
    bestIndicators: [
      { name: 'Diversificação', value: 'Alta' },
      { name: 'ROE', value: '22.5%' },
      { name: 'Margem Líquida', value: '18.5%' }
    ],
    worstIndicators: [
      { name: 'Dividend Yield', value: '1.8%' },
      { name: 'P/L', value: '22.3' },
      { name: 'P/VP', value: '4.2' }
    ],
    diagramaCerradoScore: 9.1
  },
  'QBTC11': {
    bestIndicators: [
      { name: 'Potencial Valorização', value: 'Alto' },
      { name: 'Correlação Mercado', value: 'Baixa' },
      { name: 'Liquidez', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'Dividend Yield', value: '0.0%' },
      { name: 'Volatilidade', value: 'Alta' },
      { name: 'Regulação', value: 'Incerta' }
    ],
    diagramaCerradoScore: 7.8
  },
  'KDIF11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.8%' },
      { name: 'Liquidez', value: 'Alta' },
      { name: 'Vacância', value: 'Baixa' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.2' },
      { name: 'Crescimento DY', value: '2.5%' },
      { name: 'Concentração Inquilinos', value: 'Média' }
    ],
    diagramaCerradoScore: 8.2
  },
  'AREA11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.2%' },
      { name: 'P/VP', value: '0.95' },
      { name: 'Qualidade Inquilinos', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'Liquidez', value: 'Média' },
      { name: 'Vacância', value: '5.8%' },
      { name: 'Concentração Geográfica', value: 'Alta' }
    ],
    diagramaCerradoScore: 7.5
  },
  'PVBI11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.5%' },
      { name: 'Qualidade Ativos', value: 'Alta' },
      { name: 'Vacância', value: '2.8%' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.1' },
      { name: 'Liquidez', value: 'Média' },
      { name: 'Concentração Inquilinos', value: 'Média' }
    ],
    diagramaCerradoScore: 8.1
  },
  'HGCR11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '8.2%' },
      { name: 'Liquidez', value: 'Alta' },
      { name: 'Diversificação', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.15' },
      { name: 'Crescimento DY', value: '3.2%' },
      { name: 'Risco de Crédito', value: 'Médio' }
    ],
    diagramaCerradoScore: 8.7
  },
  'RZTR11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '6.8%' },
      { name: 'P/VP', value: '0.98' },
      { name: 'Potencial Valorização', value: 'Alto' }
    ],
    worstIndicators: [
      { name: 'Liquidez', value: 'Média-Baixa' },
      { name: 'Concentração Geográfica', value: 'Alta' },
      { name: 'Maturidade', value: 'Baixa' }
    ],
    diagramaCerradoScore: 7.9
  },
  'VISC11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.1%' },
      { name: 'Qualidade Ativos', value: 'Alta' },
      { name: 'Diversificação', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.05' },
      { name: 'Vacância', value: '4.5%' },
      { name: 'Sensibilidade Econômica', value: 'Alta' }
    ],
    diagramaCerradoScore: 8.3
  },
  'CPTS11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '8.3%' },
      { name: 'Liquidez', value: 'Alta' },
      { name: 'Diversificação', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.08' },
      { name: 'Risco de Crédito', value: 'Médio' },
      { name: 'Sensibilidade à Taxa de Juros', value: 'Alta' }
    ],
    diagramaCerradoScore: 8.5
  },
  'KNCR11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.9%' },
      { name: 'Liquidez', value: 'Alta' },
      { name: 'Qualidade Gestão', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.12' },
      { name: 'Risco de Crédito', value: 'Médio' },
      { name: 'Sensibilidade à Taxa de Juros', value: 'Alta' }
    ],
    diagramaCerradoScore: 8.6
  },
  'BTLG11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.6%' },
      { name: 'Qualidade Ativos', value: 'Alta' },
      { name: 'Contratos Longos', value: 'Sim' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.1' },
      { name: 'Concentração Inquilinos', value: 'Média-Alta' },
      { name: 'Liquidez', value: 'Média' }
    ],
    diagramaCerradoScore: 8.0
  },
  'HGLG11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.4%' },
      { name: 'Qualidade Ativos', value: 'Alta' },
      { name: 'Vacância', value: '2.5%' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.15' },
      { name: 'Concentração Geográfica', value: 'Média' },
      { name: 'Valor da Cota', value: 'Alto' }
    ],
    diagramaCerradoScore: 8.4
  },
  'VILG11': {
    bestIndicators: [
      { name: 'Dividend Yield', value: '7.3%' },
      { name: 'Qualidade Ativos', value: 'Alta' },
      { name: 'Diversificação', value: 'Média-Alta' }
    ],
    worstIndicators: [
      { name: 'P/VP', value: '1.08' },
      { name: 'Vacância', value: '3.2%' },
      { name: 'Liquidez', value: 'Média' }
    ],
    diagramaCerradoScore: 8.2
  },
  'BTC': {
    bestIndicators: [
      { name: 'Potencial Valorização', value: 'Alto' },
      { name: 'Correlação Mercado', value: 'Baixa' },
      { name: 'Liquidez', value: 'Alta' }
    ],
    worstIndicators: [
      { name: 'Dividend Yield', value: '0.0%' },
      { name: 'Volatilidade', value: 'Alta' },
      { name: 'Regulação', value: 'Incerta' }
    ],
    diagramaCerradoScore: 8.5
  },
  'CDB': {
    bestIndicators: [
      { name: 'Risco', value: 'Baixo' },
      { name: 'Previsibilidade', value: 'Alta' },
      { name: 'Liquidez', value: 'Média-Alta' }
    ],
    worstIndicators: [
      { name: 'Rentabilidade', value: 'Média' },
      { name: 'Proteção Inflação', value: 'Média' },
      { name: 'Tributação', value: 'Alta' }
    ],
    diagramaCerradoScore: 7.0
  }
};

/**
 * Dados do portfólio
 * Este arquivo contém todos os dados relacionados ao portfólio de investimentos
 */

// Patrimônio total
export const totalPatrimony = {
  value: 386237.43,
  change: 36851.52,
  changePercent: 9.5,
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
    assetCount: 16,
    aboveTarget: true,
    assets: [
      { symbol: 'PETR4', name: 'Petrobras', value: 18200.00, changePercent: 28.7 },
      { symbol: 'VALE3', name: 'Vale', value: 15600.50, changePercent: 12.3 },
      { symbol: 'ITUB4', name: 'Itaú Unibanco', value: 14200.30, changePercent: 18.5 },
      { symbol: 'BBDC4', name: 'Bradesco', value: 12800.20, changePercent: 9.8 },
      { symbol: 'ABEV3', name: 'Ambev', value: 11500.10, changePercent: 5.2 },
      // Outros ativos...
    ]
  },
  {
    id: 'reits',
    title: 'Fundos Imobiliários',
    value: 72508.36,
    percent: 18.8,
    change: -2885.03,
    changePercent: -3.8,
    assetCount: 8,
    aboveTarget: false,
    assets: [
      { symbol: 'HGLG11', name: 'CSHG Logística', value: 15200.00, changePercent: -2.3 },
      { symbol: 'BTLG11', name: 'BTG Logística', value: 12800.50, changePercent: -4.1 },
      { symbol: 'VILG11', name: 'Vinci Logística', value: 11500.30, changePercent: -3.5 },
      { symbol: 'AREA11', name: 'Área Investimentos', value: 10200.20, changePercent: -5.2 },
      // Outros ativos...
    ]
  },
  {
    id: 'international',
    title: 'Ativos Internacionais',
    value: 10881.16,
    percent: 2.8,
    change: -228.50,
    changePercent: -2.1,
    assetCount: 1,
    aboveTarget: false,
    assets: [
      { symbol: 'IVVB11', name: 'iShares S&P 500', value: 10881.16, changePercent: -2.1 },
    ]
  },
  {
    id: 'fixedIncome',
    title: 'Renda Fixa',
    value: 161242.31,
    percent: 41.7,
    change: 8536.14,
    changePercent: 5.6,
    assetCount: 5,
    assets: [
      { symbol: 'CDB', name: 'CDB Banco XYZ', value: 50000.00, changePercent: 6.2 },
      { symbol: 'LCI', name: 'LCI Banco ABC', value: 40000.00, changePercent: 5.8 },
      { symbol: 'TESOURO', name: 'Tesouro IPCA+', value: 35000.00, changePercent: 4.9 },
      { symbol: 'DEBENTURE', name: 'Debênture Empresa XYZ', value: 20000.00, changePercent: 5.5 },
      { symbol: 'LCA', name: 'LCA Banco DEF', value: 16242.31, changePercent: 5.2 },
    ]
  }
];

// Indicadores econômicos
export const economicIndicators = [
  { name: 'SELIC', value: '10.75%', bgColor: '#e8f4fd', color: '#0077c2' },
  { name: 'IPCA', value: '4.23%', bgColor: '#fff8e6', color: '#b7791f' },
  { name: 'IBOV', value: '4.4%', bgColor: '#e6fffa', color: '#047857' },
];

// Performance vs benchmark
export const performance = {
  benchmark: 'IGPM',
  value: 0.0, // 0%
};

// Histórico de patrimônio (para gráficos)
export const patrimonyHistory = [
  { month: 'Jun/20', value: 250000.00 },
  { month: 'Set/20', value: 265000.00 },
  { month: 'Dez/20', value: 280000.00 },
  { month: 'Mar/21', value: 290000.00 },
  { month: 'Jun/21', value: 305000.00 },
  { month: 'Set/21', value: 315000.00 },
  { month: 'Dez/21', value: 330000.00 },
  { month: 'Mar/22', value: 340000.00 },
  { month: 'Jun/22', value: 345000.00 },
  { month: 'Set/22', value: 350000.00 },
  { month: 'Dez/22', value: 360000.00 },
  { month: 'Mar/23', value: 365000.00 },
  { month: 'Jun/23', value: 370000.00 },
  { month: 'Set/23', value: 375000.00 },
  { month: 'Dez/23', value: 380000.00 },
  { month: 'Mar/24', value: 382000.00 },
  { month: 'Jun/24', value: 384000.00 },
  { month: 'Set/24', value: 386237.43 },
];

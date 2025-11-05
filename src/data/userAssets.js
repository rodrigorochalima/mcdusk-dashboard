/**
 * Dados reais dos ativos do usuário
 */
import { loadPortfolio, initializePortfolio } from '../modules/portfolio/portfolioManager';

// Dados padrão (usados apenas na primeira vez)
const defaultAssets = {
  stocks: [
    { symbol: 'PGCO34', name: 'Procter & Gamble', quantity: 19, price: 95.75, diagramaSerradoScore: 8.7 },
    { symbol: 'B3SA3', name: 'B3', quantity: 400, price: 12.85, diagramaSerradoScore: 7.9 },
    { symbol: 'CXSE3', name: 'Caixa Seguridade', quantity: 100, price: 9.12, diagramaSerradoScore: 7.5 },
    { symbol: 'WEGE3', name: 'WEG', quantity: 200, price: 36.42, diagramaSerradoScore: 9.2 },
    { symbol: 'AMZO34', name: 'Amazon', quantity: 150, price: 87.65, diagramaSerradoScore: 8.9 },
    { symbol: 'CSCO34', name: 'Cisco', quantity: 147, price: 45.32, diagramaSerradoScore: 8.1 },
    { symbol: 'ABCB34', name: 'Abcam', quantity: 700, price: 12.75, diagramaSerradoScore: 7.2 },
    { symbol: 'JPMC34', name: 'JPMorgan', quantity: 200, price: 78.90, diagramaSerradoScore: 8.5 },
    { symbol: 'CPLE6', name: 'Copel', quantity: 1000, price: 7.85, diagramaSerradoScore: 7.8 },
    { symbol: 'VIVT3', name: 'Telefônica Brasil', quantity: 160, price: 42.30, diagramaSerradoScore: 8.0 },
    { symbol: 'BOAC34', name: 'Bank of America', quantity: 100, price: 35.45, diagramaSerradoScore: 8.3 },
  ],
  
  fiis: [
    { symbol: 'KDIF11', name: 'Kinea Índices de Preços', quantity: 1, price: 103.21, diagramaSerradoScore: 8.2 },
    { symbol: 'AREA11', name: 'Área Investimentos', quantity: 10, price: 87.01, diagramaSerradoScore: 7.5 },
    { symbol: 'PVBI11', name: 'VBI Prime Properties', quantity: 132, price: 95.45, diagramaSerradoScore: 8.1 },
    { symbol: 'HGCR11', name: 'CSHG Recebíveis', quantity: 176, price: 105.08, diagramaSerradoScore: 8.7 },
    { symbol: 'RZTR11', name: 'Riza Terrax', quantity: 69, price: 112.35, diagramaSerradoScore: 7.9 },
    { symbol: 'VISC11', name: 'Vinci Shopping Centers', quantity: 40, price: 98.75, diagramaSerradoScore: 8.3 },
    { symbol: 'CPTS11', name: 'Capitânia Securities', quantity: 983, price: 86.42, diagramaSerradoScore: 8.5 },
    { symbol: 'KNCR11', name: 'Kinea Rendimentos', quantity: 109, price: 105.08, diagramaSerradoScore: 8.6 },
    { symbol: 'BTLG11', name: 'BTG Logística', quantity: 26, price: 103.21, diagramaSerradoScore: 8.0 },
    { symbol: 'HGLG11', name: 'CSHG Logística', quantity: 20, price: 165.32, diagramaSerradoScore: 8.4 },
    { symbol: 'VILG11', name: 'Vinci Logística', quantity: 21, price: 108.75, diagramaSerradoScore: 8.2 },
  ],
  
  international: [
    { symbol: 'NASD11', name: 'ETF Nasdaq', quantity: 500, price: 12.85, diagramaSerradoScore: 9.0 },
    { symbol: 'IVVB11', name: 'iShares S&P 500', quantity: 70, price: 155.40, diagramaSerradoScore: 9.1 },
    { symbol: 'QBTC11', name: 'QR Bitcoin', quantity: 300, price: 195.73, diagramaSerradoScore: 7.8 },
  ],
  
  crypto: [
    { symbol: 'BTC', name: 'Bitcoin', quantity: 0.099912, price: 587700.00, diagramaSerradoScore: 8.5 },
  ],
  
  fixedIncome: [
    { symbol: 'CDB', name: 'CDB 101% CDI', value: 157162.65, yield: '101% CDI', diagramaSerradoScore: 7.0 },
  ]
};

/**
 * Calcula o valor total de cada categoria de ativos
 */
export const calculateTotals = () => {
  const totals = {
    stocks: 0,
    fiis: 0,
    international: 0,
    crypto: 0,
    fixedIncome: 0,
    total: 0
  };
  
  // Calcular ações
  userAssets.stocks.forEach(stock => {
    totals.stocks += stock.quantity * stock.price;
  });
  
  // Calcular FIIs
  userAssets.fiis.forEach(fii => {
    totals.fiis += fii.quantity * fii.price;
  });
  
  // Calcular ativos internacionais
  userAssets.international.forEach(asset => {
    totals.international += asset.quantity * asset.price;
  });
  
  // Calcular criptomoedas
  userAssets.crypto.forEach(crypto => {
    totals.crypto += crypto.quantity * crypto.price;
  });
  
  // Renda fixa
  userAssets.fixedIncome.forEach(asset => {
    totals.fixedIncome += asset.value;
  });
  
  // Total geral
  totals.total = totals.stocks + totals.fiis + totals.international + totals.crypto + totals.fixedIncome;
  
  return totals;
};

/**
 * Calcula os dividendos mensais estimados para cada ativo
 */
export const calculateDividendYields = () => {
  const dividendYields = {
    stocks: {
      PGCO34: 0.0225, // 2.25% ao ano
      B3SA3: 0.0450,
      CXSE3: 0.0680,
      WEGE3: 0.0180,
      AMZO34: 0.0050,
      CSCO34: 0.0320,
      ABCB34: 0.0280,
      JPMC34: 0.0310,
      CPLE6: 0.0720,
      VIVT3: 0.0650,
      BOAC34: 0.0270
    },
    fiis: {
      KDIF11: 0.0780, // 7.8% ao ano
      AREA11: 0.0720,
      PVBI11: 0.0750,
      HGCR11: 0.0820,
      RZTR11: 0.0680,
      VISC11: 0.0710,
      CPTS11: 0.0830,
      KNCR11: 0.0790,
      BTLG11: 0.0760,
      HGLG11: 0.0740,
      VILG11: 0.0730
    },
    international: {
      NASD11: 0.0120,
      IVVB11: 0.0180,
      QBTC11: 0.0000 // Bitcoin não paga dividendos
    }
  };
  
  return dividendYields;
};

/**
 * Calcula o rendimento mensal de dividendos para um ativo específico
 * @param {string} symbol - Símbolo do ativo
 * @param {number} quantity - Quantidade de cotas
 * @param {number} price - Preço atual do ativo
 * @returns {number} - Rendimento mensal estimado
 */
export const calculateMonthlyDividend = (symbol, quantity, price) => {
  const dividendYields = calculateDividendYields();
  let yield_ = 0;
  
  // Verificar em qual categoria o ativo está
  if (dividendYields.stocks[symbol]) {
    yield_ = dividendYields.stocks[symbol];
  } else if (dividendYields.fiis[symbol]) {
    yield_ = dividendYields.fiis[symbol];
  } else if (dividendYields.international[symbol]) {
    yield_ = dividendYields.international[symbol];
  }
  
  // Calcular rendimento mensal (dividendo anual / 12)
  const annualDividend = quantity * price * yield_;
  return annualDividend / 12;
};

/**
 * Calcula o total de dividendos mensais da carteira
 * @returns {number} - Total de dividendos mensais
 */
export const calculateTotalMonthlyDividends = () => {
  let totalMonthly = 0;
  
  // Ações
  userAssets.stocks.forEach(stock => {
    totalMonthly += calculateMonthlyDividend(stock.symbol, stock.quantity, stock.price);
  });
  
  // FIIs
  userAssets.fiis.forEach(fii => {
    totalMonthly += calculateMonthlyDividend(fii.symbol, fii.quantity, fii.price);
  });
  
  // Ativos internacionais
  userAssets.international.forEach(asset => {
    totalMonthly += calculateMonthlyDividend(asset.symbol, asset.quantity, asset.price);
  });
  
  return totalMonthly;
};



// Converter defaultAssets para array plano para o portfolioManager
const defaultAssetsArray = [
  ...defaultAssets.stocks,
  ...defaultAssets.fiis,
  ...defaultAssets.international,
  ...defaultAssets.crypto,
  ...defaultAssets.fixedIncome
];

// Inicializar portfólio com dados padrão se não existir
initializePortfolio(defaultAssetsArray);

/**
 * Função para carregar userAssets dinamicamente do localStorage
 * Sempre retorna dados frescos
 */
export function getUserAssets() {
  console.log('🔄 getUserAssets: Carregando dados frescos do localStorage...');
  const loadedArray = loadPortfolio();
  
  if (loadedArray && Array.isArray(loadedArray)) {
    console.log('📦 getUserAssets: Array carregado com', loadedArray.length, 'ativos');
    // Reconstruir userAssets a partir do array salvo
    const reconstructed = {
      stocks: [],
      fiis: [],
      international: [],
      crypto: [],
      fixedIncome: []
    };
    
    loadedArray.forEach(asset => {
      // Identificar categoria baseado no símbolo
      if (asset.symbol.endsWith('11')) {
        reconstructed.fiis.push(asset);
      } else if (asset.symbol === 'BTC') {
        reconstructed.crypto.push(asset);
      } else if (asset.symbol === 'CDB') {
        reconstructed.fixedIncome.push(asset);
      } else if (['NASD11', 'IVVB11', 'QBTC11'].includes(asset.symbol)) {
        reconstructed.international.push(asset);
      } else {
        reconstructed.stocks.push(asset);
      }
    });
    
    console.log('✅ getUserAssets: Dados reconstruídos -', 
      'Ações:', reconstructed.stocks.length,
      'FIIs:', reconstructed.fiis.length,
      'Internacional:', reconstructed.international.length);
    
    return reconstructed;
  } else {
    console.log('⚠️ getUserAssets: Usando dados padrão');
    return defaultAssets;
  }
}

// Exportar dados iniciais (para compatibilidade)
export const userAssets = getUserAssets();


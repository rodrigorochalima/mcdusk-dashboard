/**
 * Mapeamento de tickers da B3 para Yahoo Finance
 * Implementação conforme especificações do documento
 */

// Mapeamento padrão: adicionar sufixo .SA
const mapearTickerPadrao = (ticker) => `${ticker}.SA`;

// Exceções para o mapeamento
const excecoesMapping = {
  'BTC': 'BTC-USD',
  'ETH': 'ETH-USD',
  'USDT': 'USDT-USD',
  'USDC': 'USDC-USD',
  'BNB': 'BNB-USD',
  'XRP': 'XRP-USD',
  'ADA': 'ADA-USD',
  'SOL': 'SOL-USD',
  'DOGE': 'DOGE-USD',
  'DOT': 'DOT-USD',
  'AVAX': 'AVAX-USD',
  'MATIC': 'MATIC-USD',
  'LINK': 'LINK-USD',
  'UNI': 'UNI-USD',
  'ATOM': 'ATOM-USD',
  'LTC': 'LTC-USD',
  'ALGO': 'ALGO-USD',
  'XLM': 'XLM-USD',
  'NEAR': 'NEAR-USD',
  'FTM': 'FTM-USD',
  'FLOW': 'FLOW-USD',
  'VET': 'VET-USD',
  'HBAR': 'HBAR-USD',
  'FIL': 'FIL-USD',
  'XTZ': 'XTZ-USD',
  'EOS': 'EOS-USD',
  'SAND': 'SAND-USD',
  'MANA': 'MANA-USD',
  'AXS': 'AXS-USD',
  'EGLD': 'EGLD-USD',
  'XMR': 'XMR-USD',
  'THETA': 'THETA-USD',
  'ETC': 'ETC-USD',
  'ZEC': 'ZEC-USD',
  'DASH': 'DASH-USD',
  'NEO': 'NEO-USD',
  'IOTA': 'IOTA-USD',
  'XEM': 'XEM-USD',
  'ZIL': 'ZIL-USD',
  'ONT': 'ONT-USD',
  'BAT': 'BAT-USD',
  'ENJ': 'ENJ-USD',
  'QTUM': 'QTUM-USD',
  'ZRX': 'ZRX-USD',
  'ICX': 'ICX-USD',
  'OMG': 'OMG-USD',
  'WAVES': 'WAVES-USD',
  'KCS': 'KCS-USD',
  'HT': 'HT-USD',
  'CRO': 'CRO-USD',
  'LEO': 'LEO-USD',
  'FTT': 'FTT-USD',
  'OKB': 'OKB-USD',
  'CAKE': 'CAKE-USD',
  'COMP': 'COMP-USD',
  'AAVE': 'AAVE-USD',
  'SNX': 'SNX-USD',
  'MKR': 'MKR-USD',
  'YFI': 'YFI-USD',
  'SUSHI': 'SUSHI-USD',
  'CRV': 'CRV-USD',
  'BAL': 'BAL-USD',
  'REN': 'REN-USD',
  'LRC': 'LRC-USD',
  'KNC': 'KNC-USD',
  'BNT': 'BNT-USD',
  'ALPHA': 'ALPHA-USD',
  'BADGER': 'BADGER-USD',
  'PERP': 'PERP-USD',
  'RUNE': 'RUNE-USD',
  'LUNA': 'LUNA-USD',
  'KLAY': 'KLAY-USD',
  'XDC': 'XDC-USD',
  'CELO': 'CELO-USD',
  'ONE': 'ONE-USD',
  'TFUEL': 'TFUEL-USD',
  'MINA': 'MINA-USD',
  'AR': 'AR-USD',
  'KSM': 'KSM-USD',
  'ROSE': 'ROSE-USD',
  'AUDIO': 'AUDIO-USD',
  'CHZ': 'CHZ-USD',
  'HOT': 'HOT-USD',
  'STORJ': 'STORJ-USD',
  'ANKR': 'ANKR-USD',
  'OCEAN': 'OCEAN-USD',
  'DYDX': 'DYDX-USD',
  'IMX': 'IMX-USD',
  'LDO': 'LDO-USD',
  'APE': 'APE-USD',
  'GMT': 'GMT-USD',
  'OP': 'OP-USD',
  'GALA': 'GALA-USD',
  'STEPN': 'GMT-USD',
  'SHIB': 'SHIB-USD',
  'DOGE': 'DOGE-USD',
  'PEPE': 'PEPE-USD',
  'FLOKI': 'FLOKI-USD',
  'BONK': 'BONK-USD',
  'WIF': 'WIF-USD',
  'BOME': 'BOME-USD',
  'POPCAT': 'POPCAT-USD',
  'TOSHI': 'TOSHI-USD',
  'BRETT': 'BRETT-USD',
  'MOG': 'MOG-USD',
  'TURBO': 'TURBO-USD',
  'BOOK': 'BOOK-USD',
  'SLERF': 'SLERF-USD',
  'TRUMP': 'TRUMP-USD',
  'BIDEN': 'BIDEN-USD',
  'MAGA': 'MAGA-USD',
  'JUP': 'JUP-USD',
  'SEI': 'SEI-USD',
  'SUI': 'SUI-USD',
  'BLUR': 'BLUR-USD',
  'ARB': 'ARB-USD',
  'PYTH': 'PYTH-USD',
  'STRK': 'STRK-USD',
  'RNDR': 'RNDR-USD',
  'FET': 'FET-USD',
  'INJ': 'INJ-USD',
  'AGIX': 'AGIX-USD',
  'ORDI': 'ORDI-USD',
  'RATS': 'RATS-USD',
  'SATS': 'SATS-USD',
  'TRAC': 'TRAC-USD',
  'CYBER': 'CYBER-USD',
  'RUNE': 'RUNE-USD',
  'JASMY': 'JASMY-USD',
  'ASTR': 'ASTR-USD',
  'KAVA': 'KAVA-USD',
  'GLMR': 'GLMR-USD',
  'MOVR': 'MOVR-USD',
  'SCRT': 'SCRT-USD',
  'OSMO': 'OSMO-USD',
  'JUNO': 'JUNO-USD',
  'EVMOS': 'EVMOS-USD',
  'STARS': 'STARS-USD',
  'AKT': 'AKT-USD',
  'REGEN': 'REGEN-USD',
  'IRIS': 'IRIS-USD',
  'DVPN': 'DVPN-USD',
  'XPRT': 'XPRT-USD',
  'CMDX': 'CMDX-USD',
  'UMEE': 'UMEE-USD',
  'HUAHUA': 'HUAHUA-USD',
  'LIKE': 'LIKE-USD',
  'CHEQ': 'CHEQ-USD',
  'SOMM': 'SOMM-USD',
  'KUJI': 'KUJI-USD',
  'STRD': 'STRD-USD',
  'LUNC': 'LUNC-USD',
  'USTC': 'USTC-USD',
  'LUNA2': 'LUNA-USD',
  'BONK': 'BONK-USD',
  'SAMO': 'SAMO-USD',
  'BOME': 'BOME-USD',
  'POPCAT': 'POPCAT-USD',
  'TOSHI': 'TOSHI-USD',
  'BRETT': 'BRETT-USD',
  'MOG': 'MOG-USD',
  'TURBO': 'TURBO-USD',
  'BOOK': 'BOOK-USD',
  'SLERF': 'SLERF-USD',
  'TRUMP': 'TRUMP-USD',
  'BIDEN': 'BIDEN-USD',
  'MAGA': 'MAGA-USD',
  'JUP': 'JUP-USD',
  'SEI': 'SEI-USD',
  'SUI': 'SUI-USD',
  'BLUR': 'BLUR-USD',
  'ARB': 'ARB-USD',
  'PYTH': 'PYTH-USD',
  'STRK': 'STRK-USD',
  'RNDR': 'RNDR-USD',
  'FET': 'FET-USD',
  'INJ': 'INJ-USD',
  'AGIX': 'AGIX-USD',
  'ORDI': 'ORDI-USD',
  'RATS': 'RATS-USD',
  'SATS': 'SATS-USD',
  'TRAC': 'TRAC-USD',
  'CYBER': 'CYBER-USD',
  'RUNE': 'RUNE-USD',
  'JASMY': 'JASMY-USD',
  'ASTR': 'ASTR-USD',
  'KAVA': 'KAVA-USD',
  'GLMR': 'GLMR-USD',
  'MOVR': 'MOVR-USD',
  'SCRT': 'SCRT-USD',
  'OSMO': 'OSMO-USD',
  'JUNO': 'JUNO-USD',
  'EVMOS': 'EVMOS-USD',
  'STARS': 'STARS-USD',
  'AKT': 'AKT-USD',
  'REGEN': 'REGEN-USD',
  'IRIS': 'IRIS-USD',
  'DVPN': 'DVPN-USD',
  'XPRT': 'XPRT-USD',
  'CMDX': 'CMDX-USD',
  'UMEE': 'UMEE-USD',
  'HUAHUA': 'HUAHUA-USD',
  'LIKE': 'LIKE-USD',
  'CHEQ': 'CHEQ-USD',
  'SOMM': 'SOMM-USD',
  'KUJI': 'KUJI-USD',
  'STRD': 'STRD-USD',
  'LUNC': 'LUNC-USD',
  'USTC': 'USTC-USD',
  'LUNA2': 'LUNA-USD',
  'BONK': 'BONK-USD',
  'SAMO': 'SAMO-USD'
};

/**
 * Mapeia um ticker da B3 para o formato do Yahoo Finance
 * @param {string} ticker - Ticker da B3
 * @returns {string} - Ticker no formato do Yahoo Finance
 */
export const mapearTicker = (ticker) => {
  // Verificar se o ticker está na lista de exceções
  if (excecoesMapping[ticker]) {
    return excecoesMapping[ticker];
  }
  
  // Aplicar mapeamento padrão
  return mapearTickerPadrao(ticker);
};

/**
 * Mapeia uma lista de tickers da B3 para o formato do Yahoo Finance
 * @param {Array<string>} tickers - Lista de tickers da B3
 * @returns {Array<string>} - Lista de tickers no formato do Yahoo Finance
 */
export const mapearTickers = (tickers) => {
  return tickers.map(mapearTicker);
};

/**
 * Mapeia um ticker do Yahoo Finance de volta para o formato da B3
 * @param {string} yahooTicker - Ticker do Yahoo Finance
 * @returns {string} - Ticker no formato da B3
 */
export const mapearTickerReverso = (yahooTicker) => {
  // Verificar se o ticker está na lista de exceções (reverso)
  for (const [b3Ticker, yTicker] of Object.entries(excecoesMapping)) {
    if (yTicker === yahooTicker) {
      return b3Ticker;
    }
  }
  
  // Remover o sufixo .SA
  if (yahooTicker.endsWith('.SA')) {
    return yahooTicker.slice(0, -3);
  }
  
  // Se não for possível mapear, retornar o ticker original
  return yahooTicker;
};

export default {
  mapearTicker,
  mapearTickers,
  mapearTickerReverso
};

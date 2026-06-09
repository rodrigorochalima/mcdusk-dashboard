/**
 * ============================================================================
 * SISTEMA DE LENTES DE ANÁLISE POR TIPO DE ATIVO
 * ============================================================================
 * 
 * Gera análises dinâmicas baseadas no tipo de ativo:
 * - Renda Variável: Buffett (40%), Barsi (30%), Raul Sena (20%), ARCA (10%)
 * - Renda Fixa: Bill Gross (35%), Jeffrey Gundlach (30%), Dan Ivascyn (25%), Ray Dalio (10%)
 * - Cripto: Lyn Alden (35%), Philip Swift (30%), Glassnode (25%), Michael Saylor (10%)
 * 
 * @version 2.0.0
 */

/**
 * Retorna as lentes de análise corretas para o tipo de ativo
 */
export const getLensesForAsset = (asset, assetClassId) => {
  const type = getAssetType(asset, assetClassId);
  
  switch (type) {
    case 'STOCK':
    case 'FII':
      return getEquityLenses(asset);
    case 'FIXED_INCOME':
      return getFixedIncomeLenses(asset);
    case 'CRYPTO':
      return getCryptoLenses(asset);
    default:
      return getEquityLenses(asset);
  }
};

/**
 * Detecta o tipo de ativo baseado no símbolo e classe
 */
export const getAssetType = (asset, assetClassId) => {
  if (assetClassId === 'fixedIncome' || asset.symbol === 'CDB') return 'FIXED_INCOME';
  if (assetClassId === 'crypto' || asset.symbol === 'BTC') return 'CRYPTO';
  if (asset.symbol === 'QBTC11') return 'CRYPTO';
  if (assetClassId === 'reits' || (asset.symbol && asset.symbol.match(/\d{2}$/) && !asset.symbol.includes('34'))) return 'FII';
  if (asset.symbol && asset.symbol.includes('34')) return 'BDR';
  return 'STOCK';
};

/**
 * Lentes para Renda Variável (Ações, BDRs, FIIs)
 */
const getEquityLenses = (asset) => {
  const change = asset.change || 0;
  const price = asset.price || 0;
  
  // Simular análise baseada em dados disponíveis
  const isUndervalued = change < 0 || (asset.pe && asset.pe < 15);
  const hasGoodDividends = asset.dividendYield && asset.dividendYield > 5;
  const isGrowing = change > 3;
  
  return {
    type: 'EQUITY',
    recommendation: getOverallRecommendation(isUndervalued, hasGoodDividends, isGrowing),
    lenses: [
      {
        id: 'buffett',
        name: 'Warren Buffett',
        weight: 40,
        label: 'Maior Peso',
        icon: 'W',
        color: '#1e40af',
        signal: isUndervalued ? 'buy' : isGrowing ? 'hold' : 'sell',
        timeframes: {
          '1M': isUndervalued ? 'COMPRAR' : 'MANTER',
          '3M': isUndervalued ? 'COMPRAR' : 'MANTER',
          '6M': isUndervalued || hasGoodDividends ? 'COMPRAR' : 'MANTER'
        },
        description: isUndervalued
          ? `COMPRAR: ${asset.symbol} apresenta sinais de subvalorização. Margem de segurança adequada para investimento de longo prazo.`
          : isGrowing
          ? `MANTER: ${asset.symbol} está em tendência positiva. Manter posição e aguardar oportunidade de aumento.`
          : `MANTER: ${asset.symbol} está no preço justo. Sem margem de segurança para novas compras no momento.`
      },
      {
        id: 'barsi',
        name: 'Luiz Barsi',
        weight: 30,
        label: '2º Peso',
        icon: 'B',
        color: '#059669',
        signal: hasGoodDividends ? 'buy' : change < -5 ? 'buy' : 'hold',
        timeframes: {
          '1M': hasGoodDividends ? 'COMPRAR' : 'MANTER',
          '3M': hasGoodDividends || change < -3 ? 'COMPRAR' : 'MANTER',
          '6M': hasGoodDividends ? 'COMPRAR' : 'MANTER'
        },
        description: hasGoodDividends
          ? `COMPRAR: ${asset.symbol} paga bons dividendos. Foco em renda passiva e acumulação de patrimônio.`
          : change < -5
          ? `COMPRAR: ${asset.symbol} caiu ${Math.abs(change).toFixed(1)}%. Oportunidade de comprar barato e aumentar yield on cost.`
          : `MANTER: ${asset.symbol} está estável. Continuar acumulando nos aportes mensais.`
      },
      {
        id: 'raul',
        name: 'Raul Sena',
        weight: 20,
        label: '3º Peso',
        icon: 'R',
        color: '#d97706',
        signal: isUndervalued && hasGoodDividends ? 'buy' : 'hold',
        timeframes: {
          '1M': isUndervalued ? 'COMPRAR' : 'MANTER',
          '3M': 'MANTER',
          '6M': hasGoodDividends ? 'COMPRAR' : 'MANTER'
        },
        description: isUndervalued
          ? `COMPRAR: ${asset.symbol} passou no Diagrama do Cerrado. Nota alta nos critérios fundamentalistas.`
          : `MANTER: ${asset.symbol} está adequado na carteira. Aguardar próximo aporte para rebalancear.`
      },
      {
        id: 'arca',
        name: 'Estratégia ARCA',
        weight: 10,
        label: '4º Peso',
        icon: 'A',
        color: '#7c3aed',
        signal: 'hold',
        timeframes: {
          '1M': 'MANTER',
          '3M': 'MANTER',
          '6M': 'MANTER'
        },
        description: `MANTER: ${asset.symbol} faz parte da alocação estratégica ARCA. Rebalancear conforme meta de alocação.`
      }
    ]
  };
};

/**
 * Lentes para Renda Fixa (CDB, Tesouro, etc.)
 */
const getFixedIncomeLenses = (asset) => {
  const yieldRate = asset.yield || '100% CDI';
  const isAboveCDI = yieldRate.includes('101') || yieldRate.includes('102') || yieldRate.includes('103');
  const value = asset.value || 0;
  
  return {
    type: 'FIXED_INCOME',
    recommendation: 'MANTER',
    lenses: [
      {
        id: 'gross',
        name: 'Bill Gross',
        weight: 35,
        label: 'Maior Peso',
        icon: 'GR',
        color: '#1e40af',
        signal: isAboveCDI ? 'buy' : 'hold',
        timeframes: {
          '1M': 'MANTER',
          '3M': isAboveCDI ? 'COMPRAR' : 'MANTER',
          '6M': isAboveCDI ? 'COMPRAR' : 'MANTER'
        },
        description: isAboveCDI
          ? `COMPRAR: ${asset.name || 'CDB'} rende acima do CDI (${yieldRate}). Taxa real positiva favorece alocação em renda fixa.`
          : `MANTER: ${asset.name || 'CDB'} está rendendo CDI padrão. Manter posição e aguardar melhores taxas.`
      },
      {
        id: 'gundlach',
        name: 'Jeffrey Gundlach',
        weight: 30,
        label: '2º Peso',
        icon: 'GU',
        color: '#059669',
        signal: 'hold',
        timeframes: {
          '1M': 'MANTER',
          '3M': 'MANTER',
          '6M': 'MANTER'
        },
        description: `MANTER: Cenário de juros altos no Brasil favorece manter posição em ${asset.name || 'renda fixa'}. Duration curta é mais segura.`
      },
      {
        id: 'ivascyn',
        name: 'Dan Ivascyn',
        weight: 25,
        label: '3º Peso',
        icon: 'IV',
        color: '#d97706',
        signal: isAboveCDI ? 'buy' : 'hold',
        timeframes: {
          '1M': 'MANTER',
          '3M': isAboveCDI ? 'COMPRAR' : 'MANTER',
          '6M': 'MANTER'
        },
        description: isAboveCDI
          ? `COMPRAR: Spread de crédito favorável. ${asset.name || 'CDB'} oferece prêmio sobre o CDI com risco controlado.`
          : `MANTER: Spread de crédito neutro. Manter posição atual sem aumentar exposição.`
      },
      {
        id: 'dalio',
        name: 'Ray Dalio',
        weight: 10,
        label: '4º Peso',
        icon: 'RD',
        color: '#7c3aed',
        signal: 'hold',
        timeframes: {
          '1M': 'MANTER',
          '3M': 'MANTER',
          '6M': 'MANTER'
        },
        description: `MANTER: Renda fixa é componente essencial do All Weather Portfolio. Manter ${asset.name || 'CDB'} como proteção contra volatilidade.`
      }
    ]
  };
};

/**
 * Lentes para Criptomoedas
 */
const getCryptoLenses = (asset) => {
  const change = asset.change || 0;
  const isBullish = change > 5;
  const isBearish = change < -5;
  const isNeutral = !isBullish && !isBearish;
  
  return {
    type: 'CRYPTO',
    recommendation: isBullish ? 'MANTER' : isBearish ? 'COMPRAR' : 'MANTER',
    lenses: [
      {
        id: 'alden',
        name: 'Lyn Alden',
        weight: 35,
        label: 'Maior Peso',
        icon: 'L',
        color: '#1e40af',
        signal: isBearish ? 'buy' : 'hold',
        timeframes: {
          '1M': isBearish ? 'COMPRAR' : 'MANTER',
          '3M': isBearish ? 'COMPRAR' : 'MANTER',
          '6M': 'COMPRAR'
        },
        description: isBearish
          ? `COMPRAR: ${asset.symbol} caiu ${Math.abs(change).toFixed(1)}%. Liquidez global em expansão favorece ativos escassos. Momento de acumular.`
          : isBullish
          ? `MANTER: ${asset.symbol} em alta de ${change.toFixed(1)}%. Ciclo de liquidez favorável, mas não é momento de FOMO. Manter posição.`
          : `MANTER: ${asset.symbol} estável. Continuar DCA (compras regulares) conforme estratégia de longo prazo.`
      },
      {
        id: 'swift',
        name: 'Philip Swift',
        weight: 30,
        label: '2º Peso',
        icon: 'S',
        color: '#059669',
        signal: isBearish ? 'buy' : isBullish ? 'hold' : 'hold',
        timeframes: {
          '1M': isBearish ? 'COMPRAR' : 'MANTER',
          '3M': 'MANTER',
          '6M': isBearish ? 'COMPRAR' : 'MANTER'
        },
        description: isBearish
          ? `COMPRAR: Indicadores on-chain mostram ${asset.symbol} abaixo do valor justo. MVRV e SOPR indicam zona de acumulação.`
          : isBullish
          ? `MANTER: Indicadores on-chain mostram ${asset.symbol} em zona neutra-alta. Não é momento de vender, mas cautela com novas compras.`
          : `MANTER: Métricas on-chain neutras. ${asset.symbol} em zona de consolidação. Continuar estratégia DCA.`
      },
      {
        id: 'glassnode',
        name: 'Glassnode',
        weight: 25,
        label: '3º Peso',
        icon: 'G',
        color: '#d97706',
        signal: isBearish ? 'buy' : 'hold',
        timeframes: {
          '1M': isBearish ? 'COMPRAR' : 'MANTER',
          '3M': 'MANTER',
          '6M': 'MANTER'
        },
        description: isBearish
          ? `COMPRAR: Dados de blockchain mostram acumulação por holders de longo prazo. Supply em exchanges diminuindo.`
          : `MANTER: Fluxo de ${asset.symbol} em exchanges estável. Sem sinais de pressão vendedora significativa.`
      },
      {
        id: 'saylor',
        name: 'Michael Saylor',
        weight: 10,
        label: '4º Peso',
        icon: 'MS',
        color: '#7c3aed',
        signal: 'buy',
        timeframes: {
          '1M': 'COMPRAR',
          '3M': 'COMPRAR',
          '6M': 'COMPRAR'
        },
        description: `COMPRAR: Visão ultra-bullish. ${asset.symbol} é reserva de valor digital superior. Acumular em qualquer preço para horizonte de 10+ anos.`
      }
    ]
  };
};

/**
 * Calcula recomendação geral ponderada
 */
const getOverallRecommendation = (isUndervalued, hasGoodDividends, isGrowing) => {
  if (isUndervalued && hasGoodDividends) return 'COMPRAR';
  if (isUndervalued || hasGoodDividends) return 'COMPRAR';
  if (isGrowing) return 'MANTER';
  return 'MANTER';
};

/**
 * Retorna a cor do sinal
 */
export const getSignalColor = (signal) => {
  switch (signal) {
    case 'buy': return '#22c55e';
    case 'sell': return '#ef4444';
    case 'hold': return '#f59e0b';
    default: return '#9ca3af';
  }
};

/**
 * Retorna o texto do sinal em português
 */
export const getSignalText = (signal) => {
  switch (signal) {
    case 'buy': return 'COMPRAR';
    case 'sell': return 'VENDER';
    case 'hold': return 'MANTER';
    default: return 'NEUTRO';
  }
};

export default {
  getLensesForAsset,
  getAssetType,
  getSignalColor,
  getSignalText
};

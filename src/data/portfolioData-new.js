/**
 * Dados do portfólio - VERSÃO DINÂMICA
 * Este arquivo exporta FUNÇÕES que sempre retornam dados frescos do localStorage
 */

import { getUserAssets } from './userAssets';

console.log('🚀 portfolioData-new.js CARREGADO! Versão dinâmica ativa.');

/**
 * Função para obter classes de ativos dinamicamente
 * Sempre carrega dados frescos do localStorage
 */
export function getAssetClasses() {
  const assets = getUserAssets();
  
  // Calcular totais por categoria
  const calculateCategoryTotal = (assetList) => {
    return assetList.reduce((sum, asset) => {
      const value = (asset.quantity || 0) * (asset.price || 0);
      return sum + value;
    }, 0);
  };
  
  const stocksTotal = calculateCategoryTotal(assets.stocks);
  const fiisTotal = calculateCategoryTotal(assets.fiis);
  const internationalTotal = calculateCategoryTotal(assets.international);
  const cryptoTotal = calculateCategoryTotal(assets.crypto);
  const fixedIncomeTotal = calculateCategoryTotal(assets.fixedIncome);
  
  const grandTotal = stocksTotal + fiisTotal + internationalTotal + cryptoTotal + fixedIncomeTotal;
  
  // Mapear ativos com valores calculados
  const mapAssetsWithValues = (assetList) => {
    return assetList.map(asset => ({
      ...asset,
      value: (asset.quantity || 0) * (asset.price || 0),
      changePercent: asset.changePercent || 0
    }));
  };
  
  return [
    {
      id: 'stocks',
      title: 'Ações',
      value: stocksTotal,
      percent: grandTotal > 0 ? (stocksTotal / grandTotal * 100) : 0,
      change: 0, // TODO: Calcular mudança real
      changePercent: 0,
      assetCount: assets.stocks.length,
      aboveTarget: false,
      assets: mapAssetsWithValues(assets.stocks)
    },
    {
      id: 'fiis',
      title: 'Fundos Imobiliários',
      value: fiisTotal,
      percent: grandTotal > 0 ? (fiisTotal / grandTotal * 100) : 0,
      change: 0,
      changePercent: 0,
      assetCount: assets.fiis.length,
      aboveTarget: false,
      assets: mapAssetsWithValues(assets.fiis)
    },
    {
      id: 'international',
      title: 'Ativos Internacionais',
      value: internationalTotal,
      percent: grandTotal > 0 ? (internationalTotal / grandTotal * 100) : 0,
      change: 0,
      changePercent: 0,
      assetCount: assets.international.length,
      aboveTarget: false,
      assets: mapAssetsWithValues(assets.international)
    },
    {
      id: 'crypto',
      title: 'Criptomoedas',
      value: cryptoTotal,
      percent: grandTotal > 0 ? (cryptoTotal / grandTotal * 100) : 0,
      change: 0,
      changePercent: 0,
      assetCount: assets.crypto.length,
      aboveTarget: false,
      assets: mapAssetsWithValues(assets.crypto)
    },
    {
      id: 'fixedIncome',
      title: 'Renda Fixa',
      value: fixedIncomeTotal,
      percent: grandTotal > 0 ? (fixedIncomeTotal / grandTotal * 100) : 0,
      change: 0,
      changePercent: 0,
      assetCount: assets.fixedIncome.length,
      aboveTarget: false,
      assets: mapAssetsWithValues(assets.fixedIncome)
    }
  ].filter(category => category.assetCount > 0); // Filtrar categorias vazias
}

/**
 * Função para obter patrimônio total dinamicamente
 */
export function getTotalPatrimony() {
  const assetClasses = getAssetClasses();
  const total = assetClasses.reduce((sum, category) => sum + category.value, 0);
  
  return {
    value: total,
    change: 0, // TODO: Calcular mudança real
    changePercent: 0
  };
}

// Indicadores econômicos (estáticos por enquanto)
export const economicIndicators = [
  { id: 'cdi', name: 'CDI', value: '10.65%', bgColor: '#fff8e6', color: '#b7791f' },
  { id: 'ibov', name: 'IBOV', value: '4.4%', bgColor: '#e6fffa', color: '#047857' },
  { id: 'selic', name: 'SELIC', value: '10.75%', bgColor: '#e8f4fd', color: '#0077c2' },
  { id: 'fii', name: 'FII', value: '0.8%', bgColor: '#f3e8ff', color: '#7c3aed' },
  { id: 'iafd', name: 'IAFD', value: '0.6%', bgColor: '#fef3c7', color: '#d97706' },
  { id: 'ipca', name: 'IPCA', value: '4.23%', bgColor: '#fee2e2', color: '#dc2626' },
];

// Performance vs benchmark (estático por enquanto)
export const performance = {
  benchmark: 'CDI',
  value: 0.0,
};

// Histórico de patrimônio (estático por enquanto)
export const patrimonyHistory = [
  { month: 'Out/24', patrimony: -1, cdi: -1 },
  { month: 'Nov/24', patrimony: -0.5, cdi: -0.8 },
  { month: 'Dez/24', patrimony: 0, cdi: 0 },
  { month: 'Jan/25', patrimony: 2, cdi: 1.5 },
  { month: 'Fev/25', patrimony: 4, cdi: 3 },
  { month: 'Mar/25', patrimony: 6, cdi: 4.5 },
  { month: 'Abr/25', patrimony: 9, cdi: 6 },
  { month: 'Mai/25', patrimony: 13, cdi: 7.5 },
  { month: 'Jun/25', patrimony: 16, cdi: 9 },
  { month: 'Jul/25', patrimony: 19, cdi: 10.5 },
  { month: 'Ago/25', patrimony: 22, cdi: 12 },
  { month: 'Set/25', patrimony: 26, cdi: 13.5 },
];


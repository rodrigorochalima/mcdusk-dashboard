/**
 * Módulo de Gerenciamento de Portfólio
 * Sistema simples e robusto para gerenciar ativos
 */

const STORAGE_KEY = 'mcduck_portfolio_v2';

/**
 * Carrega o portfólio do localStorage
 * @returns {Array} Array de ativos
 */
export function loadPortfolio() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      console.log('📦 Nenhum portfólio salvo encontrado');
      return null;
    }
    const data = JSON.parse(stored);
    
    // Validar se é um array
    if (!Array.isArray(data)) {
      console.error('❌ Dados inválidos no localStorage (não é array):', typeof data);
      localStorage.removeItem(STORAGE_KEY); // Limpar dados inválidos
      return null;
    }
    
    console.log('✅ Portfólio carregado:', data.length, 'ativos');
    return data;
  } catch (error) {
    console.error('❌ Erro ao carregar portfólio:', error);
    return null;
  }
}

/**
 * Salva o portfólio no localStorage
 * @param {Array} assets - Array de ativos
 * @returns {boolean} true se salvou com sucesso
 */
export function savePortfolio(assets) {
  try {
    // Validar se é um array
    if (!Array.isArray(assets)) {
      console.error('❌ Tentativa de salvar dados inválidos (não é array):', typeof assets);
      return false;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
    console.log('✅ Portfólio salvo:', assets.length, 'ativos');
    
    // Disparar evento personalizado para atualizar UI
    window.dispatchEvent(new CustomEvent('portfolioUpdated', { detail: assets }));
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao salvar portfólio:', error);
    return false;
  }
}

/**
 * Atualiza um ativo específico
 * @param {string} symbol - Símbolo do ativo
 * @param {Object} updates - Dados a atualizar
 * @returns {boolean} true se atualizou com sucesso
 */
export function updateAsset(symbol, updates) {
  try {
    const portfolio = loadPortfolio();
    if (!portfolio) {
      console.error('❌ Portfólio não encontrado');
      return false;
    }
    
    const index = portfolio.findIndex(a => a.symbol === symbol);
    if (index === -1) {
      console.error('❌ Ativo não encontrado:', symbol);
      return false;
    }
    
    // Atualizar ativo
    portfolio[index] = { ...portfolio[index], ...updates };
    
    // Salvar
    return savePortfolio(portfolio);
  } catch (error) {
    console.error('❌ Erro ao atualizar ativo:', error);
    return false;
  }
}

/**
 * Adiciona um novo ativo
 * @param {Object} asset - Novo ativo
 * @returns {boolean} true se adicionou com sucesso
 */
export function addAsset(asset) {
  try {
    let portfolio = loadPortfolio() || [];
    
    // Verificar se já existe
    if (portfolio.some(a => a.symbol === asset.symbol)) {
      console.error('❌ Ativo já existe:', asset.symbol);
      return false;
    }
    
    portfolio.push(asset);
    return savePortfolio(portfolio);
  } catch (error) {
    console.error('❌ Erro ao adicionar ativo:', error);
    return false;
  }
}

/**
 * Remove um ativo
 * @param {string} symbol - Símbolo do ativo
 * @returns {boolean} true se removeu com sucesso
 */
export function removeAsset(symbol) {
  try {
    const portfolio = loadPortfolio();
    if (!portfolio) {
      console.error('❌ Portfólio não encontrado');
      return false;
    }
    
    const filtered = portfolio.filter(a => a.symbol !== symbol);
    
    if (filtered.length === portfolio.length) {
      console.error('❌ Ativo não encontrado:', symbol);
      return false;
    }
    
    return savePortfolio(filtered);
  } catch (error) {
    console.error('❌ Erro ao remover ativo:', error);
    return false;
  }
}

/**
 * Inicializa o portfólio com dados padrão se não existir
 * @param {Array} defaultAssets - Dados padrão
 */
export function initializePortfolio(defaultAssets) {
  const existing = loadPortfolio();
  if (!existing || existing.length === 0) {
    console.log('📦 Inicializando portfólio com dados padrão');
    savePortfolio(defaultAssets);
  }
}


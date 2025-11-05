import { supabase } from '../lib/supabaseClient';
import { loadPortfolio } from '../lib/supabasePortfolioManager';

/**
 * Carrega ativos do usuário do Supabase
 * Substitui a versão antiga que usava localStorage
 */
export async function getUserAssets() {
  try {
    console.log('📊 userAssets: Carregando do Supabase...');
    
    // Carregar portfólio do Supabase
    const assets = await loadPortfolio();
    
    if (!assets || assets.length === 0) {
      console.log('⚠️ userAssets: Nenhum ativo encontrado, retornando dados padrão');
      return getDefaultAssets();
    }
    
    // Categorizar ativos
    const categorized = {
      stocks: [],
      fiis: [],
      international: [],
      crypto: [],
      other: []
    };
    
    assets.forEach(asset => {
      const category = asset.category || categorizeBySymbol(asset.symbol);
      
      if (categorized[category]) {
        categorized[category].push(asset);
      } else {
        categorized.other.push(asset);
      }
    });
    
    console.log(`✅ userAssets: ${assets.length} ativos carregados e categorizados`);
    
    return categorized;
  } catch (error) {
    console.error('❌ userAssets: Erro ao carregar do Supabase:', error);
    return getDefaultAssets();
  }
}

/**
 * Categoriza ativo pelo símbolo (fallback)
 */
function categorizeBySymbol(symbol) {
  if (!symbol) return 'other';
  
  const upper = symbol.toUpperCase();
  
  // FIIs terminam em 11
  if (upper.endsWith('11')) return 'fiis';
  
  // Ações internacionais terminam em 34
  if (upper.endsWith('34')) return 'international';
  
  // Criptomoedas
  if (['BTC', 'ETH', 'USDT', 'BNB', 'SOL'].includes(upper)) return 'crypto';
  
  // Ações brasileiras terminam em 3, 4, 5, 6
  if (/[3-6]$/.test(upper)) return 'stocks';
  
  return 'other';
}

/**
 * Retorna ativos padrão para novos usuários
 */
function getDefaultAssets() {
  return {
    stocks: [
      {
        id: 'default-1',
        symbol: 'PGCO34',
        name: 'Procter & Gamble',
        category: 'stocks',
        quantity: 19,
        average_price: 95.75,
        current_price: 95.75
      }
    ],
    fiis: [],
    international: [],
    crypto: [],
    other: []
  };
}

// Exportação padrão para compatibilidade
export const userAssets = await getUserAssets();


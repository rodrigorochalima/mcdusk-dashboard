/**
 * Supabase Portfolio Manager
 * 
 * Substitui o portfolioManager.js que usava localStorage
 * Agora usa Supabase (PostgreSQL na nuvem) para persistência
 */

import { supabase, getCurrentUser } from './supabaseClient';

// ============================================
// CARREGAR PORTFÓLIO
// ============================================

/**
 * Carrega todos os ativos do portfólio do usuário atual
 * @returns {Promise<Array>} Array de ativos
 */
export async function loadPortfolio() {
  try {
    // Verificar se usuário está autenticado
    const user = await getCurrentUser();
    if (!user) {
      console.warn('⚠️ Usuário não autenticado. Retornando array vazio.');
      return [];
    }

    console.log('📥 Carregando portfólio do usuário:', user.id);

    // Buscar ativos do banco de dados
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', user.id)
      .order('symbol', { ascending: true });

    if (error) {
      console.error('❌ Erro ao carregar portfólio:', error);
      throw error;
    }

    console.log(`✅ Portfólio carregado: ${data.length} ativos`);
    return data || [];

  } catch (error) {
    console.error('❌ Erro ao carregar portfólio:', error);
    return [];
  }
}

// ============================================
// SALVAR/ATUALIZAR ATIVO
// ============================================

/**
 * Salva ou atualiza um ativo no portfólio
 * @param {Object} asset - Dados do ativo
 * @returns {Promise<Object>} Ativo salvo
 */
export async function saveAsset(asset) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('💾 Salvando ativo:', asset.symbol);

    // Preparar dados para salvar
    const assetData = {
      user_id: user.id,
      symbol: asset.symbol,
      name: asset.name,
      category: asset.category,
      quantity: parseFloat(asset.quantity) || 0,
      average_price: parseFloat(asset.average_price || asset.price) || 0,
      current_price: parseFloat(asset.current_price || asset.price) || 0,
    };

    // Upsert (insert ou update se já existir)
    const { data, error } = await supabase
      .from('portfolios')
      .upsert(assetData, {
        onConflict: 'user_id,symbol',
        returning: 'representation',
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao salvar ativo:', error);
      throw error;
    }

    console.log('✅ Ativo salvo com sucesso!');
    
    // Disparar evento de atualização (para compatibilidade com código antigo)
    window.dispatchEvent(new CustomEvent('portfolioUpdated', { detail: data }));
    
    return data;

  } catch (error) {
    console.error('❌ Erro ao salvar ativo:', error);
    throw error;
  }
}

// ============================================
// ATUALIZAR ATIVO EXISTENTE
// ============================================

/**
 * Atualiza um ativo existente
 * @param {string} symbol - Símbolo do ativo
 * @param {Object} updates - Campos a atualizar
 * @returns {Promise<Object>} Ativo atualizado
 */
export async function updateAsset(symbol, updates) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🔄 Atualizando ativo:', symbol, updates);

    // Atualizar no banco
    const { data, error } = await supabase
      .from('portfolios')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('symbol', symbol)
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao atualizar ativo:', error);
      throw error;
    }

    console.log('✅ Ativo atualizado com sucesso!');
    
    // Disparar evento de atualização
    window.dispatchEvent(new CustomEvent('portfolioUpdated', { detail: data }));
    
    return data;

  } catch (error) {
    console.error('❌ Erro ao atualizar ativo:', error);
    throw error;
  }
}

// ============================================
// ADICIONAR NOVO ATIVO
// ============================================

/**
 * Adiciona um novo ativo ao portfólio
 * @param {Object} asset - Dados do novo ativo
 * @returns {Promise<Object>} Ativo criado
 */
export async function addAsset(asset) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('➕ Adicionando novo ativo:', asset.symbol);

    // Verificar se já existe
    const existing = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .eq('symbol', asset.symbol)
      .single();

    if (existing.data) {
      throw new Error(`Ativo ${asset.symbol} já existe no portfólio`);
    }

    // Inserir novo ativo
    const { data, error } = await supabase
      .from('portfolios')
      .insert({
        user_id: user.id,
        symbol: asset.symbol,
        name: asset.name,
        category: asset.category,
        quantity: parseFloat(asset.quantity) || 0,
        average_price: parseFloat(asset.average_price || asset.price) || 0,
        current_price: parseFloat(asset.current_price || asset.price) || 0,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao adicionar ativo:', error);
      throw error;
    }

    console.log('✅ Ativo adicionado com sucesso!');
    
    // Disparar evento de atualização
    window.dispatchEvent(new CustomEvent('portfolioUpdated', { detail: data }));
    
    return data;

  } catch (error) {
    console.error('❌ Erro ao adicionar ativo:', error);
    throw error;
  }
}

// ============================================
// DELETAR ATIVO
// ============================================

/**
 * Remove um ativo do portfólio
 * @param {string} symbol - Símbolo do ativo a remover
 * @returns {Promise<boolean>} true se removido com sucesso
 */
export async function deleteAsset(symbol) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('🗑️ Removendo ativo:', symbol);

    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('user_id', user.id)
      .eq('symbol', symbol);

    if (error) {
      console.error('❌ Erro ao deletar ativo:', error);
      throw error;
    }

    console.log('✅ Ativo removido com sucesso!');
    
    // Disparar evento de atualização
    window.dispatchEvent(new CustomEvent('portfolioUpdated', { detail: { symbol, deleted: true } }));
    
    return true;

  } catch (error) {
    console.error('❌ Erro ao deletar ativo:', error);
    throw error;
  }
}

// ============================================
// REGISTRAR TRANSAÇÃO
// ============================================

/**
 * Registra uma transação (compra/venda)
 * @param {Object} transaction - Dados da transação
 * @returns {Promise<Object>} Transação registrada
 */
export async function recordTransaction(transaction) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    console.log('📝 Registrando transação:', transaction);

    // Buscar portfolio_id do ativo
    const { data: portfolio } = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .eq('symbol', transaction.symbol)
      .single();

    if (!portfolio) {
      throw new Error(`Ativo ${transaction.symbol} não encontrado no portfólio`);
    }

    // Inserir transação
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        portfolio_id: portfolio.id,
        user_id: user.id,
        type: transaction.type, // 'buy' ou 'sell'
        quantity: parseFloat(transaction.quantity),
        price: parseFloat(transaction.price),
        transaction_date: transaction.date || new Date().toISOString().split('T')[0],
        notes: transaction.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao registrar transação:', error);
      throw error;
    }

    console.log('✅ Transação registrada com sucesso!');
    return data;

  } catch (error) {
    console.error('❌ Erro ao registrar transação:', error);
    throw error;
  }
}

// ============================================
// BUSCAR TRANSAÇÕES
// ============================================

/**
 * Busca histórico de transações de um ativo
 * @param {string} symbol - Símbolo do ativo
 * @returns {Promise<Array>} Array de transações
 */
export async function getTransactions(symbol) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Buscar portfolio_id
    const { data: portfolio } = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .eq('symbol', symbol)
      .single();

    if (!portfolio) {
      return [];
    }

    // Buscar transações
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('portfolio_id', portfolio.id)
      .order('transaction_date', { ascending: false });

    if (error) {
      console.error('❌ Erro ao buscar transações:', error);
      throw error;
    }

    return data || [];

  } catch (error) {
    console.error('❌ Erro ao buscar transações:', error);
    return [];
  }
}

// ============================================
// REAL-TIME UPDATES (OPCIONAL)
// ============================================

/**
 * Escuta mudanças em tempo real no portfólio
 * @param {Function} callback - Função chamada quando há mudanças
 * @returns {Function} Função para cancelar a inscrição
 */
export function subscribeToPortfolioChanges(callback) {
  const subscription = supabase
    .channel('portfolio-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'portfolios',
      },
      (payload) => {
        console.log('🔔 Mudança detectada no portfólio:', payload);
        callback(payload);
      }
    )
    .subscribe();

  // Retornar função para cancelar inscrição
  return () => {
    subscription.unsubscribe();
  };
}

// ============================================
// MIGRAÇÃO DE DADOS (localStorage → Supabase)
// ============================================

/**
 * Migra dados do localStorage para Supabase
 * Útil para usuários que já têm dados salvos localmente
 * @returns {Promise<number>} Número de ativos migrados
 */
export async function migrateFromLocalStorage() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    // Buscar dados do localStorage
    const localData = localStorage.getItem('mcduck_portfolio_v2');
    if (!localData) {
      console.log('ℹ️ Nenhum dado encontrado no localStorage');
      return 0;
    }

    const assets = JSON.parse(localData);
    if (!Array.isArray(assets) || assets.length === 0) {
      console.log('ℹ️ localStorage vazio ou inválido');
      return 0;
    }

    console.log(`🔄 Migrando ${assets.length} ativos do localStorage para Supabase...`);

    let migrated = 0;
    for (const asset of assets) {
      try {
        await saveAsset(asset);
        migrated++;
      } catch (error) {
        console.error(`❌ Erro ao migrar ${asset.symbol}:`, error);
      }
    }

    console.log(`✅ Migração concluída: ${migrated}/${assets.length} ativos migrados`);
    
    // Opcional: Limpar localStorage após migração bem-sucedida
    // localStorage.removeItem('mcduck_portfolio_v2');
    
    return migrated;

  } catch (error) {
    console.error('❌ Erro na migração:', error);
    throw error;
  }
}

export default {
  loadPortfolio,
  saveAsset,
  updateAsset,
  addAsset,
  deleteAsset,
  recordTransaction,
  getTransactions,
  subscribeToPortfolioChanges,
  migrateFromLocalStorage,
};


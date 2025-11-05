import { supabase } from '../lib/supabaseClient';
import { saveAsset } from '../lib/supabasePortfolioManager';

/**
 * Migra dados do localStorage para o Supabase
 * Deve ser executado uma vez após o usuário fazer login
 */
export async function migrateLocalStorageToSupabase() {
  try {
    console.log('🔄 Iniciando migração localStorage → Supabase...');

    // Verificar se usuário está autenticado
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.log('⚠️ Usuário não autenticado, migração cancelada');
      return { success: false, error: 'Usuário não autenticado' };
    }

    // Verificar se já existe dados no Supabase
    const { data: existingAssets } = await supabase
      .from('portfolios')
      .select('id')
      .eq('user_id', user.id)
      .limit(1);

    if (existingAssets && existingAssets.length > 0) {
      console.log('⚠️ Já existem dados no Supabase, migração cancelada');
      return { success: false, error: 'Já existem dados no Supabase' };
    }

    // Carregar dados do localStorage
    const localData = localStorage.getItem('mcduck_portfolio_v2');
    
    if (!localData) {
      console.log('⚠️ Nenhum dado encontrado no localStorage');
      return { success: false, error: 'Nenhum dado no localStorage' };
    }

    const assets = JSON.parse(localData);
    
    if (!Array.isArray(assets) || assets.length === 0) {
      console.log('⚠️ Dados inválidos no localStorage');
      return { success: false, error: 'Dados inválidos no localStorage' };
    }

    console.log(`📦 Encontrados ${assets.length} ativos no localStorage`);

    // Migrar cada ativo
    let migrated = 0;
    let errors = 0;

    for (const asset of assets) {
      try {
        await saveAsset({
          symbol: asset.symbol,
          name: asset.name || asset.symbol,
          category: asset.category || 'other',
          quantity: asset.quantity || 0,
          average_price: asset.price || asset.average_price || 0,
          current_price: asset.price || asset.current_price || 0
        });
        
        migrated++;
        console.log(`✅ Migrado: ${asset.symbol}`);
      } catch (error) {
        errors++;
        console.error(`❌ Erro ao migrar ${asset.symbol}:`, error);
      }
    }

    console.log(`🎉 Migração concluída! ${migrated} ativos migrados, ${errors} erros`);

    // Fazer backup do localStorage
    localStorage.setItem('mcduck_portfolio_backup', localData);
    
    // Limpar localStorage (opcional - comentado por segurança)
    // localStorage.removeItem('mcduck_portfolio_v2');

    return {
      success: true,
      migrated,
      errors,
      total: assets.length
    };
  } catch (error) {
    console.error('❌ Erro na migração:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Verifica se há dados no localStorage que podem ser migrados
 */
export function hasLocalStorageData() {
  const localData = localStorage.getItem('mcduck_portfolio_v2');
  if (!localData) return false;
  
  try {
    const assets = JSON.parse(localData);
    return Array.isArray(assets) && assets.length > 0;
  } catch {
    return false;
  }
}

/**
 * Exibe prompt para o usuário migrar dados
 */
export async function promptMigration() {
  if (!hasLocalStorageData()) {
    return false;
  }

  const confirmed = window.confirm(
    'Encontramos dados salvos localmente no seu navegador.\n\n' +
    'Deseja migrar esses dados para a nuvem (Supabase)?\n\n' +
    'Isso permitirá acessar seus dados de qualquer dispositivo.'
  );

  if (confirmed) {
    const result = await migrateLocalStorageToSupabase();
    
    if (result.success) {
      alert(
        `✅ Migração concluída com sucesso!\n\n` +
        `${result.migrated} ativos foram migrados para a nuvem.\n\n` +
        `Seus dados agora estão seguros e acessíveis de qualquer lugar!`
      );
      return true;
    } else {
      alert(
        `❌ Erro na migração:\n\n${result.error}\n\n` +
        `Seus dados locais estão seguros e não foram alterados.`
      );
      return false;
    }
  }

  return false;
}


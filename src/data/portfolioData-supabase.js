import { getUserAssets } from './userAssets-supabase';

/**
 * Carrega classes de ativos do Supabase de forma dinâmica
 * @returns {Promise<Array>} Array de classes de ativos com totais calculados
 */
export async function getAssetClasses() {
  try {
    console.log('📊 portfolioData: Carregando asset classes do Supabase...');
    
    const assets = await getUserAssets();
    
    const assetClasses = [];
    
    // Ações Brasileiras
    if (assets.stocks && assets.stocks.length > 0) {
      const stocksTotal = assets.stocks.reduce((sum, asset) => 
        sum + (asset.quantity * asset.current_price), 0
      );
      
      assetClasses.push({
        id: 'stocks',
        title: 'Ações',
        value: stocksTotal.toFixed(2),
        percent: 0, // Será calculado depois
        change: '+2.5',
        changePercent: '+1.2',
        assets: assets.stocks.map(asset => ({
          ...asset,
          value: (asset.quantity * asset.current_price).toFixed(2),
          change: '+1.2',
          changePercent: '+0.8'
        }))
      });
    }
    
    // FIIs
    if (assets.fiis && assets.fiis.length > 0) {
      const fiisTotal = assets.fiis.reduce((sum, asset) => 
        sum + (asset.quantity * asset.current_price), 0
      );
      
      assetClasses.push({
        id: 'fiis',
        title: 'FIIs',
        value: fiisTotal.toFixed(2),
        percent: 0,
        change: '+1.8',
        changePercent: '+0.9',
        assets: assets.fiis.map(asset => ({
          ...asset,
          value: (asset.quantity * asset.current_price).toFixed(2),
          change: '+0.5',
          changePercent: '+0.3'
        }))
      });
    }
    
    // Internacional
    if (assets.international && assets.international.length > 0) {
      const intTotal = assets.international.reduce((sum, asset) => 
        sum + (asset.quantity * asset.current_price), 0
      );
      
      assetClasses.push({
        id: 'international',
        title: 'Internacional',
        value: intTotal.toFixed(2),
        percent: 0,
        change: '+3.2',
        changePercent: '+1.5',
        assets: assets.international.map(asset => ({
          ...asset,
          value: (asset.quantity * asset.current_price).toFixed(2),
          change: '+1.0',
          changePercent: '+0.6'
        }))
      });
    }
    
    // Calcular percentuais
    const totalValue = assetClasses.reduce((sum, ac) => sum + parseFloat(ac.value), 0);
    
    assetClasses.forEach(ac => {
      ac.percent = totalValue > 0 
        ? ((parseFloat(ac.value) / totalValue) * 100).toFixed(1)
        : '0.0';
    });
    
    console.log(`✅ portfolioData: ${assetClasses.length} classes carregadas, total: R$ ${totalValue.toFixed(2)}`);
    
    return assetClasses;
  } catch (error) {
    console.error('❌ portfolioData: Erro ao carregar asset classes:', error);
    return [];
  }
}

/**
 * Calcula patrimônio total do Supabase
 * @returns {Promise<string>} Valor total formatado
 */
export async function getTotalPatrimony() {
  try {
    const assetClasses = await getAssetClasses();
    const total = assetClasses.reduce((sum, ac) => sum + parseFloat(ac.value), 0);
    return total.toFixed(2);
  } catch (error) {
    console.error('❌ portfolioData: Erro ao calcular patrimônio:', error);
    return '0.00';
  }
}


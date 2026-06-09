/**
 * ============================================================================
 * CALCULADORA DE DESINVESTIMENTO INTELIGENTE
 * ============================================================================
 * 
 * Calcula a melhor sequência de vendas/resgates para minimizar impostos
 * e manter a estratégia da carteira.
 * 
 * Regras de priorização:
 * 1. Proventos de FIIs (isento)
 * 2. Ações até R$ 20k/mês (isento)
 * 3. Bitcoin até R$ 35k/mês (isento)
 * 4. CDB mais antigos >720 dias (15% IR)
 * 5. CDB 361-720 dias (17,5% IR)
 * 6. CDB 181-360 dias (20% IR)
 * 7. ETFs/BDRs (15% IR)
 * 8. FIIs (20% IR)
 * 9. CDB <180 dias (22,5% IR)
 * 
 * @version 1.0.0
 * @date 2025-10-17
 */

/**
 * Calcula a melhor estratégia de desinvestimento
 * @param {number} targetAmount - Valor necessário em R$
 * @param {Array} assets - Lista de ativos da carteira
 * @param {Object} options - Opções adicionais
 * @returns {Object} Estratégia de desinvestimento
 */
export const calculateSmartDivestment = (targetAmount, assets, options = {}) => {
  const {
    monthlyStockSales = 0, // Vendas de ações já realizadas no mês
    monthlyCryptoSales = 0, // Vendas de cripto já realizadas no mês
    availableDividends = 0 // Proventos disponíveis para uso
  } = options;

  const steps = [];
  let remaining = targetAmount;
  let totalTax = 0;

  // PASSO 1: Usar proventos de FIIs (isento)
  if (availableDividends > 0 && remaining > 0) {
    const amount = Math.min(remaining, availableDividends);
    steps.push({
      priority: 1,
      type: 'dividends',
      assetType: 'FII',
      description: 'Proventos de FIIs',
      amount: amount,
      tax: 0,
      taxRate: 0,
      reason: '✅ Isento de IR - Dividendos de FIIs são isentos para pessoa física',
      action: `Usar R$ ${amount.toFixed(2)} dos proventos disponíveis`
    });
    remaining -= amount;
  }

  // PASSO 2: Vender ações até R$ 20k/mês (isento)
  if (remaining > 0) {
    const stockLimit = 20000 - monthlyStockSales;
    if (stockLimit > 0) {
      const stockAssets = assets.filter(a => 
        (a.type === 'STOCK' || a.type === 'EQUITY') && 
        a.symbol && 
        !a.symbol.includes('34') // Excluir BDRs
      );
      
      const stocksToSell = selectAssetsToSell(stockAssets, Math.min(remaining, stockLimit));
      
      if (stocksToSell.length > 0) {
        const totalAmount = stocksToSell.reduce((sum, item) => sum + item.amount, 0);
        
        steps.push({
          priority: 2,
          type: 'stock_sale',
          assetType: 'STOCK',
          description: 'Venda de Ações',
          assets: stocksToSell,
          amount: totalAmount,
          tax: 0,
          taxRate: 0,
          reason: `✅ Isento de IR - Vendas de ações até R$ 20.000/mês são isentas (você já vendeu R$ ${monthlyStockSales.toFixed(2)} este mês)`,
          action: `Vender ações no valor de R$ ${totalAmount.toFixed(2)}`
        });
        
        remaining -= totalAmount;
      }
    }
  }

  // PASSO 3: Vender Bitcoin até R$ 35k/mês (isento)
  if (remaining > 0) {
    const cryptoLimit = 35000 - monthlyCryptoSales;
    if (cryptoLimit > 0) {
      const cryptoAssets = assets.filter(a => a.type === 'CRYPTO');
      
      const cryptoToSell = selectAssetsToSell(cryptoAssets, Math.min(remaining, cryptoLimit));
      
      if (cryptoToSell.length > 0) {
        const totalAmount = cryptoToSell.reduce((sum, item) => sum + item.amount, 0);
        
        steps.push({
          priority: 3,
          type: 'crypto_sale',
          assetType: 'CRYPTO',
          description: 'Venda de Criptomoedas',
          assets: cryptoToSell,
          amount: totalAmount,
          tax: 0,
          taxRate: 0,
          reason: `✅ Isento de IR - Vendas de cripto até R$ 35.000/mês são isentas (você já vendeu R$ ${monthlyCryptoSales.toFixed(2)} este mês)`,
          action: `Vender cripto no valor de R$ ${totalAmount.toFixed(2)}`
        });
        
        remaining -= totalAmount;
      }
    }
  }

  // PASSO 4: Resgatar CDB mais antigos (15% IR - >720 dias)
  if (remaining > 0) {
    // Como não temos daysHeld, assumimos que CDB tem >720 dias (alocação típica)
    const oldCDBs = assets.filter(a => 
      (a.type === 'FIXED_INCOME' || a.symbol === 'CDB') && 
      a.value > 0
    );
    
    const cdbsToRedeem = selectAssetsToSell(oldCDBs, remaining);
    
    if (cdbsToRedeem.length > 0) {
      const totalAmount = cdbsToRedeem.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = cdbsToRedeem.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.15;
      
      steps.push({
        priority: 4,
        type: 'cdb_redemption',
        assetType: 'FIXED_INCOME',
        description: 'Resgate de CDB (>720 dias)',
        assets: cdbsToRedeem,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 15,
        reason: '⚡ Menor IR possível em renda fixa - CDB com mais de 720 dias tem alíquota de 15%',
        action: `Resgatar CDB antigo no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  // PASSO 5: Resgatar CDB 361-720 dias (17,5% IR)
  // Pulamos este passo pois não temos dados de daysHeld
  if (false) {
    const midCDBs = [];
    
    const cdbsToRedeem = selectAssetsToSell(midCDBs, remaining);
    
    if (cdbsToRedeem.length > 0) {
      const totalAmount = cdbsToRedeem.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = cdbsToRedeem.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.175;
      
      steps.push({
        priority: 5,
        type: 'cdb_redemption',
        assetType: 'FIXED_INCOME',
        description: 'Resgate de CDB (361-720 dias)',
        assets: cdbsToRedeem,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 17.5,
        reason: '⚡ IR intermediário - CDB entre 361 e 720 dias tem alíquota de 17,5%',
        action: `Resgatar CDB no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  // PASSO 6: Resgatar CDB 181-360 dias (20% IR)
  // Pulamos este passo pois não temos dados de daysHeld
  if (false) {
    const newCDBs = [];
    
    const cdbsToRedeem = selectAssetsToSell(newCDBs, remaining);
    
    if (cdbsToRedeem.length > 0) {
      const totalAmount = cdbsToRedeem.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = cdbsToRedeem.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.20;
      
      steps.push({
        priority: 6,
        type: 'cdb_redemption',
        assetType: 'FIXED_INCOME',
        description: 'Resgate de CDB (181-360 dias)',
        assets: cdbsToRedeem,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 20,
        reason: '⚠️ IR moderado - CDB entre 181 e 360 dias tem alíquota de 20%',
        action: `Resgatar CDB no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  // PASSO 7: Vender ETFs/BDRs (15% IR)
  if (remaining > 0) {
    const etfBdrAssets = assets.filter(a => 
      a.type === 'ETF' || 
      (a.type === 'STOCK' && a.symbol && a.symbol.includes('34')) // BDRs
    );
    
    const assetsToSell = selectAssetsToSell(etfBdrAssets, remaining);
    
    if (assetsToSell.length > 0) {
      const totalAmount = assetsToSell.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = assetsToSell.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.15;
      
      steps.push({
        priority: 7,
        type: 'etf_bdr_sale',
        assetType: 'ETF/BDR',
        description: 'Venda de ETFs/BDRs',
        assets: assetsToSell,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 15,
        reason: '⚠️ Sem isenção - ETFs e BDRs não têm isenção dos R$ 20k, IR de 15% sobre o ganho',
        action: `Vender ETFs/BDRs no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  // PASSO 8: Vender FIIs (20% IR)
  if (remaining > 0) {
    const fiiAssets = assets.filter(a => a.type === 'FII');
    
    const fiisToSell = selectAssetsToSell(fiiAssets, remaining);
    
    if (fiisToSell.length > 0) {
      const totalAmount = fiisToSell.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = fiisToSell.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.20;
      
      steps.push({
        priority: 8,
        type: 'fii_sale',
        assetType: 'FII',
        description: 'Venda de FIIs',
        assets: fiisToSell,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 20,
        reason: '⚠️ IR alto - FIIs têm alíquota de 20% sobre o ganho na venda de cotas',
        action: `Vender FIIs no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  // PASSO 9: Resgatar CDB <180 dias (22,5% IR) - último recurso
  // Pulamos este passo pois não temos dados de daysHeld
  if (false) {
    const veryNewCDBs = [];
    
    const cdbsToRedeem = selectAssetsToSell(veryNewCDBs, remaining);
    
    if (cdbsToRedeem.length > 0) {
      const totalAmount = cdbsToRedeem.reduce((sum, item) => sum + item.amount, 0);
      const totalGain = cdbsToRedeem.reduce((sum, item) => sum + (item.gain || 0), 0);
      const tax = totalGain * 0.225;
      
      steps.push({
        priority: 9,
        type: 'cdb_redemption',
        assetType: 'FIXED_INCOME',
        description: 'Resgate de CDB (<180 dias)',
        assets: cdbsToRedeem,
        amount: totalAmount,
        gain: totalGain,
        tax: tax,
        taxRate: 22.5,
        reason: '🔴 IR máximo - CDB com menos de 180 dias tem alíquota de 22,5% (último recurso)',
        action: `Resgatar CDB recente no valor de R$ ${totalAmount.toFixed(2)} (IR: R$ ${tax.toFixed(2)})`
      });
      
      totalTax += tax;
      remaining -= totalAmount;
    }
  }

  const totalRaised = steps.reduce((sum, step) => sum + step.amount, 0);
  const effectiveTaxRate = totalRaised > 0 ? (totalTax / totalRaised) * 100 : 0;

  return {
    targetAmount,
    totalRaised,
    remaining: Math.max(0, remaining),
    totalTax,
    effectiveTaxRate,
    netAmount: totalRaised - totalTax,
    steps,
    success: remaining <= 0,
    warning: remaining > 0 ? `Não foi possível levantar o valor total. Faltam R$ ${remaining.toFixed(2)}` : null
  };
};

/**
 * Seleciona ativos para vender até atingir o valor alvo
 * Prioriza ativos com menor peso na carteira para manter diversificação
 */
const selectAssetsToSell = (assets, targetAmount) => {
  if (!assets || assets.length === 0) return [];
  
  // Ordenar por peso na carteira (menor primeiro) para manter diversificação
  const sorted = [...assets].sort((a, b) => {
    const weightA = a.portfolioWeight || 0;
    const weightB = b.portfolioWeight || 0;
    return weightA - weightB;
  });
  
  const selected = [];
  let accumulated = 0;
  
  for (const asset of sorted) {
    if (accumulated >= targetAmount) break;
    
    const needed = targetAmount - accumulated;
    const available = asset.value || 0;
    const amount = Math.min(needed, available);
    
    if (amount > 0) {
      selected.push({
        symbol: asset.symbol,
        name: asset.name,
        amount: amount,
        quantity: asset.quantity ? (amount / available) * asset.quantity : 0,
        gain: calculateGain(asset, amount),
        currentWeight: asset.portfolioWeight || 0
      });
      
      accumulated += amount;
    }
  }
  
  return selected;
};

/**
 * Calcula ganho de capital estimado
 */
const calculateGain = (asset, amount) => {
  // Se temos averagePrice e price, calculamos o ganho real
  if (asset.averagePrice && asset.price) {
    const gainPercentage = ((asset.price - asset.averagePrice) / asset.averagePrice);
    const estimatedGain = amount * gainPercentage;
    return Math.max(0, estimatedGain);
  }
  
  // Se não temos, estimamos 20% de ganho (conservador)
  return amount * 0.20;
};

export default {
  calculateSmartDivestment
};


import React from 'react';
import { assetClasses } from '../../data/portfolioData';
import { formatCurrency, formatPercent } from '../../lib/formatters';

/**
 * Componente de visualização de insights do dashboard
 */
const InsightsView = () => {
  // Calculando insights
  const totalValue = assetClasses.reduce((sum, assetClass) => sum + assetClass.value, 0);
  
  // Verificando se há desbalanceamento na carteira
  const idealDistribution = {
    stocks: 35, // 35% em ações
    reits: 15, // 15% em fundos imobiliários
    international: 10, // 10% em ativos internacionais
    fixedIncome: 40, // 40% em renda fixa
  };
  
  const currentDistribution = {};
  assetClasses.forEach(assetClass => {
    currentDistribution[assetClass.id] = assetClass.percent;
  });
  
  const imbalances = [];
  
  Object.keys(idealDistribution).forEach(assetId => {
    const ideal = idealDistribution[assetId];
    const current = currentDistribution[assetId] || 0;
    const difference = current - ideal;
    
    if (Math.abs(difference) > 5) { // Se a diferença for maior que 5%
      const assetClass = assetClasses.find(ac => ac.id === assetId);
      imbalances.push({
        id: assetId,
        name: assetClass ? assetClass.title : assetId,
        ideal,
        current,
        difference
      });
    }
  });
  
  // Calculando concentração em ativos individuais
  const allAssets = assetClasses.flatMap(assetClass => 
    assetClass.assets.map(asset => ({
      ...asset,
      assetClass: assetClass.title,
      percentOfTotal: (asset.value / totalValue) * 100
    }))
  );
  
  const highConcentrationAssets = allAssets.filter(asset => asset.percentOfTotal > 5);
  
  return (
    <div>
      <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Insights da Carteira</h3>
        
        <div className="space-y-4">
          {/* Desbalanceamento */}
          {imbalances.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-medium text-amber-800 mb-2">⚠️ Desbalanceamento Detectado</h4>
              <p className="text-sm text-gray-700 mb-3">
                Sua carteira está desbalanceada em relação à alocação ideal. Considere rebalancear os seguintes ativos:
              </p>
              <div className="space-y-2">
                {imbalances.map(imbalance => (
                  <div key={imbalance.id} className="flex justify-between items-center p-2 bg-white rounded border border-amber-100">
                    <div>
                      <div className="font-medium">{imbalance.name}</div>
                      <div className="text-xs text-gray-500">
                        Atual: {imbalance.current.toFixed(1)}% | Ideal: {imbalance.ideal}%
                      </div>
                    </div>
                    <div className={imbalance.difference > 0 ? "text-amber-600 font-medium" : "text-blue-600 font-medium"}>
                      {imbalance.difference > 0 ? '+' : ''}{imbalance.difference.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Concentração */}
          {highConcentrationAssets.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">ℹ️ Alta Concentração</h4>
              <p className="text-sm text-gray-700 mb-3">
                Os seguintes ativos representam mais de 5% do seu patrimônio total:
              </p>
              <div className="space-y-2">
                {highConcentrationAssets.map(asset => (
                  <div key={asset.symbol} className="flex justify-between items-center p-2 bg-white rounded border border-blue-100">
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-xs text-gray-500">{asset.assetClass}</div>
                    </div>
                    <div>
                      <div className="text-blue-600 font-medium">
                        {formatCurrency(asset.value)}
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {asset.percentOfTotal.toFixed(1)}% do total
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Recomendações */}
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">💡 Recomendações</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
              <li>Considere diversificar mais seus investimentos em ativos internacionais</li>
              <li>Avalie a possibilidade de rebalancear sua carteira para se aproximar da alocação ideal</li>
              <li>Monitore ativos com alta concentração para evitar riscos excessivos</li>
              <li>Verifique se seus investimentos em renda fixa estão alinhados com seus objetivos de longo prazo</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-5 shadow-sm">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Oportunidades de Investimento</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Tesouro Direto</h4>
            <p className="text-sm text-gray-700 mb-2">
              O Tesouro IPCA+ está oferecendo rentabilidade de IPCA + 5.5% ao ano, uma boa oportunidade para proteger seu patrimônio da inflação.
            </p>
            <div className="text-sm text-blue-600 font-medium">
              Rendimento potencial: IPCA + 5.5% a.a.
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Fundos Imobiliários</h4>
            <p className="text-sm text-gray-700 mb-2">
              O setor de FIIs logísticos está com bom potencial de valorização devido ao crescimento do e-commerce.
            </p>
            <div className="text-sm text-blue-600 font-medium">
              Dividend yield médio: 7.8% a.a.
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">ETFs Internacionais</h4>
            <p className="text-sm text-gray-700 mb-2">
              Aumentar exposição internacional pode trazer mais diversificação à sua carteira.
            </p>
            <div className="text-sm text-blue-600 font-medium">
              Sugestão: ETFs que seguem índices globais
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;

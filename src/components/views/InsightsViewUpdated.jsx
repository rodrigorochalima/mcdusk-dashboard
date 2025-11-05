import React from 'react';
import { assetClasses } from '../../data/portfolioData';
import { formatCurrency, formatPercent } from '../../lib/formatters';
import RebalanceSimulator from '../insights/RebalanceSimulator';
import SnowballCalculator from '../insights/SnowballCalculator';

/**
 * Componente de visualização de insights do dashboard
 * Versão atualizada que inclui o simulador de rebalanceamento ARCA e a calculadora bola de neve
 */
const InsightsViewUpdated = () => {
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
      {/* Simulador de Rebalanceamento ARCA */}
      <RebalanceSimulator />
      
      {/* Calculadora Bola de Neve */}
      <SnowballCalculator />
      
      <div className="card">
        <div className="card-title">
          <span className="card-title-icon">💡</span>
          <span>Insights da Carteira</span>
        </div>
        
        <div className="insights-container">
          {/* Desbalanceamento */}
          {imbalances.length > 0 && (
            <div className="insight-card insight-warning">
              <div className="insight-title">
                <span className="insight-title-icon">⚠️</span>
                <span>Desbalanceamento Detectado</span>
              </div>
              <div className="insight-content">
                <p>
                  Sua carteira está desbalanceada em relação à alocação ideal. Considere rebalancear os seguintes ativos:
                </p>
                <div className="imbalances-list">
                  {imbalances.map(imbalance => (
                    <div key={imbalance.id} className="imbalance-item">
                      <div className="imbalance-name">{imbalance.name}</div>
                      <div className="imbalance-values">
                        Atual: {imbalance.current.toFixed(1)}% | Ideal: {imbalance.ideal}%
                      </div>
                      <div className={`imbalance-difference ${imbalance.difference > 0 ? 'positive' : 'negative'}`}>
                        {imbalance.difference > 0 ? '+' : ''}{imbalance.difference.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Concentração */}
          {highConcentrationAssets.length > 0 && (
            <div className="insight-card insight-info">
              <div className="insight-title">
                <span className="insight-title-icon">ℹ️</span>
                <span>Alta Concentração</span>
              </div>
              <div className="insight-content">
                <p>
                  Os seguintes ativos representam mais de 5% do seu patrimônio total:
                </p>
                <div className="concentration-list">
                  {highConcentrationAssets.map(asset => (
                    <div key={asset.symbol} className="concentration-item">
                      <div className="concentration-asset">
                        <div className="asset-symbol">{asset.symbol}</div>
                        <div className="asset-class">{asset.assetClass}</div>
                      </div>
                      <div className="concentration-value">
                        <div className="asset-value">{formatCurrency(asset.value)}</div>
                        <div className="asset-percent">{asset.percentOfTotal.toFixed(1)}% do total</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Recomendações */}
          <div className="insight-card insight-info">
            <div className="insight-title">
              <span className="insight-title-icon">💡</span>
              <span>Recomendações</span>
            </div>
            <div className="insight-content">
              <ul className="recommendations-list">
                <li>Considere diversificar mais seus investimentos em ativos internacionais</li>
                <li>Avalie a possibilidade de rebalancear sua carteira para se aproximar da alocação ideal</li>
                <li>Monitore ativos com alta concentração para evitar riscos excessivos</li>
                <li>Verifique se seus investimentos em renda fixa estão alinhados com seus objetivos de longo prazo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-title">
          <span className="card-title-icon">🔍</span>
          <span>Oportunidades de Investimento</span>
        </div>
        
        <div className="opportunities-container">
          <div className="opportunity-item">
            <div className="opportunity-title">Tesouro Direto</div>
            <div className="opportunity-description">
              O Tesouro IPCA+ está oferecendo rentabilidade de IPCA + 5.5% ao ano, uma boa oportunidade para proteger seu patrimônio da inflação.
            </div>
            <div className="opportunity-highlight">
              Rendimento potencial: IPCA + 5.5% a.a.
            </div>
          </div>
          
          <div className="opportunity-item">
            <div className="opportunity-title">Fundos Imobiliários</div>
            <div className="opportunity-description">
              O setor de FIIs logísticos está com bom potencial de valorização devido ao crescimento do e-commerce.
            </div>
            <div className="opportunity-highlight">
              Dividend yield médio: 7.8% a.a.
            </div>
          </div>
          
          <div className="opportunity-item">
            <div className="opportunity-title">ETFs Internacionais</div>
            <div className="opportunity-description">
              Aumentar exposição internacional pode trazer mais diversificação à sua carteira.
            </div>
            <div className="opportunity-highlight">
              Sugestão: ETFs que seguem índices globais
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsViewUpdated;

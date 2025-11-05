import React from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import AssetCard from './AssetCard';

/**
 * Componente para exibir uma classe de ativos
 * Versão simplificada para resolver o problema da tela branca
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.assetClass - Dados da classe de ativos
 */
const AssetClassCard = ({ assetClass }) => {
  // Verificar se change e changePercent são números válidos
  const isValidChange = assetClass.change !== undefined && 
                       assetClass.change !== null && 
                       !isNaN(assetClass.change);
  
  const isValidPercent = assetClass.changePercent !== undefined && 
                        assetClass.changePercent !== null && 
                        !isNaN(assetClass.changePercent);
  
  const isPositive = isValidChange ? assetClass.change >= 0 : false;
  
  // Formatar os valores ou usar valores padrão
  const formattedChange = isValidChange 
    ? formatCurrency(assetClass.change) 
    : 'R$ 0,00';
  
  const formattedPercent = isValidPercent 
    ? formatPercentage(assetClass.changePercent) 
    : '0,0%';
  
  return (
    <div className="card">
      <div className="asset-class">
        <div className="asset-class-header">
          <div className="asset-class-title">{assetClass.title}</div>
          <div className="asset-class-value">{formatCurrency(assetClass.value)}</div>
        </div>
        <div className="asset-class-info">
          <div>{formatPercentage(assetClass.percent)} • {assetClass.assets ? assetClass.assets.length : 0} ativos</div>
          <div className={`asset-class-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}{formattedChange} ({formattedPercent})
          </div>
        </div>
        {assetClass.aboveTarget !== undefined && (
          <div className={`badge ${assetClass.aboveTarget ? 'badge-success' : 'badge-warning'}`}>
            {assetClass.aboveTarget ? '⬆️ Acima da meta' : '⬇️ Abaixo da meta'}
          </div>
        )}
        
        {assetClass.assets && assetClass.assets.map(asset => (
          <AssetCard 
            key={asset.symbol} 
            asset={asset} 
          />
        ))}
      </div>
    </div>
  );
};

export default AssetClassCard;

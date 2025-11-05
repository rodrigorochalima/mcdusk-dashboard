import React from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import DiagramaCerradoScore from './DiagramaCerradoScore';
import FundamentalistAnalysis from './FundamentalistAnalysis';
import RentabilityChart from '../charts/RentabilityChart';

/**
 * Componente para exibir os detalhes de um ativo
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.asset - Dados do ativo
 * @param {Array} props.portfolioHistory - Histórico de rentabilidade da carteira
 */
const AssetDetailsCard = ({ asset, portfolioHistory }) => {
  // Verificar se temos os dados fundamentalistas
  const fundamentals = asset.fundamentals || {};
  const bestIndicators = fundamentals.bestIndicators || [];
  const worstIndicators = fundamentals.worstIndicators || [];
  const diagramaCerradoScore = fundamentals.diagramaCerradoScore || 5.0;
  
  return (
    <div className="card asset-details-card">
      <div className="card-title">
        <span className="card-title-icon">📄</span>
        <span>{asset.name} ({asset.symbol})</span>
      </div>

      <div className="asset-details-summary">
        <div className="value-large">{formatCurrency(asset.value)}</div>
        <div className={`value-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
          {asset.change >= 0 ? '+' : ''}{formatPercentage(asset.change)}
        </div>
      </div>

      {/* Diagrama do Cerrado Score */}
      <div className="asset-details-section">
        <h4 className="section-title">Diagrama do Cerrado</h4>
        <DiagramaCerradoScore score={diagramaCerradoScore} />
      </div>
      
      {/* Análise Fundamentalista */}
      <div className="asset-details-section">
        <h4 className="section-title">Análise Fundamentalista</h4>
        <div className="fundamentalist-analysis">
          <div className="best-indicators">
            <h5>Melhores Indicadores</h5>
            <ul>
              {bestIndicators.map((indicator, index) => (
                <li key={`best-${index}`}>
                  <span className="indicator-name">{indicator.name}:</span>
                  <span className="indicator-value positive">{indicator.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="worst-indicators">
            <h5>Piores Indicadores</h5>
            <ul>
              {worstIndicators.map((indicator, index) => (
                <li key={`worst-${index}`}>
                  <span className="indicator-name">{indicator.name}:</span>
                  <span className="indicator-value negative">{indicator.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Gráfico de Rentabilidade */}
      <div className="asset-details-section">
        <h4 className="section-title">Rentabilidade</h4>
        <RentabilityChart 
          assetHistory={portfolioHistory} 
          portfolioHistory={portfolioHistory}
          assetSymbol={asset.symbol}
        />
      </div>
    </div>
  );
};

export default AssetDetailsCard;

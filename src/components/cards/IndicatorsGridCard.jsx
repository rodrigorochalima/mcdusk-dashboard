import React from 'react';
import { economicIndices } from '../../data/portfolioData-updated';

/**
 * Componente para exibir os indicadores econômicos em um grid
 * Versão completamente refeita para resolver problemas de visualização
 * @param {Object} props - Propriedades do componente
 * @param {string} props.selectedIndex - Índice selecionado atualmente
 * @param {Function} props.onIndexChange - Função chamada quando o índice é alterado
 */
const IndicatorsGridCard = ({ selectedIndex, onIndexChange }) => {
  // Função para selecionar um índice
  const handleIndexClick = (indexId) => {
    if (onIndexChange) {
      onIndexChange(indexId);
    }
  };
  
  // Organizar indicadores em duas linhas para melhor visualização
  // Primeira linha: CDI, IBOV, SELIC
  // Segunda linha: FII, IAFD, IPCA
  const firstRowIndices = economicIndices.slice(0, 3);
  const secondRowIndices = economicIndices.slice(3);
  
  return (
    <div className="indicators-container">
      {/* Primeira linha de indicadores */}
      <div className="indicators-row first-row">
        {firstRowIndices.map((indicator) => (
          <div 
            key={indicator.id}
            className={`indicator-item ${selectedIndex && selectedIndex.toLowerCase() === indicator.id.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleIndexClick(indicator.id.toUpperCase())}
          >
            <div className="indicator-content" style={{ backgroundColor: indicator.color }}>
              <div className="indicator-name">{indicator.id}</div>
              <div className="indicator-value">{indicator.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Segunda linha de indicadores */}
      <div className="indicators-row second-row">
        {secondRowIndices.map((indicator) => (
          <div 
            key={indicator.id}
            className={`indicator-item ${selectedIndex && selectedIndex.toLowerCase() === indicator.id.toLowerCase() ? 'active' : ''}`}
            onClick={() => handleIndexClick(indicator.id.toUpperCase())}
          >
            <div className="indicator-content" style={{ backgroundColor: indicator.color }}>
              <div className="indicator-name">{indicator.id}</div>
              <div className="indicator-value">{indicator.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicatorsGridCard;

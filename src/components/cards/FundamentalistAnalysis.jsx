import React from 'react';

/**
 * Componente para exibir a análise fundamentalista de um ativo
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.analysis - Objeto com os melhores e piores indicadores
 * @param {Array} props.analysis.best - Array de objetos com os melhores indicadores
 * @param {Array} props.analysis.worst - Array de objetos com os piores indicadores
 */
const FundamentalistAnalysis = ({ analysis }) => {
  return (
    <div className="fundamentalist-analysis">
      <div className="fundamentalist-column fundamentalist-column-best">
        <div className="fundamentalist-title">Melhores Indicadores</div>
        <ul className="fundamentalist-list">
          {analysis.best.map(indicator => (
            <li key={indicator.indicator} className="fundamentalist-item">
              <span>{indicator.indicator}:</span>
              <span>{indicator.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="fundamentalist-column fundamentalist-column-worst">
        <div className="fundamentalist-title">Piores Indicadores</div>
        <ul className="fundamentalist-list">
          {analysis.worst.map(indicator => (
            <li key={indicator.indicator} className="fundamentalist-item">
              <span>{indicator.indicator}:</span>
              <span>{indicator.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FundamentalistAnalysis;

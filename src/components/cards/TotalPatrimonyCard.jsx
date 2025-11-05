import React from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

/**
 * Componente para exibir o patrimônio total
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.patrimony - Dados do patrimônio total
 * @param {number} props.patrimony.value - Valor total do patrimônio
 * @param {number} props.patrimony.change - Variação absoluta do patrimônio
 * @param {number} props.patrimony.changePercent - Variação percentual do patrimônio
 */
const TotalPatrimonyCard = ({ patrimony }) => {
  const isPositive = patrimony.change >= 0;
  
  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">💰</span>
        <span>Patrimônio Total</span>
      </div>
      <div className="value-large">{formatCurrency(patrimony.value)}</div>
      <div className={`value-small ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{formatCurrency(patrimony.change)} ({formatPercentage(patrimony.changePercent)})
      </div>
    </div>
  );
};

export default TotalPatrimonyCard;

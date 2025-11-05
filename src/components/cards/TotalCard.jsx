import React from 'react';
import { formatCurrency, formatPercent } from '../../lib/formatters';

/**
 * Componente de card para exibição do patrimônio total
 * @param {Object} props - Propriedades do componente
 * @param {number} props.total - Valor total do patrimônio
 * @param {number} props.change - Variação do patrimônio
 * @param {number} props.changePercent - Percentual de variação do patrimônio
 */
const TotalCard = ({ total, change, changePercent }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-4">
      <div className="flex flex-col items-center">
        <div className="text-gray-600 mb-1 flex items-center">
          <span className="mr-1">💰</span>
          <span>Patrimônio Total</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {formatCurrency(total)}
        </div>
        <div className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{formatCurrency(change)} ({formatPercent(changePercent)})
        </div>
      </div>
    </div>
  );
};

export default TotalCard;

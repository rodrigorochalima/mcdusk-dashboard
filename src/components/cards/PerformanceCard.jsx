import React from 'react';
import { formatPercent } from '../../lib/formatters';

/**
 * Componente de card para exibição de desempenho
 * @param {Object} props - Propriedades do componente
 * @param {string} props.benchmark - Nome do benchmark
 * @param {number} props.performance - Desempenho em percentual
 */
const PerformanceCard = ({ benchmark, performance }) => {
  const isPositive = performance >= 0;
  
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-gray-600 mr-2">📊</span>
          <h3 className="text-lg font-medium text-gray-800">Performance</h3>
        </div>
        
        <div className="text-sm text-gray-500">
          vs {benchmark}
        </div>
      </div>
      
      <div className={`text-xl font-bold mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {formatPercent(performance)}
        <span className="ml-1">{isPositive ? '▲' : '▼'}</span>
      </div>
    </div>
  );
};

export default PerformanceCard;

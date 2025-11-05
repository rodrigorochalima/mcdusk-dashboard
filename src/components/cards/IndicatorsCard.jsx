import React from 'react';

/**
 * Componente de card para exibição de indicadores econômicos
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.indicators - Array de objetos de indicadores com {name, value, color}
 */
const IndicatorsCard = ({ indicators }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm mb-4">
      <div className="flex items-center mb-3">
        <span className="text-gray-600 mr-2">📈</span>
        <h3 className="text-lg font-medium text-gray-800">Indicadores</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {indicators.map((indicator) => (
          <div 
            key={indicator.name}
            className="flex-1 min-w-[100px] bg-gray-50 rounded-md p-3 text-center"
            style={{ backgroundColor: indicator.bgColor || '#f9fafb' }}
          >
            <div className="text-xs text-gray-500 uppercase mb-1">
              {indicator.name}
            </div>
            <div className="text-lg font-medium" style={{ color: indicator.color || 'inherit' }}>
              {indicator.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndicatorsCard;

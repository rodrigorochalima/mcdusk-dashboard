import React, { useState } from 'react';
import { formatPercentage } from '../../lib/formatters';
import { patrimonyHistory } from '../../data/portfolioData-updated';
import PerformanceChart from '../charts/PerformanceChart';

// Paleta de cores consistentes
const INDICATOR_COLORS = {
  CDI: '#FF9900',
  IBOV: '#22A06B',
  SELIC: '#8E44AD',
  FII: '#A0522D',
  IAFD: '#3498DB',
  IPCA: '#D35400',
};

const PerformanceChartCard = () => {
  const [timeRange, setTimeRange] = useState('1y');
  const [selectedIndicators, setSelectedIndicators] = useState(['CDI']);

  const indicadores = [
    { id: 'CDI', label: 'CDI', valor: 11.25 },
    { id: 'IBOV', label: 'IBOV', valor: 4.4 },
    { id: 'SELIC', label: 'SELIC', valor: 10.75 },
    { id: 'FII', label: 'FII', valor: 5.2 },
    { id: 'IAFD', label: 'IAFD', valor: 6.8 },
    { id: 'IPCA', label: 'IPCA', valor: 4.23 },
  ];

  const filteredData = () => {
    // Lógica de filtro de dados (pode ser mantida como antes)
    return patrimonyHistory;
  };

  const toggleIndicator = (indicatorId) => {
    setSelectedIndicators(prev => 
      prev.includes(indicatorId) 
        ? prev.filter(id => id !== indicatorId)
        : [...prev, indicatorId]
    );
  };

  return (
    <div className="card performance-card">
      <div className="card-header">
        <h2>Performance da Carteira</h2>
        <div className="time-range-selector">
          {/* Botões de período */}
        </div>
      </div>
      <div className="card-content">
        <div className="chart-container" style={{ height: '350px' }}>
          <PerformanceChart 
            data={filteredData()} 
            selectedIndicators={selectedIndicators}
          />
        </div>
        <div className="indicators-selector">
          {indicadores.map(indicador => (
            <div 
              key={indicador.id}
              className={`indicator-chip ${selectedIndicators.includes(indicador.id) ? 'active' : ''}`}
              onClick={() => toggleIndicator(indicador.id)}
              style={{
                '--indicator-color': INDICATOR_COLORS[indicador.id],
              }}
            >
              {indicador.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceChartCard;


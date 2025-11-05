import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { formatPercentage } from '../../lib/formatters';

// Paleta de cores inspirada no Kinvo
const KINVO_COLORS = {
  patrimonio: '#0052FF',
  cdi: '#FF9900',
  ibov: '#22A06B',
  selic: '#8E44AD',
  fii: '#A0522D',
  iafd: '#3498DB',
  ipca: '#D35400',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <p className="tooltip-label">{label}</p>
        {payload.map(pld => (
          <div key={pld.dataKey} style={{ color: pld.stroke || pld.fill }}>
            {pld.name}: {formatPercentage(pld.value)}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Função para ordenar os meses cronologicamente
const sortMonths = (data) => {
  // Mapeamento de meses para valores numéricos para ordenação
  const monthOrder = {
    'Out/24': 1, 'Nov/24': 2, 'Dez/24': 3,
    'Jan/25': 4, 'Fev/25': 5, 'Mar/25': 6,
    'Abr/25': 7, 'Mai/25': 8, 'Jun/25': 9,
    'Jul/25': 10, 'Ago/25': 11, 'Set/25': 12, 'Out/25': 13
  };

  return [...data].sort((a, b) => {
    return monthOrder[a.month] - monthOrder[b.month];
  });
};

const PerformanceChart = ({ data, selectedIndicators = [] }) => {
  // Ordenar os dados cronologicamente
  const sortedData = sortMonths(data);
  
  const chartData = sortedData.map(item => ({
    month: item.month,
    patrimonio: item.valuePercent || 0,
    cdi: item.cdi || 0,
    ibov: item.ibov || 0,
    selic: item.selic || 0,
    fii: item.fii || 0,
    iafd: item.iafd || 0,
    ipca: item.ipca || 0,
  }));

  const allValues = chartData.flatMap(item => [
    item.patrimonio,
    ...selectedIndicators.map(ind => item[ind.toLowerCase()])
  ]).filter(v => v !== undefined && v !== null);

  const yDomain = [
    Math.floor(Math.min(...allValues, 0) - 1),
    Math.ceil(Math.max(...allValues, 0) + 1),
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={chartData}
        margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={KINVO_COLORS.patrimonio} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={KINVO_COLORS.patrimonio} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#666' }}
          dy={10}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false} 
          tickFormatter={(value) => `${value.toFixed(0)}%`}
          domain={yDomain}
          tick={{ fontSize: 12, fill: '#666' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          verticalAlign="top" 
          align="right" 
          iconType="circle"
          wrapperStyle={{ top: -10, right: 0 }}
        />
        <ReferenceLine y={0} stroke="#ccc" />

        <Area 
          type="monotone"
          dataKey="patrimonio"
          name="Patrimônio"
          stroke={KINVO_COLORS.patrimonio}
          fillOpacity={1}
          fill="url(#colorPatrimonio)"
          strokeWidth={2.5}
          activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
          dot={false}
        />

        {selectedIndicators.map(indicator => (
          <Line
            key={indicator}
            type="monotone"
            dataKey={indicator.toLowerCase()}
            name={indicator}
            stroke={KINVO_COLORS[indicator.toLowerCase()]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '../../lib/formatters';
import { patrimonyHistory } from '../../data/portfolioData-updated';

/**
 * Componente para exibir o gráfico de rentabilidade de um ativo vs. carteira
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.assetHistory - Histórico de rentabilidade do ativo
 * @param {Array} props.portfolioHistory - Histórico de rentabilidade da carteira
 * @param {string} props.assetSymbol - Símbolo do ativo
 */
const RentabilityChart = ({ assetHistory, portfolioHistory, assetSymbol }) => {
  // Função para encontrar o valor da carteira correspondente ao mês do ativo
  const getPortfolioValue = (month) => {
    const portfolioEntry = portfolioHistory.find(p => p.month.startsWith(month));
    return portfolioEntry ? portfolioEntry.valuePercent : null;
  };

  // Função para calcular a variação percentual do ativo
  const calculateAssetPercentChange = (history) => {
    if (!history || history.length === 0) return [];
    
    const baseValue = history[0].value;
    return history.map(item => ({
      ...item,
      percentChange: ((item.value - baseValue) / baseValue) * 100
    }));
  };

  // Preparar dados para o gráfico com valores percentuais
  const assetHistoryWithPercent = calculateAssetPercentChange(assetHistory);
  
  const chartData = assetHistoryWithPercent.map(item => ({
    month: item.month,
    [assetSymbol]: item.percentChange,
    Carteira: getPortfolioValue(item.month)
  }));

  // Formatar o tooltip para mostrar valores percentuais
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatPercentage(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="card-title">
        <span className="card-title-icon">📈</span>
        <span>Rentabilidade vs. Carteira</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value.toFixed(1)}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey={assetSymbol} stroke="#8884d8" />
          <Line type="monotone" dataKey="Carteira" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RentabilityChart;

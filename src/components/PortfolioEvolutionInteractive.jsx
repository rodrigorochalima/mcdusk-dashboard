import React from 'react';

const PortfolioEvolutionInteractive = () => {
  // Dados de evolução do portfólio
  const evolutionData = [
    { mes: 'Jun/20', valor: 100000 },
    { mes: 'Jul/20', valor: 102500 },
    { mes: 'Ago/20', valor: 105000 },
    { mes: 'Set/20', valor: 107000 },
    { mes: 'Out/20', valor: 110000 },
    { mes: 'Nov/20', valor: 115000 },
    { mes: 'Dez/20', valor: 120000 },
    { mes: 'Jan/21', valor: 125000 },
    { mes: 'Fev/21', valor: 130000 },
    { mes: 'Mar/21', valor: 135000 },
    { mes: 'Abr/21', valor: 140000 },
    { mes: 'Mai/21', valor: 145000 },
    { mes: 'Jun/21', valor: 150000 },
    { mes: 'Jul/21', valor: 155000 },
    { mes: 'Ago/21', valor: 160000 },
    { mes: 'Set/21', valor: 165000 },
    { mes: 'Out/21', valor: 170000 },
    { mes: 'Nov/21', valor: 175000 },
    { mes: 'Dez/21', valor: 180000 },
    { mes: 'Jan/22', valor: 185000 },
    { mes: 'Fev/22', valor: 190000 },
    { mes: 'Mar/22', valor: 195000 },
    { mes: 'Abr/22', valor: 200000 },
    { mes: 'Mai/22', valor: 205000 },
    { mes: 'Jun/22', valor: 210000 },
    { mes: 'Jul/22', valor: 215000 },
    { mes: 'Ago/22', valor: 220000 },
    { mes: 'Set/22', valor: 225000 },
    { mes: 'Out/22', valor: 230000 },
    { mes: 'Nov/22', valor: 235000 },
    { mes: 'Dez/22', valor: 240000 },
    { mes: 'Jan/23', valor: 245000 },
    { mes: 'Fev/23', valor: 250000 },
    { mes: 'Mar/23', valor: 255000 },
    { mes: 'Abr/23', valor: 260000 },
    { mes: 'Mai/23', valor: 265000 },
    { mes: 'Jun/23', valor: 270000 },
    { mes: 'Jul/23', valor: 275000 },
    { mes: 'Ago/23', valor: 280000 },
    { mes: 'Set/23', valor: 285000 },
    { mes: 'Out/23', valor: 290000 },
    { mes: 'Nov/23', valor: 295000 },
    { mes: 'Dez/23', valor: 300000 },
    { mes: 'Jan/24', valor: 310000 },
    { mes: 'Fev/24', valor: 320000 },
    { mes: 'Mar/24', valor: 330000 },
    { mes: 'Abr/24', valor: 340000 },
    { mes: 'Mai/24', valor: 350000 },
    { mes: 'Jun/24', valor: 360000 },
    { mes: 'Jul/24', valor: 370000 },
    { mes: 'Ago/24', valor: 380000 },
    { mes: 'Set/24', valor: 386237.43 }
  ];

  // Formatação de valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="portfolio-evolution">
      <h3>Evolução do Patrimônio</h3>
      <div className="chart-container">
        <div className="chart">
          {evolutionData.map((data, index) => (
            <div 
              key={index} 
              className="bar" 
              style={{ 
                height: `${(data.valor / 400000) * 100}%`,
                width: `${100 / evolutionData.length}%`
              }}
              title={`${data.mes}: ${formatCurrency(data.valor)}`}
            >
              <span className="tooltip">{data.mes}: {formatCurrency(data.valor)}</span>
            </div>
          ))}
        </div>
        <div className="x-axis">
          {evolutionData.filter((_, i) => i % 6 === 0).map((data, index) => (
            <div key={index} className="tick">{data.mes}</div>
          ))}
        </div>
      </div>
      <div className="stats">
        <div className="stat">
          <span className="label">Início:</span>
          <span className="value">{formatCurrency(evolutionData[0].valor)}</span>
        </div>
        <div className="stat">
          <span className="label">Atual:</span>
          <span className="value">{formatCurrency(evolutionData[evolutionData.length - 1].valor)}</span>
        </div>
        <div className="stat">
          <span className="label">Crescimento:</span>
          <span className="value positive">
            {(((evolutionData[evolutionData.length - 1].valor / evolutionData[0].valor) - 1) * 100).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEvolutionInteractive;

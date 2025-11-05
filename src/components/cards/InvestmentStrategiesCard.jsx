import React from 'react';

const InvestmentStrategiesCard = () => {
  const strategies = [
    {
      name: 'Warren Buffett',
      description: 'Estratégia baseada em qualidade e valor, com foco em empresas com vantagens competitivas duradouras.',
      criteria: [
        'Qualidade forte (F-Score ≥7)',
        'Valuation atrativo (EV/EBIT e P/B baixos)',
        'Tendência não contra (Preço ≥MM200)',
      ],
    },
    {
      name: 'Diagrama do Cerrado',
      description: 'Análise de quadrantes de qualidade e valuation, com ajustes para momentum e tendência.',
      criteria: [
        'Quadrantes de Qualidade × Valuation',
        'Ajuste para Momentum e MM200',
      ],
    },
    {
      name: 'Método Arca',
      description: 'Foco em momentum e tendência, com ajustes para valuations extremos.',
      criteria: [
        'Momentum e tendência como guias',
        'Ajuste para valuations extremos',
      ],
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2>Estratégias de Investimento</h2>
      </div>
      <div className="card-content">
        {strategies.map((strategy, index) => (
          <div key={index} className="strategy-card">
            <h3>{strategy.name}</h3>
            <p>{strategy.description}</p>
            <ul>
              {strategy.criteria.map((criterion, i) => (
                <li key={i}>{criterion}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentStrategiesCard;

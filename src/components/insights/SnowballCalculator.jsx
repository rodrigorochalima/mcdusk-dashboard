import React, { useState } from 'react';
import { formatCurrency } from '../../lib/formatters';
import { userAssets, calculateDividendYields } from '../../data/userAssets';

/**
 * Componente para a calculadora bola de neve
 */
const SnowballCalculator = () => {
  const [targetIncome, setTargetIncome] = useState('');
  const [customIncome, setCustomIncome] = useState('');
  const [results, setResults] = useState(null);
  
  // Função para calcular a quantidade de cotas necessárias para atingir a renda passiva
  const calculateSnowball = (value) => {
    if (!value || isNaN(parseFloat(value))) {
      return;
    }
    
    const targetMonthlyIncome = parseFloat(value);
    const dividendYields = calculateDividendYields();
    
    // Selecionar os melhores FIIs para dividendos
    const bestFiis = userAssets.fiis
      .map(fii => {
        const annualYield = dividendYields.fiis[fii.symbol] || 0;
        const monthlyYield = annualYield / 12;
        const monthlyDividend = fii.price * monthlyYield;
        
        return {
          ...fii,
          monthlyDividend,
          requiredShares: Math.ceil(targetMonthlyIncome / monthlyDividend),
          totalInvestment: Math.ceil(targetMonthlyIncome / monthlyDividend) * fii.price,
          missingInvestment: (Math.ceil(targetMonthlyIncome / monthlyDividend) - fii.quantity) * fii.price
        };
      })
      .sort((a, b) => a.requiredShares - b.requiredShares)
      .slice(0, 3);
    
    setResults({
      targetMonthlyIncome,
      recommendations: bestFiis
    });
    
    setTargetIncome(value);
    setCustomIncome('');
  };
  
  // Função para lidar com a seleção de valores pré-definidos
  const handlePresetClick = (value) => {
    calculateSnowball(value);
  };
  
  // Função para lidar com o cálculo de valor customizado
  const handleCustomCalculation = () => {
    calculateSnowball(customIncome);
  };
  
  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">❄️</span>
        <span>Calculadora Bola de Neve</span>
      </div>
      
      <div className="snowball-calculator">
        <div className="input-group">
          <label htmlFor="target-income">Meta de renda passiva mensal:</label>
          <div className="preset-buttons">
            <button 
              className={`preset-button ${targetIncome === '500' ? 'active' : ''}`}
              onClick={() => handlePresetClick('500')}
            >
              R$ 500
            </button>
            <button 
              className={`preset-button ${targetIncome === '1000' ? 'active' : ''}`}
              onClick={() => handlePresetClick('1000')}
            >
              R$ 1.000
            </button>
            <button 
              className={`preset-button ${targetIncome === '5000' ? 'active' : ''}`}
              onClick={() => handlePresetClick('5000')}
            >
              R$ 5.000
            </button>
            <button 
              className={`preset-button ${targetIncome === '10000' ? 'active' : ''}`}
              onClick={() => handlePresetClick('10000')}
            >
              R$ 10.000
            </button>
          </div>
          
          <div className="input-with-button">
            <input
              id="custom-income"
              type="text"
              value={customIncome}
              onChange={(e) => setCustomIncome(e.target.value)}
              placeholder="Digite valor customizado (ex: 15000)"
              className="input-field"
            />
            <button onClick={handleCustomCalculation} className="calculate-button">Calcular</button>
          </div>
        </div>
        
        {results && (
          <div className="snowball-results">
            <div className="results-header">
              Para R$ {results.targetMonthlyIncome.toFixed(2)}/mês em dividendos:
            </div>
            
            <div className="results-list">
              {results.recommendations.map((rec) => (
                <div key={rec.symbol} className="result-item">
                  <div className="result-header">
                    <div className="result-symbol">{rec.symbol}</div>
                    <div className="result-price">Preço: {formatCurrency(rec.price)}</div>
                  </div>
                  
                  <ul className="result-details">
                    <li>
                      <span className="bullet">•</span>
                      <span>Tem: {rec.quantity} cotas (R$ {(rec.quantity * rec.price).toFixed(2)}/mês)</span>
                    </li>
                    <li>
                      <span className="bullet">•</span>
                      <span>Precisa: {rec.requiredShares} cotas total</span>
                    </li>
                    <li>
                      <span className="bullet">•</span>
                      <span>Falta investir: {formatCurrency(rec.missingInvestment)}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnowballCalculator;

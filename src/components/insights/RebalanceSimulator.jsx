import React, { useState } from 'react';
import { formatCurrency } from '../../lib/formatters';
import { userAssets } from '../../data/userAssets';

/**
 * Componente para o simulador de rebalanceamento ARCA
 */
const RebalanceSimulator = () => {
  const [investmentValue, setInvestmentValue] = useState('');
  const [results, setResults] = useState(null);
  
  // Função para calcular a sugestão ARCA
  const calculateArca = () => {
    if (!investmentValue || isNaN(parseFloat(investmentValue))) {
      return;
    }
    
    const value = parseFloat(investmentValue);
    
    // Calcular os valores para cada categoria
    const fiisValue = value * 0.6; // 60% em FIIs
    const internationalValue = value * 0.3; // 30% em Ativos Internacionais
    const fixedIncomeValue = value * 0.1; // 10% em Renda Fixa
    
    // Encontrar os melhores FIIs baseados na pontuação do Diagrama do Cerrado
    const bestFiis = [...userAssets.fiis]
      .sort((a, b) => b.diagramaSerradoScore - a.diagramaSerradoScore)
      .slice(0, 3);
    
    // Encontrar os melhores ativos internacionais
    const bestInternational = [...userAssets.international]
      .sort((a, b) => b.diagramaSerradoScore - a.diagramaSerradoScore)
      .slice(0, 2);
    
    setResults({
      fiis: {
        value: fiisValue,
        assets: bestFiis
      },
      international: {
        value: internationalValue,
        assets: bestInternational
      },
      fixedIncome: {
        value: fixedIncomeValue
      }
    });
  };
  
  return (
    <div className="card">
      <div className="card-title">
        <span className="card-title-icon">💰</span>
        <span>Simulador de Rebalanceamento</span>
      </div>
      
      <div className="rebalance-simulator">
        <div className="input-group">
          <label htmlFor="investment-value">Valor disponível para investir:</label>
          <div className="input-with-button">
            <input
              id="investment-value"
              type="text"
              value={investmentValue}
              onChange={(e) => setInvestmentValue(e.target.value)}
              placeholder="5000"
              className="input-field"
            />
            <button onClick={calculateArca} className="calculate-button">Calcular</button>
          </div>
        </div>
        
        {results && (
          <div className="arca-suggestion">
            <div className="suggestion-title">📊 Sugestão ARCA</div>
            <ul className="suggestion-list">
              <li className="suggestion-item">
                <span className="bullet">•</span>
                <span className="percentage">60% em FIIs ({formatCurrency(results.fiis.value)})</span>
                <span className="description">- Aumentar Real Estate</span>
              </li>
              <ul className="asset-recommendations">
                {results.fiis.assets.map(fii => (
                  <li key={fii.symbol} className="asset-recommendation">
                    <span className="asset-symbol">{fii.symbol}</span>
                    <span className="asset-score">Nota: {fii.diagramaSerradoScore}</span>
                  </li>
                ))}
              </ul>
              
              <li className="suggestion-item">
                <span className="bullet">•</span>
                <span className="percentage">30% em Ativos Internacionais ({formatCurrency(results.international.value)})</span>
                <span className="description">- BDRs ou ETFs</span>
              </li>
              <ul className="asset-recommendations">
                {results.international.assets.map(asset => (
                  <li key={asset.symbol} className="asset-recommendation">
                    <span className="asset-symbol">{asset.symbol}</span>
                    <span className="asset-score">Nota: {asset.diagramaSerradoScore}</span>
                  </li>
                ))}
              </ul>
              
              <li className="suggestion-item">
                <span className="bullet">•</span>
                <span className="percentage">10% em Renda Fixa ({formatCurrency(results.fixedIncome.value)})</span>
                <span className="description">- Reserva de emergência</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RebalanceSimulator;

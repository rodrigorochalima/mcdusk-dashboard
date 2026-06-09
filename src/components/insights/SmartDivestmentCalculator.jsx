import React, { useState } from 'react';
import { assetClasses } from '../../data/portfolioData-updated';
import { formatCurrency } from '../../lib/formatters';
import { calculateSmartDivestment } from '../../utils/smartDivestment';

/**
 * Calculadora de Desinvestimento Inteligente
 * Calcula a melhor sequência de vendas para minimizar impostos
 * Mobile-first
 */
const SmartDivestmentCalculator = () => {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyStockSales, setMonthlyStockSales] = useState('0');
  const [monthlyCryptoSales, setMonthlyCryptoSales] = useState('0');
  const [availableDividends, setAvailableDividends] = useState('0');
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Preparar lista de ativos com tipos corretos
  const prepareAssets = () => {
    const allAssets = [];
    const totalValue = assetClasses.reduce((sum, ac) => sum + ac.value, 0);

    assetClasses.forEach(assetClass => {
      assetClass.assets.forEach(asset => {
        let type = 'STOCK';
        if (assetClass.id === 'reits') type = 'FII';
        else if (assetClass.id === 'fixedIncome') type = 'FIXED_INCOME';
        else if (assetClass.id === 'international') type = 'CRYPTO';
        else if (asset.symbol?.includes('11') && assetClass.id === 'stocks') {
          // ETFs terminam em 11
          if (['NASD11', 'IVVB11', 'QBTC11'].includes(asset.symbol)) type = 'ETF';
        }
        else if (asset.symbol?.includes('34')) type = 'BDR';

        // QBTC11 é cripto
        if (asset.symbol === 'QBTC11') type = 'CRYPTO';
        if (asset.symbol === 'BTC') type = 'CRYPTO';

        allAssets.push({
          ...asset,
          type,
          portfolioWeight: (asset.value / totalValue) * 100
        });
      });
    });

    return allAssets;
  };

  const handleCalculate = () => {
    const amount = parseFloat(targetAmount.replace(/[^\d.,]/g, '').replace(',', '.'));
    if (!amount || amount <= 0) return;

    const assets = prepareAssets();
    const strategy = calculateSmartDivestment(amount, assets, {
      monthlyStockSales: parseFloat(monthlyStockSales) || 0,
      monthlyCryptoSales: parseFloat(monthlyCryptoSales) || 0,
      availableDividends: parseFloat(availableDividends) || 0
    });

    setResult(strategy);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, '');
    if (value) {
      value = (parseInt(value) / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
    setTargetAmount(value);
  };

  return (
    <div className="card" style={{ marginTop: '16px' }}>
      <div className="card-title">
        <span className="card-title-icon">💸</span>
        <span>Desinvestimento Inteligente</span>
      </div>

      <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 16px', lineHeight: '1.5' }}>
        Precisa sacar dinheiro? Informe o valor e o sistema calcula a melhor sequência de vendas para minimizar impostos e preservar sua estratégia.
      </p>

      {/* Input principal */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '4px' }}>
          Quanto você precisa sacar?
        </label>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '14px', fontWeight: '600', color: '#6b7280'
          }}>R$</span>
          <input
            type="text"
            value={targetAmount}
            onChange={handleAmountChange}
            placeholder="0,00"
            style={{
              width: '100%',
              padding: '12px 12px 12px 40px',
              fontSize: '18px',
              fontWeight: '700',
              border: '2px solid #e5e7eb',
              borderRadius: '10px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
          />
        </div>
      </div>

      {/* Opções avançadas */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        style={{
          background: 'none', border: 'none', color: '#3b82f6',
          fontSize: '12px', cursor: 'pointer', padding: '4px 0', marginBottom: '8px'
        }}
      >
        {showAdvanced ? '▼' : '▶'} Opções avançadas
      </button>

      {showAdvanced && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>
              Vendas de ações já feitas este mês (R$)
            </label>
            <input
              type="number"
              value={monthlyStockSales}
              onChange={(e) => setMonthlyStockSales(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>
              Vendas de cripto já feitas este mês (R$)
            </label>
            <input
              type="number"
              value={monthlyCryptoSales}
              onChange={(e) => setMonthlyCryptoSales(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginBottom: '2px' }}>
              Proventos de FIIs disponíveis (R$)
            </label>
            <input
              type="number"
              value={availableDividends}
              onChange={(e) => setAvailableDividends(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      )}

      {/* Botão calcular */}
      <button
        onClick={handleCalculate}
        disabled={!targetAmount}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: !targetAmount ? '#9ca3af' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: '700',
          cursor: !targetAmount ? 'not-allowed' : 'pointer',
          marginBottom: '16px'
        }}
      >
        📊 Calcular Estratégia Otimizada
      </button>

      {/* Resultados */}
      {result && (
        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '16px' }}>
          {/* Resumo */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <div style={{ padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Valor Levantado</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#16a34a' }}>
                {formatCurrency(result.totalRaised)}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#fef2f2', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Imposto Total</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#dc2626' }}>
                {formatCurrency(result.totalTax)}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#eff6ff', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Valor Líquido</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#2563eb' }}>
                {formatCurrency(result.netAmount)}
              </div>
            </div>
            <div style={{ padding: '10px', backgroundColor: '#faf5ff', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Taxa Efetiva IR</div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#7c3aed' }}>
                {result.effectiveTaxRate.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Warning */}
          {result.warning && (
            <div style={{
              padding: '10px',
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '12px',
              color: '#92400e'
            }}>
              ⚠️ {result.warning}
            </div>
          )}

          {/* Passos */}
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', margin: '0 0 12px' }}>
            Sequência Otimizada de Vendas:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {result.steps.map((step, index) => (
              <div key={index} style={{
                padding: '12px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                backgroundColor: step.tax === 0 ? '#f0fdf4' : '#fffbeb'
              }}>
                {/* Header do passo */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '22px', height: '22px',
                      borderRadius: '50%',
                      backgroundColor: step.tax === 0 ? '#22c55e' : '#f59e0b',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {index + 1}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>
                      {step.description}
                    </span>
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>
                    {formatCurrency(step.amount)}
                  </span>
                </div>

                {/* Razão */}
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0 0', lineHeight: '1.4' }}>
                  {step.reason}
                </p>

                {/* IR */}
                {step.tax > 0 && (
                  <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '4px', fontWeight: '600' }}>
                    IR estimado: {formatCurrency(step.tax)} ({step.taxRate}%)
                  </div>
                )}

                {/* Ativos específicos */}
                {step.assets && step.assets.length > 0 && (
                  <div style={{ marginTop: '6px', paddingTop: '6px', borderTop: '1px dashed #e5e7eb' }}>
                    {step.assets.map((asset, i) => (
                      <div key={i} style={{ fontSize: '11px', color: '#4b5563', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{asset.symbol} - {asset.name}</span>
                        <span style={{ fontWeight: '600' }}>{formatCurrency(asset.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dicas */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            borderRadius: '10px',
            border: '1px solid #bfdbfe'
          }}>
            <h5 style={{ fontSize: '12px', fontWeight: '700', color: '#1e40af', margin: '0 0 8px' }}>
              💡 Dicas Importantes
            </h5>
            <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: '11px', color: '#1e40af', lineHeight: '1.6' }}>
              <li>Vendas de ações até R$ 20.000/mês são isentas de IR</li>
              <li>Vendas de cripto até R$ 35.000/mês são isentas de IR</li>
              <li>DARF deve ser paga até o último dia útil do mês seguinte</li>
              <li>Prejuízos podem ser compensados com lucros futuros</li>
              <li>FIIs não têm isenção de R$ 20k (sempre 20% sobre ganho)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDivestmentCalculator;

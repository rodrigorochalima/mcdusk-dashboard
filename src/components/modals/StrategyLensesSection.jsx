import React from 'react';
import { getLensesForAsset, getSignalColor, getSignalText } from '../../utils/lensAnalysis';

/**
 * Componente modular de Lentes de Análise
 * Renderiza as estratégias dinâmicas baseadas no tipo de ativo
 * Substitui o conteúdo hardcoded da aba "Estratégias"
 */
const StrategyLensesSection = ({ asset, assetClassId }) => {
  const analysis = getLensesForAsset(asset, assetClassId);

  return (
    <div className="section">
      <h3 className="section-title">💼 Análise das Estratégias</h3>

      {/* Recomendação Geral */}
      <div className="recommendation-section" style={{ marginBottom: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: '600', color: '#374151', margin: '0 0 8px' }}>
          Recomendação Geral
        </h4>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          backgroundColor: analysis.recommendation === 'COMPRAR' ? '#f0fdf4' : '#fffbeb',
          borderRadius: '10px',
          border: `1px solid ${analysis.recommendation === 'COMPRAR' ? '#bbf7d0' : '#fde68a'}`
        }}>
          <span style={{
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'white',
            backgroundColor: analysis.recommendation === 'COMPRAR' ? '#22c55e' : '#f59e0b'
          }}>
            {analysis.recommendation}
          </span>
          <span style={{ fontSize: '12px', color: '#4b5563' }}>
            Média ponderada das {analysis.lenses.length} lentes de análise
          </span>
        </div>
      </div>

      {/* Lentes individuais */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {analysis.lenses.map((lens) => (
          <div key={lens.id} style={{
            padding: '14px',
            borderRadius: '12px',
            border: `1px solid ${lens.color}20`,
            backgroundColor: `${lens.color}05`
          }}>
            {/* Header da lente */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '28px', height: '28px',
                  borderRadius: '6px',
                  backgroundColor: lens.color,
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {lens.icon}
                </span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1f2937' }}>
                    {lens.name}
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>
                    Peso: {lens.weight}% | {lens.label}
                  </div>
                </div>
              </div>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: '700',
                color: 'white',
                backgroundColor: getSignalColor(lens.signal)
              }}>
                {getSignalText(lens.signal)}
              </span>
            </div>

            {/* Timeframes */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '10px'
            }}>
              {Object.entries(lens.timeframes).map(([period, signal]) => (
                <div key={period} style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor: signal === 'COMPRAR' ? '#dcfce7' : signal === 'VENDER' ? '#fee2e2' : '#fef9c3',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '9px', color: '#6b7280', marginBottom: '2px' }}>{period}</div>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: signal === 'COMPRAR' ? '#16a34a' : signal === 'VENDER' ? '#dc2626' : '#ca8a04'
                  }}>
                    {signal}
                  </div>
                </div>
              ))}
            </div>

            {/* Descrição */}
            <p style={{
              fontSize: '11px',
              color: '#4b5563',
              margin: 0,
              lineHeight: '1.5',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '8px'
            }}>
              {lens.description}
            </p>
          </div>
        ))}
      </div>

      {/* Nota informativa */}
      <div style={{
        marginTop: '16px',
        padding: '10px',
        backgroundColor: '#f9fafb',
        borderRadius: '8px',
        fontSize: '10px',
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: '1.4'
      }}>
        As análises são baseadas em critérios de cada investidor/metodologia.
        Prioridade: {analysis.lenses.map(l => `${l.name} (${l.weight}%)`).join(' > ')}
      </div>
    </div>
  );
};

export default StrategyLensesSection;

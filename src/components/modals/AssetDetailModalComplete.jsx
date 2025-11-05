import React, { useState } from 'react';
import '../../styles/modal-complete.css';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import EditAssetModal from './EditAssetModal';

const AssetDetailModalComplete = ({ asset, onClose }) => {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState('resumo');
  const [showEditModal, setShowEditModal] = useState(false);

  // Dados simulados para o comparativo
  const comparisons = [
    { name: 'vs SELIC', value: '+66.37%' },
    { name: 'vs IPCA', value: '+72.89%' },
    { name: 'vs IBOVESPA', value: '+72.72%' }
  ];

  // Indicadores fundamentalistas simulados
  const positiveIndicators = [
    { name: 'Preço/Lucro', value: '10.2' },
    { name: 'Preço/Valor Patrimonial', value: '1.2' },
    { name: 'Return on Invested Capital', value: '10.8%' },
    { name: 'Margem Líquida', value: '27.3%' },
    { name: 'Dívida Líquida/EBITDA', value: '1.8' }
  ];

  const negativeIndicators = [
    { name: 'Preço/Lucro', value: '10.2' },
    { name: 'Preço/Valor Patrimonial', value: '1.2' },
    { name: 'Dívida Líquida/EBITDA', value: '1.8' },
    { name: 'Return on Equity', value: '12.5%' },
    { name: 'Return on Invested Capital', value: '10.8%' }
  ];

  // Dados simulados para o gráfico de desempenho
  const performanceData = [
    { name: 'Out/24', ativo: 100, cdi: 100, ibov: 100 },
    { name: 'Nov/24', ativo: 105, cdi: 101, ibov: 103 },
    { name: 'Dez/24', ativo: 110, cdi: 102, ibov: 106 },
    { name: 'Jan/25', ativo: 115, cdi: 103, ibov: 109 },
    { name: 'Fev/25', ativo: 120, cdi: 104, ibov: 112 },
    { name: 'Mar/25', ativo: 125, cdi: 105, ibov: 115 },
    { name: 'Abr/25', ativo: 130, cdi: 106, ibov: 118 },
    { name: 'Mai/25', ativo: 135, cdi: 107, ibov: 121 },
    { name: 'Jun/25', ativo: 140, cdi: 108, ibov: 124 },
    { name: 'Jul/25', ativo: 145, cdi: 109, ibov: 127 },
    { name: 'Ago/25', ativo: 150, cdi: 110, ibov: 130 },
    { name: 'Set/25', ativo: 155, cdi: 111, ibov: 133 }
  ];

  // Componente de indicador com texto preto garantido
  const BlackTextIndicator = ({ name, value, bgColor }) => (
    <div style={{
      backgroundColor: bgColor,
      borderRadius: '10px',
      padding: '12px 15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px'
    }}>
      <span style={{
        fontSize: '15px',
        color: '#000000',
        fontWeight: 900,
        textShadow: 'none'
      }}>{name}</span>
      <span style={{
        fontSize: '15px',
        fontWeight: 900,
        color: '#000000',
        textShadow: 'none'
      }}>{value}</span>
    </div>
  );

  // Renderiza o conteúdo com base na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'resumo':
        return (
          <>
            {/* Resumo */}
            <div className="section">
              <h3 className="section-title">📊 Resumo</h3>
              <div className="asset-info">
                <div className="asset-info-row">
                  <span className="asset-info-label">Quantidade</span>
                  <span className="asset-info-value">{asset.quantity || 100}</span>
                </div>
                <div className="asset-info-row">
                  <span className="asset-info-label">Preço Atual</span>
                  <span className="asset-info-value">{formatCurrency(asset.price || 69.40)}</span>
                </div>
                <div className="asset-info-row">
                  <span className="asset-info-label">Valor Total</span>
                  <span className="asset-info-value">{formatCurrency((asset.price || 69.40) * (asset.quantity || 100))}</span>
                </div>
                <div className="asset-info-row">
                  <span className="asset-info-label">Resultado</span>
                  <span className="asset-info-value positive">
                    +{formatCurrency(3021.84)}
                  </span>
                </div>
              </div>
            </div>

            {/* Comparativo */}
            <div className="section">
              <h3 className="section-title">📈 Comparativo</h3>
              <div className="comparison-list">
                {comparisons.map((comparison, index) => (
                  <div key={index} className="comparison-item">
                    <span className="comparison-label">{comparison.name}</span>
                    <span className="comparison-value">{comparison.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicadores Fundamentalistas */}
            <div className="section">
              <h3 className="section-title">🔍 Indicadores Fundamentalistas</h3>
              
              {/* Indicadores Positivos */}
              <div className="indicators-section">
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  marginBottom: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#4CAF50' 
                }}>
                  <span>✅</span> Mais Positivos
                </h4>
                <div>
                  {positiveIndicators.map((indicator, index) => (
                    <BlackTextIndicator 
                      key={index} 
                      name={indicator.name} 
                      value={indicator.value} 
                      bgColor="#E8F5E9" 
                    />
                  ))}
                </div>
              </div>
              
              {/* Indicadores Negativos */}
              <div className="indicators-section">
                <h4 style={{ 
                  fontSize: '16px', 
                  fontWeight: 600, 
                  marginBottom: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#F44336' 
                }}>
                  <span>⚠️</span> Mais Negativos
                </h4>
                <div>
                  {negativeIndicators.map((indicator, index) => (
                    <BlackTextIndicator 
                      key={index} 
                      name={indicator.name} 
                      value={indicator.value} 
                      bgColor="#FFEBEE" 
                    />
                  ))}
                </div>
              </div>
              
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                textAlign: 'center', 
                marginTop: '15px' 
              }}>
                Toque em um indicador para mais informações
              </p>
            </div>
          </>
        );
      case 'diagrama':
        return (
          <div className="section">
            <h3 className="section-title">🎯 Diagrama do Cerrado</h3>
            <div className="cerrado-score">
              <div className="score-header">
                <span className="score-label">Pontuação</span>
                <span className="score-value">11/14</span>
              </div>
              <div className="score-bar-container">
                <div className="score-bar" style={{ width: `${(11/14) * 100}%` }}></div>
              </div>
            </div>
            <div className="recommendation-box">
              <div className="recommendation-header">
                <span className="recommendation-icon">✅</span>
                <span className="recommendation-label">COMPRAR</span>
              </div>
              <p className="recommendation-text">Banco sólido com bons fundamentos</p>
            </div>
          </div>
        );
      case 'estrategias':
        return (
          <div className="section">
            <h3 className="section-title">💼 Análise das Estratégias</h3>
            
            {/* Recomendação Geral */}
            <div className="recommendation-section">
              <h4 className="recommendation-title">Recomendação Geral</h4>
              <div className="recommendation-container">
                <div className="recommendation buy">COMPRAR</div>
                <div className="recommendation-details">
                  <p><strong>Média Ponderada:</strong> COMPRAR</p>
                  <p><strong>Estratégia de Compra:</strong> Compre 70 cotas para gerar R$ 1,00/mês em dividendos.</p>
                </div>
              </div>
            </div>
            
            {/* Warren Buffett */}
            <div className="strategy-card buffett-card">
              <div className="strategy-header">
                <h4>Warren Buffett (Peso: 40%)</h4>
                <span className="strategy-weight">Maior Peso</span>
              </div>
              <div className="strategy-timeframes">
                <div className="timeframe-item">
                  <span className="timeframe-label">1 Mês</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">3 Meses</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">6 Meses</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
              </div>
              <p className="strategy-description">
                COMPRAR: Warren é acionista do Bank of America, banco com vantagem competitiva
              </p>
            </div>
            
            {/* Diagrama do Cerrado */}
            <div className="strategy-card cerrado-card">
              <div className="strategy-header">
                <h4>Diagrama do Cerrado (Peso: 30%)</h4>
                <span className="strategy-weight">2º Peso</span>
              </div>
              <div className="strategy-timeframes">
                <div className="timeframe-item">
                  <span className="timeframe-label">1 Mês</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">3 Meses</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">6 Meses</span>
                  <span className="timeframe-value buy">COMPRAR</span>
                </div>
              </div>
              <p className="strategy-description">
                COMPRAR: Banco sólido com bons fundamentos
              </p>
            </div>
            
            {/* Estratégia ARCA */}
            <div className="strategy-card arca-card">
              <div className="strategy-header">
                <h4>Estratégia ARCA (Peso: 20%)</h4>
                <span className="strategy-weight">3º Peso</span>
              </div>
              <div className="strategy-timeframes">
                <div className="timeframe-item">
                  <span className="timeframe-label">1 Mês</span>
                  <span className="timeframe-value hold">MANTER</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">3 Meses</span>
                  <span className="timeframe-value hold">MANTER</span>
                </div>
                <div className="timeframe-item">
                  <span className="timeframe-label">6 Meses</span>
                  <span className="timeframe-value hold">MANTER</span>
                </div>
              </div>
              <p className="strategy-description">
                MANTER: Faz parte da cesta de Ativos Internacionais (25%)
              </p>
            </div>
            
            {/* Bola de Neve */}
            <div className="strategy-card snowball-card">
              <div className="strategy-header">
                <h4>Bola de Neve (Informativo)</h4>
                <span className="strategy-weight">Não computado</span>
              </div>
              <p className="strategy-description">
                Estratégia focada em dividendos mensais para reinvestimento automático
              </p>
            </div>
          </div>
        );
      case 'contexto':
        return (
          <div className="section">
            <h3 className="section-title">🏢 Contexto Setorial</h3>
            <div className="context-section">
              <h4 className="context-title">
                <span className="context-icon">🌎</span> Mercado: Estados Unidos
              </h4>
              <p className="context-text">
                Maior economia do mundo com empresas líderes globais. Mercado maduro com regulação sólida. Dólar como moeda de reserva oferece proteção cambial.
              </p>
            </div>
          </div>
        );
      case 'sobre':
        return (
          <div className="section">
            <h3 className="section-title">🎓 O que é {asset.symbol}?</h3>
            <div className="asset-description">
              <p>BDR do Bank of America, um dos maiores bancos dos Estados Unidos.</p>
              <div className="asset-type">
                <h4>🌐 BDR (Brazilian Depositary Receipt)</h4>
                <p>BDRs são certificados que representam ações de empresas estrangeiras negociadas na B3, permitindo investir em empresas internacionais sem precisar abrir conta no exterior.</p>
              </div>
            </div>
          </div>
        );
      case 'grafico':
        return (
          <div className="section">
            <h3 className="section-title">📊 Gráfico de Desempenho</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ativo" stroke="#2196F3" name={asset.symbol} strokeWidth={2} />
                  <Line type="monotone" dataKey="cdi" stroke="#FF9800" name="CDI" strokeWidth={2} />
                  <Line type="monotone" dataKey="ibov" stroke="#4CAF50" name="IBOV" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="asset-detail-modal-overlay">
      <div className="asset-detail-modal">
        <div className="modal-header">
          <div>
            <h2>{asset.symbol}</h2>
            <p>{asset.name || "Bank of America"}</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'resumo' ? 'active' : ''}`} 
            onClick={() => setActiveTab('resumo')}
          >
            Resumo
          </button>
          <button 
            className={`modal-tab ${activeTab === 'diagrama' ? 'active' : ''}`} 
            onClick={() => setActiveTab('diagrama')}
          >
            Diagrama do Cerrado
          </button>
          <button 
            className={`modal-tab ${activeTab === 'estrategias' ? 'active' : ''}`} 
            onClick={() => setActiveTab('estrategias')}
          >
            Estratégias
          </button>
          <button 
            className={`modal-tab ${activeTab === 'contexto' ? 'active' : ''}`} 
            onClick={() => setActiveTab('contexto')}
          >
            Contexto
          </button>
          <button 
            className={`modal-tab ${activeTab === 'sobre' ? 'active' : ''}`} 
            onClick={() => setActiveTab('sobre')}
          >
            O que é?
          </button>
          <button 
            className={`modal-tab ${activeTab === 'grafico' ? 'active' : ''}`} 
            onClick={() => setActiveTab('grafico')}
          >
            Gráfico
          </button>
        </div>

        <div className="modal-content">
          {renderContent()}
        </div>

        <div className="modal-footer">
          <button className="action-button buy-button">Comprar</button>
          <button 
            className="action-button edit-button"
            onClick={() => setShowEditModal(true)}
            style={{
              backgroundColor: '#2196F3',
              color: 'white'
            }}
          >
            ✏️ Editar
          </button>
          <button className="action-button sell-button">Vender</button>
        </div>
      </div>
      
      {/* Modal de edição */}
      {showEditModal && (
        <EditAssetModal 
          asset={asset} 
          onClose={() => setShowEditModal(false)}
          onSuccess={() => {
            setShowEditModal(false);
            // Opcional: atualizar dados do ativo após edição
          }}
        />
      )}
    </div>
  );
};

export default AssetDetailModalComplete;

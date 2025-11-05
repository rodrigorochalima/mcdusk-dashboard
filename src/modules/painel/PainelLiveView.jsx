import React, { useState, useEffect } from 'react';

/**
 * Componente melhorado do Painel ao Vivo
 * Implementa as correções solicitadas pelo usuário
 */
const PainelLiveView = () => {
  // Estado para controlar o período selecionado
  const [periodoSelecionado, setPeriodoSelecionado] = useState('1y');
  
  // Dados simulados para os ativos
  const ativos = [
    {
      ticker: 'WEGE3',
      nome: 'WEG',
      classe: 'Ação',
      preco: 7284.00,
      variacao: 3.2,
      mm200: 12.5,
      momentum: 8.7,
      sca: 0.85,
      decisao: 'COMPRAR',
      estrategias: {
        buffett: { sinal: 1, recomendacao: 'COMPRAR' },
        cerrado: { sinal: 1, recomendacao: 'COMPRAR' },
        arca: { sinal: 0, recomendacao: 'MANTER' }
      }
    },
    {
      ticker: 'AMZO34',
      nome: 'Amazon',
      classe: 'BDR',
      preco: 13147.50,
      variacao: 4.1,
      mm200: 15.2,
      momentum: 22.3,
      sca: 0.92,
      decisao: 'COMPRAR',
      estrategias: {
        buffett: { sinal: 1, recomendacao: 'COMPRAR' },
        cerrado: { sinal: 1, recomendacao: 'COMPRAR' },
        arca: { sinal: 1, recomendacao: 'COMPRAR' }
      }
    },
    {
      ticker: 'CXSE3',
      nome: 'Caixa Seguridade',
      classe: 'Ação',
      preco: 912.00,
      variacao: -0.5,
      mm200: -3.2,
      momentum: -5.7,
      sca: 0.35,
      decisao: 'VENDER',
      estrategias: {
        buffett: { sinal: -1, recomendacao: 'VENDER' },
        cerrado: { sinal: 0, recomendacao: 'MANTER' },
        arca: { sinal: -1, recomendacao: 'VENDER' }
      }
    },
    {
      ticker: 'JPMC34',
      nome: 'JPMorgan',
      classe: 'BDR',
      preco: 15780.00,
      variacao: 2.7,
      mm200: 8.3,
      momentum: 10.5,
      sca: 0.78,
      decisao: 'COMPRAR',
      estrategias: {
        buffett: { sinal: 1, recomendacao: 'COMPRAR' },
        cerrado: { sinal: 0, recomendacao: 'MANTER' },
        arca: { sinal: 1, recomendacao: 'COMPRAR' }
      }
    },
    {
      ticker: 'QBTC11',
      nome: 'QR Bitcoin',
      classe: 'ETF',
      preco: 58719.00,
      variacao: 5.2,
      mm200: 25.8,
      momentum: 35.2,
      sca: 0.95,
      decisao: 'COMPRAR',
      estrategias: {
        buffett: { sinal: 0, recomendacao: 'MANTER' },
        cerrado: { sinal: 1, recomendacao: 'COMPRAR' },
        arca: { sinal: 1, recomendacao: 'COMPRAR' }
      }
    },
    {
      ticker: 'NASD11',
      nome: 'ETF Nasdaq',
      classe: 'ETF',
      preco: 6425.00,
      variacao: 2.3,
      mm200: 10.2,
      momentum: 15.8,
      sca: 0.82,
      decisao: 'COMPRAR',
      estrategias: {
        buffett: { sinal: 0, recomendacao: 'MANTER' },
        cerrado: { sinal: 1, recomendacao: 'COMPRAR' },
        arca: { sinal: 1, recomendacao: 'COMPRAR' }
      }
    },
    {
      ticker: 'ABCB34',
      nome: 'Abcam',
      classe: 'BDR',
      preco: 8925.00,
      variacao: -0.8,
      mm200: -1.5,
      momentum: -2.3,
      sca: 0.42,
      decisao: 'VENDER',
      estrategias: {
        buffett: { sinal: -1, recomendacao: 'VENDER' },
        cerrado: { sinal: -1, recomendacao: 'VENDER' },
        arca: { sinal: 0, recomendacao: 'MANTER' }
      }
    },
    {
      ticker: 'VISC11',
      nome: 'Vinci Shopping Centers',
      classe: 'FII',
      preco: 3950.00,
      variacao: -0.2,
      mm200: -0.8,
      momentum: -1.2,
      sca: 0.48,
      decisao: 'MANTER',
      estrategias: {
        buffett: { sinal: 0, recomendacao: 'MANTER' },
        cerrado: { sinal: 0, recomendacao: 'MANTER' },
        arca: { sinal: -1, recomendacao: 'VENDER' }
      }
    },
    {
      ticker: 'AREA11',
      nome: 'Área Investimentos',
      classe: 'FII',
      preco: 870.10,
      variacao: -0.3,
      mm200: -1.2,
      momentum: -2.5,
      sca: 0.45,
      decisao: 'MANTER',
      estrategias: {
        buffett: { sinal: 0, recomendacao: 'MANTER' },
        cerrado: { sinal: -1, recomendacao: 'VENDER' },
        arca: { sinal: 0, recomendacao: 'MANTER' }
      }
    },
    {
      ticker: 'KDIF11',
      nome: 'Kinea Índices de Preços',
      classe: 'FII',
      preco: 103.21,
      variacao: 0.5,
      mm200: 1.8,
      momentum: 2.2,
      sca: 0.62,
      decisao: 'MANTER',
      estrategias: {
        buffett: { sinal: 0, recomendacao: 'MANTER' },
        cerrado: { sinal: 0, recomendacao: 'MANTER' },
        arca: { sinal: 1, recomendacao: 'COMPRAR' }
      }
    }
  ];
  
  // Ordenar ativos por variação para obter Top 5 e Bottom 5
  const ativosOrdenados = [...ativos].sort((a, b) => b.variacao - a.variacao);
  const top5 = ativosOrdenados.slice(0, 5);
  const bottom5 = ativosOrdenados.slice(-5).reverse();
  
  // Função para alterar o período selecionado
  const alterarPeriodo = (periodo) => {
    setPeriodoSelecionado(periodo);
  };
  
  // Função para obter a classe CSS baseada na variação
  const getVariacaoClass = (variacao) => {
    return variacao >= 0 ? 'positive' : 'negative';
  };
  
  // Função para obter a classe CSS baseada na decisão
  const getDecisaoClass = (decisao) => {
    switch (decisao) {
      case 'COMPRAR':
        return 'buy';
      case 'VENDER':
        return 'sell';
      default:
        return 'hold';
    }
  };
  
  return (
    <div className="painel-container">
      <h1 className="painel-title">Painel ao Vivo</h1>
      
      <div className="painel-section">
        <h2 className="painel-section-title">Performance da Carteira</h2>
        <div className="painel-card">
          <div className="painel-buttons">
            <button 
              className={`painel-button ${periodoSelecionado === '1m' ? 'active' : ''}`}
              onClick={() => alterarPeriodo('1m')}
            >
              1 mês
            </button>
            <button 
              className={`painel-button ${periodoSelecionado === '6m' ? 'active' : ''}`}
              onClick={() => alterarPeriodo('6m')}
            >
              6 meses
            </button>
            <button 
              className={`painel-button ${periodoSelecionado === '1y' ? 'active' : ''}`}
              onClick={() => alterarPeriodo('1y')}
            >
              1 ano
            </button>
            <button 
              className={`painel-button ${periodoSelecionado === 'all' ? 'active' : ''}`}
              onClick={() => alterarPeriodo('all')}
            >
              Desde o início
            </button>
          </div>
          <div className="painel-chart-placeholder">
            <p>Gráfico de performance da carteira será exibido aqui.</p>
            <p>Período selecionado: {
              periodoSelecionado === '1m' ? '1 mês' :
              periodoSelecionado === '6m' ? '6 meses' :
              periodoSelecionado === '1y' ? '1 ano' : 'Desde o início'
            }</p>
          </div>
        </div>
      </div>
      
      <div className="painel-section">
        <h2 className="painel-section-title">Indicadores</h2>
        <div className="painel-indicators-row">
          <div className="painel-card indicator-card">
            <h3>Top 5 Ativos</h3>
            <ul className="painel-list">
              {top5.map((ativo, index) => (
                <li key={index} className="painel-list-item">
                  <span>{ativo.ticker}</span>
                  <span className={getVariacaoClass(ativo.variacao)}>
                    {ativo.variacao >= 0 ? '▲' : '▼'} {Math.abs(ativo.variacao).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="painel-card indicator-card">
            <h3>Bottom 5 Ativos</h3>
            <ul className="painel-list">
              {bottom5.map((ativo, index) => (
                <li key={index} className="painel-list-item">
                  <span>{ativo.ticker}</span>
                  <span className={getVariacaoClass(ativo.variacao)}>
                    {ativo.variacao >= 0 ? '▲' : '▼'} {Math.abs(ativo.variacao).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="painel-section">
        <h2 className="painel-section-title">Estratégias de Investimento</h2>
        <div className="painel-strategies-row">
          <div className="painel-card strategy-card">
            <h3>Warren Buffett</h3>
            <p>Estratégia baseada em qualidade e valor, com foco em empresas com vantagens competitivas duradouras.</p>
            <div className="painel-strategy-info">
              <span className="painel-strategy-label">Critérios:</span>
              <ul className="painel-strategy-criteria">
                <li>Qualidade forte (F-Score ≥7)</li>
                <li>Valuation atrativo (EV/EBIT e P/B baixos)</li>
                <li>Tendência não contra (Preço ≥MM200)</li>
              </ul>
            </div>
          </div>
          
          <div className="painel-card strategy-card">
            <h3>Diagrama do Cerrado</h3>
            <p>Análise de quadrantes de qualidade e valuation, com ajustes para momentum e tendência.</p>
            <div className="painel-strategy-info">
              <span className="painel-strategy-label">Critérios:</span>
              <ul className="painel-strategy-criteria">
                <li>Quadrantes de Qualidade × Valuation</li>
                <li>Ajuste para Momentum e MM200</li>
              </ul>
            </div>
          </div>
          
          <div className="painel-card strategy-card">
            <h3>Método Arca</h3>
            <p>Foco em momentum e tendência, com ajustes para valuations extremos.</p>
            <div className="painel-strategy-info">
              <span className="painel-strategy-label">Critérios:</span>
              <ul className="painel-strategy-criteria">
                <li>Momentum e tendência como guias</li>
                <li>Ajuste para valuations extremos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="painel-section">
        <h2 className="painel-section-title">Ativos da Carteira</h2>
        <div className="painel-assets-grid">
          {ativos.map((ativo, index) => (
            <div key={index} className="painel-card asset-card">
              <div className="asset-header">
                <div className="asset-title">
                  <h3>{ativo.ticker}</h3>
                  <span className="asset-name">{ativo.nome}</span>
                </div>
                <span className="asset-class">{ativo.classe}</span>
              </div>
              <div className="asset-price">R$ {ativo.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <div className={`asset-variation ${getVariacaoClass(ativo.variacao)}`}>
                {ativo.variacao >= 0 ? '▲' : '▼'} {Math.abs(ativo.variacao).toFixed(1)}%
              </div>
              <div className="asset-metrics">
                <div className="asset-metric">
                  <span>MM200:</span>
                  <span className={getVariacaoClass(ativo.mm200)}>
                    {ativo.mm200 >= 0 ? '+' : ''}{ativo.mm200.toFixed(1)}%
                  </span>
                </div>
                <div className="asset-metric">
                  <span>Mom 12-1:</span>
                  <span className={getVariacaoClass(ativo.momentum)}>
                    {ativo.momentum >= 0 ? '+' : ''}{ativo.momentum.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className={`asset-decision ${getDecisaoClass(ativo.decisao)}`}>
                {ativo.decisao}
              </div>
              <div className="asset-strategies">
                <div className="asset-strategy">
                  <span>Buffett:</span>
                  <span className={getVariacaoClass(ativo.estrategias.buffett.sinal)}>
                    {ativo.estrategias.buffett.recomendacao}
                  </span>
                </div>
                <div className="asset-strategy">
                  <span>Cerrado:</span>
                  <span className={getVariacaoClass(ativo.estrategias.cerrado.sinal)}>
                    {ativo.estrategias.cerrado.recomendacao}
                  </span>
                </div>
                <div className="asset-strategy">
                  <span>Arca:</span>
                  <span className={getVariacaoClass(ativo.estrategias.arca.sinal)}>
                    {ativo.estrategias.arca.recomendacao}
                  </span>
                </div>
              </div>
              <div className="asset-sca">
                <div className="asset-sca-label">SCA: {ativo.sca.toFixed(2)}</div>
                <div className="asset-sca-bar">
                  <div className="asset-sca-fill" style={{ width: `${ativo.sca * 100}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .painel-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .painel-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #333;
        }
        
        .painel-section {
          margin-bottom: 30px;
        }
        
        .painel-section-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .painel-card {
          background-color: #fff;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 15px;
        }
        
        .painel-indicators-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .indicator-card {
          flex: 1;
          min-width: 200px;
          max-width: calc(50% - 8px);
        }
        
        .painel-strategies-row {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .strategy-card {
          flex: 1;
          min-width: 250px;
        }
        
        .painel-assets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .painel-buttons {
          display: flex;
          gap: 10px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }
        
        .painel-button {
          padding: 8px 12px;
          border: none;
          background-color: #f0f0f0;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .painel-button.active {
          background-color: #4a89dc;
          color: white;
        }
        
        .painel-chart-placeholder {
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #f9f9f9;
          border-radius: 4px;
          color: #666;
        }
        
        .painel-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .painel-list-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        
        .painel-list-item:last-child {
          border-bottom: none;
        }
        
        .positive {
          color: #4caf50;
        }
        
        .negative {
          color: #f44336;
        }
        
        .neutral {
          color: #ff9800;
        }
        
        .painel-strategy-info {
          margin-top: 10px;
          font-size: 14px;
        }
        
        .painel-strategy-label {
          font-weight: 600;
        }
        
        .painel-strategy-criteria {
          margin: 5px 0 0 0;
          padding-left: 20px;
          font-size: 13px;
          color: #666;
        }
        
        .asset-card {
          display: flex;
          flex-direction: column;
        }
        
        .asset-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .asset-title {
          display: flex;
          flex-direction: column;
        }
        
        .asset-title h3 {
          margin: 0;
          font-size: 18px;
        }
        
        .asset-name {
          font-size: 14px;
          color: #666;
        }
        
        .asset-class {
          background-color: #f0f0f0;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .asset-price {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .asset-variation {
          margin-bottom: 10px;
        }
        
        .asset-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .asset-metric {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }
        
        .asset-decision {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 4px;
          font-weight: 600;
          margin-bottom: 10px;
        }
        
        .asset-decision.buy {
          background-color: rgba(76, 175, 80, 0.1);
          color: #4caf50;
        }
        
        .asset-decision.sell {
          background-color: rgba(244, 67, 54, 0.1);
          color: #f44336;
        }
        
        .asset-decision.hold {
          background-color: rgba(255, 152, 0, 0.1);
          color: #ff9800;
        }
        
        .asset-strategies {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 5px;
          margin-bottom: 10px;
          font-size: 13px;
        }
        
        .asset-strategy {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .asset-sca-label {
          font-size: 14px;
          margin-bottom: 5px;
        }
        
        .asset-sca-bar {
          height: 6px;
          background-color: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .asset-sca-fill {
          height: 100%;
          background: linear-gradient(to right, #f44336, #ff9800, #4caf50);
        }
        
        @media (max-width: 768px) {
          .painel-indicators-row {
            flex-direction: column;
          }
          
          .indicator-card {
            max-width: 100%;
          }
          
          .painel-strategies-row {
            flex-direction: column;
          }
          
          .painel-assets-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default PainelLiveView;

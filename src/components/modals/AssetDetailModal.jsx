import React, { useState, useEffect } from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { fundamentalistData, patrimonyHistory } from '../../data/portfolioData-updated';
import AssetPerformanceChart from '../charts/AssetPerformanceChart';
import '../../styles/modal.css';

const AssetDetailModal = ({ asset, onClose, onSaveAsset }) => {
  const [timeRange, setTimeRange] = useState('1y');
  const [activeTab, setActiveTab] = useState('overview');
  const [showCerradoPopup, setShowCerradoPopup] = useState(false);
  const [showArcaPopup, setShowArcaPopup] = useState(false);
  const [showBuffettPopup, setShowBuffettPopup] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState('CDI');
  const [editFormData, setEditFormData] = useState({
    quantity: 0,
    averagePrice: 0,
  });
  const [saveStatus, setSaveStatus] = useState(null);

  const isNewAsset = !asset.quantity || asset.quantity === 0;
  const assetData = fundamentalistData[asset.symbol] || {};
  
  // Determinar o tipo de ativo para o gráfico de performance
  const getAssetType = () => {
    if (asset.symbol.includes('11')) return 'fii';
    if (asset.symbol.includes('34')) return 'bdr';
    if (asset.symbol === 'BTC') return 'crypto';
    if (asset.symbol === 'CDB') return 'fixed_income';
    return 'stock';
  };
  
  // Pontuação para o método Arca (simulada)
  const arcaScore = {
    value: Math.round((assetData.diagramaCerradoScore || 7.5) * 10),
    color: getScoreColor((assetData.diagramaCerradoScore || 7.5) * 10)
  };

  // Recomendação baseada na pontuação
  const recommendation = getRecommendation(arcaScore.value);

  useEffect(() => {
    if (asset) {
      setEditFormData({
        quantity: asset.quantity || 0,
        averagePrice: asset.price || (asset.value / asset.quantity) || 0,
      });
    }
    // Se for um novo ativo, abrir diretamente na aba de adicionar
    if (isNewAsset) {
      setActiveTab('add');
    }
  }, [asset, isNewAsset]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!asset) {
    return null;
  }

  function getScoreColor(score) {
    if (score >= 80) return '#22c55e'; // Verde
    if (score >= 60) return '#eab308'; // Amarelo
    return '#ef4444'; // Vermelho
  }

  function getRecommendation(score) {
    if (score >= 80) return { text: 'Comprar', color: '#22c55e' };
    if (score >= 60) return { text: 'Manter', color: '#eab308' };
    return { text: 'Vender', color: '#ef4444' };
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const handleSave = () => {
    setSaveStatus('saving');
    console.log("Salvando ativo:", { ...asset, ...editFormData });
    // Simular chamada de API
    setTimeout(() => {
      if (onSaveAsset) {
        onSaveAsset({ ...asset, ...editFormData });
      }
      setSaveStatus('success');
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  const toggleIndicator = (indicator) => {
    setSelectedIndicator(indicator);
  };

  const renderTabs = () => {
    const tabs = [
      { id: 'overview', label: 'Visão Geral' },
      { id: 'fundamentals', label: 'Fundamentos' },
      { id: 'performance', label: 'Performance' },
      { id: 'recommendation', label: 'Recomendação' },
    ];

    // Adicionar aba de edição/adição
    if (isNewAsset) {
      tabs.push({ id: 'add', label: 'Adicionar à Carteira' });
    } else {
      tabs.push({ id: 'edit', label: 'Editar Posição' });
    }

    return (
      <div className="modal-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`modal-tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  const renderAddOrEditContent = () => (
    <div className="modal-form">
      <h3 className="modal-form-title">{isNewAsset ? 'Adicionar Novo Ativo' : 'Editar Posição'}</h3>
      <p className="modal-form-subtitle">
        {isNewAsset 
          ? 'Informe a quantidade e o preço médio da sua compra inicial.' 
          : 'Atualize a quantidade de ativos e o preço médio da sua posição.'}
      </p>
      
      <div className="form-group">
        <label htmlFor="quantity">Quantidade de Títulos</label>
        <input 
          type="number" 
          id="quantity" 
          name="quantity" 
          value={editFormData.quantity}
          onChange={handleFormChange}
          className="form-input"
          placeholder="Ex: 100"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="averagePrice">Preço Médio de Compra (R$)</label>
        <input 
          type="number" 
          id="averagePrice" 
          name="averagePrice" 
          value={editFormData.averagePrice}
          onChange={handleFormChange}
          className="form-input"
          placeholder="Ex: 25.50"
        />
      </div>
      
      <div className="modal-form-actions">
        <button onClick={handleSave} className="save-button" disabled={saveStatus === 'saving'}>
          {saveStatus === 'saving' ? 'Salvando...' : 'Salvar na Carteira'}
        </button>
      </div>

      {saveStatus === 'success' && <div className="save-feedback success">Ativo salvo com sucesso!</div>}
      {saveStatus === 'error' && <div className="save-feedback error">Erro ao salvar. Tente novamente.</div>}
    </div>
  );

  const renderOverviewContent = () => (
    <div className="modal-overview">
      <div className="asset-price-info">
        <div className="current-price">
          <span className="label">Preço Atual:</span>
          <span className="value">{formatCurrency(asset.price)}</span>
        </div>
        <div className="price-change">
          <span className="label">Variação:</span>
          <span className={`value ${asset.change >= 0 ? 'positive' : 'negative'}`}>
            {asset.change >= 0 ? '▲' : '▼'} {formatPercentage(asset.change)}
          </span>
        </div>
      </div>

      {!isNewAsset && (
        <div className="position-info">
          <div className="position-item">
            <span className="label">Quantidade:</span>
            <span className="value">{asset.quantity}</span>
          </div>
          <div className="position-item">
            <span className="label">Preço Médio:</span>
            <span className="value">{formatCurrency(asset.price)}</span>
          </div>
          <div className="position-item">
            <span className="label">Total Investido:</span>
            <span className="value">{formatCurrency(asset.value)}</span>
          </div>
        </div>
      )}

      <div className="score-card">
        <h3>Pontuação Geral</h3>
        <div className="score-bar-container">
          <div 
            className="score-bar" 
            style={{ 
              width: `${arcaScore.value}%`, 
              backgroundColor: arcaScore.color 
            }}
          ></div>
        </div>
        <div className="score-value">{arcaScore.value}/100</div>
      </div>

      <div className="recommendation-card">
        <h3>Recomendação</h3>
        <div 
          className="recommendation-value"
          style={{ color: recommendation.color }}
        >
          {recommendation.text}
        </div>
      </div>
    </div>
  );

  const renderFundamentalsContent = () => (
    <div className="modal-fundamentals">
      {assetData.bestIndicators && (
        <div className="indicators-section">
          <h3>Melhores Indicadores</h3>
          <ul className="indicators-list">
            {assetData.bestIndicators.map((indicator, index) => (
              <li key={index} className="indicator-item positive">
                <span className="indicator-name">{indicator.name}:</span>
                <span className="indicator-value">{indicator.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {assetData.worstIndicators && (
        <div className="indicators-section">
          <h3>Indicadores a Melhorar</h3>
          <ul className="indicators-list">
            {assetData.worstIndicators.map((indicator, index) => (
              <li key={index} className="indicator-item negative">
                <span className="indicator-name">{indicator.name}:</span>
                <span className="indicator-value">{indicator.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="analysis-methods">
        <div className="analysis-method" onClick={() => setShowBuffettPopup(true)}>
          <h3>Método Warren Buffett</h3>
          <p>Análise baseada em qualidade e valor</p>
          <button className="view-details-btn">Ver Detalhes</button>
        </div>

        <div className="analysis-method" onClick={() => setShowCerradoPopup(true)}>
          <h3>Diagrama do Cerrado</h3>
          <p>Pontuação: {assetData.diagramaCerradoScore?.toFixed(1) || "N/A"}/10</p>
          <button className="view-details-btn">Ver Detalhes</button>
        </div>

        <div className="analysis-method" onClick={() => setShowArcaPopup(true)}>
          <h3>Método Arca</h3>
          <p>Análise quantitativa e qualitativa</p>
          <button className="view-details-btn">Ver Detalhes</button>
        </div>
      </div>
    </div>
  );

  const renderPerformanceContent = () => (
    <div className="modal-performance">
      <div className="chart-container" style={{ height: '300px' }}>
        <h3>Performance do Ativo vs. Índices</h3>
        <div className="chart-wrapper" style={{ height: '250px' }}>
          <AssetPerformanceChart 
            symbol={asset.symbol}
            timeRange={timeRange}
            assetType={getAssetType()}
            isFII={asset.symbol.includes('11')}
          />
        </div>
      </div>

      <div className="indicators-selector">
        {['CDI', 'IBOV', 'SELIC', 'FII', 'IAFD', 'IPCA'].map(indicator => (
          <div 
            key={indicator}
            className={`indicator-chip ${selectedIndicator === indicator ? 'active' : ''}`}
            onClick={() => toggleIndicator(indicator)}
          >
            {indicator}
          </div>
        ))}
      </div>

      <div className="time-range-selector">
        <button 
          className={`time-range-btn ${timeRange === '1m' ? 'active' : ''}`}
          onClick={() => setTimeRange('1m')}
        >
          1 mês
        </button>
        <button 
          className={`time-range-btn ${timeRange === '6m' ? 'active' : ''}`}
          onClick={() => setTimeRange('6m')}
        >
          6 meses
        </button>
        <button 
          className={`time-range-btn ${timeRange === '1y' ? 'active' : ''}`}
          onClick={() => setTimeRange('1y')}
        >
          1 ano
        </button>
        <button 
          className={`time-range-btn ${timeRange === 'all' ? 'active' : ''}`}
          onClick={() => setTimeRange('all')}
        >
          Desde o início
        </button>
      </div>
    </div>
  );

  const renderRecommendationContent = () => (
    <div className="modal-recommendation">
      <div className="recommendation-header">
        <h3>Recomendação para {asset.symbol}</h3>
        <div 
          className="recommendation-badge"
          style={{ backgroundColor: recommendation.color }}
        >
          {recommendation.text}
        </div>
      </div>

      <div className="recommendation-details">
        <p>
          Com base na análise fundamentalista e técnica, nossa recomendação para {asset.name} ({asset.symbol}) é:
        </p>
        
        <div className="recommendation-reasoning">
          <h4>Pontos Fortes:</h4>
          <ul>
            {assetData.bestIndicators?.map((indicator, index) => (
              <li key={index}>{indicator.name}: {indicator.value}</li>
            )) || <li>Dados não disponíveis</li>}
          </ul>
          
          <h4>Pontos de Atenção:</h4>
          <ul>
            {assetData.worstIndicators?.map((indicator, index) => (
              <li key={index}>{indicator.name}: {indicator.value}</li>
            )) || <li>Dados não disponíveis</li>}
          </ul>
        </div>
        
        <div className="recommendation-action">
          <h4>Ação Recomendada:</h4>
          <p>{getActionDescription(recommendation.text)}</p>
        </div>
      </div>
    </div>
  );

  function getActionDescription(recommendation) {
    switch(recommendation) {
      case 'Comprar':
        return 'Recomendamos aumentar a posição neste ativo, aproveitando o bom momento e fundamentos sólidos.';
      case 'Manter':
        return 'Recomendamos manter a posição atual, monitorando os indicadores que precisam melhorar.';
      case 'Vender':
        return 'Recomendamos reduzir ou eliminar a posição, considerando os riscos e fundamentos fracos.';
      default:
        return 'Análise em andamento.';
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewContent();
      case 'fundamentals':
        return renderFundamentalsContent();
      case 'performance':
        return renderPerformanceContent();
      case 'recommendation':
        return renderRecommendationContent();
      case 'add':
      case 'edit':
        return renderAddOrEditContent();
      default:
        return <div>Conteúdo não disponível</div>;
    }
  };

  // Popups para métodos de análise
  const renderBuffettPopup = () => (
    <div className="analysis-popup" onClick={() => setShowBuffettPopup(false)}>
      <div className="analysis-popup-content" onClick={e => e.stopPropagation()}>
        <h3>Método Warren Buffett</h3>
        <p>Estratégia baseada em qualidade e valor, com foco em empresas com vantagens competitivas duradouras.</p>
        
        <h4>Critérios de Análise:</h4>
        <ul>
          <li>Qualidade forte (F-Score ≥7)</li>
          <li>Valuation atrativo (EV/EBIT e P/B baixos)</li>
          <li>Tendência não contra (Preço ≥MM200)</li>
        </ul>
        
        <button className="close-popup-btn" onClick={() => setShowBuffettPopup(false)}>Fechar</button>
      </div>
    </div>
  );

  const renderCerradoPopup = () => (
    <div className="analysis-popup" onClick={() => setShowCerradoPopup(false)}>
      <div className="analysis-popup-content" onClick={e => e.stopPropagation()}>
        <h3>Diagrama do Cerrado</h3>
        <p>Análise de quadrantes de qualidade e valuation, com pontuação de 0 a 10.</p>
        
        <h4>Pontuação para {asset.symbol}: {assetData.diagramaCerradoScore?.toFixed(1) || "N/A"}/10</h4>
        
        <div className="cerrado-quadrants">
          <div className="cerrado-quadrant">
            <h5>Quadrante 1</h5>
            <p>Alta qualidade, bom preço</p>
          </div>
          <div className="cerrado-quadrant">
            <h5>Quadrante 2</h5>
            <p>Alta qualidade, preço alto</p>
          </div>
          <div className="cerrado-quadrant">
            <h5>Quadrante 3</h5>
            <p>Baixa qualidade, bom preço</p>
          </div>
          <div className="cerrado-quadrant">
            <h5>Quadrante 4</h5>
            <p>Baixa qualidade, preço alto</p>
          </div>
        </div>
        
        <button className="close-popup-btn" onClick={() => setShowCerradoPopup(false)}>Fechar</button>
      </div>
    </div>
  );

  const renderArcaPopup = () => (
    <div className="analysis-popup" onClick={() => setShowArcaPopup(false)}>
      <div className="analysis-popup-content" onClick={e => e.stopPropagation()}>
        <h3>Método Arca</h3>
        <p>Sistema proprietário de análise que combina fatores quantitativos e qualitativos.</p>
        
        <h4>Pontuação para {asset.symbol}: {arcaScore.value}/100</h4>
        
        <div className="arca-score-bar-container">
          <div 
            className="arca-score-bar" 
            style={{ 
              width: `${arcaScore.value}%`, 
              backgroundColor: arcaScore.color 
            }}
          ></div>
        </div>
        
        <h4>Fatores Analisados:</h4>
        <ul>
          <li>Saúde Financeira</li>
          <li>Crescimento</li>
          <li>Valuation</li>
          <li>Qualidade da Gestão</li>
          <li>Vantagens Competitivas</li>
        </ul>
        
        <button className="close-popup-btn" onClick={() => setShowArcaPopup(false)}>Fechar</button>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="asset-identity">
            <h2 className="asset-symbol">{asset.symbol}</h2>
            <p className="asset-name">{asset.name}</p>
          </div>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        {renderTabs()}
        
        <div className="modal-content">
          {renderContent()}
        </div>

        {/* Popups para métodos de análise */}
        {showBuffettPopup && renderBuffettPopup()}
        {showCerradoPopup && renderCerradoPopup()}
        {showArcaPopup && renderArcaPopup()}
      </div>
    </div>
  );
};

export default AssetDetailModal;

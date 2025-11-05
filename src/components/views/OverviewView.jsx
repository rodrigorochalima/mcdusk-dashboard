import React, { useState, useEffect } from 'react';
import { 
  getAssetClasses,
  getTotalPatrimony,
  economicIndicators, 
  performance, 
  patrimonyHistory
} from '../../data/portfolioData-new';
import TotalPatrimonyCard from '../cards/TotalPatrimonyCard';
import AssetClassCard from '../cards/AssetClassCard';
import AssetDetailsCard from '../cards/AssetDetailsCard';

/**
 * Componente de visão geral - VERSÃO DINÂMICA
 * Carrega dados do localStorage e atualiza automaticamente
 */
const OverviewView = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assetClasses, setAssetClasses] = useState([]);
  const [totalPatrimony, setTotalPatrimony] = useState({ value: 0, change: 0, changePercent: 0 });
  const [loading, setLoading] = useState(true);

  // Função para carregar dados frescos do localStorage
  const loadData = () => {
    console.log('📊 OverviewView: Carregando dados frescos do localStorage...');
    try {
      const freshAssetClasses = getAssetClasses();
      const freshTotalPatrimony = getTotalPatrimony();
      
      setAssetClasses(freshAssetClasses);
      setTotalPatrimony(freshTotalPatrimony);
      setLoading(false);
      
      console.log('✅ OverviewView: Dados carregados!', {
        categorias: freshAssetClasses.length,
        total: freshTotalPatrimony.value.toFixed(2)
      });
    } catch (error) {
      console.error('❌ OverviewView: Erro ao carregar dados:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Carregar dados ao montar o componente
    loadData();

    // Escutar evento de atualização do portfólio
    const handlePortfolioUpdate = () => {
      console.log('🔄 OverviewView: Evento portfolioUpdated recebido!');
      loadData();
    };

    window.addEventListener('portfolioUpdated', handlePortfolioUpdate);

    // Cleanup: remover listener ao desmontar
    return () => {
      window.removeEventListener('portfolioUpdated', handlePortfolioUpdate);
    };
  }, []);

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleBack = () => {
    setSelectedAsset(null);
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>⏳ Carregando portfólio...</p>
      </div>
    );
  }

  if (selectedAsset) {
    return (
      <div>
        <button onClick={handleBack} className="back-button">← Voltar</button>
        <AssetDetailsCard asset={selectedAsset} portfolioHistory={patrimonyHistory} />
      </div>
    );
  }

  return (
    <div>
      {/* Card de Patrimônio Total */}
      <TotalPatrimonyCard patrimony={totalPatrimony} />
      
      {/* Card de Performance */}
      <div className="card">
        <div className="card-title">
          <span className="card-title-icon">📊</span>
          <span>Performance</span>
        </div>
        <div className="value-medium">
          vs {performance.benchmark} <span className={performance.value >= 0 ? 'positive' : 'negative'}>
            {performance.value >= 0 ? '+' : ''}{performance.value}% {performance.value >= 0 ? '▲' : '▼'}
          </span>
        </div>
      </div>
      
      {/* Card de Indicadores */}
      <div className="card">
        <div className="card-title">
          <span className="card-title-icon">📈</span>
          <span>Indicadores</span>
        </div>
        <div className="indicators-container">
          {economicIndicators.map(indicator => (
            <div key={indicator.id} className={`indicator indicator-${indicator.id}`}>
              <div className="indicator-label">{indicator.name}</div>
              <div className="indicator-value">{indicator.value}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Cards de Classes de Ativos */}
      {assetClasses.length > 0 ? (
        assetClasses.map((assetClass) => (
          <AssetClassCard 
            key={assetClass.id} 
            assetClass={assetClass} 
            onAssetSelect={handleAssetSelect}
            onDataUpdate={loadData}
          />
        ))
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <p>📭 Nenhum ativo encontrado no portfólio.</p>
          <p>Adicione ativos para começar a acompanhar seus investimentos.</p>
        </div>
      )}
    </div>
  );
};

export default OverviewView;


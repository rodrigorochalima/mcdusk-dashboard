import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AssetCard from '../cards/AssetCard';
import AssetDetailModal from '../modals/AssetDetailModal';
import { userAssets as initialPortfolio } from '../../data/userAssets'; // Importando os ativos do usuário

const DiscoveryView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState(initialPortfolio);

  // Mockup de uma função de busca que retorna resultados de uma API
  const searchAssets = async (query) => {
    if (!query) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    setError(null);
    // Simula uma chamada de API
    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      // Mock de dados de ativos. Em um app real, viria de uma API.
      const allAssets = [
        { symbol: 'PETR4', name: 'Petrobras', price: 38.50, change: 1.2, logo: '/assets/logos/petr4.png' },
        { symbol: 'PETR3', name: 'Petrobras', price: 40.20, change: 1.5, logo: '/assets/logos/petr3.png' },
        { symbol: 'VALE3', name: 'Vale', price: 62.75, change: -0.5, logo: '/assets/logos/vale3.png' },
        { symbol: 'VALE5', name: 'Vale', price: 65.30, change: -0.3, logo: '/assets/logos/vale5.png' },
        { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 31.20, change: 0.8, logo: '/assets/logos/itub4.png' },
        { symbol: 'ITUB3', name: 'Itaú Unibanco', price: 32.10, change: 0.9, logo: '/assets/logos/itub3.png' },
        { symbol: 'BBDC4', name: 'Bradesco', price: 13.50, change: 0.2, logo: '/assets/logos/bbdc4.png' },
        { symbol: 'BBDC3', name: 'Bradesco', price: 14.20, change: 0.3, logo: '/assets/logos/bbdc3.png' },
        { symbol: 'MGLU3', name: 'Magazine Luiza', price: 2.15, change: -3.1, logo: '/assets/logos/mglu3.png' },
        { symbol: 'BBAS3', name: 'Banco do Brasil', price: 28.90, change: 0.5, logo: '/assets/logos/bbas3.png' },
        { symbol: 'ABEV3', name: 'Ambev', price: 13.25, change: -0.2, logo: '/assets/logos/abev3.png' },
        { symbol: 'WEGE3', name: 'WEG', price: 42.80, change: 1.8, logo: '/assets/logos/wege3.png' },
        { symbol: 'RENT3', name: 'Localiza', price: 55.40, change: 2.1, logo: '/assets/logos/rent3.png' },
        { symbol: 'ELET3', name: 'Eletrobras', price: 45.60, change: 0.7, logo: '/assets/logos/elet3.png' },
        { symbol: 'ELET6', name: 'Eletrobras', price: 47.20, change: 0.8, logo: '/assets/logos/elet6.png' },
        { symbol: 'SUZB3', name: 'Suzano', price: 52.30, change: -1.2, logo: '/assets/logos/suzb3.png' },
        { symbol: 'RAIL3', name: 'Rumo', price: 18.75, change: 1.5, logo: '/assets/logos/rail3.png' },
        { symbol: 'RADL3', name: 'Raia Drogasil', price: 24.60, change: 0.4, logo: '/assets/logos/radl3.png' },
        { symbol: 'PRIO3', name: 'PRIO', price: 48.90, change: 2.3, logo: '/assets/logos/prio3.png' },
        { symbol: 'ALPA4', name: 'Alpargatas', price: 8.45, change: -0.8, logo: '/assets/logos/alpa4.png' },
      ];
      const filteredAssets = allAssets.filter(asset => 
        asset.symbol.toLowerCase().includes(query.toLowerCase()) || 
        asset.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredAssets);
    } catch (err) {
      setError('Erro ao buscar ativos. Tente novamente.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveAsset = (assetToAdd) => {
    setPortfolio(currentPortfolio => {
      const existingAssetIndex = currentPortfolio.findIndex(a => a.symbol === assetToAdd.symbol);
      if (existingAssetIndex > -1) {
        const updatedPortfolio = [...currentPortfolio];
        updatedPortfolio[existingAssetIndex] = { ...updatedPortfolio[existingAssetIndex], ...assetToAdd };
        return updatedPortfolio;
      } else {
        return [...currentPortfolio, assetToAdd];
      }
    });
  };

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAsset(null);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchAssets(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="discovery-container">
      <div className="card search-card">
        <div className="search-input-container">
          <Search className="search-icon" />
          <input 
            type="text"
            placeholder="Buscar por ticker ou nome do ativo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="discovery-results">
        {isSearching && <p>Buscando...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isSearching && searchResults.length > 0 && (
          <div className="assets-grid">
            {searchResults.map(asset => (
              <AssetCard key={asset.symbol} asset={asset} onClick={() => handleAssetClick(asset)} />
            ))}
          </div>
        )}
        {!isSearching && searchResults.length === 0 && searchQuery && (
          <p>Nenhum ativo encontrado para "{searchQuery}".</p>
        )}
      </div>

      {showModal && selectedAsset && (
        <AssetDetailModal 
          asset={selectedAsset} 
          onClose={handleCloseModal}
          onSaveAsset={handleSaveAsset}
        />
      )}
    </div>
  );
};

export default DiscoveryView;


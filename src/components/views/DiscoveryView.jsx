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
        { symbol: 'VALE3', name: 'Vale', price: 62.75, change: -0.5, logo: '/assets/logos/vale3.png' },
        { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 31.20, change: 0.8, logo: '/assets/logos/itub4.png' },
        { symbol: 'BBDC4', name: 'Bradesco', price: 13.50, change: 0.2, logo: '/assets/logos/bbdc4.png' },
        { symbol: 'MGLU3', name: 'Magazine Luiza', price: 2.15, change: -3.1, logo: '/assets/logos/mglu3.png' },
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


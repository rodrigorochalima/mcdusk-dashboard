import React from 'react';
import AssetDetailModal from '../modals/AssetDetailModal';

/**
 * Componente para exibir os 5 melhores e 5 piores ativos
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.assets - Lista de ativos
 */
const TopBottomAssetsCard = ({ assets }) => {
  const [selectedAsset, setSelectedAsset] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  // Ordenar os ativos por variação percentual
  const sortedAssets = [...assets].sort((a, b) => b.change - a.change);
  const top5 = sortedAssets.slice(0, 5);
  const bottom5 = sortedAssets.slice(-5).reverse();

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAsset(null);
  };

  const handleSaveAsset = (updatedAsset) => {
    console.log('Asset saved:', updatedAsset);
    // Aqui você pode implementar a lógica para salvar o ativo atualizado
    // Por exemplo, chamar uma API ou atualizar o estado global
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Top/Bottom Ativos</h2>
      </div>
      <div className="card-content">
        <div className="top-bottom-container">
          <div className="top-assets">
            <h3>Top 5 Ativos</h3>
            <ul className="assets-list">
              {top5.map((asset, index) => (
                <li 
                  key={index} 
                  className="asset-item"
                  onClick={() => handleAssetClick(asset)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="asset-info">
                    <span className="asset-symbol">{asset.symbol}</span>
                    <span className="asset-name">{asset.name}</span>
                  </div>
                  <span className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                    {asset.change >= 0 ? '▲' : '▼'} {asset.change.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-assets">
            <h3>Bottom 5 Ativos</h3>
            <ul className="assets-list">
              {bottom5.map((asset, index) => (
                <li 
                  key={index} 
                  className="asset-item"
                  onClick={() => handleAssetClick(asset)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="asset-info">
                    <span className="asset-symbol">{asset.symbol}</span>
                    <span className="asset-name">{asset.name}</span>
                  </div>
                  <span className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                    {asset.change >= 0 ? '▲' : '▼'} {asset.change.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal de detalhes do ativo */}
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

export default TopBottomAssetsCard;

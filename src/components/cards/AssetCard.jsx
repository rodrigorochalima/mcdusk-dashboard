import React, { useState } from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import AssetDetailModalComplete from '../modals/AssetDetailModalComplete';
import EditAssetModal from '../modals/EditAssetModal';

/**
 * Componente para exibir um ativo individual
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.asset - Dados do ativo
 * @param {Function} props.onClick - Função chamada ao clicar no ativo (opcional)
 */
const AssetCard = ({ asset, onClick }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Verificar se change é um número válido
  const isValid = asset.change !== undefined && 
                  asset.change !== null && 
                  !isNaN(asset.change);
  
  const isPositive = isValid ? asset.change >= 0 : false;
  
  // Formatar a variação percentual ou usar um valor padrão
  const formattedChange = isValid 
    ? formatPercentage(asset.change) 
    : '0,0%';

  const handleClick = () => {
    // Se houver uma função onClick passada como prop, chamá-la
    if (onClick) {
      onClick(asset);
    } else {
      // Caso contrário, mostrar o modal
      setShowModal(true);
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveAsset = (updatedAsset) => {
    console.log('Asset saved:', updatedAsset);
    // Aqui você pode implementar a lógica para salvar o ativo atualizado
    // Por exemplo, chamar uma API ou atualizar o estado global
  };

  return (
    <>
      <div 
        className="card asset-card" 
        onClick={handleClick}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEditModal(true);
          }}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.backgroundColor = '#1976D2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.backgroundColor = '#2196F3';
          }}
          title="Editar ativo"
        >
          ✏️
        </button>
        <div className="asset-card-header">
          <span className="asset-symbol">{asset.symbol}</span>
          <span className="asset-name">{asset.name}</span>
        </div>
        <div className="asset-card-body">
          <div className="asset-value">{formatCurrency(asset.value)}</div>
          <div className={`asset-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '▲' : '▼'} {formattedChange}
          </div>
        </div>
      </div>
      
      {/* Modal de detalhes do ativo */}
      {showModal && (
        <AssetDetailModalComplete 
          asset={asset} 
          onClose={handleCloseModal}
          onSaveAsset={handleSaveAsset}
        />
      )}
      
      {/* Modal de edição rápida */}
      {showEditModal && (
        <EditAssetModal 
          asset={asset} 
          onClose={() => setShowEditModal(false)}
          onSuccess={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default AssetCard;

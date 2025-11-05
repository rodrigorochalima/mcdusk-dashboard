import React, { useState } from 'react';
import { formatCurrency } from '../../lib/formatters';
import { updateAsset } from '../../modules/portfolio/portfolioManager';
import '../../styles/modal-complete.css';

/**
 * Modal simples de edição de ativo
 * Mantém 100% do estilo visual existente
 */
const EditAssetModal = ({ asset, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(asset.quantity || 0);
  const [price, setPrice] = useState(asset.price || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    
    const success = updateAsset(asset.symbol, {
      quantity: parseFloat(quantity),
      price: parseFloat(price)
    });
    
    if (success) {
      console.log('✅ Ativo atualizado com sucesso! Recarregando página...');
      if (onSuccess) onSuccess();
      // Recarregar a página para refletir as mudanças
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
    } else {
      alert('❌ Erro ao atualizar ativo');
      setSaving(false);
    }
  };

  return (
    <div className="asset-detail-modal-overlay" onClick={onClose}>
      <div className="asset-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div>
            <h2>✏️ Editar {asset.symbol}</h2>
            <p>{asset.name}</p>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content" style={{ padding: '30px' }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              fontSize: '16px',
              color: '#333'
            }}>
              Quantidade:
            </label>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                color: '#000',
                backgroundColor: '#fff'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '10px', 
              fontWeight: 'bold', 
              fontSize: '16px',
              color: '#333'
            }}>
              Preço Médio de Compra:
            </label>
            <input 
              type="number" 
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                color: '#000',
                backgroundColor: '#fff'
              }}
            />
          </div>

          <div style={{ 
            marginBottom: '25px', 
            padding: '20px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            border: '2px solid #e0e0e0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#666' }}>Valor Total:</span>
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#2196F3' }}>
                {formatCurrency(quantity * price)}
              </span>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '18px',
              fontWeight: 'bold',
              backgroundColor: saving ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: saving ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {saving ? '⏳ Salvando...' : '💾 Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAssetModal;


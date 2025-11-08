import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import '../../styles/modal.css';

const BuyAssetModal = ({ asset, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    const qty = parseFloat(quantity);
    const prc = parseFloat(price);

    if (!qty || qty <= 0) {
      setError('Quantidade deve ser maior que zero');
      return;
    }

    if (!prc || prc <= 0) {
      setError('Preço deve ser maior que zero');
      return;
    }

    setLoading(true);

    try {
      // Buscar o usuário atual
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Buscar o ativo existente
      const { data: existingAsset, error: fetchError } = await supabase
        .from('assets')
        .select('*')
        .eq('user_id', user.id)
        .eq('symbol', asset.symbol)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingAsset) {
        // Ativo já existe - atualizar quantidade e recalcular preço médio
        const currentQty = existingAsset.quantity;
        const currentAvgPrice = existingAsset.average_price;
        
        const newQty = currentQty + qty;
        const newAvgPrice = ((currentQty * currentAvgPrice) + (qty * prc)) / newQty;

        const { error: updateError } = await supabase
          .from('assets')
          .update({
            quantity: newQty,
            average_price: newAvgPrice,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingAsset.id);

        if (updateError) throw updateError;

      } else {
        // Ativo não existe - criar novo
        const { error: insertError } = await supabase
          .from('assets')
          .insert([{
            user_id: user.id,
            symbol: asset.symbol,
            name: asset.name,
            category: 'acoes', // Categoria padrão
            quantity: qty,
            average_price: prc,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (insertError) throw insertError;
      }

      // Sucesso!
      if (onSuccess) onSuccess();
      onClose();

    } catch (err) {
      console.error('Erro ao comprar ativo:', err);
      setError(err.message || 'Erro ao processar compra');
    } finally {
      setLoading(false);
    }
  };

  const totalValue = quantity && price ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💰 Comprar {asset.symbol}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label>Ativo</label>
              <input 
                type="text" 
                value={`${asset.symbol} - ${asset.name}`}
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </div>

            <div className="form-group">
              <label>Quantidade *</label>
              <input 
                type="number" 
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Ex: 100"
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Preço Unitário (R$) *</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 38.50"
                required
              />
            </div>

            <div className="form-group">
              <label>Valor Total</label>
              <input 
                type="text" 
                value={`R$ ${totalValue}`}
                disabled
                style={{ 
                  backgroundColor: '#e8f5e9', 
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              />
            </div>

            {error && (
              <div style={{
                backgroundColor: '#ffebee',
                color: '#c62828',
                padding: '12px',
                borderRadius: '8px',
                marginTop: '10px'
              }}>
                {error}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={loading}
              style={{ backgroundColor: '#4CAF50' }}
            >
              {loading ? 'Processando...' : '✓ Confirmar Compra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyAssetModal;


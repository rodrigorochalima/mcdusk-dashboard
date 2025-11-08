import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import '../../styles/modal.css';

const SellAssetModal = ({ asset, onClose, onSuccess }) => {
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

    if (qty > asset.quantity) {
      setError(`Você possui apenas ${asset.quantity} unidades de ${asset.symbol}`);
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

      if (fetchError) throw fetchError;

      const newQty = existingAsset.quantity - qty;

      if (newQty <= 0) {
        // Vender tudo - deletar o ativo
        const { error: deleteError } = await supabase
          .from('assets')
          .delete()
          .eq('id', existingAsset.id);

        if (deleteError) throw deleteError;

      } else {
        // Vender parcialmente - atualizar quantidade (preço médio mantém)
        const { error: updateError } = await supabase
          .from('assets')
          .update({
            quantity: newQty,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingAsset.id);

        if (updateError) throw updateError;
      }

      // Calcular lucro/prejuízo
      const buyValue = qty * existingAsset.average_price;
      const sellValue = qty * prc;
      const profit = sellValue - buyValue;
      const profitPercent = ((profit / buyValue) * 100).toFixed(2);

      // Mostrar resultado
      alert(
        `✅ Venda realizada com sucesso!\n\n` +
        `${qty} unidades de ${asset.symbol}\n` +
        `Preço de venda: R$ ${prc.toFixed(2)}\n` +
        `Valor total: R$ ${sellValue.toFixed(2)}\n\n` +
        `Resultado: ${profit >= 0 ? 'Lucro' : 'Prejuízo'} de R$ ${Math.abs(profit).toFixed(2)} (${profitPercent}%)`
      );

      // Sucesso!
      if (onSuccess) onSuccess();
      onClose();

    } catch (err) {
      console.error('Erro ao vender ativo:', err);
      setError(err.message || 'Erro ao processar venda');
    } finally {
      setLoading(false);
    }
  };

  const totalValue = quantity && price ? (parseFloat(quantity) * parseFloat(price)).toFixed(2) : '0.00';
  const costBasis = quantity && asset.average_price ? (parseFloat(quantity) * asset.average_price).toFixed(2) : '0.00';
  const profit = totalValue && costBasis ? (parseFloat(totalValue) - parseFloat(costBasis)).toFixed(2) : '0.00';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💸 Vender {asset.symbol}</h2>
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
              <label>Quantidade Disponível</label>
              <input 
                type="text" 
                value={`${asset.quantity} unidades`}
                disabled
                style={{ backgroundColor: '#fff3e0', fontWeight: 'bold' }}
              />
              <small style={{ color: '#ff6f00', fontSize: '13px', fontWeight: 'bold' }}>
                ⚠️ Se vender todas as unidades, o ativo será EXCLUÍDO da carteira
              </small>
            </div>

            <div className="form-group">
              <label>Quantidade a Vender *</label>
              <input 
                type="number" 
                step="0.01"
                max={asset.quantity}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder={`Máximo: ${asset.quantity}`}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label>Preço de Venda (R$) *</label>
              <input 
                type="number" 
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Ex: 42.00"
                required
              />
            </div>

            <div className="form-group">
              <label>Valor Total da Venda</label>
              <input 
                type="text" 
                value={`R$ ${totalValue}`}
                disabled
                style={{ 
                  backgroundColor: '#e3f2fd', 
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              />
            </div>

            <div className="form-group">
              <label>Custo de Aquisição</label>
              <input 
                type="text" 
                value={`R$ ${costBasis}`}
                disabled
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </div>

            <div className="form-group">
              <label>Lucro/Prejuízo Estimado</label>
              <input 
                type="text" 
                value={`R$ ${profit}`}
                disabled
                style={{ 
                  backgroundColor: parseFloat(profit) >= 0 ? '#e8f5e9' : '#ffebee',
                  color: parseFloat(profit) >= 0 ? '#2e7d32' : '#c62828',
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
              style={{ backgroundColor: '#f44336' }}
            >
              {loading ? 'Processando...' : '✓ Confirmar Venda'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellAssetModal;


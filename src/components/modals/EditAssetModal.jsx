import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import '../../styles/modal.css';

/**
 * Modal COMPLETO de edição de ativo
 * Permite ajuste fino de todos os parâmetros
 */
const EditAssetModal = ({ asset, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    symbol: asset.symbol || '',
    name: asset.name || '',
    category: asset.category || 'acoes',
    quantity: asset.quantity || 0,
    average_price: asset.average_price || 0,
    average_price_with_dividends: asset.average_price_with_dividends || 0,
    first_purchase_date: asset.first_purchase_date || '',
    target_price: asset.target_price || 0,
    stop_loss: asset.stop_loss || 0,
    notes: asset.notes || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'acoes', label: 'Ações' },
    { value: 'fiis', label: 'Fundos Imobiliários (FIIs)' },
    { value: 'bdrs', label: 'BDRs' },
    { value: 'etfs', label: 'ETFs' },
    { value: 'renda_fixa', label: 'Renda Fixa' },
    { value: 'criptomoedas', label: 'Criptomoedas' },
    { value: 'outros', label: 'Outros' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!formData.symbol || !formData.name) {
      setError('Símbolo e Nome são obrigatórios');
      return;
    }

    if (formData.quantity < 0) {
      setError('Quantidade não pode ser negativa');
      return;
    }

    if (formData.average_price < 0) {
      setError('Preço médio não pode ser negativo');
      return;
    }

    setLoading(true);

    try {
      // Buscar o usuário atual
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      // Atualizar o ativo
      const { error: updateError } = await supabase
        .from('assets')
        .update({
          symbol: formData.symbol.toUpperCase(),
          name: formData.name,
          category: formData.category,
          quantity: parseFloat(formData.quantity),
          average_price: parseFloat(formData.average_price),
          average_price_with_dividends: parseFloat(formData.average_price_with_dividends) || null,
          first_purchase_date: formData.first_purchase_date || null,
          target_price: parseFloat(formData.target_price) || null,
          stop_loss: parseFloat(formData.stop_loss) || null,
          notes: formData.notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('symbol', asset.symbol);

      if (updateError) throw updateError;

      // Sucesso!
      if (onSuccess) onSuccess();
      
      // Recarregar a página para refletir as mudanças
      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {
      console.error('Erro ao atualizar ativo:', err);
      setError(err.message || 'Erro ao salvar alterações');
      setLoading(false);
    }
  };

  const totalValue = formData.quantity * formData.average_price;
  const totalValueWithDividends = formData.quantity * (formData.average_price_with_dividends || formData.average_price);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h2>✏️ Edição Completa do Ativo</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            
            {/* Seção: Identificação */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#2196F3',
                borderBottom: '2px solid #2196F3',
                paddingBottom: '8px'
              }}>
                📋 Identificação
              </h3>

              <div className="form-group">
                <label>Símbolo (Ticker) *</label>
                <input 
                  type="text" 
                  value={formData.symbol}
                  onChange={(e) => handleChange('symbol', e.target.value.toUpperCase())}
                  placeholder="Ex: PETR4"
                  required
                  style={{ textTransform: 'uppercase' }}
                />
              </div>

              <div className="form-group">
                <label>Nome do Ativo *</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Ex: Petrobras"
                  required
                />
              </div>

              <div className="form-group">
                <label>Categoria *</label>
                <select 
                  value={formData.category}
                  onChange={(e) => handleChange('category', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#fff'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seção: Posição */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#4CAF50',
                borderBottom: '2px solid #4CAF50',
                paddingBottom: '8px'
              }}>
                📊 Posição
              </h3>

              <div className="form-group">
                <label>Quantidade *</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  placeholder="Ex: 100"
                  required
                />
              </div>

              <div className="form-group">
                <label>Preço Médio de Compra (R$) *</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.average_price}
                  onChange={(e) => handleChange('average_price', e.target.value)}
                  placeholder="Ex: 38.50"
                  required
                />
                <small style={{ color: '#666', fontSize: '13px' }}>
                  Preço médio pago nas compras (sem considerar proventos)
                </small>
              </div>

              <div className="form-group">
                <label>Preço Médio com Proventos (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.average_price_with_dividends}
                  onChange={(e) => handleChange('average_price_with_dividends', e.target.value)}
                  placeholder="Ex: 35.20"
                />
                <small style={{ color: '#666', fontSize: '13px' }}>
                  Preço médio ajustado após receber dividendos/JCP
                </small>
              </div>

              <div className="form-group">
                <label>Valor Total Investido</label>
                <input 
                  type="text" 
                  value={`R$ ${totalValue.toFixed(2)}`}
                  disabled
                  style={{ 
                    backgroundColor: '#e8f5e9', 
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                />
              </div>

              {formData.average_price_with_dividends > 0 && (
                <div className="form-group">
                  <label>Valor com Proventos</label>
                  <input 
                    type="text" 
                    value={`R$ ${totalValueWithDividends.toFixed(2)}`}
                    disabled
                    style={{ 
                      backgroundColor: '#e3f2fd', 
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Seção: Estratégia */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#FF9800',
                borderBottom: '2px solid #FF9800',
                paddingBottom: '8px'
              }}>
                🎯 Estratégia
              </h3>

              <div className="form-group">
                <label>Data da Primeira Compra</label>
                <input 
                  type="date" 
                  value={formData.first_purchase_date}
                  onChange={(e) => handleChange('first_purchase_date', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px'
                  }}
                />
              </div>

              <div className="form-group">
                <label>Preço Alvo (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.target_price}
                  onChange={(e) => handleChange('target_price', e.target.value)}
                  placeholder="Ex: 50.00"
                />
                <small style={{ color: '#666', fontSize: '13px' }}>
                  Preço que você considera ideal para venda
                </small>
              </div>

              <div className="form-group">
                <label>Stop Loss (R$)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.stop_loss}
                  onChange={(e) => handleChange('stop_loss', e.target.value)}
                  placeholder="Ex: 30.00"
                />
                <small style={{ color: '#666', fontSize: '13px' }}>
                  Preço mínimo antes de considerar venda por prejuízo
                </small>
              </div>
            </div>

            {/* Seção: Observações */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#9C27B0',
                borderBottom: '2px solid #9C27B0',
                paddingBottom: '8px'
              }}>
                📝 Observações
              </h3>

              <div className="form-group">
                <label>Notas / Comentários</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Ex: Ativo com bom histórico de dividendos. Acompanhar resultados trimestrais..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '16px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
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
            >
              {loading ? '⏳ Salvando...' : '💾 Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;


import React, { useState, useEffect } from 'react';
import { updateAsset } from '../../lib/supabasePortfolioManager';

export default function EditAssetModal({ asset, onClose, onSave }) {
  const [formData, setFormData] = useState({
    quantity: asset.quantity || 0,
    average_price: asset.average_price || 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Calcular valor total
  const totalValue = (formData.quantity * formData.average_price).toFixed(2);

  // Atualizar campo
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
    setError(null);
  }

  // Salvar alterações
  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      console.log('💾 EditAssetModal: Salvando ativo no Supabase...', {
        id: asset.id,
        symbol: asset.symbol,
        ...formData
      });

      // Validação
      if (formData.quantity <= 0) {
        throw new Error('Quantidade deve ser maior que zero');
      }

      if (formData.average_price <= 0) {
        throw new Error('Preço médio deve ser maior que zero');
      }

      // Atualizar no Supabase
      await updateAsset(asset.id, {
        quantity: formData.quantity,
        average_price: formData.average_price,
        current_price: formData.average_price // Atualizar preço atual também
      });

      console.log('✅ EditAssetModal: Ativo salvo com sucesso!');

      // Notificar componente pai
      onSave();
    } catch (err) {
      console.error('❌ EditAssetModal: Erro ao salvar:', err);
      setError(err.message || 'Erro ao salvar alterações');
      setSaving(false);
    }
  }

  // Fechar com ESC
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Editar Ativo</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              disabled={saving}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Ativo Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Ativo</p>
            <p className="text-lg font-bold">{asset.symbol}</p>
            <p className="text-sm text-gray-600">{asset.name}</p>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantidade
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.00000001"
              min="0"
              disabled={saving}
            />
          </div>

          {/* Preço Médio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preço Médio (R$)
            </label>
            <input
              type="number"
              name="average_price"
              value={formData.average_price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.01"
              min="0"
              disabled={saving}
            />
          </div>

          {/* Valor Total */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Valor Total</p>
            <p className="text-2xl font-bold text-blue-600">
              R$ {parseFloat(totalValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saving}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );
}


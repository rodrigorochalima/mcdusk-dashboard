import React from 'react';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

/**
 * Componente de modal simples para exibir detalhes do ativo
 * Baseado no teste bem-sucedido
 */
const AssetModalSimple = ({ asset, onClose }) => {
  if (!asset) return null;
  
  // Verificar se change é um número válido
  const isValid = asset.change !== undefined && 
                  asset.change !== null && 
                  !isNaN(asset.change);
  
  const isPositive = isValid ? asset.change >= 0 : false;
  
  // Formatar a variação percentual ou usar um valor padrão
  const formattedChange = isValid 
    ? formatPercentage(asset.change) 
    : '0,0%';
  
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div 
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            borderBottom: '1px solid #eee'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '18px' }}>
            {asset.name} ({asset.symbol})
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#666'
            }}
          >
            ×
          </button>
        </div>
        
        <div style={{ padding: '20px' }}>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '15px',
              marginBottom: '20px'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                Preço Atual
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {formatCurrency(asset.price || asset.value / asset.quantity)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                Variação
              </div>
              <div 
                style={{ 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: isPositive ? '#4caf50' : '#f44336'
                }}
              >
                {formattedChange} {isPositive ? '▲' : '▼'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                Quantidade
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {asset.quantity}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                Total
              </div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {formatCurrency(asset.value)}
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
              Diagrama do Cerrado
            </h3>
            <div style={{ marginBottom: '5px' }}>
              Nota Diagrama do Cerrado
            </div>
            <div 
              style={{ 
                height: '20px',
                backgroundColor: '#eee',
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  height: '100%',
                  width: `${(asset.cerradoScore || 7.5) * 10}%`,
                  backgroundColor: asset.cerradoScore >= 8 ? '#4caf50' : 
                                  asset.cerradoScore >= 6 ? '#ff9800' : '#f44336',
                  borderRadius: '10px'
                }}
              ></div>
              <div 
                style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#fff',
                  fontWeight: 'bold',
                  textShadow: '0 0 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {asset.cerradoScore || 7.5}
              </div>
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
              Análise Fundamentalista
            </h3>
            <div 
              style={{ 
                display: 'flex',
                gap: '20px'
              }}
            >
              <div 
                style={{ 
                  flex: 1,
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#e8f5e9'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
                  Melhores Indicadores
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>ROE:</span>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>23.5%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Dividend Yield:</span>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>2.25%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Margem Líquida:</span>
                  <span style={{ color: '#4caf50', fontWeight: 'bold' }}>18.2%</span>
                </div>
              </div>
              <div 
                style={{ 
                  flex: 1,
                  padding: '15px',
                  borderRadius: '8px',
                  backgroundColor: '#ffebee'
                }}
              >
                <h4 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
                  Piores Indicadores
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>P/L:</span>
                  <span style={{ color: '#f44336', fontWeight: 'bold' }}>24.8</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Dívida Líquida/EBITDA:</span>
                  <span style={{ color: '#f44336', fontWeight: 'bold' }}>1.8</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Crescimento Receita:</span>
                  <span style={{ color: '#f44336', fontWeight: 'bold' }}>3.2%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>
              Recomendação
            </h3>
            <div 
              style={{ 
                padding: '15px',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#4caf50',
                marginBottom: '15px'
              }}
            >
              COMPRAR
            </div>
            <div 
              style={{ 
                backgroundColor: '#f9f9f9',
                padding: '15px',
                borderRadius: '8px'
              }}
            >
              <p style={{ margin: '5px 0' }}>
                <strong>Estratégia Warren Buffett:</strong> Baseada nos indicadores fundamentalistas
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Diagrama do Cerrado:</strong> Nota {asset.cerradoScore || 7.5}/10
              </p>
              <p style={{ margin: '5px 0' }}>
                <strong>Método Arca:</strong> {asset.symbol.includes('11') ? 'Fundo Imobiliário (Recomendado)' : asset.symbol.includes('34') ? 'BDR (Internacional)' : 'Ação Brasileira'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetModalSimple;

import React from 'react';

/**
 * Logo McDuck - Inspirado no Tio Patinhas (Uncle Scrooge)
 * Tema: Investimentos, riqueza, gestão financeira
 */
export default function McDuckLogo({ size = 80 }) {
  return (
    <div className="flex justify-center mb-6">
      <div 
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(255, 215, 0, 0.3)',
          border: '4px solid #fff',
          position: 'relative'
        }}
      >
        {/* Símbolo $ estilizado */}
        <div style={{
          fontSize: size * 0.6,
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontFamily: 'Georgia, serif'
        }}>
          $
        </div>
        
        {/* Detalhe de brilho */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '30%',
          height: '30%',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          filter: 'blur(8px)'
        }} />
      </div>
    </div>
  );
}


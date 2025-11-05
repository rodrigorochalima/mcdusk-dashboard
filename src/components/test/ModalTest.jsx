import React, { useState } from 'react';

/**
 * Componente de teste para verificar se o modal funciona corretamente
 */
const ModalTest = () => {
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => {
    setShowModal(true);
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  
  return (
    <div className="modal-test-container">
      <button 
        onClick={openModal}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          margin: '20px'
        }}
      >
        Abrir Modal de Teste
      </button>
      
      {showModal && (
        <div 
          className="modal-overlay"
          onClick={closeModal}
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
            zIndex: 1000
          }}
        >
          <div 
            className="modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <div 
              className="modal-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}
            >
              <h2 style={{ margin: 0 }}>Modal de Teste</h2>
              <button 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Este é um modal de teste para verificar se a funcionalidade está funcionando corretamente.</p>
              <p>Se você consegue ver este texto, o modal está funcionando!</p>
              <p>Clique no X ou fora do modal para fechá-lo.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalTest;

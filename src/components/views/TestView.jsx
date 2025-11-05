import React from 'react';
import ModalTest from '../test/ModalTest';

/**
 * Página de teste para verificar o funcionamento de componentes
 */
const TestView = () => {
  return (
    <div className="test-view">
      <h1>Página de Teste</h1>
      <p>Esta página é usada para testar componentes individuais antes de integrá-los ao dashboard.</p>
      
      <div className="test-section">
        <h2>Teste de Modal</h2>
        <ModalTest />
      </div>
    </div>
  );
};

export default TestView;

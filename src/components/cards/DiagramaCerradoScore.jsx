import React from 'react';

/**
 * Componente para exibir a nota do Diagrama do Cerrado
 * @param {Object} props - Propriedades do componente
 * @param {number} props.score - Nota do ativo no Diagrama do Cerrado (0-10)
 */
const DiagramaCerradoScore = ({ score }) => {
  const getScoreClass = (score) => {
    if (score >= 8) return 'diagrama-cerrado-excellent';
    if (score >= 6) return 'diagrama-cerrado-good';
    return 'diagrama-cerrado-poor';
  };

  return (
    <div className="diagrama-cerrado">
      <div className="diagrama-cerrado-title">Nota Diagrama do Cerrado</div>
      <div className="diagrama-cerrado-bar">
        <div 
          className={`diagrama-cerrado-value ${getScoreClass(score)}`} 
          style={{ width: `${score * 10}%` }}
        >
          {score}
        </div>
      </div>
    </div>
  );
};

export default DiagramaCerradoScore;

import React, { useState, useEffect } from 'react';
import { getIndicadoresAtivo } from '../core/fetchers';
import { tooltips } from '../educacao/tooltips';

/**
 * Componente IndicadoresModal para exibir os indicadores Top5/Bottom5
 * Implementação conforme especificações do documento
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.ativo - Dados do ativo
 * @param {Function} props.onClose - Função para fechar o modal
 */
const IndicadoresModal = ({ ativo, onClose }) => {
  const [indicadores, setIndicadores] = useState({ top5: [], bottom5: [] });
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tooltipAtivo, setTooltipAtivo] = useState(null);
  
  // Carregar indicadores
  useEffect(() => {
    const carregarIndicadores = async () => {
      try {
        setCarregando(true);
        
        // Obter indicadores do ativo
        const dadosIndicadores = await getIndicadoresAtivo(ativo.ticker);
        
        // Ordenar por score (média de Valor e Qualidade)
        const indicadoresOrdenados = dadosIndicadores.sort((a, b) => {
          const scoreA = (a.valor + a.qualidade) / 2;
          const scoreB = (b.valor + b.qualidade) / 2;
          return scoreB - scoreA;
        });
        
        // Separar em Top5 e Bottom5
        const top5 = indicadoresOrdenados.slice(0, 5);
        const bottom5 = indicadoresOrdenados.slice(-5).reverse();
        
        setIndicadores({ top5, bottom5 });
        setCarregando(false);
      } catch (error) {
        console.error('Erro ao carregar indicadores:', error);
        setErro('Não foi possível carregar os indicadores. Tente novamente mais tarde.');
        setCarregando(false);
      }
    };
    
    carregarIndicadores();
  }, [ativo.ticker]);
  
  // Mostrar tooltip
  const mostrarTooltip = (indicador) => {
    setTooltipAtivo(indicador);
  };
  
  // Ocultar tooltip
  const ocultarTooltip = () => {
    setTooltipAtivo(null);
  };
  
  // Obter texto do tooltip
  const getTooltipText = (indicador) => {
    return tooltips[indicador] || 'Informação não disponível';
  };
  
  return (
    <div className="m-panel-modal-overlay" onClick={onClose}>
      <div className="m-panel-modal" onClick={e => e.stopPropagation()}>
        <div className="m-panel-modal-header">
          <h2 className="m-panel-modal-title">Indicadores - {ativo.ticker}</h2>
          <button className="m-panel-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="m-panel-modal-content">
          {carregando ? (
            <div className="m-panel-loading">Carregando indicadores...</div>
          ) : erro ? (
            <div className="m-panel-error">{erro}</div>
          ) : (
            <div className="m-panel-indicators-container">
              {/* Top 5 Indicadores */}
              <div className="m-panel-indicators-column top">
                <h3 className="m-panel-indicators-title">Top 5 Indicadores</h3>
                {indicadores.top5.map((indicador, index) => (
                  <div key={index} className="m-panel-indicator-item">
                    <div className="m-panel-indicator-name">
                      {indicador.nome}
                      <span 
                        className="m-panel-tooltip-icon"
                        onMouseEnter={() => mostrarTooltip(indicador.id)}
                        onMouseLeave={ocultarTooltip}
                      >
                        ℹ️
                        {tooltipAtivo === indicador.id && (
                          <div className="m-panel-tooltip-content">
                            {getTooltipText(indicador.id)}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="m-panel-indicator-value positive">
                      {indicador.valor}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom 5 Indicadores */}
              <div className="m-panel-indicators-column bottom">
                <h3 className="m-panel-indicators-title">Indicação de Atenção</h3>
                {indicadores.bottom5.map((indicador, index) => (
                  <div key={index} className="m-panel-indicator-item">
                    <div className="m-panel-indicator-name">
                      {indicador.nome}
                      <span 
                        className="m-panel-tooltip-icon"
                        onMouseEnter={() => mostrarTooltip(indicador.id)}
                        onMouseLeave={ocultarTooltip}
                      >
                        ℹ️
                        {tooltipAtivo === indicador.id && (
                          <div className="m-panel-tooltip-content">
                            {getTooltipText(indicador.id)}
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="m-panel-indicator-value negative">
                      {indicador.valor}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Legenda */}
          <div className="m-panel-indicators-legend">
            <p>Os indicadores são ordenados pela média de Valor e Qualidade. Passe o mouse sobre o ícone ℹ️ para ver mais informações sobre cada indicador.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicadoresModal;

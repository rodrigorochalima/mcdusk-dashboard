import React, { useState } from 'react';
import { calcularEstrategiaBuffett, calcularEstrategiaCerrado, calcularEstrategiaArca } from '../core/strategies';

/**
 * Componente EstrategiasPanel para exibir as estratégias de investimento
 * Implementação conforme especificações do documento
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.ativo - Dados do ativo
 */
const EstrategiasPanel = ({ ativo }) => {
  const [estrategiaAtiva, setEstrategiaAtiva] = useState(null);
  
  // Calcular as estratégias
  const estrategiaBuffett = calcularEstrategiaBuffett(ativo);
  const estrategiaCerrado = calcularEstrategiaCerrado(ativo);
  const estrategiaArca = calcularEstrategiaArca(ativo);
  
  // Calcular a recomendação consolidada
  const recomendacaoConsolidada = calcularRecomendacaoConsolidada(
    estrategiaBuffett.sinal,
    estrategiaCerrado.sinal,
    estrategiaArca.sinal
  );
  
  // Mostrar detalhes da estratégia
  const mostrarDetalhes = (estrategia) => {
    setEstrategiaAtiva(estrategia);
  };
  
  // Fechar detalhes
  const fecharDetalhes = () => {
    setEstrategiaAtiva(null);
  };
  
  // Obter classe CSS para a recomendação
  const getRecomendacaoClass = (recomendacao) => {
    switch (recomendacao) {
      case "COMPRAR":
        return "m-panel-recommendation-buy";
      case "MANTER":
        return "m-panel-recommendation-hold";
      case "VENDER":
        return "m-panel-recommendation-sell";
      default:
        return "";
    }
  };
  
  return (
    <div className="m-panel-strategies-wrapper">
      {/* Recomendação consolidada */}
      <div className={`m-panel-recommendation ${getRecomendacaoClass(recomendacaoConsolidada.recomendacao)}`}>
        <h3 className="m-panel-recommendation-title">Recomendação Consolidada</h3>
        <div className="m-panel-recommendation-value">{recomendacaoConsolidada.recomendacao}</div>
        <div className="m-panel-recommendation-score">Score: {recomendacaoConsolidada.score.toFixed(2)}</div>
      </div>
      
      {/* Estratégias */}
      <div className="m-panel-strategies-container">
        {/* Estratégia Warren Buffett */}
        <div 
          className="m-panel-strategy-card"
          onClick={() => mostrarDetalhes('buffett')}
        >
          <div className="m-panel-strategy-header">
            <h3 className="m-panel-strategy-title">Estratégia Warren Buffett</h3>
            <div className="m-panel-strategy-signal">
              {renderSinal(estrategiaBuffett.sinal)}
            </div>
          </div>
          <div className="m-panel-strategy-content">
            <p>{estrategiaBuffett.resumo}</p>
          </div>
          <div className="m-panel-strategy-footer">
            Peso: 50% • Clique para detalhes
          </div>
        </div>
        
        {/* Diagrama do Cerrado */}
        <div 
          className="m-panel-strategy-card"
          onClick={() => mostrarDetalhes('cerrado')}
        >
          <div className="m-panel-strategy-header">
            <h3 className="m-panel-strategy-title">Diagrama do Cerrado</h3>
            <div className="m-panel-strategy-signal">
              {renderSinal(estrategiaCerrado.sinal)}
            </div>
          </div>
          <div className="m-panel-strategy-content">
            <p>{estrategiaCerrado.resumo}</p>
          </div>
          <div className="m-panel-strategy-footer">
            Peso: 30% • Clique para detalhes
          </div>
        </div>
        
        {/* Método Arca */}
        <div 
          className="m-panel-strategy-card"
          onClick={() => mostrarDetalhes('arca')}
        >
          <div className="m-panel-strategy-header">
            <h3 className="m-panel-strategy-title">Método Arca</h3>
            <div className="m-panel-strategy-signal">
              {renderSinal(estrategiaArca.sinal)}
            </div>
          </div>
          <div className="m-panel-strategy-content">
            <p>{estrategiaArca.resumo}</p>
          </div>
          <div className="m-panel-strategy-footer">
            Peso: 20% • Clique para detalhes
          </div>
        </div>
      </div>
      
      {/* Modal de detalhes da estratégia */}
      {estrategiaAtiva && (
        <div className="m-panel-strategy-modal-overlay" onClick={fecharDetalhes}>
          <div className="m-panel-strategy-modal" onClick={e => e.stopPropagation()}>
            <div className="m-panel-strategy-modal-header">
              <h3 className="m-panel-strategy-modal-title">
                {estrategiaAtiva === 'buffett' && 'Estratégia Warren Buffett'}
                {estrategiaAtiva === 'cerrado' && 'Diagrama do Cerrado'}
                {estrategiaAtiva === 'arca' && 'Método Arca'}
              </h3>
              <button className="m-panel-strategy-modal-close" onClick={fecharDetalhes}>×</button>
            </div>
            <div className="m-panel-strategy-modal-content">
              {estrategiaAtiva === 'buffett' && (
                <div className="m-panel-strategy-detail">
                  <div className="m-panel-strategy-signal-large">
                    {renderSinal(estrategiaBuffett.sinal)}
                    <span className="m-panel-strategy-recommendation">
                      {getSinalRecomendacao(estrategiaBuffett.sinal)}
                    </span>
                  </div>
                  <p className="m-panel-strategy-explanation">{estrategiaBuffett.explicacao}</p>
                  <div className="m-panel-strategy-criteria">
                    <h4>Critérios da Estratégia</h4>
                    <ul>
                      <li>Qualidade forte (F-Score ≥7 ou QMJ norm ≥0.6)</li>
                      <li>Valuation atrativo (percentis EV/EBIT ≤0.35 e P/B ≤0.40)</li>
                      <li>Tendência não contra (Preço ≥MM200 ou Momentum ≥0)</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {estrategiaAtiva === 'cerrado' && (
                <div className="m-panel-strategy-detail">
                  <div className="m-panel-strategy-signal-large">
                    {renderSinal(estrategiaCerrado.sinal)}
                    <span className="m-panel-strategy-recommendation">
                      {getSinalRecomendacao(estrategiaCerrado.sinal)}
                    </span>
                  </div>
                  <p className="m-panel-strategy-explanation">{estrategiaCerrado.explicacao}</p>
                  <div className="m-panel-strategy-criteria">
                    <h4>Critérios da Estratégia</h4>
                    <ul>
                      <li>Quadrantes de Qualidade × Valuation</li>
                      <li>Ajuste negativo se Momentum &lt; -10% e Preço &lt; MM200</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {estrategiaAtiva === 'arca' && (
                <div className="m-panel-strategy-detail">
                  <div className="m-panel-strategy-signal-large">
                    {renderSinal(estrategiaArca.sinal)}
                    <span className="m-panel-strategy-recommendation">
                      {getSinalRecomendacao(estrategiaArca.sinal)}
                    </span>
                  </div>
                  <p className="m-panel-strategy-explanation">{estrategiaArca.explicacao}</p>
                  <div className="m-panel-strategy-criteria">
                    <h4>Critérios da Estratégia</h4>
                    <ul>
                      <li>Momentum e tendência como guias</li>
                      <li>Ajuste positivo se valuation extremo (percentis muito baixos)</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Função para renderizar o sinal da estratégia
function renderSinal(sinal) {
  if (sinal === 1) {
    return <span className="m-panel-signal positive">+1</span>;
  } else if (sinal === 0) {
    return <span className="m-panel-signal neutral">0</span>;
  } else {
    return <span className="m-panel-signal negative">-1</span>;
  }
}

// Função para obter a recomendação baseada no sinal
function getSinalRecomendacao(sinal) {
  if (sinal === 1) {
    return "COMPRAR";
  } else if (sinal === 0) {
    return "MANTER";
  } else {
    return "VENDER";
  }
}

// Função para calcular a recomendação consolidada
function calcularRecomendacaoConsolidada(sinalBuffett, sinalCerrado, sinalArca) {
  // Pesos das estratégias
  const pesoBuffett = 0.5;
  const pesoCerrado = 0.3;
  const pesoArca = 0.2;
  
  // Calcular score ponderado
  const score = pesoBuffett * sinalBuffett + pesoCerrado * sinalCerrado + pesoArca * sinalArca;
  
  // Determinar recomendação
  let recomendacao;
  if (score >= 0.35) {
    recomendacao = "COMPRAR";
  } else if (score <= -0.35) {
    recomendacao = "VENDER";
  } else {
    recomendacao = "MANTER";
  }
  
  return { score, recomendacao };
}

export default EstrategiasPanel;

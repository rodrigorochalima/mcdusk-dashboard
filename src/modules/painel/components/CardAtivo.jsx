import React, { useState } from 'react';
import { formatCurrency, formatPercentage } from '../../../lib/formatters';
import Grafico3LinhasModal from './Grafico3LinhasModal';
import IndicadoresModal from './IndicadoresModal';
import EstrategiasPanel from './EstrategiasPanel';

/**
 * Componente CardAtivo para exibir informações de um ativo
 * Implementação conforme especificações do documento
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.ativo - Dados do ativo
 */
const CardAtivo = ({ ativo }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoModal, setTipoModal] = useState('');
  
  // Verificar se o ativo está em promoção
  const isPromocao = verificarPromocao(ativo);
  
  // Calcular o SCA (Sinal Acadêmico Consolidado)
  const sca = calcularSCA(ativo);
  
  // Determinar a decisão do dia
  const decisao = determinarDecisao(ativo, sca, isPromocao);
  
  // Abrir modal
  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setModalAberto(true);
  };
  
  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
  };
  
  return (
    <div className="m-panel-card">
      {/* Cabeçalho do card */}
      <div className="m-panel-card-header">
        <div>
          <span className="m-panel-ticker">{ativo.ticker}</span>
          <span className="m-panel-class">{ativo.classe}</span>
        </div>
        {isPromocao && (
          <div className="m-panel-promotion-badge">
            <i className="fas fa-tag"></i> Em Promoção
          </div>
        )}
      </div>
      
      {/* Métricas do ativo */}
      <div className="m-panel-metrics">
        <div className="m-panel-metric">
          <div className="m-panel-metric-label">Preço</div>
          <div className="m-panel-metric-value">
            {formatCurrency(ativo.preco_atual)}
          </div>
        </div>
        <div className="m-panel-metric">
          <div className="m-panel-metric-label">MM200</div>
          <div className="m-panel-metric-value">
            {formatCurrency(ativo.mm200)}
          </div>
        </div>
        <div className="m-panel-metric">
          <div className="m-panel-metric-label">Mom 12-1</div>
          <div className={`m-panel-metric-value ${ativo.mom_12_1 >= 0 ? 'positive' : 'negative'}`}>
            {formatPercentage(ativo.mom_12_1)}
          </div>
        </div>
      </div>
      
      {/* Decisão do dia */}
      <div className="m-panel-decision">
        <div className={`m-panel-decision-chip ${getDecisaoClass(decisao)}`}>
          {decisao}
        </div>
      </div>
      
      {/* Barra de SCA */}
      <div className="m-panel-sca-container">
        <div className="m-panel-sca-header">
          <div className="m-panel-sca-label">SCA</div>
          <div className="m-panel-sca-value">{(sca * 100).toFixed(0)}%</div>
        </div>
        <div className="m-panel-sca-bar">
          <div 
            className="m-panel-sca-progress" 
            style={{ width: `${sca * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Botões de ação */}
      <div className="m-panel-actions">
        <button 
          className="m-panel-action-button"
          onClick={() => abrirModal('grafico')}
        >
          Ver Gráfico
        </button>
        <button 
          className="m-panel-action-button"
          onClick={() => abrirModal('indicadores')}
        >
          Indicadores
        </button>
        <button 
          className="m-panel-action-button"
          onClick={() => abrirModal('estrategias')}
        >
          Estratégias
        </button>
      </div>
      
      {/* Modais */}
      {modalAberto && tipoModal === 'grafico' && (
        <Grafico3LinhasModal 
          ativo={ativo}
          onClose={fecharModal}
        />
      )}
      
      {modalAberto && tipoModal === 'indicadores' && (
        <IndicadoresModal 
          ativo={ativo}
          onClose={fecharModal}
        />
      )}
      
      {modalAberto && tipoModal === 'estrategias' && (
        <div className="m-panel-modal-overlay" onClick={fecharModal}>
          <div className="m-panel-modal" onClick={e => e.stopPropagation()}>
            <div className="m-panel-modal-header">
              <h2 className="m-panel-modal-title">Estratégias - {ativo.ticker}</h2>
              <button className="m-panel-modal-close" onClick={fecharModal}>×</button>
            </div>
            <EstrategiasPanel ativo={ativo} />
          </div>
        </div>
      )}
    </div>
  );
};

// Função para verificar se o ativo está em promoção
function verificarPromocao(ativo) {
  // Verificar qualidade
  const qualOk = (ativo.f_score >= 6) || ((ativo.qmj_score + 3)/6 >= 0.5);
  
  // Verificar se está barato
  const baratoOk = (ativo.pct_EV_EBIT_5a <= 0.30) && (ativo.pct_PB_5a <= 0.35);
  
  // Verificar tendência
  const tendenciaOk = (ativo.mom_12_1 >= -0.10) || 
    (clamp((ativo.preco_atual/ativo.mm200 - 0.8) / 0.4, 0, 1) >= 0.40);
  
  return qualOk && baratoOk && tendenciaOk;
}

// Função para calcular o SCA
function calcularSCA(ativo) {
  // Calcular componentes
  const valor = clamp(1 - 0.5 * (ativo.pct_EV_EBIT_5a + ativo.pct_PB_5a), 0, 1);
  const qualidade = (clamp(ativo.f_score/9, 0, 1) + clamp((ativo.qmj_score + 3)/6, 0, 1)) / 2;
  const momentum = clamp((ativo.mom_12_1 + 0.5)/1.0, 0, 1);
  const tendencia = clamp((ativo.preco_atual/ativo.mm200 - 0.8) / 0.4, 0, 1);
  
  // Calcular SCA ponderado
  return 0.35 * valor + 0.25 * qualidade + 0.25 * momentum + 0.15 * tendencia;
}

// Função para determinar a decisão do dia
function determinarDecisao(ativo, sca, isPromocao) {
  const tendencia = clamp((ativo.preco_atual/ativo.mm200 - 0.8) / 0.4, 0, 1);
  
  if (sca >= 0.65 && (tendencia >= 0.5 || ativo.mom_12_1 >= 0 || isPromocao)) {
    return "COMPRAR";
  } else if (sca >= 0.45 && sca < 0.65) {
    return "MANTER";
  } else {
    return "VENDER";
  }
}

// Função para obter a classe CSS da decisão
function getDecisaoClass(decisao) {
  switch (decisao) {
    case "COMPRAR":
      return "buy";
    case "MANTER":
      return "hold";
    case "VENDER":
      return "sell";
    default:
      return "";
  }
}

// Função auxiliar para limitar um valor entre min e max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default CardAtivo;

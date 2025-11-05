/**
 * Funções para cálculo de métricas e indicadores
 * Implementação conforme especificações do documento
 */

import { pesosScores, limiaresDecisao, limiaresPromocao } from './config';

/**
 * Limita um valor entre um mínimo e um máximo
 * @param {number} value - Valor a ser limitado
 * @param {number} min - Valor mínimo
 * @param {number} max - Valor máximo
 * @returns {number} - Valor limitado
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Calcula a média móvel de 200 dias
 * @param {Array<number>} precosDiarios - Array com preços diários
 * @returns {number} - Média móvel de 200 dias
 */
export const calcularMM200 = (precosDiarios) => {
  if (!precosDiarios || precosDiarios.length < 200) {
    return null;
  }
  
  const ultimos200 = precosDiarios.slice(-200);
  const soma = ultimos200.reduce((acc, preco) => acc + preco, 0);
  return soma / 200;
};

/**
 * Calcula o momentum 12-1
 * @param {Array<number>} precosMensais - Array com preços mensais
 * @returns {number} - Momentum 12-1
 */
export const calcularMomentum12_1 = (precosMensais) => {
  if (!precosMensais || precosMensais.length < 13) {
    return null;
  }
  
  const precoMes1 = precosMensais[precosMensais.length - 2];
  const precoMes13 = precosMensais[precosMensais.length - 14];
  return (precoMes1 / precoMes13) - 1;
};

/**
 * Calcula o score de valor
 * @param {number} pct_EV_EBIT_5a - Percentil do EV/EBIT nos últimos 5 anos
 * @param {number} pct_PB_5a - Percentil do P/B nos últimos 5 anos
 * @returns {number} - Score de valor (0 a 1)
 */
export const calcularScoreValor = (pct_EV_EBIT_5a, pct_PB_5a) => {
  return clamp(1 - 0.5 * (pct_EV_EBIT_5a + pct_PB_5a), 0, 1);
};

/**
 * Calcula o score de qualidade
 * @param {number} f_score - F-Score (0 a 9)
 * @param {number} qmj_score - QMJ Score (-3 a 3)
 * @returns {number} - Score de qualidade (0 a 1)
 */
export const calcularScoreQualidade = (f_score, qmj_score) => {
  const f_score_norm = clamp(f_score / 9, 0, 1);
  const qmj_score_norm = clamp((qmj_score + 3) / 6, 0, 1);
  return (f_score_norm + qmj_score_norm) / 2;
};

/**
 * Calcula o score de momentum
 * @param {number} mom_12_1 - Momentum 12-1
 * @returns {number} - Score de momentum (0 a 1)
 */
export const calcularScoreMomentum = (mom_12_1) => {
  return clamp((mom_12_1 + 0.5) / 1.0, 0, 1);
};

/**
 * Calcula o score de tendência
 * @param {number} preco_atual - Preço atual
 * @param {number} mm200 - Média móvel de 200 dias
 * @returns {number} - Score de tendência (0 a 1)
 */
export const calcularScoreTendencia = (preco_atual, mm200) => {
  return clamp((preco_atual / mm200 - 0.8) / 0.4, 0, 1);
};

/**
 * Calcula o SCA (Sinal Consolidado Acadêmico)
 * @param {Object} ativo - Dados do ativo
 * @returns {number} - SCA (0 a 1)
 */
export const calcularSCA = (ativo) => {
  // Verificar se temos todos os dados necessários
  if (!ativo) {
    return null;
  }
  
  // Calcular componentes
  const scoreValor = calcularScoreValor(ativo.pct_EV_EBIT_5a || 0.5, ativo.pct_PB_5a || 0.5);
  const scoreQualidade = calcularScoreQualidade(ativo.f_score || 0, ativo.qmj_score || 0);
  const scoreMomentum = calcularScoreMomentum(ativo.mom_12_1 || 0);
  const scoreTendencia = calcularScoreTendencia(ativo.preco_atual || 0, ativo.mm200 || 1);
  
  // Calcular SCA ponderado
  return pesosScores.valor * scoreValor + 
         pesosScores.qualidade * scoreQualidade + 
         pesosScores.momentum * scoreMomentum + 
         pesosScores.tendencia * scoreTendencia;
};

/**
 * Verifica se o ativo está em promoção
 * @param {Object} ativo - Dados do ativo
 * @returns {boolean} - Se o ativo está em promoção
 */
export const verificarPromocao = (ativo) => {
  // Verificar qualidade
  const qualOk = (ativo.f_score >= limiaresPromocao.qualidade.fScore) || 
                ((ativo.qmj_score + 3) / 6 >= limiaresPromocao.qualidade.qmjScore);
  
  // Verificar se está barato
  const baratoOk = (ativo.pct_EV_EBIT_5a <= limiaresPromocao.valuation.evEbit) && 
                  (ativo.pct_PB_5a <= limiaresPromocao.valuation.pb);
  
  // Verificar tendência
  const tendenciaOk = (ativo.mom_12_1 >= limiaresPromocao.tendencia.momentum) || 
                     (calcularScoreTendencia(ativo.preco_atual, ativo.mm200) >= limiaresPromocao.tendencia.tendencia);
  
  return qualOk && baratoOk && tendenciaOk;
};

/**
 * Determina a decisão do dia
 * @param {Object} ativo - Dados do ativo
 * @param {number} sca - SCA calculado
 * @param {boolean} isPromocao - Se o ativo está em promoção
 * @returns {string} - Decisão do dia (COMPRAR, MANTER, VENDER)
 */
export const determinarDecisao = (ativo, sca, isPromocao) => {
  const tendencia = calcularScoreTendencia(ativo.preco_atual, ativo.mm200);
  
  if (sca >= limiaresDecisao.comprar && (tendencia >= 0.5 || ativo.mom_12_1 >= 0 || isPromocao)) {
    return "COMPRAR";
  } else if (sca >= limiaresDecisao.manter) {
    return "MANTER";
  } else {
    return "VENDER";
  }
};

export default {
  clamp,
  calcularMM200,
  calcularMomentum12_1,
  calcularScoreValor,
  calcularScoreQualidade,
  calcularScoreMomentum,
  calcularScoreTendencia,
  calcularSCA,
  verificarPromocao,
  determinarDecisao
};

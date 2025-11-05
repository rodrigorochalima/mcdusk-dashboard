/**
 * Estratégias de investimento
 * Implementação conforme especificações do documento
 */

import { clamp } from './metrics';

/**
 * Calcula a estratégia Warren Buffett
 * @param {Object} ativo - Dados do ativo
 * @returns {Object} - Resultado da estratégia
 */
export const calcularEstrategiaBuffett = (ativo) => {
  // Verificar qualidade forte
  const qualidadeForte = (ativo.f_score >= 7) || ((ativo.qmj_score + 3)/6 >= 0.6);
  
  // Verificar valuation atrativo
  const valuationAtrativo = (ativo.pct_EV_EBIT_5a <= 0.35) && (ativo.pct_PB_5a <= 0.40);
  
  // Verificar tendência não contra
  const tendenciaNaoContra = (ativo.preco_atual >= ativo.mm200) || (ativo.mom_12_1 >= 0);
  
  // Determinar sinal
  let sinal = 0;
  let resumo = '';
  let explicacao = '';
  
  if (qualidadeForte && valuationAtrativo && tendenciaNaoContra) {
    sinal = 1;
    resumo = 'Qualidade forte, valuation atrativo e tendência favorável.';
    explicacao = `${ativo.ticker} atende a todos os critérios da estratégia Warren Buffett: possui qualidade forte (F-Score: ${ativo.f_score}, QMJ: ${ativo.qmj_score.toFixed(2)}), valuation atrativo (EV/EBIT: ${(ativo.pct_EV_EBIT_5a * 100).toFixed(0)}º percentil, P/B: ${(ativo.pct_PB_5a * 100).toFixed(0)}º percentil) e tendência não contrária (Preço vs MM200: ${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}%, Momentum 12-1: ${(ativo.mom_12_1 * 100).toFixed(1)}%).`;
  } else if (!qualidadeForte && valuationAtrativo && tendenciaNaoContra) {
    sinal = 0;
    resumo = 'Valuation atrativo e tendência favorável, mas qualidade insuficiente.';
    explicacao = `${ativo.ticker} tem valuation atrativo e tendência favorável, mas não atende ao critério de qualidade forte (F-Score: ${ativo.f_score}, QMJ: ${ativo.qmj_score.toFixed(2)}). Warren Buffett prioriza empresas de alta qualidade, mesmo que a um preço justo.`;
  } else if (qualidadeForte && !valuationAtrativo && tendenciaNaoContra) {
    sinal = 0;
    resumo = 'Qualidade forte e tendência favorável, mas valuation elevado.';
    explicacao = `${ativo.ticker} tem qualidade forte e tendência favorável, mas o valuation está elevado (EV/EBIT: ${(ativo.pct_EV_EBIT_5a * 100).toFixed(0)}º percentil, P/B: ${(ativo.pct_PB_5a * 100).toFixed(0)}º percentil). Warren Buffett busca empresas excelentes a preços razoáveis.`;
  } else if (qualidadeForte && valuationAtrativo && !tendenciaNaoContra) {
    sinal = 0;
    resumo = 'Qualidade forte e valuation atrativo, mas tendência desfavorável.';
    explicacao = `${ativo.ticker} tem qualidade forte e valuation atrativo, mas a tendência está desfavorável (Preço vs MM200: ${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}%, Momentum 12-1: ${(ativo.mom_12_1 * 100).toFixed(1)}%). Warren Buffett geralmente evita nadar contra a maré.`;
  } else if (!qualidadeForte && !valuationAtrativo) {
    sinal = -1;
    resumo = 'Qualidade insuficiente e valuation elevado.';
    explicacao = `${ativo.ticker} não atende aos critérios fundamentais da estratégia Warren Buffett: qualidade insuficiente (F-Score: ${ativo.f_score}, QMJ: ${ativo.qmj_score.toFixed(2)}) e valuation elevado (EV/EBIT: ${(ativo.pct_EV_EBIT_5a * 100).toFixed(0)}º percentil, P/B: ${(ativo.pct_PB_5a * 100).toFixed(0)}º percentil).`;
  } else {
    sinal = -1;
    resumo = 'Não atende aos critérios fundamentais da estratégia.';
    explicacao = `${ativo.ticker} não atende a múltiplos critérios da estratégia Warren Buffett, que busca empresas de alta qualidade, com valuation atrativo e tendência não contrária.`;
  }
  
  return { sinal, resumo, explicacao };
};

/**
 * Calcula a estratégia Diagrama do Cerrado
 * @param {Object} ativo - Dados do ativo
 * @returns {Object} - Resultado da estratégia
 */
export const calcularEstrategiaCerrado = (ativo) => {
  // Calcular scores
  const scoreQualidade = (clamp(ativo.f_score/9, 0, 1) + clamp((ativo.qmj_score + 3)/6, 0, 1)) / 2;
  const scoreValuation = 1 - clamp(0.5 * (ativo.pct_EV_EBIT_5a + ativo.pct_PB_5a), 0, 1);
  
  // Determinar quadrante
  let quadrante = '';
  let sinal = 0;
  
  if (scoreQualidade >= 0.6 && scoreValuation >= 0.6) {
    quadrante = 'Ouro';
    sinal = 1;
  } else if (scoreQualidade >= 0.6 && scoreValuation < 0.6) {
    quadrante = 'Qualidade';
    sinal = 0;
  } else if (scoreQualidade < 0.6 && scoreValuation >= 0.6) {
    quadrante = 'Valor';
    sinal = 0;
  } else {
    quadrante = 'Armadilha';
    sinal = -1;
  }
  
  // Ajuste por momentum e tendência
  const momentumNegativo = ativo.mom_12_1 < -0.10;
  const precoAbaixoMM200 = ativo.preco_atual < ativo.mm200;
  
  if (momentumNegativo && precoAbaixoMM200 && sinal > -1) {
    sinal -= 1;
  }
  
  // Gerar resumo e explicação
  let resumo = '';
  let explicacao = '';
  
  switch (quadrante) {
    case 'Ouro':
      resumo = `Quadrante Ouro: alta qualidade e valuation atrativo.`;
      explicacao = `${ativo.ticker} está no quadrante Ouro do Diagrama do Cerrado, combinando alta qualidade (${(scoreQualidade * 100).toFixed(0)}%) e valuation atrativo (${(scoreValuation * 100).toFixed(0)}%).`;
      break;
    case 'Qualidade':
      resumo = `Quadrante Qualidade: alta qualidade, mas valuation elevado.`;
      explicacao = `${ativo.ticker} está no quadrante Qualidade do Diagrama do Cerrado, com alta qualidade (${(scoreQualidade * 100).toFixed(0)}%), mas valuation menos atrativo (${(scoreValuation * 100).toFixed(0)}%).`;
      break;
    case 'Valor':
      resumo = `Quadrante Valor: valuation atrativo, mas qualidade inferior.`;
      explicacao = `${ativo.ticker} está no quadrante Valor do Diagrama do Cerrado, com valuation atrativo (${(scoreValuation * 100).toFixed(0)}%), mas qualidade inferior (${(scoreQualidade * 100).toFixed(0)}%).`;
      break;
    case 'Armadilha':
      resumo = `Quadrante Armadilha: baixa qualidade e valuation pouco atrativo.`;
      explicacao = `${ativo.ticker} está no quadrante Armadilha do Diagrama do Cerrado, combinando baixa qualidade (${(scoreQualidade * 100).toFixed(0)}%) e valuation pouco atrativo (${(scoreValuation * 100).toFixed(0)}%).`;
      break;
  }
  
  // Adicionar informação sobre ajuste
  if (momentumNegativo && precoAbaixoMM200) {
    explicacao += ` Houve ajuste negativo devido ao momentum fortemente negativo (${(ativo.mom_12_1 * 100).toFixed(1)}%) e preço abaixo da MM200 (${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}%).`;
  }
  
  return { sinal, quadrante, resumo, explicacao, scoreQualidade, scoreValuation };
};

/**
 * Calcula a estratégia Arca
 * @param {Object} ativo - Dados do ativo
 * @returns {Object} - Resultado da estratégia
 */
export const calcularEstrategiaArca = (ativo) => {
  // Calcular scores
  const scoreMomentum = clamp((ativo.mom_12_1 + 0.5)/1.0, 0, 1);
  const scoreTendencia = clamp((ativo.preco_atual/ativo.mm200 - 0.8) / 0.4, 0, 1);
  const scoreValuation = 1 - clamp(0.5 * (ativo.pct_EV_EBIT_5a + ativo.pct_PB_5a), 0, 1);
  
  // Determinar sinal base
  let sinalBase = 0;
  
  if (scoreMomentum >= 0.7 && scoreTendencia >= 0.7) {
    sinalBase = 1;
  } else if (scoreMomentum <= 0.3 && scoreTendencia <= 0.3) {
    sinalBase = -1;
  } else {
    sinalBase = 0;
  }
  
  // Ajuste por valuation extremo
  let sinal = sinalBase;
  
  if (scoreValuation >= 0.9 && sinal < 1) {
    sinal += 1;
  } else if (scoreValuation <= 0.1 && sinal > -1) {
    sinal -= 1;
  }
  
  // Limitar sinal entre -1 e 1
  sinal = Math.max(-1, Math.min(1, sinal));
  
  // Gerar resumo e explicação
  let resumo = '';
  let explicacao = '';
  
  if (sinal === 1) {
    if (sinalBase === 1) {
      resumo = 'Forte momentum positivo e tendência de alta.';
      explicacao = `${ativo.ticker} apresenta forte momentum positivo (${(ativo.mom_12_1 * 100).toFixed(1)}%) e tendência de alta (${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}% acima da MM200), sinalizando continuidade do movimento.`;
    } else {
      resumo = 'Valuation extremamente atrativo compensa momentum/tendência.';
      explicacao = `${ativo.ticker} tem valuation extremamente atrativo (${(scoreValuation * 100).toFixed(0)}%), o que compensa o momentum/tendência menos favorável. O Método Arca considera oportunidades excepcionais de valor.`;
    }
  } else if (sinal === 0) {
    resumo = 'Sinais mistos de momentum e tendência.';
    explicacao = `${ativo.ticker} apresenta sinais mistos: momentum (${(ativo.mom_12_1 * 100).toFixed(1)}%) e tendência (${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}% vs MM200) não mostram direção clara. O Método Arca sugere cautela.`;
  } else {
    if (sinalBase === -1) {
      resumo = 'Momentum negativo e tendência de baixa.';
      explicacao = `${ativo.ticker} apresenta momentum negativo (${(ativo.mom_12_1 * 100).toFixed(1)}%) e tendência de baixa (${((ativo.preco_atual / ativo.mm200 - 1) * 100).toFixed(1)}% vs MM200), sinalizando continuidade do movimento de queda.`;
    } else {
      resumo = 'Valuation extremamente elevado compensa momentum/tendência.';
      explicacao = `${ativo.ticker} tem valuation extremamente elevado (${(scoreValuation * 100).toFixed(0)}%), o que anula sinais positivos de momentum/tendência. O Método Arca evita ativos significativamente sobrevalorizados.`;
    }
  }
  
  return { sinal, resumo, explicacao, scoreMomentum, scoreTendencia, scoreValuation };
};

export default {
  calcularEstrategiaBuffett,
  calcularEstrategiaCerrado,
  calcularEstrategiaArca
};

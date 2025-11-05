/**
 * Tooltips para os indicadores e métricas
 * Implementação conforme especificações do documento
 */

export const tooltips = {
  // Indicadores de valor
  'ev_ebit': 'Compara o EV/EBIT atual com os últimos 5 anos; 0 é mais barato, 1 é mais caro.',
  'pb': 'Compara Preço/Patrimônio com os últimos 5 anos; 0 é barato, 1 é caro.',
  'psr': 'Compara Preço/Receita com os últimos 5 anos; 0 é barato, 1 é caro.',
  'pe': 'Compara Preço/Lucro com os últimos 5 anos; 0 é barato, 1 é caro.',
  'pcf': 'Compara Preço/Fluxo de Caixa com os últimos 5 anos; 0 é barato, 1 é caro.',
  'dy': 'Compara Dividend Yield com os últimos 5 anos; 1 é alto (bom), 0 é baixo.',
  
  // Indicadores de qualidade
  'f_score': 'Pontuação 0–9 de qualidade contábil. ≥6 é saudável.',
  'qmj': 'Qualidade menos risco. Positivo favorece qualidade.',
  'roe': 'Retorno sobre Patrimônio. Quanto maior, melhor a eficiência.',
  'roic': 'Retorno sobre Capital Investido. Mede eficiência operacional.',
  'margem_ebit': 'Margem EBIT. Mede eficiência operacional antes de impostos.',
  'margem_liquida': 'Margem Líquida. Percentual de lucro após todos os custos.',
  'liquidez_corrente': 'Ativo Circulante / Passivo Circulante. >1 indica boa saúde financeira.',
  'divida_liquida_ebitda': 'Dívida Líquida / EBITDA. <3 é geralmente saudável.',
  
  // Indicadores de momentum e tendência
  'mm200': 'Preço médio dos últimos 200 pregões.',
  'mom_12_1': 'Retorno de 12 meses, sem o mês corrente.',
  'mom_6': 'Retorno dos últimos 6 meses.',
  'mom_3': 'Retorno dos últimos 3 meses.',
  'mom_1': 'Retorno do último mês.',
  'volatilidade': 'Desvio padrão dos retornos diários (anualizado).',
  
  // Indicadores consolidados
  'sca': 'Sinal Consolidado Acadêmico. Combina valor, qualidade, momentum e tendência.',
  'valor': 'Score de valor baseado em múltiplos (EV/EBIT, P/B).',
  'qualidade': 'Score de qualidade baseado em F-Score e QMJ.',
  'momentum': 'Score de momentum baseado no retorno de 12-1 meses.',
  'tendencia': 'Score de tendência baseado na relação Preço/MM200.',
  
  // Estratégias
  'buffett': 'Estratégia baseada em qualidade forte, valuation atrativo e tendência não contra.',
  'cerrado': 'Diagrama de quadrantes Qualidade × Valuation com ajuste por momentum.',
  'arca': 'Método baseado em momentum e tendência com ajuste por valuation extremo.',
  
  // Outros
  'promocao': 'Ativo com qualidade, preço atrativo e tendência não catastrófica.',
  'decisao': 'Recomendação baseada no SCA, tendência, momentum e promoção.',
  'recomendacao': 'Consolidação ponderada das estratégias Buffett, Cerrado e Arca.'
};

export default tooltips;

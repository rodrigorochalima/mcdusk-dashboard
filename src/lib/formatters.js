/**
 * Formata um valor para moeda brasileira (R$)
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (value, compact = false) => {
  if (value === undefined || value === null || isNaN(value)) {
    return 'R$ 0,00';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: compact && value >= 1000 ? 'compact' : 'standard'
  }).format(value);
};

/**
 * Formata um valor para percentual
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado como percentual
 */
export const formatPercent = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0,0%';
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

/**
 * Formata um valor para percentual (alias para formatPercent)
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado como percentual
 */
export const formatPercentage = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0,0%';
  }
  
  return formatPercent(value);
};

/**
 * Formata uma data para o formato brasileiro
 * @param {Date} date - Data a ser formatada
 * @returns {string} Data formatada
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Formata um número com separadores de milhar
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado com separadores de milhar
 */
export const formatNumber = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0';
  }
  
  return new Intl.NumberFormat('pt-BR').format(value);
};

/**
 * Formata uma variação percentual com sinal
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado como variação percentual
 */
export const formatChangePercentage = (value) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0,0%';
  }
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
  
  const prefix = value >= 0 ? '+' : '';
  return prefix + formatter.format(value) + '%';
};

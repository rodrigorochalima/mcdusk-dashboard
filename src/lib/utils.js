import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * Combina classes do Tailwind de forma eficiente
 * @param  {...any} inputs - Classes a serem combinadas
 * @returns {string} Classes combinadas
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Calcula a variação percentual entre dois valores
 * @param {number} current - Valor atual
 * @param {number} previous - Valor anterior
 * @returns {number} Variação percentual
 */
export function calculatePercentChange(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

/**
 * Calcula a distribuição percentual de um valor em relação ao total
 * @param {number} value - Valor a ser calculado
 * @param {number} total - Valor total
 * @returns {number} Percentual
 */
export function calculatePercent(value, total) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

/**
 * Gera uma cor baseada em um valor percentual
 * @param {number} percent - Valor percentual
 * @returns {string} Cor em formato hexadecimal
 */
export function getColorByPercent(percent) {
  if (percent > 0) {
    return '#34a853'; // Verde para valores positivos
  } else if (percent < 0) {
    return '#ea4335'; // Vermelho para valores negativos
  }
  return '#9aa0a6'; // Cinza para valores neutros
}

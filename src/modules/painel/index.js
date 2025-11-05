/**
 * Módulo de Painel ao Vivo para o Dashboard McDuck
 * Implementação conforme especificações do documento
 */

// Componentes
export { default as CardAtivo } from './components/CardAtivo';
export { default as Grafico3LinhasModal } from './components/Grafico3LinhasModal';
export { default as IndicadoresModal } from './components/IndicadoresModal';
export { default as EstrategiasPanel } from './components/EstrategiasPanel';
export { default as OportunidadesPanel } from './components/OportunidadesPanel';

// Core
export { default as fetchers } from './core/fetchers';
export { default as mapping } from './core/mapping';
export { default as metrics } from './core/metrics';
export { default as signals_core } from './core/signals_core';
export { default as strategies } from './core/strategies';
export { default as portfolio } from './core/portfolio';
export { default as config } from './core/config';

// Adaptadores
export { default as BancoFederalAdapter } from './adapters/BancoFederalAdapter';

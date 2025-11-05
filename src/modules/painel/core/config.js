/**
 * Configurações para o módulo de Painel ao Vivo
 * Contém pesos, limiares e outras configurações
 */

// Pesos para o cálculo do SCA
export const pesosScores = {
  valor: 0.35,
  qualidade: 0.25,
  momentum: 0.25,
  tendencia: 0.15
};

// Pesos para a consolidação das estratégias
export const pesosEstrategias = {
  buffett: 0.5,
  cerrado: 0.3,
  arca: 0.2
};

// Limiares para a decisão do dia
export const limiaresDecisao = {
  comprar: 0.65,
  manter: 0.45
};

// Limiares para a recomendação consolidada
export const limiaresRecomendacao = {
  comprar: 0.35,
  vender: -0.35
};

// Limiares para a promoção
export const limiaresPromocao = {
  qualidade: {
    fScore: 6,
    qmjScore: 0.5
  },
  valuation: {
    evEbit: 0.30,
    pb: 0.35
  },
  tendencia: {
    momentum: -0.10,
    tendencia: 0.40
  }
};

// Configurações para o gráfico
export const configGrafico = {
  periodos: {
    '1m': '1 mês',
    '6m': '6 meses',
    '1a': '1 ano',
    'inicio': 'Desde o início'
  },
  cores: {
    ativo: '#4285f4',
    carteira: '#34a853',
    cdi: '#fbbc05',
    ifix: '#ea4335',
    variacao: '#9e9e9e'
  }
};

// Configurações para os indicadores
export const configIndicadores = {
  top5: {
    titulo: 'Top 5 Indicadores',
    cor: '#4caf50'
  },
  bottom5: {
    titulo: 'Indicação de Atenção',
    cor: '#f44336'
  }
};

// Configurações para as estratégias
export const configEstrategias = {
  buffett: {
    titulo: 'Estratégia Warren Buffett',
    peso: 0.5,
    criterios: [
      'Qualidade forte (F-Score ≥7 ou QMJ norm ≥0.6)',
      'Valuation atrativo (percentis EV/EBIT ≤0.35 e P/B ≤0.40)',
      'Tendência não contra (Preço ≥MM200 ou Momentum ≥0)'
    ]
  },
  cerrado: {
    titulo: 'Diagrama do Cerrado',
    peso: 0.3,
    criterios: [
      'Quadrantes de Qualidade × Valuation',
      'Ajuste negativo se Momentum < −10% e Preço < MM200'
    ]
  },
  arca: {
    titulo: 'Método Arca',
    peso: 0.2,
    criterios: [
      'Momentum e tendência como guias',
      'Ajuste positivo se valuation extremo (percentis muito baixos)'
    ]
  }
};

// Configurações para a API
export const configAPI = {
  yahoo: {
    baseUrl: 'https://query1.finance.yahoo.com/v7/finance',
    endpoints: {
      quote: '/quote',
      chart: '/chart'
    },
    parametros: {
      quote: {
        symbols: 'symbols'
      },
      chart: {
        range: 'range',
        interval: 'interval'
      }
    }
  },
  bcb: {
    baseUrl: 'https://api.bcb.gov.br/dados/serie',
    endpoints: {
      valores: '/valores'
    },
    parametros: {
      formato: 'formato',
      dataInicial: 'dataInicial',
      dataFinal: 'dataFinal'
    }
  }
};

export default {
  pesosScores,
  pesosEstrategias,
  limiaresDecisao,
  limiaresRecomendacao,
  limiaresPromocao,
  configGrafico,
  configIndicadores,
  configEstrategias,
  configAPI
};

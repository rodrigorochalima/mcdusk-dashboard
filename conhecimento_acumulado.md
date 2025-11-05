# Conhecimento Acumulado - McDuck Dashboard

## Visão Geral do Projeto

O McDuck Dashboard é uma aplicação web para gestão e análise de investimentos, desenvolvida com React e Vite. O sistema permite visualizar o desempenho da carteira de investimentos, analisar ativos individuais, comparar com índices de mercado e receber recomendações de investimento baseadas em diferentes estratégias.

## Conceitos Fundamentais

### 1. Diagrama do Cerrado

O Diagrama do Cerrado é uma metodologia proprietária de análise de ativos que atribui uma pontuação (de 0 a 14) com base em diversos indicadores fundamentalistas. A pontuação é usada para classificar os ativos e gerar recomendações de compra, venda ou manutenção.

**Implementação no sistema:**
- Pontuação exibida como "X/14" (ex: 11/14)
- Barra de progresso visual representando a pontuação
- Recomendação baseada na pontuação (COMPRAR, MANTER, VENDER)

### 2. Estratégias de Investimento

O sistema implementa múltiplas estratégias de investimento, cada uma com seu próprio peso na recomendação final:

1. **Warren Buffett (40%)**: Baseada nos princípios de investimento de Warren Buffett, focando em empresas com vantagens competitivas duradouras.
2. **Diagrama do Cerrado (30%)**: Metodologia proprietária baseada em indicadores fundamentalistas.
3. **Estratégia ARCA (20%)**: Foco em diversificação e alocação estratégica de ativos.
4. **Bola de Neve (10%, informativo)**: Estratégia focada em dividendos mensais para reinvestimento automático.

### 3. Indicadores Fundamentalistas

Os indicadores são divididos em positivos e negativos para facilitar a análise:

**Indicadores Positivos:**
- Preço/Lucro
- Preço/Valor Patrimonial
- Return on Invested Capital
- Margem Líquida
- Dívida Líquida/EBITDA

**Indicadores Negativos:**
- Preço/Lucro
- Preço/Valor Patrimonial
- Dívida Líquida/EBITDA
- Return on Equity
- Return on Invested Capital

### 4. Comparativo com Índices

O sistema compara o desempenho dos ativos e da carteira com os principais índices do mercado:
- SELIC
- IPCA
- IBOVESPA

## Estrutura de Dados

### 1. Estrutura de um Ativo

```javascript
{
  symbol: "PETR4",        // Símbolo do ativo
  name: "Petrobras",      // Nome da empresa
  quantity: 100,          // Quantidade de ativos
  price: 28.50,           // Preço atual
  value: 2850.00,         // Valor total (quantity * price)
  change: 0.025,          // Variação percentual
  class: "stocks"         // Classe do ativo (stocks, fiis, international)
}
```

### 2. Estrutura de Dados de Desempenho

```javascript
[
  { name: 'Out/24', ativo: 100, cdi: 100, ibov: 100 },
  { name: 'Nov/24', ativo: 105, cdi: 101, ibov: 103 },
  // ... mais meses
]
```

### 3. Estrutura de Dados do Portfólio

```javascript
{
  totalValue: 386237.43,
  classes: [
    { name: "Ações", value: 141605.60 },
    { name: "Fundos Imobiliários", value: 72508.36 },
    { name: "Ativos Internacionais", value: 10881.16 }
  ],
  patrimonyHistory: [
    { month: "Jan", value: 320000 },
    { month: "Fev", value: 325000 },
    // ... mais meses
  ]
}
```

## Componentes Principais

### 1. Modal de Detalhes do Ativo

O componente `AssetDetailModalComplete` é um dos mais importantes do sistema, exibindo informações detalhadas sobre um ativo específico. Ele inclui:

- Sistema de abas para navegação entre diferentes análises
- Resumo do ativo (quantidade, preço, valor total, resultado)
- Comparativo com índices
- Indicadores fundamentalistas
- Diagrama do Cerrado
- Análise das estratégias
- Contexto setorial
- Descrição do ativo
- Gráfico de desempenho

**Pontos críticos de implementação:**
- Os indicadores fundamentalistas devem usar texto preto sólido (font-weight: 900) sobre fundos coloridos para garantir legibilidade
- O sistema de abas deve permitir navegação fluida entre as diferentes seções
- O gráfico de desempenho deve comparar o ativo com índices relevantes

### 2. Gráfico de Performance

O componente `PerformanceChart` exibe o desempenho da carteira ou de um ativo específico em comparação com índices de mercado. Características importantes:

- Utiliza `ComposedChart` do Recharts para permitir diferentes tipos de visualização
- Permite alternar entre diferentes índices de comparação
- Exibe os meses em ordem cronológica correta
- Usa cores consistentes para cada série de dados

### 3. Cards de Top/Bottom Ativos

Os componentes `TopBottomAssetsCard` exibem os 5 melhores e 5 piores ativos da carteira, com base no desempenho. Características:

- Exibição lado a lado para fácil comparação
- Indicação visual clara de desempenho positivo/negativo
- Funcionalidade de clique para abrir o modal de detalhes do ativo

## Fluxos de Trabalho Importantes

### 1. Adição de Novos Ativos

O fluxo para adicionar um novo ativo à carteira:

1. Usuário navega para a aba "Descoberta"
2. Realiza busca pelo ativo desejado
3. Seleciona o ativo nos resultados da busca
4. Modal de detalhes é aberto com informações do ativo
5. Usuário clica em "Comprar"
6. Formulário é exibido para informar quantidade e preço médio
7. Após confirmação, ativo é adicionado à carteira

### 2. Análise de Ativos Existentes

O fluxo para analisar um ativo existente na carteira:

1. Usuário navega para a aba "Visão Geral"
2. Localiza o ativo desejado na lista de ativos
3. Clica no ativo para abrir o modal de detalhes
4. Navega entre as abas do modal para acessar diferentes análises
5. Pode optar por comprar mais ou vender o ativo

## Requisitos Visuais Críticos

### 1. Indicadores Fundamentalistas

Os indicadores fundamentalistas devem seguir estas diretrizes visuais:

- **Indicadores Positivos**:
  - Fundo: Verde claro (#E8F5E9)
  - Texto: Preto (#000000)
  - Peso da fonte: 900 (extra-negrito)
  - Sem efeitos de texto ou sombras

- **Indicadores Negativos**:
  - Fundo: Vermelho claro (#FFEBEE)
  - Texto: Preto (#000000)
  - Peso da fonte: 900 (extra-negrito)
  - Sem efeitos de texto ou sombras

### 2. Gráficos de Desempenho

Os gráficos de desempenho devem seguir estas diretrizes:

- Eixo X: Meses em ordem cronológica
- Cores consistentes:
  - Ativo/Carteira: Azul (#2196F3)
  - CDI: Laranja (#FF9800)
  - IBOV: Verde (#4CAF50)
- Linhas com espessura adequada para boa visualização
- Grid de fundo para facilitar a leitura dos valores

## Soluções para Problemas Comuns

### 1. Texto Ilegível em Fundos Coloridos

**Problema**: Texto com baixo contraste ou efeitos que prejudicam a legibilidade sobre fundos coloridos.

**Solução**: Usar estilos inline para garantir que o texto seja renderizado com as propriedades corretas:

```jsx
<div style={{
  backgroundColor: bgColor,
  borderRadius: '10px',
  padding: '12px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '10px'
}}>
  <span style={{
    fontSize: '15px',
    color: '#000000',
    fontWeight: 900,
    textShadow: 'none'
  }}>{name}</span>
  <span style={{
    fontSize: '15px',
    fontWeight: 900,
    color: '#000000',
    textShadow: 'none'
  }}>{value}</span>
</div>
```

### 2. Ordenação Incorreta de Meses em Gráficos

**Problema**: Meses exibidos fora de ordem cronológica em gráficos.

**Solução**: Ordenar os dados antes de passá-los para o componente de gráfico:

```javascript
// Função para ordenar meses cronologicamente
const sortMonths = (data) => {
  const monthOrder = {
    'Jan': 1, 'Fev': 2, 'Mar': 3, 'Abr': 4, 'Mai': 5, 'Jun': 6,
    'Jul': 7, 'Ago': 8, 'Set': 9, 'Out': 10, 'Nov': 11, 'Dez': 12
  };
  
  return [...data].sort((a, b) => {
    // Extrair mês e ano
    const [monthA, yearA] = a.name.split('/');
    const [monthB, yearB] = b.name.split('/');
    
    // Comparar anos primeiro
    if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
    
    // Se anos iguais, comparar meses
    return monthOrder[monthA] - monthOrder[monthB];
  });
};

// Usar a função antes de passar os dados para o gráfico
const sortedData = sortMonths(performanceData);
```

### 3. Navegação entre Abas não Funcionando

**Problema**: Cliques nas abas não alteram o conteúdo exibido.

**Solução**: Implementar um sistema de estado para controlar a aba ativa:

```jsx
const [activeTab, setActiveTab] = useState('resumo');

// Renderizar conteúdo com base na aba ativa
const renderContent = () => {
  switch (activeTab) {
    case 'resumo':
      return <ResumoContent />;
    case 'diagrama':
      return <DiagramaContent />;
    // ... mais casos
    default:
      return null;
  }
};

// No JSX
<div className="modal-tabs">
  <button 
    className={`modal-tab ${activeTab === 'resumo' ? 'active' : ''}`} 
    onClick={() => setActiveTab('resumo')}
  >
    Resumo
  </button>
  {/* ... mais botões de abas */}
</div>

<div className="modal-content">
  {renderContent()}
</div>
```

## Melhorias Futuras

### 1. Integração com APIs de Dados Financeiros

Substituir os dados estáticos por dados reais de APIs financeiras:

- B3 para dados de ativos brasileiros
- Yahoo Finance ou Alpha Vantage para dados internacionais
- Banco Central para índices econômicos

### 2. Autenticação de Usuários

Implementar sistema de autenticação para permitir múltiplos usuários com carteiras separadas:

- Login/registro de usuários
- Perfis de usuário
- Preferências personalizadas

### 3. Notificações e Alertas

Adicionar sistema de notificações para eventos importantes:

- Alertas de preço
- Notificações de dividendos
- Recomendações de rebalanceamento

### 4. Simulações de Cenários

Implementar ferramentas de simulação para ajudar na tomada de decisões:

- Simulação de compra/venda de ativos
- Projeções de longo prazo
- Análise de cenários econômicos

---

Este documento contém o conhecimento acumulado essencial para o desenvolvimento e manutenção do McDuck Dashboard. Ele deve ser atualizado conforme novas funcionalidades e melhorias forem implementadas.

# McDuck Dashboard - Manual Completo

## Índice

1. [Introdução](#introdução)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Componentes Principais](#componentes-principais)
5. [Fluxo de Dados](#fluxo-de-dados)
6. [Funcionalidades](#funcionalidades)
7. [Guia de Estilo](#guia-de-estilo)
8. [Integração de Dados](#integração-de-dados)
9. [Manutenção e Extensão](#manutenção-e-extensão)
10. [Troubleshooting](#troubleshooting)

## Introdução

O McDuck Dashboard é uma aplicação web moderna para gestão de investimentos, desenvolvida com React e Vite. O dashboard oferece uma visão completa da carteira de investimentos do usuário, com análises detalhadas, gráficos de desempenho, comparativos com índices de mercado e recomendações de investimento baseadas em diferentes estratégias.

### Objetivos do Sistema

- Fornecer uma visão consolidada dos investimentos do usuário
- Apresentar análises detalhadas de cada ativo
- Comparar o desempenho da carteira com índices de mercado
- Oferecer recomendações de investimento baseadas em diferentes estratégias
- Permitir a descoberta e adição de novos ativos à carteira

### Tecnologias Utilizadas

- **Frontend**: React, Vite, Recharts
- **Estilização**: CSS Modules
- **Gerenciamento de Estado**: React Hooks
- **Roteamento**: React Router
- **Formatação de Dados**: Bibliotecas personalizadas

## Arquitetura do Sistema

O McDuck Dashboard segue uma arquitetura de componentes React, com separação clara entre componentes de apresentação e lógica de negócios. A aplicação é organizada em módulos, cada um responsável por uma funcionalidade específica.

### Diagrama de Arquitetura

```
McDuck Dashboard
├── App (Componente principal)
│   ├── Router (Gerenciamento de rotas)
│   │   ├── OverviewView (Visão geral)
│   │   ├── AnalysisView (Análise)
│   │   ├── InsightsView (Insights)
│   │   ├── LearnView (Aprenda)
│   │   └── DiscoveryView (Descoberta)
│   └── TabNavigationTwoRows (Navegação entre abas)
├── Componentes
│   ├── Cards (Cartões de informação)
│   ├── Charts (Gráficos)
│   ├── Modals (Modais)
│   └── Navigation (Componentes de navegação)
└── Data (Dados da aplicação)
    ├── userAssets.js (Ativos do usuário)
    ├── portfolioData-updated.js (Dados do portfólio)
    └── performanceData.js (Dados de desempenho)
```

## Estrutura de Diretórios

```
mcduck-dashboard/
├── dist/                  # Arquivos de build para produção
├── node_modules/          # Dependências do projeto
├── public/                # Arquivos públicos
├── src/                   # Código-fonte da aplicação
│   ├── assets/            # Imagens e outros recursos estáticos
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── cards/         # Componentes de cartões
│   │   ├── charts/        # Componentes de gráficos
│   │   ├── modals/        # Componentes de modais
│   │   ├── navigation/    # Componentes de navegação
│   │   └── views/         # Componentes de visualização (páginas)
│   ├── data/              # Dados estáticos e simulados
│   ├── lib/               # Bibliotecas e utilitários
│   ├── modules/           # Módulos específicos de funcionalidade
│   ├── styles/            # Arquivos CSS
│   ├── App.jsx            # Componente principal da aplicação
│   ├── Router.jsx         # Configuração de rotas
│   └── main.jsx           # Ponto de entrada da aplicação
├── .gitignore             # Arquivos ignorados pelo Git
├── index.html             # Arquivo HTML principal
├── package.json           # Dependências e scripts
└── vite.config.js         # Configuração do Vite
```

## Componentes Principais

### 1. App.jsx

O componente principal que inicializa a aplicação e define a estrutura básica.

```jsx
import React from 'react';
import TabNavigationTwoRows from './components/navigation/TabNavigationTwoRows';
import { routes } from './routes';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <TabNavigationTwoRows routes={routes} />
    </div>
  );
}

export default App;
```

### 2. Router.jsx

Gerencia o roteamento da aplicação, permitindo a navegação entre diferentes visualizações.

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import App from './App';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
```

### 3. OverviewView.jsx

A página principal que exibe uma visão geral da carteira de investimentos.

### 4. AnalysisView.jsx

Página de análise detalhada da carteira, com gráficos e indicadores.

### 5. AssetDetailModalComplete.jsx

Modal que exibe informações detalhadas sobre um ativo específico, incluindo análises e recomendações.

## Fluxo de Dados

O fluxo de dados no McDuck Dashboard segue um padrão unidirecional:

1. Os dados são carregados de arquivos estáticos (simulando uma API)
2. Os componentes de visualização consomem esses dados e os exibem
3. As interações do usuário (cliques, seleções) atualizam o estado local dos componentes
4. As mudanças de estado desencadeiam re-renderizações dos componentes afetados

### Exemplo de Fluxo de Dados

```
userAssets.js → OverviewView → AssetClassCard → AssetCard → AssetDetailModalComplete
```

## Funcionalidades

### 1. Visão Geral (Overview)

- Exibição do patrimônio total
- Gráfico de desempenho da carteira
- Comparação com índices de mercado (CDI, IBOV, SELIC)
- Lista de ativos por classe (Ações, FIIs, Ativos Internacionais)

### 2. Análise (Analysis)

- Gráfico de evolução do patrimônio
- Distribuição por classe de ativos
- Top 5 e Bottom 5 ativos
- Estratégias de investimento

### 3. Detalhes do Ativo

- Resumo do ativo (quantidade, preço, valor total, resultado)
- Comparativo com índices
- Indicadores fundamentalistas (positivos e negativos)
- Diagrama do Cerrado com pontuação
- Análise de estratégias (Warren Buffett, Diagrama do Cerrado, ARCA)
- Contexto setorial
- Descrição do ativo
- Gráfico de desempenho

### 4. Descoberta (Discovery)

- Busca de novos ativos
- Adição de ativos à carteira

### 5. Aprenda (Learn)

- Artigos educativos
- Vídeos sobre investimentos
- Glossário de termos financeiros

## Guia de Estilo

### Cores

- **Primária**: #2196F3 (Azul)
- **Secundária**: #4CAF50 (Verde)
- **Terciária**: #FF9800 (Laranja)
- **Alerta**: #F44336 (Vermelho)
- **Fundo**: #FFFFFF (Branco)
- **Texto**: #333333 (Cinza escuro)

### Tipografia

- **Fonte principal**: Roboto, sans-serif
- **Tamanhos**:
  - Títulos: 20px
  - Subtítulos: 16px
  - Texto: 14px
  - Pequeno: 12px

### Componentes Visuais

- **Cards**: Cantos arredondados (12px), sombra suave
- **Botões**: Cantos arredondados (20px), cores contrastantes
- **Gráficos**: Cores consistentes para cada série de dados
- **Indicadores**: Fundo colorido (verde/vermelho) com texto preto

## Integração de Dados

Atualmente, o McDuck Dashboard utiliza dados estáticos simulados. Em um ambiente de produção, seria necessário integrar com APIs de dados financeiros.

### Arquivos de Dados

- **userAssets.js**: Ativos do usuário
- **portfolioData-updated.js**: Dados históricos do portfólio
- **performanceData.js**: Dados de desempenho comparativo

### Exemplo de Estrutura de Dados

```javascript
// userAssets.js
export const userAssets = [
  {
    symbol: "PETR4",
    name: "Petrobras",
    quantity: 100,
    price: 28.50,
    value: 2850.00,
    change: 0.025,
    class: "stocks"
  },
  // ...mais ativos
];
```

## Manutenção e Extensão

### Adição de Novos Componentes

1. Criar o arquivo do componente em `src/components/[categoria]/`
2. Importar e utilizar o componente onde necessário
3. Adicionar estilos correspondentes em `src/styles/`

### Adição de Novas Páginas

1. Criar o componente de visualização em `src/components/views/`
2. Adicionar a rota em `src/routes.js`
3. Implementar a lógica e a interface da página

### Atualização de Dados

Para atualizar os dados simulados:

1. Editar os arquivos em `src/data/`
2. Manter a mesma estrutura de objetos para compatibilidade

## Troubleshooting

### Problemas Comuns e Soluções

#### 1. Página em branco ao navegar para uma rota

**Possível causa**: Problema no roteamento ou componente não encontrado
**Solução**: Verificar se a rota está corretamente definida em `routes.js` e se o componente existe

#### 2. Gráficos não renderizando corretamente

**Possível causa**: Dados inválidos ou incompatíveis
**Solução**: Verificar a estrutura dos dados passados para o componente de gráfico

#### 3. Modal não exibindo texto corretamente

**Possível causa**: Conflito de estilos CSS
**Solução**: Utilizar estilos inline para garantir a exibição correta do texto

#### 4. Problemas de desempenho com muitos ativos

**Possível causa**: Renderização ineficiente de listas
**Solução**: Implementar virtualização de listas ou paginação

---

Este manual foi criado como parte do pacote McDuck Dashboard V1.3.1.

© 2025 McDuck Dashboard. Todos os direitos reservados.

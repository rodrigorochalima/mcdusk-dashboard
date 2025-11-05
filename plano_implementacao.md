# Plano de Implementação para o Dashboard McDuck

## Fase 1: Correções Imediatas (Problemas Visuais)

### 1.1. Gráfico de Performance
- Separar completamente o gráfico dos indicadores econômicos
- Corrigir a estrutura CSS para evitar sobreposições
- Ajustar as margens e o padding para melhor visualização
- Implementar o botão "Mostrar Variação Diária" no local correto

### 1.2. Aba Análise
- Corrigir o dimensionamento do gráfico de pizza
- Reorganizar o layout para evitar cortes
- Ajustar o texto para evitar sobreposição

### 1.3. Textos e Eixos
- Corrigir o posicionamento das legendas no eixo X
- Ajustar o espaçamento entre as marcações de tempo
- Garantir que as datas sejam exibidas corretamente (2025)

## Fase 2: Implementação do Modelo de Dados e Cálculos

### 2.1. Estrutura de Dados
- Criar o modelo JSON para ativos conforme especificação
- Implementar funções para lidar com campos ausentes
- Criar adaptadores para fontes de dados externas

### 2.2. Implementação de Fórmulas
- Desenvolver funções para cálculo de MM200
- Implementar cálculo de Momentum 12-1
- Criar funções para os Scores (valor, qualidade, momentum, tendência)
- Implementar o cálculo do SCA
- Desenvolver a lógica para "Ação em Promoção"
- Implementar a lógica de "Decisão do Dia"

### 2.3. Integração com APIs
- Configurar conexão com Yahoo Finance
- Implementar mapeamento B3 → Yahoo
- Configurar acesso às APIs do BCB/SGS para CDI/SELIC
- Implementar tratamento de erros e fallbacks

## Fase 3: Desenvolvimento da Interface do Usuário

### 3.1. Cartão do Ativo
- Implementar layout conforme especificação
- Adicionar selo de "Promoção"
- Exibir preço, MM200, Momentum 12-1
- Implementar chips para "Decisão do Dia"
- Adicionar barra de SCA

### 3.2. Gráfico 3 Linhas
- Implementar gráfico com linhas para Ativo, Carteira, CDI
- Adicionar linha IFIX para FIIs
- Configurar janela de 12 meses
- Implementar toggle para visualização isolada do ativo

### 3.3. Indicadores Top5/Bottom5
- Criar layout de duas colunas (verde/vermelho)
- Implementar ordenação por Valor+Qualidade
- Adicionar tooltips informativos

### 3.4. Estratégias de Investimento
- Implementar lógica para estratégia Buffett
- Desenvolver Diagrama do Cerrado
- Implementar Método Arca
- Criar sistema de consolidação ponderada

## Fase 4: Melhorias Específicas

### 4.1. Modal de Detalhes
- Reorganizar abas em duas colunas com ícones
- Implementar funcionalidade de clique no Diagrama do Cerrado
- Transformar estratégia Warren Buffett em texto explicativo
- Implementar Método Arca com detalhamento técnico

### 4.2. Funcionalidade de Edição
- Corrigir a funcionalidade de salvar alterações
- Adicionar botão "Voltar" na barra inferior
- Implementar registro de operações (compra/venda)
- Integrar com a API da carteira

### 4.3. Visualizações Específicas
- Redesenhar Análise de Correlação
- Melhorar Oportunidades de Investimento
- Reorganizar Glossário de Investimentos
- Integrar Descoberta de Ativos com API do Yahoo

## Fase 5: Tooltips e Educação

- Implementar tooltips para todos os indicadores
- Adicionar textos explicativos para estratégias
- Criar glossário acessível
- Implementar popups informativos

## Fase 6: Testes e Verificação

- Testar em dispositivos móveis
- Verificar tempo de carregamento
- Validar cálculos e lógicas
- Testar consolidação de estratégias
- Verificar gráficos e visualizações
- Validar acessibilidade

## Fase 7: Documentação e Entrega

- Documentar todas as alterações realizadas
- Criar guia de uso para novas funcionalidades
- Preparar material de referência para manutenção futura
- Entregar código final com testes completos

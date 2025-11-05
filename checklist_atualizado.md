# Checklist Completo de Implementações para o Dashboard McDuck

## 1. Correções Imediatas (Problemas Visuais)

- [ ] **Gráfico de Performance**: Corrigir a visualização para mostrar linhas claras e legíveis
- [ ] **Separação de Componentes**: Garantir que não haja sobreposição entre gráficos e indicadores
- [ ] **Aba Análise**: Corrigir o dimensionamento do gráfico de pizza para que não fique cortado
- [ ] **Textos Sobrepostos**: Ajustar o posicionamento das legendas no eixo X dos gráficos
- [ ] **Eixos Cronológicos**: Corrigir a organização cronológica e exibição de datas (2025)

## 2. Implementação do Painel ao Vivo

### 2.1. Modelo de Dados do Ativo
- [ ] Implementar estrutura JSON conforme especificação
- [ ] Campos: ticker, classe, quantidade, preço_atual, mm200, mom_12_1, f_score, qmj_score, etc.
- [ ] Tratamento para campos ausentes (cálculo parcial com badge 'Parcial')

### 2.2. Fórmulas e Lógicas de Cálculo
- [ ] **MM200**: Média móvel de 200 dias
- [ ] **Momentum 12-1**: Cálculo excluindo o mês corrente
- [ ] **Scores (0..1)**: Valor, qualidade, momentum, tendência
- [ ] **SCA (Sinal Acadêmico Consolidado)**: Média ponderada dos scores
- [ ] **'Ação em Promoção'**: Lógica baseada em qualidade, preço e tendência
- [ ] **Decisão do Dia**: Comprar/Manter/Vender baseado no SCA e outros fatores

### 2.3. UI e Comportamento
- [ ] **Cartão do Ativo**: Implementar layout com ticker, classe, selo Promoção, preço, MM200, etc.
- [ ] **Gráfico 3 Linhas**: Ativo, Carteira, CDI (e IFIX para FIIs)
- [ ] **Indicadores Top5/Bottom5**: Duas colunas (verde/vermelho) com tooltips
- [ ] **Estratégias**: Buffett, Cerrado, Arca com consolidação ponderada
- [ ] **Oportunidades fora da Carteira**: Watchlist com ativos em promoção

### 2.4. Integração com APIs
- [ ] **Yahoo Finance**: Endpoints para cotações e histórico
- [ ] **BCB/SGS**: APIs para CDI/SELIC
- [ ] **B3**: Dados do IFIX para FIIs
- [ ] **Mapeamento B3 → Yahoo**: Regras e tabela de exceções

## 3. Melhorias de Interface

### 3.1. Modal de Detalhes do Ativo
- [ ] Reorganizar abas em duas colunas com ícones
- [ ] Implementar funcionalidade de clique no Diagrama do Cerrado
- [ ] Transformar estratégia Warren Buffett em texto explicativo
- [ ] Implementar Método Arca com detalhamento técnico

### 3.2. Funcionalidade de Edição
- [ ] Corrigir a funcionalidade de salvar alterações
- [ ] Adicionar botão "Voltar" na barra inferior
- [ ] Implementar registro de quantidade, preço médio, data, compras e vendas
- [ ] Integrar com a API da carteira

### 3.3. Visualizações Específicas
- [ ] **Análise de Correlação**: Redesenhar para harmonizar com o design do site
- [ ] **Oportunidades de Investimento**: Substituir bloco branco por seções coloridas
- [ ] **Glossário de Investimentos**: Organizar termos em duas colunas expansíveis
- [ ] **Descoberta de Ativos**: Integrar com API do Yahoo para mostrar todos os ativos coincidentes

## 4. Tooltips e Educação

- [ ] Implementar tooltips informativos para todos os indicadores
- [ ] Adicionar textos explicativos para estratégias de investimento
- [ ] Criar glossário acessível para termos técnicos
- [ ] Implementar popups informativos para Diagrama do Cerrado, Método Arca, etc.

## 5. Arquitetura e Integração

- [ ] Estruturar código em módulos conforme especificação
- [ ] Implementar CSS namespaced com prefixo `.m-panel-*`
- [ ] Criar adaptadores para interligação com sistemas existentes
- [ ] Garantir que todas as alterações sejam cirúrgicas e não quebrem o aplicativo existente

## 6. Testes e Verificação

- [ ] Testar em dispositivos móveis (360px)
- [ ] Verificar tempo de carregamento de dados (máximo 7s no 4G)
- [ ] Validar cálculos de SCA, Decisão, Promoção
- [ ] Verificar ordenação de Top/Bottom 5
- [ ] Testar consolidação de estratégias
- [ ] Verificar gráfico 3 linhas com CDI e IFIX
- [ ] Validar acessibilidade (tooltips e contraste AA)

## 7. Verificação Final

- [ ] Testar todas as funcionalidades implementadas
- [ ] Verificar a consistência visual em todo o dashboard
- [ ] Garantir que não haja sobreposições ou problemas de layout
- [ ] Testar em diferentes tamanhos de tela
- [ ] Fazer capturas de tela para documentar as correções

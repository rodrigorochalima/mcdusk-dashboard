# CHECKLIST DE AUDITORIA - McDuck Dashboard

## Status: EM ANDAMENTO

---

## 1. INDICADOR DE STATUS DAS APIs
- [ ] Indicador visual no header mostrando status (verde/amarelo/vermelho)
- [ ] Modal com detalhes de cada API (nome, status, última verificação)
- [ ] Botão de refresh discreto para forçar atualização
- [ ] Responsivo mobile-first (modal centralizado, overlay)
- [ ] Mostrar data/hora da última atualização
- [ ] APIs reais sendo verificadas (não fake no-cors)
- [ ] Sistema de fallback em cascata (se uma falha, tenta a próxima)

## 2. DESINVESTIMENTO INTELIGENTE
- [ ] Componente na aba Insights
- [ ] Campo para digitar valor necessário
- [ ] Sequência otimizada de vendas/resgates
- [ ] Cálculo automático de IR por tipo de ativo
- [ ] Regras: Proventos FII > Ações <20k > Cripto <35k > CDB antigo > ETF/BDR > FII > CDB novo
- [ ] Interface responsiva mobile-first

## 3. MENSAGENS DE ALARME (Cripto e Renda Fixa)
- [ ] Bitcoin: mensagens amigáveis para cada lente
- [ ] CDB: mensagens amigáveis para cada lente
- [ ] Integração com modal de detalhes
- [ ] Mensagens contextuais (verde/amarelo/vermelho)

## 4. LENTES DE ANÁLISE POR ATIVO
- [ ] Renda Variável: Buffett, Barsi, Raul Sena, ARCA
- [ ] Renda Fixa: Gross, Gundlach, Ivascyn + 1
- [ ] Cripto: Alden, Swift, Glassnode + 1
- [ ] Indicadores luminosos nos cards (W, B, R, A)
- [ ] Prioridade: Buffett > Barsi ≈ Raul Sena > ARCA

## 5. PROBLEMAS TÉCNICOS GERAIS
- [ ] Mobile-first (iPhone) - tudo responsivo
- [ ] Sem dados hardcoded que deveriam ser dinâmicos
- [ ] Código modular e limpo
- [ ] Sem erros de compilação
- [ ] Sem console errors em produção

## 6. IDENTIDADE VISUAL
- [ ] Manter design original intacto
- [ ] Não alterar cores/fontes sem solicitação
- [ ] Integrar novos componentes harmoniosamente

---

## GAPS IDENTIFICADOS NO REPOSITÓRIO ATUAL:

1. **ApiStatusIndicator** - Existe mas usa `no-cors` (fake), não rastreia de verdade
2. **SmartDivestmentCalculator** - NÃO EXISTE no repositório
3. **FriendlyMessages/AlarmAdapter** - NÃO EXISTE no repositório
4. **Lentes dinâmicas** - Modal tem estratégias HARDCODED (só para BOAC34)
5. **TotalPatrimonyCard** - Não tem slot para API status
6. **Botão de Refresh** - NÃO EXISTE no repositório

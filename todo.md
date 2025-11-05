# McDuck Dashboard - TODO

## 🚀 MIGRAÇÃO PARA SUPABASE + VERCEL (04/11/2025)

**Status:** 🟢 EM ANDAMENTO  
**Objetivo:** Migrar de localStorage para Supabase (PostgreSQL na nuvem) + Deploy na Vercel

---

### Credenciais Recebidas ✅
- ✅ Supabase Project URL: `https://duxogcikcvfspcuepess.supabase.co`
- ✅ Supabase anon key: `eyJhbGci...`
- ✅ Database Password: `L@ro331504`
- ✅ GitHub conectado: `rodrigorochalima/mcduck-dashboard`

---

## Fase 1: Configurar Supabase
- [x] Criar schema do banco de dados
- [x] Criar tabela `portfolios` (id, user_id, symbol, name, quantity, average_price, category, created_at, updated_at)
- [x] Criar tabela `transactions` (id, portfolio_id, type, quantity, price, date, created_at)
- [x] Criar tabela `user_settings` (user_id, theme, currency, notifications_enabled)
- [x] Configurar Row Level Security (RLS) para proteger dados por usuário
- [x] Testar conexão com banco de dados

## Fase 2: Instalar Dependências
- [x] Instalar `@supabase/supabase-js`
- [x] Criar arquivo `/src/lib/supabaseClient.js`
- [x] Configurar Supabase client com credenciais
- [x] Criar arquivo `.env.local` com variáveis de ambiente
- [x] Adicionar `.env.local` ao `.gitignore`
- [x] Criar `.env.example` como template

## Fase 3: Migrar Código localStorage → Supabase
- [x] Criar `/src/lib/supabasePortfolioManager.js` (substitui portfolioManager.js)
- [x] Implementar `loadPortfolio()` usando Supabase
- [x] Implementar `savePortfolio()` usando Supabase
- [x] Implementar `updateAsset()` usando Supabase
- [x] Implementar `addAsset()` usando Supabase
- [x] Implementar `deleteAsset()` usando Supabase
- [x] Atualizar `userAssets.js` para usar Supabase
- [x] Atualizar `portfolioData-new.js` para usar Supabase
- [x] Atualizar `OverviewView.jsx` para usar Supabase
- [x] Criar script de migração de dados (localStorage → Supabase)

## Fase 4: Implementar Autenticação
- [x] Criar componente `/src/components/auth/LoginForm.jsx`
- [x] Criar componente `/src/components/auth/SignupForm.jsx`
- [x] Criar página `/src/pages/AuthPage.jsx`
- [x] Implementar Supabase Auth (email/senha)
- [x] Criar rota de autenticação
- [x] Proteger rotas autenticadas (no OverviewView)
- [x] Implementar logout
- [x] Integrar migração de dados após login

## Fase 5: Preparar Deploy Vercel
- [ ] Configurar variáveis de ambiente para produção
- [ ] Criar `vercel.json` com configurações
- [ ] Atualizar `README.md` com instruções de deploy
- [ ] Fazer commit de todas as mudanças
- [ ] Push para GitHub (`rodrigorochalima/mcduck-dashboard`)
- [ ] Conectar repositório GitHub à Vercel
- [ ] Configurar variáveis de ambiente na Vercel
- [ ] Fazer deploy inicial
- [ ] Testar aplicação em produção

---

## ✅ CONCLUÍDO ANTERIORMENTE

### Solução A - Funções Dinâmicas (04/11/2025)
- [x] Modificar userAssets.js para exportar função getUserAssets()
- [x] Modificar portfolioData-new.js para usar funções dinâmicas
- [x] Refatorar OverviewView.jsx com useState e event listeners
- [x] Implementar reload automático após edições
- [x] **Status:** Código 100% pronto, aguardando servidor correto

### Funcionalidades Básicas
- [x] Visualização de portfólio por categorias
- [x] Cards de ativos com informações detalhadas
- [x] Modal de edição de ativos
- [x] Salvamento no localStorage
- [x] Cálculo automático de valores

---

## 📝 Notas Importantes

### Por Que Migrar para Supabase?

**Problemas do localStorage:**
- ❌ Dados apenas no navegador local
- ❌ Não sincroniza entre dispositivos
- ❌ Sem autenticação/multi-usuário
- ❌ Sem backup automático
- ❌ Limitado a ~5MB

**Vantagens do Supabase:**
- ✅ PostgreSQL real na nuvem
- ✅ Acesso de qualquer dispositivo
- ✅ Autenticação integrada
- ✅ Backup automático
- ✅ 500MB grátis
- ✅ APIs automáticas
- ✅ Real-time updates
- ✅ Row Level Security

### Arquitetura Final

```
Frontend (React + Vite)
    ↓
Supabase Client
    ↓
Supabase (PostgreSQL + Auth)
    ↓
Deploy na Vercel (CDN Global)
```

### Custos

- **Supabase:** Grátis até 500MB + 2GB bandwidth
- **Vercel:** Grátis até 100k visitantes/mês
- **GitHub:** Grátis (repos ilimitados)
- **Total:** R$ 0,00/mês 🎉

---

## 🎯 Resultado Final Esperado

Após completar todas as fases:

1. ✅ Dashboard acessível de qualquer lugar via URL pública
2. ✅ Dados salvos na nuvem (PostgreSQL)
3. ✅ Login/cadastro funcionando
4. ✅ Cada usuário vê apenas seus dados
5. ✅ Deploy automático a cada commit
6. ✅ SSL/HTTPS grátis
7. ✅ Backup automático
8. ✅ Escalável e profissional

---

## 📊 Progresso

- [x] Fase 1: Configurar Supabase (100%)
- [x] Fase 2: Instalar Dependências (100%)
- [x] Fase 3: Migrar Código (100%)
- [x] Fase 4: Autenticação (100%)
- [ ] Fase 5: Deploy Vercel (0%)

**Total:** 80% completo


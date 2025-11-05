# 🚀 Guia de Setup do Supabase - McDuck Dashboard

## Passo 1: Executar Schema do Banco de Dados

### 1.1 Acessar SQL Editor

1. Abra: https://supabase.com/dashboard
2. Selecione o projeto **mcduck-dashboard**
3. No menu lateral esquerdo, clique em **SQL Editor**
4. Clique no botão **"New query"**

### 1.2 Copiar e Colar o Script

1. Abra o arquivo `supabase-schema.sql` (está na raiz do projeto)
2. Copie **TODO** o conteúdo (Ctrl+A, Ctrl+C)
3. Cole no SQL Editor do Supabase (Ctrl+V)

### 1.3 Executar

1. Clique no botão **"Run"** (canto inferior direito)
   - Ou pressione **Ctrl+Enter**
2. Aguarde a execução (~5-10 segundos)
3. Você verá mensagens de sucesso em verde

### 1.4 Verificar Tabelas Criadas

1. No menu lateral esquerdo, clique em **Table Editor**
2. Você deve ver **3 tabelas** criadas:
   - ✅ **portfolios** - Armazena os ativos do usuário
   - ✅ **transactions** - Histórico de compras/vendas
   - ✅ **user_settings** - Configurações do usuário

3. Clique em cada tabela para ver a estrutura

---

## Passo 2: Verificar Row Level Security (RLS)

### 2.1 Verificar Políticas de Segurança

1. Clique em **portfolios** no Table Editor
2. Clique na aba **"Policies"** (no topo)
3. Você deve ver **4 políticas** ativas:
   - ✅ Users can view their own portfolios
   - ✅ Users can insert their own portfolios
   - ✅ Users can update their own portfolios
   - ✅ Users can delete their own portfolios

4. Repita para as tabelas **transactions** e **user_settings**

**O que isso significa?**
- Cada usuário só pode ver e modificar **seus próprios dados**
- Dados de outros usuários são **completamente isolados**
- Segurança garantida pelo próprio banco de dados!

---

## Passo 3: Testar Conexão (Opcional)

### 3.1 Inserir Dados de Teste

1. No SQL Editor, crie uma nova query
2. Cole este código:

```sql
-- Verificar se tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('portfolios', 'transactions', 'user_settings');
```

3. Clique em "Run"
4. Você deve ver as 3 tabelas listadas

### 3.2 Verificar Estrutura

```sql
-- Ver estrutura da tabela portfolios
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolios'
ORDER BY ordinal_position;
```

---

## Passo 4: Configurar Autenticação (Opcional)

### 4.1 Habilitar Provedores de Auth

1. No menu lateral, clique em **Authentication** → **Providers**
2. Habilite os provedores que quiser:
   - ✅ **Email** (já vem habilitado)
   - 🔲 **Google** (opcional)
   - 🔲 **GitHub** (opcional)

### 4.2 Configurar Email Templates (Opcional)

1. Authentication → **Email Templates**
2. Personalize os emails de:
   - Confirmação de cadastro
   - Redefinição de senha
   - Mudança de email

---

## Passo 5: Copiar Credenciais Finais

### 5.1 Verificar Project URL

1. Settings → **API**
2. Copie **Project URL**
   - Deve ser: `https://duxogcikcvfspcuepess.supabase.co`

### 5.2 Verificar API Keys

1. Mesma página (Settings → API)
2. Verifique que tem:
   - ✅ **anon** **public** key (para frontend)
   - ✅ **service_role** key (NUNCA expor no frontend!)

---

## ✅ Checklist Final

Antes de prosseguir, verifique:

- [ ] Script SQL executado com sucesso
- [ ] 3 tabelas criadas (portfolios, transactions, user_settings)
- [ ] RLS habilitado em todas as tabelas
- [ ] Políticas de segurança criadas
- [ ] Project URL anotada
- [ ] anon public key anotada
- [ ] Database Password anotada

---

## 🎯 Próximo Passo

Depois de completar este setup, avise para eu continuar com:

**Fase 2: Instalar Dependências no Projeto**
- Instalar `@supabase/supabase-js`
- Configurar Supabase client
- Criar arquivos de configuração

---

## 🆘 Problemas Comuns

### Erro: "permission denied for schema public"

**Solução:**
```sql
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

### Erro: "relation already exists"

**Solução:** As tabelas já foram criadas. Tudo certo!

### Erro: "extension uuid-ossp does not exist"

**Solução:**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## 📚 Recursos Úteis

- **Supabase Docs:** https://supabase.com/docs
- **SQL Editor:** https://supabase.com/dashboard/project/duxogcikcvfspcuepess/sql
- **Table Editor:** https://supabase.com/dashboard/project/duxogcikcvfspcuepess/editor
- **API Docs:** https://supabase.com/dashboard/project/duxogcikcvfspcuepess/api

---

**Dúvidas? Me avise que eu te ajudo!** 🚀


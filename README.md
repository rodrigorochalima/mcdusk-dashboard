# 💰 McDuck Dashboard

Dashboard profissional para gerenciamento de portfólio de investimentos com autenticação e persistência na nuvem.

## 🚀 Tecnologias

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Deploy:** Vercel
- **Versionamento:** GitHub

## ✨ Funcionalidades

- ✅ Autenticação segura (email/senha)
- ✅ Gerenciamento de portfólio multi-ativo
- ✅ Categorização automática (Ações, FIIs, Internacional)
- ✅ Edição de ativos em tempo real
- ✅ Cálculo automático de patrimônio
- ✅ Dados salvos na nuvem (PostgreSQL)
- ✅ Acesso de qualquer dispositivo
- ✅ Migração automática de dados locais
- ✅ Row Level Security (RLS)

## 📦 Instalação Local

```bash
# Clone o repositório
git clone https://github.com/rodrigorochalima/mcduck-dashboard.git
cd mcduck-dashboard

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔐 Configuração do Supabase

### 1. Criar Projeto no Supabase

1. Acesse https://supabase.com/dashboard
2. Clique em "New Project"
3. Preencha:
   - Nome: `mcduck-dashboard`
   - Database Password: (crie uma senha forte)
   - Region: `South America (São Paulo)`
4. Aguarde ~2 minutos para provisionar

### 2. Executar Script SQL

1. No Supabase Dashboard → **SQL Editor**
2. Clique em "New query"
3. Cole o conteúdo de `supabase-schema-final.sql`
4. Clique em "Run"
5. Verifique em **Table Editor** que 3 tabelas foram criadas:
   - `portfolios`
   - `transactions`
   - `user_settings`

### 3. Obter Credenciais

No Supabase Dashboard → **Settings** → **API**:

- **Project URL:** `https://xxxxx.supabase.co`
- **anon public key:** `eyJxxxxx...`

Cole essas credenciais no arquivo `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxxxx...
```

## 🚀 Deploy na Vercel

### 1. Preparar Repositório

```bash
# Commit de todas as mudanças
git add .
git commit -m "feat: migração para Supabase + autenticação"
git push origin main
```

### 2. Conectar Vercel

1. Acesse https://vercel.com/dashboard
2. Clique em "Add New" → "Project"
3. Selecione o repositório `rodrigorochalima/mcduck-dashboard`
4. Configure:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### 3. Configurar Variáveis de Ambiente

Na Vercel, vá em **Settings** → **Environment Variables** e adicione:

```
VITE_SUPABASE_URL = https://duxogcikcvfspcuepess.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde ~2 minutos
3. Acesse a URL gerada: `https://mcduck-dashboard.vercel.app`

## 📊 Estrutura do Projeto

```
mcduck-dashboard/
├── src/
│   ├── components/
│   │   ├── auth/              # Componentes de autenticação
│   │   ├── cards/             # Cards de ativos
│   │   ├── modals/            # Modais de edição
│   │   └── views/             # Views principais
│   ├── data/                  # Dados e configurações
│   ├── lib/                   # Bibliotecas e clientes
│   │   ├── supabaseClient.js  # Cliente Supabase
│   │   └── supabasePortfolioManager.js
│   ├── pages/                 # Páginas
│   ├── utils/                 # Utilitários
│   └── App.jsx                # Componente principal
├── .env.local                 # Variáveis de ambiente (não commitado)
├── .env.example               # Template de variáveis
├── vercel.json                # Configuração Vercel
├── supabase-schema-final.sql  # Schema do banco
└── package.json
```

## 🔒 Segurança

- ✅ Row Level Security (RLS) ativo
- ✅ Cada usuário vê apenas seus dados
- ✅ Senhas criptografadas (bcrypt)
- ✅ Tokens JWT seguros
- ✅ HTTPS obrigatório
- ✅ Variáveis de ambiente protegidas

## 💡 Uso

### Criar Conta

1. Acesse o dashboard
2. Clique em "Criar conta"
3. Preencha email e senha
4. Confirme o email (verifique spam)

### Adicionar Ativos

1. Faça login
2. Clique em "Adicionar Ativo"
3. Preencha:
   - Símbolo (ex: PGCO34)
   - Nome (ex: Procter & Gamble)
   - Categoria (Ações, FIIs, etc.)
   - Quantidade
   - Preço Médio
4. Salvar

### Editar Ativos

1. Clique no ícone ✏️ no card do ativo
2. Altere quantidade ou preço médio
3. Salvar
4. **Dados atualizados automaticamente!**

### Migrar Dados Locais

Se você tinha dados no localStorage:

1. Faça login
2. Aparecerá um prompt perguntando se deseja migrar
3. Clique em "Sim"
4. Seus dados serão transferidos para a nuvem!

## 📈 Roadmap

- [ ] Gráficos de evolução patrimonial
- [ ] Histórico de transações
- [ ] Alertas de preço
- [ ] Integração com APIs de cotação
- [ ] Exportar relatórios (PDF/Excel)
- [ ] Modo escuro
- [ ] Suporte a múltiplas moedas

## 🐛 Problemas Conhecidos

Nenhum no momento! 🎉

## 📝 Licença

MIT

## 👨‍💻 Autor

Rodrigo Rocha Lima
- GitHub: [@rodrigorochalima](https://github.com/rodrigorochalima)

## 🙏 Agradecimentos

- Supabase pela infraestrutura incrível
- Vercel pelo deploy gratuito
- Comunidade React

---

**Desenvolvido com ❤️ usando React + Supabase + Vercel**


-- ============================================
-- McDuck Dashboard - Supabase Database Schema
-- ============================================
-- Criado em: 04/11/2025
-- Versão: 1.0
-- ============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA: portfolios
-- Armazena os ativos do portfólio de cada usuário
-- ============================================

CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Informações do ativo
    symbol TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('stocks', 'fiis', 'international', 'crypto', 'fixedIncome')),
    
    -- Dados financeiros
    quantity NUMERIC(18, 8) NOT NULL DEFAULT 0,
    average_price NUMERIC(18, 2) NOT NULL DEFAULT 0,
    current_price NUMERIC(18, 2),
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Índices para performance
    CONSTRAINT portfolios_user_symbol_unique UNIQUE (user_id, symbol)
);

-- Índices para melhorar performance de queries
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON public.portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_category ON public.portfolios(category);
CREATE INDEX IF NOT EXISTS idx_portfolios_symbol ON public.portfolios(symbol);

-- ============================================
-- TABELA: transactions
-- Histórico de transações (compra/venda) de ativos
-- ============================================

CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Tipo de transação
    type TEXT NOT NULL CHECK (type IN ('buy', 'sell')),
    
    -- Dados da transação
    quantity NUMERIC(18, 8) NOT NULL,
    price NUMERIC(18, 2) NOT NULL,
    total_value NUMERIC(18, 2) GENERATED ALWAYS AS (quantity * price) STORED,
    
    -- Data da transação
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Metadados
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    
    -- Validações
    CONSTRAINT transactions_quantity_positive CHECK (quantity > 0),
    CONSTRAINT transactions_price_positive CHECK (price > 0)
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_transactions_portfolio_id ON public.transactions(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(transaction_date DESC);

-- ============================================
-- TABELA: user_settings
-- Configurações e preferências do usuário
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Preferências de interface
    theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'auto')),
    currency TEXT DEFAULT 'BRL' CHECK (currency IN ('BRL', 'USD', 'EUR')),
    language TEXT DEFAULT 'pt-BR' CHECK (language IN ('pt-BR', 'en-US', 'es-ES')),
    
    -- Notificações
    notifications_enabled BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    
    -- Metas e objetivos
    target_patrimony NUMERIC(18, 2),
    monthly_contribution NUMERIC(18, 2),
    
    -- Metadados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- FUNÇÕES: Triggers para updated_at automático
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para portfolios
DROP TRIGGER IF EXISTS update_portfolios_updated_at ON public.portfolios;
CREATE TRIGGER update_portfolios_updated_at
    BEFORE UPDATE ON public.portfolios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para user_settings
DROP TRIGGER IF EXISTS update_user_settings_updated_at ON public.user_settings;
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Garante que usuários só vejam seus próprios dados
-- ============================================

-- Habilitar RLS nas tabelas
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para portfolios
DROP POLICY IF EXISTS "Users can view their own portfolios" ON public.portfolios;
CREATE POLICY "Users can view their own portfolios"
    ON public.portfolios FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own portfolios" ON public.portfolios;
CREATE POLICY "Users can insert their own portfolios"
    ON public.portfolios FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own portfolios" ON public.portfolios;
CREATE POLICY "Users can update their own portfolios"
    ON public.portfolios FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own portfolios" ON public.portfolios;
CREATE POLICY "Users can delete their own portfolios"
    ON public.portfolios FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para transactions
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
CREATE POLICY "Users can view their own transactions"
    ON public.transactions FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.transactions;
CREATE POLICY "Users can insert their own transactions"
    ON public.transactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own transactions" ON public.transactions;
CREATE POLICY "Users can update their own transactions"
    ON public.transactions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own transactions" ON public.transactions;
CREATE POLICY "Users can delete their own transactions"
    ON public.transactions FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para user_settings
DROP POLICY IF EXISTS "Users can view their own settings" ON public.user_settings;
CREATE POLICY "Users can view their own settings"
    ON public.user_settings FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own settings" ON public.user_settings;
CREATE POLICY "Users can insert their own settings"
    ON public.user_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own settings" ON public.user_settings;
CREATE POLICY "Users can update their own settings"
    ON public.user_settings FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- VIEWS: Visualizações úteis
-- ============================================

-- View: Portfolio com valores calculados
CREATE OR REPLACE VIEW portfolio_summary AS
SELECT 
    p.id,
    p.user_id,
    p.symbol,
    p.name,
    p.category,
    p.quantity,
    p.average_price,
    p.current_price,
    (p.quantity * p.average_price) AS invested_value,
    (p.quantity * COALESCE(p.current_price, p.average_price)) AS current_value,
    ((p.quantity * COALESCE(p.current_price, p.average_price)) - (p.quantity * p.average_price)) AS profit_loss,
    CASE 
        WHEN p.average_price > 0 THEN 
            (((COALESCE(p.current_price, p.average_price) - p.average_price) / p.average_price) * 100)
        ELSE 0
    END AS profit_loss_percent,
    p.created_at,
    p.updated_at
FROM public.portfolios p;

-- ============================================
-- DADOS INICIAIS (OPCIONAL)
-- Comentar se não quiser dados de exemplo
-- ============================================

-- Criar função para inserir dados de exemplo
CREATE OR REPLACE FUNCTION insert_sample_data(target_user_id UUID)
RETURNS void AS $$
BEGIN
    -- Inserir configurações padrão
    INSERT INTO public.user_settings (user_id)
    VALUES (target_user_id)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Inserir alguns ativos de exemplo
    INSERT INTO public.portfolios (user_id, symbol, name, category, quantity, average_price, current_price)
    VALUES 
        (target_user_id, 'PGCO34', 'Procter & Gamble', 'stocks', 19, 95.75, 98.00),
        (target_user_id, 'B3SA3', 'B3', 'stocks', 100, 51.40, 52.32),
        (target_user_id, 'HGLG11', 'CSHG Logística', 'fiis', 50, 66.13, 66.75)
    ON CONFLICT (user_id, symbol) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMENTÁRIOS NAS TABELAS
-- ============================================

COMMENT ON TABLE public.portfolios IS 'Armazena os ativos do portfólio de cada usuário';
COMMENT ON TABLE public.transactions IS 'Histórico de transações (compra/venda) de ativos';
COMMENT ON TABLE public.user_settings IS 'Configurações e preferências do usuário';

COMMENT ON COLUMN public.portfolios.symbol IS 'Código do ativo (ex: PETR4, HGLG11, BTC)';
COMMENT ON COLUMN public.portfolios.category IS 'Categoria: stocks, fiis, international, crypto, fixedIncome';
COMMENT ON COLUMN public.portfolios.quantity IS 'Quantidade de unidades do ativo';
COMMENT ON COLUMN public.portfolios.average_price IS 'Preço médio de aquisição';
COMMENT ON COLUMN public.portfolios.current_price IS 'Preço atual de mercado (atualizado via API)';

-- ============================================
-- FIM DO SCHEMA
-- ============================================

-- Para executar este script no Supabase:
-- 1. Acesse: https://supabase.com/dashboard
-- 2. Selecione seu projeto
-- 3. Vá em: SQL Editor
-- 4. Cole este script completo
-- 5. Clique em "Run" ou pressione Ctrl+Enter
-- 6. Verifique que todas as tabelas foram criadas em: Table Editor


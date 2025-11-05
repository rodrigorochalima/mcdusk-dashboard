-- Adicionar novos campos na tabela assets para suportar edição completa

-- Preço médio com proventos
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS average_price_with_dividends DECIMAL(10, 2);

-- Data da primeira compra
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS first_purchase_date DATE;

-- Preço alvo (target)
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS target_price DECIMAL(10, 2);

-- Stop loss
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS stop_loss DECIMAL(10, 2);

-- Notas/observações
ALTER TABLE assets 
ADD COLUMN IF NOT EXISTS notes TEXT;

-- Comentários sobre as colunas
COMMENT ON COLUMN assets.average_price_with_dividends IS 'Preço médio ajustado após receber dividendos/JCP';
COMMENT ON COLUMN assets.first_purchase_date IS 'Data da primeira compra do ativo';
COMMENT ON COLUMN assets.target_price IS 'Preço alvo para venda';
COMMENT ON COLUMN assets.stop_loss IS 'Preço de stop loss';
COMMENT ON COLUMN assets.notes IS 'Observações e comentários sobre o ativo';


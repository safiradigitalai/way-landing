-- PASSO 2: CRIAÇÃO DOS ÍNDICES
-- Execute após o Passo 1

-- Índice único para email
CREATE UNIQUE INDEX IF NOT EXISTS idx_way_roleta_leads_email_unique
ON public.way_roleta_leads (email);

-- Índice único para whatsapp (apenas números)
CREATE UNIQUE INDEX IF NOT EXISTS idx_way_roleta_leads_whatsapp_unique
ON public.way_roleta_leads (REGEXP_REPLACE(whatsapp, '[^0-9]', '', 'g'));

-- Índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_way_roleta_leads_created_at
ON public.way_roleta_leads (created_at DESC);

-- Índice para consultas por prêmio
CREATE INDEX IF NOT EXISTS idx_way_roleta_leads_premio_id
ON public.way_roleta_leads (premio_id);

-- Índice para leads ativos
CREATE INDEX IF NOT EXISTS idx_way_roleta_leads_active
ON public.way_roleta_leads (is_active) WHERE is_active = true;
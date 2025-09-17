-- PASSO 1: CRIAÇÃO DA TABELA DE LEADS
-- Execute este primeiro

CREATE TABLE IF NOT EXISTS public.way_roleta_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  premio_id INTEGER NOT NULL,
  premio_nome VARCHAR(100) NOT NULL,
  premio_cupom VARCHAR(50),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  attempt_count INTEGER DEFAULT 1,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  referrer TEXT
);
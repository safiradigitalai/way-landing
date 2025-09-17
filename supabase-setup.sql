-- =====================================================
-- SCRIPT DE CONFIGURAÇÃO SUPABASE - WAY ROLETA PREMIADA
-- =====================================================
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. CRIAÇÃO DA TABELA DE LEADS DA ROLETA
-- =====================================================

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

  -- Campos de controle
  is_active BOOLEAN DEFAULT true,
  attempt_count INTEGER DEFAULT 1,

  -- Metadados para análise
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  referrer TEXT
);

-- 2. CRIAÇÃO DE ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índice único composto para evitar duplicatas de email
CREATE UNIQUE INDEX IF NOT EXISTS idx_way_roleta_leads_email_unique
ON public.way_roleta_leads (email);

-- Índice único para whatsapp (sem formatação)
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

-- 3. FUNÇÃO PARA ATUALIZAR updated_at AUTOMATICAMENTE
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_way_roleta_leads_updated_at
  BEFORE UPDATE ON public.way_roleta_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 4. FUNÇÃO PARA VERIFICAR DUPLICATAS
-- =====================================================

CREATE OR REPLACE FUNCTION check_lead_duplicate(
  p_email VARCHAR(255),
  p_whatsapp VARCHAR(20)
)
RETURNS JSON AS $$
DECLARE
  existing_lead RECORD;
  clean_whatsapp TEXT;
BEGIN
  -- Limpar WhatsApp (manter apenas números)
  clean_whatsapp := REGEXP_REPLACE(p_whatsapp, '[^0-9]', '', 'g');

  -- Verificar se existe lead com mesmo email
  SELECT * INTO existing_lead
  FROM public.way_roleta_leads
  WHERE email = p_email
    AND is_active = true
  LIMIT 1;

  IF existing_lead.id IS NOT NULL THEN
    RETURN json_build_object(
      'duplicate', true,
      'type', 'email',
      'message', 'Este email já participou da promoção',
      'existing_lead', row_to_json(existing_lead)
    );
  END IF;

  -- Verificar se existe lead com mesmo WhatsApp
  SELECT * INTO existing_lead
  FROM public.way_roleta_leads
  WHERE REGEXP_REPLACE(whatsapp, '[^0-9]', '', 'g') = clean_whatsapp
    AND is_active = true
  LIMIT 1;

  IF existing_lead.id IS NOT NULL THEN
    RETURN json_build_object(
      'duplicate', true,
      'type', 'whatsapp',
      'message', 'Este WhatsApp já participou da promoção',
      'existing_lead', row_to_json(existing_lead)
    );
  END IF;

  -- Não há duplicatas
  RETURN json_build_object(
    'duplicate', false,
    'message', 'Lead válido para participação'
  );
END;
$$ LANGUAGE plpgsql;

-- 5. FUNÇÃO PARA INSERIR LEAD COM VALIDAÇÃO
-- =====================================================

CREATE OR REPLACE FUNCTION insert_roleta_lead(
  p_email VARCHAR(255),
  p_whatsapp VARCHAR(20),
  p_premio_id INTEGER,
  p_premio_nome VARCHAR(100),
  p_premio_cupom VARCHAR(50) DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_utm_source VARCHAR(100) DEFAULT NULL,
  p_utm_medium VARCHAR(100) DEFAULT NULL,
  p_utm_campaign VARCHAR(100) DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
  duplicate_check JSON;
  new_lead_id UUID;
  result JSON;
BEGIN
  -- Verificar duplicatas primeiro
  SELECT check_lead_duplicate(p_email, p_whatsapp) INTO duplicate_check;

  IF (duplicate_check->>'duplicate')::boolean THEN
    RETURN duplicate_check;
  END IF;

  -- Inserir novo lead
  INSERT INTO public.way_roleta_leads (
    email, whatsapp, premio_id, premio_nome, premio_cupom,
    ip_address, user_agent, utm_source, utm_medium, utm_campaign, referrer
  ) VALUES (
    p_email, p_whatsapp, p_premio_id, p_premio_nome, p_premio_cupom,
    p_ip_address, p_user_agent, p_utm_source, p_utm_medium, p_utm_campaign, p_referrer
  ) RETURNING id INTO new_lead_id;

  RETURN json_build_object(
    'success', true,
    'lead_id', new_lead_id,
    'message', 'Lead inserido com sucesso'
  );

EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object(
    'success', false,
    'error', SQLERRM,
    'message', 'Erro ao inserir lead'
  );
END;
$$ LANGUAGE plpgsql;

-- 6. VIEW PARA ESTATÍSTICAS
-- =====================================================

CREATE OR REPLACE VIEW way_roleta_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(DISTINCT email) as emails_unicos,
  COUNT(DISTINCT REGEXP_REPLACE(whatsapp, '[^0-9]', '', 'g')) as whatsapps_unicos,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as leads_hoje,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as leads_ultima_semana,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_ultimo_mes,

  -- Estatísticas por prêmio
  json_agg(
    json_build_object(
      'premio_id', premio_id,
      'premio_nome', premio_nome,
      'quantidade', count_por_premio
    )
  ) as premios_distribuidos
FROM (
  SELECT
    premio_id,
    premio_nome,
    COUNT(*) as count_por_premio
  FROM public.way_roleta_leads
  WHERE is_active = true
  GROUP BY premio_id, premio_nome
) premio_stats,
public.way_roleta_leads
WHERE is_active = true;

-- 7. POLÍTICAS RLS (ROW LEVEL SECURITY)
-- =====================================================

-- Habilitar RLS na tabela
ALTER TABLE public.way_roleta_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT público (através da API)
CREATE POLICY "Permitir insert público de leads"
ON public.way_roleta_leads
FOR INSERT
TO public
WITH CHECK (true);

-- Política para SELECT apenas para usuários autenticados
CREATE POLICY "Permitir select apenas para autenticados"
ON public.way_roleta_leads
FOR SELECT
TO authenticated
USING (true);

-- Política para UPDATE apenas para usuários autenticados
CREATE POLICY "Permitir update apenas para autenticados"
ON public.way_roleta_leads
FOR UPDATE
TO authenticated
USING (true);

-- 8. PERMISSÕES PARA USUÁRIO PÚBLICO
-- =====================================================

-- Permitir acesso público às funções necessárias
GRANT EXECUTE ON FUNCTION check_lead_duplicate(VARCHAR, VARCHAR) TO public;
GRANT EXECUTE ON FUNCTION insert_roleta_lead(VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, INET, TEXT, VARCHAR, VARCHAR, VARCHAR, TEXT) TO public;

-- Permitir acesso à view de estatísticas apenas para autenticados
GRANT SELECT ON way_roleta_stats TO authenticated;

-- =====================================================
-- COMANDOS DE VERIFICAÇÃO (EXECUTAR APÓS O SCRIPT)
-- =====================================================

-- Verificar se a tabela foi criada corretamente
-- SELECT * FROM information_schema.tables WHERE table_name = 'way_roleta_leads';

-- Verificar índices
-- SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'way_roleta_leads';

-- Testar função de verificação de duplicatas
-- SELECT check_lead_duplicate('teste@email.com', '(84) 99999-9999');

-- Testar inserção de lead
-- SELECT insert_roleta_lead('teste@email.com', '(84) 99999-9999', 1, 'Teste Premio', 'TESTE123', '127.0.0.1'::inet, 'Test Agent');

-- Verificar estatísticas
-- SELECT * FROM way_roleta_stats;
-- PASSO 4: FUNÇÃO DE INSERÇÃO
-- Execute após o Passo 3

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
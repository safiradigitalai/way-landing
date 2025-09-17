-- PASSO 3: CRIAÇÃO DAS FUNÇÕES
-- Execute após o Passo 2

-- Função para atualizar updated_at automaticamente
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

-- Função para verificar duplicatas
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
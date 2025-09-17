-- PASSO 5: SEGURANÇA E PERMISSÕES
-- Execute após o Passo 4

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

-- Permitir acesso público às funções necessárias
GRANT EXECUTE ON FUNCTION check_lead_duplicate(VARCHAR, VARCHAR) TO public;
GRANT EXECUTE ON FUNCTION insert_roleta_lead(VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, INET, TEXT, VARCHAR, VARCHAR, VARCHAR, TEXT) TO public;
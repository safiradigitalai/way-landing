-- CORREÇÃO DAS POLÍTICAS RLS
-- Execute este script no SQL Editor do Supabase

-- Remover políticas existentes
DROP POLICY IF EXISTS "Permitir insert público de leads" ON public.way_roleta_leads;
DROP POLICY IF EXISTS "Permitir select apenas para autenticados" ON public.way_roleta_leads;
DROP POLICY IF EXISTS "Permitir update apenas para autenticados" ON public.way_roleta_leads;

-- Desabilitar RLS temporariamente para teste
ALTER TABLE public.way_roleta_leads DISABLE ROW LEVEL SECURITY;

-- Ou se quiser manter RLS, criar políticas mais permissivas:
-- ALTER TABLE public.way_roleta_leads ENABLE ROW LEVEL SECURITY;

-- Política para permitir INSERT para todos (incluindo anônimos)
-- CREATE POLICY "Permitir insert público via função"
-- ON public.way_roleta_leads
-- FOR INSERT
-- TO public
-- WITH CHECK (true);

-- Política para permitir SELECT apenas para autenticados
-- CREATE POLICY "Permitir select autenticado"
-- ON public.way_roleta_leads
-- FOR SELECT
-- TO authenticated
-- USING (true);

-- Política para permitir SELECT para service_role (admin)
-- CREATE POLICY "Permitir select service role"
-- ON public.way_roleta_leads
-- FOR SELECT
-- TO service_role
-- USING (true);

-- Política para permitir UPDATE para service_role (admin)
-- CREATE POLICY "Permitir update service role"
-- ON public.way_roleta_leads
-- FOR UPDATE
-- TO service_role
-- USING (true);

-- Verificar se as funções têm as permissões corretas
GRANT EXECUTE ON FUNCTION check_lead_duplicate(VARCHAR, VARCHAR) TO anon;
GRANT EXECUTE ON FUNCTION check_lead_duplicate(VARCHAR, VARCHAR) TO authenticated;
GRANT EXECUTE ON FUNCTION insert_roleta_lead(VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, INET, TEXT, VARCHAR, VARCHAR, VARCHAR, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION insert_roleta_lead(VARCHAR, VARCHAR, INTEGER, VARCHAR, VARCHAR, INET, TEXT, VARCHAR, VARCHAR, VARCHAR, TEXT) TO authenticated;

-- Dar permissão de INSERT na tabela para anônimos (via função)
GRANT INSERT ON public.way_roleta_leads TO anon;
GRANT INSERT ON public.way_roleta_leads TO authenticated;
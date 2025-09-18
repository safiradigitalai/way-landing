-- CRIAR VIEW DE ESTATÍSTICAS PARA O DASHBOARD
-- Execute este script no SQL Editor do Supabase

CREATE OR REPLACE VIEW way_roleta_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(DISTINCT email) as emails_unicos,
  COUNT(DISTINCT REGEXP_REPLACE(whatsapp, '[^0-9]', '', 'g')) as whatsapps_unicos,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as leads_hoje,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as leads_ultima_semana,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_ultimo_mes,

  -- Estatísticas por prêmio
  (
    SELECT json_agg(
      json_build_object(
        'premio_id', premio_id,
        'premio_nome', premio_nome,
        'quantidade', count_por_premio
      )
    )
    FROM (
      SELECT
        premio_id,
        premio_nome,
        COUNT(*) as count_por_premio
      FROM public.way_roleta_leads
      WHERE is_active = true
      GROUP BY premio_id, premio_nome
      ORDER BY premio_id
    ) premio_stats
  ) as premios_distribuidos

FROM public.way_roleta_leads
WHERE is_active = true;

-- Dar permissão para acessar a view
GRANT SELECT ON way_roleta_stats TO authenticated;
GRANT SELECT ON way_roleta_stats TO anon;
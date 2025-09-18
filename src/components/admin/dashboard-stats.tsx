'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Users,
  Mail,
  Phone,
  TrendingUp,
  Gift,
  Calendar,
  Target,
  Award,
  Loader2,
  RefreshCw
} from 'lucide-react';

interface Stats {
  total_leads: number;
  emails_unicos: number;
  whatsapps_unicos: number;
  leads_hoje: number;
  leads_ultima_semana: number;
  leads_ultimo_mes: number;
  premios_distribuidos: Array<{
    premio_id: number;
    premio_nome: string;
    quantidade: number;
  }>;
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (showRefresh = false) => {
    try {
      if (showRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      // Debug log
      console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log('Supabase configured:', isSupabaseConfigured());

      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase não está configurado corretamente. Verifique as variáveis de ambiente no painel da plataforma de deploy.');
      }

      const { data, error } = await supabase
        .from('way_roleta_stats')
        .select('*')
        .single();

      if (error) {
        throw error;
      }

      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar estatísticas');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <span className="text-white text-lg">Carregando estatísticas...</span>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error || 'Dados não encontrados'}</div>
          <button
            onClick={() => fetchStats()}
            className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total de Leads',
      value: stats.total_leads,
      icon: Users,
      color: 'yellow',
      description: 'Participantes da roleta'
    },
    {
      title: 'Emails Únicos',
      value: stats.emails_unicos,
      icon: Mail,
      color: 'purple',
      description: 'Contatos únicos'
    },
    {
      title: 'WhatsApps Únicos',
      value: stats.whatsapps_unicos,
      icon: Phone,
      color: 'green',
      description: 'Números únicos'
    },
    {
      title: 'Leads Hoje',
      value: stats.leads_hoje,
      icon: Calendar,
      color: 'blue',
      description: 'Participações de hoje'
    },
    {
      title: 'Última Semana',
      value: stats.leads_ultima_semana,
      icon: TrendingUp,
      color: 'orange',
      description: 'Últimos 7 dias'
    },
    {
      title: 'Último Mês',
      value: stats.leads_ultimo_mes,
      icon: Target,
      color: 'pink',
      description: 'Últimos 30 dias'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-white mb-1 xs:mb-2">Dashboard da Roleta Premiada</h1>
          <p className="text-white/70 text-sm xs:text-base">Visão geral dos leads e participações</p>
        </div>
        <button
          onClick={() => fetchStats(true)}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-yellow-400/30 border border-yellow-400/50 text-yellow-300 rounded-lg hover:bg-yellow-400/40 shadow-lg shadow-yellow-400/20 transition-all duration-200 disabled:opacity-50 text-sm xs:text-base"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden xs:inline">{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
          <span className="xs:hidden">{isRefreshing ? '...' : '↻'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl xs:rounded-2xl p-4 xs:p-5 sm:p-8 lg:p-10 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-between mb-3 xs:mb-4 lg:mb-6">
                <div className={`w-10 h-10 xs:w-12 xs:h-12 lg:w-16 lg:h-16 rounded-lg xs:rounded-xl lg:rounded-2xl flex items-center justify-center ${
                  card.color === 'yellow' ? 'bg-yellow-400/20 text-yellow-400' :
                  card.color === 'purple' ? 'bg-purple-400/20 text-purple-400' :
                  card.color === 'green' ? 'bg-green-400/20 text-green-400' :
                  card.color === 'blue' ? 'bg-blue-400/20 text-blue-400' :
                  card.color === 'orange' ? 'bg-orange-400/20 text-orange-400' :
                  'bg-pink-400/20 text-pink-400'
                }`}>
                  <Icon className="w-5 h-5 xs:w-6 xs:h-6 lg:w-8 lg:h-8" />
                </div>
                <div className="text-right">
                  <div className="text-lg xs:text-xl sm:text-2xl lg:text-4xl xl:text-5xl font-black text-white">{card.value.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1 text-sm xs:text-base lg:text-lg xl:text-xl">{card.title}</h3>
                <p className="text-white/60 text-xs xs:text-sm lg:text-base">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prêmios Distribuídos */}
      {stats.premios_distribuidos && stats.premios_distribuidos.length > 0 && (
        <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl xs:rounded-2xl p-4 xs:p-5 sm:p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg">
          <div className="flex items-center gap-2 xs:gap-3 mb-4 xs:mb-6">
            <div className="w-10 h-10 xs:w-12 xs:h-12 bg-yellow-400/30 border border-yellow-400/40 rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
              <Gift className="w-5 h-5 xs:w-6 xs:h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-lg xs:text-xl font-bold text-white">Prêmios Distribuídos</h2>
              <p className="text-white/70 text-xs xs:text-sm">Distribuição por tipo de prêmio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
            {stats.premios_distribuidos.map((premio, index) => (
              <div
                key={index}
                className="bg-white/15 border border-white/30 rounded-lg xs:rounded-xl p-3 xs:p-4 hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 xs:gap-3 flex-1 min-w-0">
                    <Award className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-white text-xs xs:text-sm truncate">{premio.premio_nome}</div>
                      <div className="text-white/60 text-[10px] xs:text-xs">ID: {premio.premio_id}</div>
                    </div>
                  </div>
                  <div className="text-base xs:text-lg font-bold text-yellow-400 flex-shrink-0 ml-2">
                    {premio.quantidade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
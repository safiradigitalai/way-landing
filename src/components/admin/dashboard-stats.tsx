'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
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
      setError('Erro ao carregar estatísticas');
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Dashboard da Roleta Premiada</h1>
          <p className="text-white/70">Visão geral dos leads e participações</p>
        </div>
        <button
          onClick={() => fetchStats(true)}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-400/30 border border-yellow-400/50 text-yellow-300 rounded-lg hover:bg-yellow-400/40 shadow-lg shadow-yellow-400/20 transition-all duration-200 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  card.color === 'yellow' ? 'bg-yellow-400/20 text-yellow-400' :
                  card.color === 'purple' ? 'bg-purple-400/20 text-purple-400' :
                  card.color === 'green' ? 'bg-green-400/20 text-green-400' :
                  card.color === 'blue' ? 'bg-blue-400/20 text-blue-400' :
                  card.color === 'orange' ? 'bg-orange-400/20 text-orange-400' :
                  'bg-pink-400/20 text-pink-400'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">{card.value.toLocaleString()}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-white/60 text-sm">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prêmios Distribuídos */}
      {stats.premios_distribuidos && stats.premios_distribuidos.length > 0 && (
        <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-2xl p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-300 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-400/30 border border-yellow-400/40 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-400/20">
              <Gift className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Prêmios Distribuídos</h2>
              <p className="text-white/70">Distribuição por tipo de prêmio</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.premios_distribuidos.map((premio, index) => (
              <div
                key={index}
                className="bg-white/15 border border-white/30 rounded-xl p-4 hover:bg-white/20 hover:border-white/40 transition-all duration-200 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <div>
                      <div className="font-semibold text-white text-sm">{premio.premio_nome}</div>
                      <div className="text-white/60 text-xs">ID: {premio.premio_id}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-yellow-400">
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
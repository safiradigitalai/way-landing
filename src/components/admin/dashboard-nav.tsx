'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  Download,
  LogOut,
  Shield,
  Zap,
  User,
  Clock,
  ChevronDown
} from 'lucide-react';

interface DashboardNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardNav({ activeSection, onSectionChange }: DashboardNavProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Visão geral'
    },
    {
      id: 'leads',
      label: 'Leads da Roleta',
      icon: Users,
      description: 'Gerenciar leads'
    },
    {
      id: 'exports',
      label: 'Exportar',
      icon: Download,
      description: 'Exportar dados'
    }
  ];

  const formatLoginTime = (loginTime: string) => {
    const date = new Date(loginTime);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <nav className="w-72 h-screen bg-white/10 backdrop-blur-xl border-r border-white/20 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-4 w-px h-20 bg-gradient-to-t from-yellow-400 to-transparent opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Image
                src="/logo-branco.png"
                alt="Way"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">
                WAY ADMIN
              </h1>
              <p className="text-xs text-white/70">Painel de Controle</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          <div className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-yellow-400/30 border border-yellow-400/50 text-yellow-300 shadow-lg shadow-yellow-400/20'
                      : 'hover:bg-white/15 hover:border hover:border-white/30 text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400' : 'text-white/70 group-hover:text-white'} transition-colors`} />
                  <div className="text-left">
                    <div className={`font-semibold text-sm ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-white'} transition-colors`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-white/50">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto">
                      <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-white/20">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <User className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-sm text-white">
                  {user?.email.split('@')[0]}
                </div>
                <div className="text-xs text-white/70 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {user?.loginTime ? formatLoginTime(user.loginTime) : 'N/A'}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/70 group-hover:text-white transition-all duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                <div className="p-3 border-b border-white/20">
                  <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">
                    Sessão Ativa
                  </div>
                  <div className="text-sm text-white font-medium mt-1">
                    Administrador
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair do Sistema
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
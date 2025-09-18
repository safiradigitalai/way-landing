'use client';

import { useAuth } from '@/hooks/use-auth';
import Image from 'next/image';
import {
  LayoutDashboard,
  Users,
  Download,
  Zap
} from 'lucide-react';

interface DashboardNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function DashboardNav({ activeSection, onSectionChange }: DashboardNavProps) {
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

  return (
    <nav className="w-full sm:w-72 h-auto sm:h-screen bg-white/10 backdrop-blur-xl border-r-0 sm:border-r border-b sm:border-b-0 border-white/20 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-4 w-px h-20 bg-gradient-to-t from-yellow-400 to-transparent opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 flex flex-col h-full">

        {/* Header */}
        <div className="p-3 sm:p-6 border-b border-white/20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-12 h-8 sm:h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <Image
                src="/logo-branco.png"
                alt="Way"
                width={24}
                height={24}
                className="w-5 sm:w-8 h-5 sm:h-8"
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">
                WAY ADMIN
              </h1>
              <p className="text-xs text-white/70 hidden sm:block">Painel de Controle</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-3 sm:py-6">
          <div className="flex sm:flex-col sm:space-y-2 space-x-2 sm:space-x-0 px-2 sm:px-4 overflow-x-auto sm:overflow-x-visible">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`flex-shrink-0 sm:w-full group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-yellow-400/30 border border-yellow-400/50 text-yellow-300 shadow-lg shadow-yellow-400/20'
                      : 'hover:bg-white/15 hover:border hover:border-white/30 text-white/80 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400' : 'text-white/70 group-hover:text-white'} transition-colors`} />
                  <div className="text-left hidden sm:block">
                    <div className={`font-semibold text-sm ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-white'} transition-colors`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-white/50">
                      {item.description}
                    </div>
                  </div>
                  <div className="sm:hidden">
                    <div className={`font-semibold text-xs ${isActive ? 'text-yellow-400' : 'text-white group-hover:text-white'} transition-colors whitespace-nowrap`}>
                      {item.label}
                    </div>
                  </div>
                  {isActive && (
                    <div className="ml-auto hidden sm:block">
                      <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </nav>
  );
}
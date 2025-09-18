'use client';

// Force dynamic rendering to prevent build errors with Supabase
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardNav } from '@/components/admin/dashboard-nav';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { LeadsTable } from '@/components/admin/leads-table';
import { ExportData } from '@/components/admin/export-data';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, User, Clock, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const { isLoading: authLoading, user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <span className="text-white text-lg">Carregando dashboard...</span>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardStats />;
      case 'leads':
        return <LeadsTable />;
      case 'exports':
        return <ExportData />;
      default:
        return <DashboardStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Energy Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '5s' }} />

        {/* Lightning Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-px h-20 bg-gradient-to-b from-yellow-400 via-yellow-400 to-transparent opacity-20 animate-pulse" />
          <div className="absolute bottom-1/3 left-1/2 w-16 h-px bg-gradient-to-r from-yellow-400 via-yellow-400 to-transparent opacity-20 animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row relative z-10">
        {/* Navigation Sidebar */}
        <DashboardNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-2 xs:p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col">
          <div className="max-w-7xl mx-auto flex-1">
            {renderContent()}
          </div>

          {/* Footer with Session Info and Logout */}
          <div className="max-w-7xl mx-auto w-full mt-auto pt-6">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4">
              <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">

                {/* Session Info */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <User className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">
                      Sessão Ativa
                    </div>
                    <div className="text-sm text-white font-medium">
                      {user?.email.split('@')[0]} - Administrador
                    </div>
                  </div>
                </div>

                {/* Login Time and Logout */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center gap-3 xs:gap-4 w-full xs:w-auto">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <Clock className="w-3 h-3" />
                    <span className="hidden sm:inline">
                      Login: {user?.loginTime ? new Date(user.loginTime).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </span>
                    <span className="sm:hidden">
                      {user?.loginTime ? new Date(user.loginTime).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </span>
                  </div>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-lg transition-all duration-200 border border-red-400/20 hover:border-red-400/40 w-full xs:w-auto justify-center"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sair do Sistema</span>
                    <span className="sm:hidden">Sair</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
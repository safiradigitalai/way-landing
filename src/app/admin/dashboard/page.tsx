'use client';

// Force dynamic rendering to prevent build errors with Supabase
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { DashboardNav } from '@/components/admin/dashboard-nav';
import { DashboardStats } from '@/components/admin/dashboard-stats';
import { LeadsTable } from '@/components/admin/leads-table';
import { ExportData } from '@/components/admin/export-data';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const { isLoading: authLoading } = useAuth();
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
      <div className="flex relative z-10">
        {/* Navigation Sidebar */}
        <DashboardNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
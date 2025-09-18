'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Users,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap
} from 'lucide-react';
import * as XLSX from 'xlsx';

// Dynamic import for PDF functionality
let jsPDFModule: typeof import('jspdf').default | null = null;

interface Lead {
  id: string;
  email: string;
  whatsapp: string;
  premio_id: number;
  premio_nome: string;
  premio_cupom?: string;
  ip_address?: string;
  user_agent?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  attempt_count: number;
}

export function ExportData() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeads, setTotalLeads] = useState(0);
  const [exportStatus, setExportStatus] = useState<{
    type: string;
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string
  }>({
    type: '',
    status: 'idle',
    message: ''
  });

  useEffect(() => {
    loadLeadsData();
  }, []);

  const loadLeadsData = async () => {
    try {
      // Carregar todos os leads
      const { data: leadsData, error } = await supabase
        .from('way_roleta_leads')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(leadsData || []);
      setTotalLeads(leadsData?.length || 0);
    } catch (error) {
      console.error('Error loading leads data:', error);
    }
  };

  const exportToCSV = async () => {
    setExportStatus({ type: 'CSV', status: 'loading', message: 'Preparando arquivo CSV...' });

    try {
      const csvData = leads.map(lead => ({
        'Email': lead.email,
        'WhatsApp': lead.whatsapp,
        'Prêmio': lead.premio_nome,
        'Cupom': lead.premio_cupom || '',
        'Fonte UTM': lead.utm_source || '',
        'Mídia UTM': lead.utm_medium || '',
        'Campanha UTM': lead.utm_campaign || '',
        'IP': lead.ip_address || '',
        'Data de Cadastro': new Date(lead.created_at).toLocaleString('pt-BR'),
        'Última Atualização': new Date(lead.updated_at).toLocaleString('pt-BR')
      }));

      const ws = XLSX.utils.json_to_sheet(csvData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads Roleta Way');

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `Way_Roleta_Leads_${timestamp}.csv`;

      XLSX.writeFile(wb, filename);

      setExportStatus({
        type: 'CSV',
        status: 'success',
        message: `${leads.length} leads exportados com sucesso!`
      });

    } catch (error) {
      console.error('Error exporting CSV:', error);
      setExportStatus({
        type: 'CSV',
        status: 'error',
        message: 'Erro ao exportar arquivo CSV'
      });
    }

    setTimeout(() => {
      setExportStatus({ type: '', status: 'idle', message: '' });
    }, 3000);
  };

  const exportToExcel = async () => {
    setExportStatus({ type: 'Excel', status: 'loading', message: 'Preparando planilha Excel...' });

    try {
      const excelData = leads.map(lead => ({
        'Email': lead.email,
        'WhatsApp': lead.whatsapp,
        'Prêmio': lead.premio_nome,
        'Cupom': lead.premio_cupom || 'Não informado',
        'Fonte UTM': lead.utm_source || 'Não informado',
        'Mídia UTM': lead.utm_medium || 'Não informado',
        'Campanha UTM': lead.utm_campaign || 'Não informado',
        'Endereço IP': lead.ip_address || 'Não informado',
        'Data de Cadastro': new Date(lead.created_at).toLocaleString('pt-BR'),
        'Última Atualização': new Date(lead.updated_at).toLocaleString('pt-BR')
      }));

      const ws = XLSX.utils.json_to_sheet(excelData);

      // Set column widths
      const colWidths = [
        { wch: 35 }, // Email
        { wch: 18 }, // WhatsApp
        { wch: 20 }, // Prêmio
        { wch: 15 }, // Cupom
        { wch: 15 }, // UTM Source
        { wch: 15 }, // UTM Medium
        { wch: 20 }, // UTM Campaign
        { wch: 15 }, // IP
        { wch: 20 }, // Data Cadastro
        { wch: 20 }  // Última Atualização
      ];
      ws['!cols'] = colWidths;

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leads Roleta Way');

      // Add summary sheet
      const premiosDistribuidos = leads.reduce((acc: Record<string, number>, lead) => {
        acc[lead.premio_nome] = (acc[lead.premio_nome] || 0) + 1;
        return acc;
      }, {});

      const summaryData = [
        { 'Métrica': 'Total de Leads', 'Valor': leads.length },
        { 'Métrica': 'Data da Exportação', 'Valor': new Date().toLocaleString('pt-BR') },
        { 'Métrica': 'Leads com Cupom', 'Valor': leads.filter(l => l.premio_cupom).length },
        { 'Métrica': 'Leads com UTM', 'Valor': leads.filter(l => l.utm_source).length },
        ...Object.entries(premiosDistribuidos).map(([premio, quantidade]) => ({
          'Métrica': `Prêmio: ${premio}`,
          'Valor': quantidade
        }))
      ];

      const summaryWs = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Resumo');

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `Way_Roleta_Leads_Completo_${timestamp}.xlsx`;

      XLSX.writeFile(wb, filename);

      setExportStatus({
        type: 'Excel',
        status: 'success',
        message: `Planilha com ${leads.length} leads exportada!`
      });

    } catch (error) {
      console.error('Error exporting Excel:', error);
      setExportStatus({
        type: 'Excel',
        status: 'error',
        message: 'Erro ao exportar planilha Excel'
      });
    }

    setTimeout(() => {
      setExportStatus({ type: '', status: 'idle', message: '' });
    }, 3000);
  };

  const exportToPDF = async () => {
    setExportStatus({ type: 'PDF', status: 'loading', message: 'Gerando relatório PDF...' });

    try {
      if (leads.length === 0) {
        setExportStatus({
          type: 'PDF',
          status: 'error',
          message: 'Nenhum lead encontrado para exportar'
        });
        setTimeout(() => {
          setExportStatus({ type: '', status: 'idle', message: '' });
        }, 3000);
        return;
      }

      // Load PDF module if not loaded
      if (!jsPDFModule) {
        jsPDFModule = (await import('jspdf')).default;
      }

      const pdf = new jsPDFModule();

      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(139, 69, 197); // Purple
      pdf.text('WAY - Relatório da Roleta Premiada', 20, 30);

      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 20, 40);
      pdf.text(`Total de leads: ${leads.length}`, 20, 50);

      // Summary statistics
      const leadsComCupom = leads.filter(l => l.premio_cupom).length;
      const leadsComUTM = leads.filter(l => l.utm_source).length;
      const premiosUnicos = [...new Set(leads.map(l => l.premio_nome))];

      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Resumo Estatístico:', 20, 70);

      pdf.setFontSize(10);
      pdf.text(`• Leads com cupom: ${leadsComCupom} (${((leadsComCupom/leads.length)*100).toFixed(1)}%)`, 25, 80);
      pdf.text(`• Leads com UTM: ${leadsComUTM} (${((leadsComUTM/leads.length)*100).toFixed(1)}%)`, 25, 90);
      pdf.text(`• Tipos de prêmios diferentes: ${premiosUnicos.length}`, 25, 100);

      // Create a more compact table layout
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      let yPosition = 110;

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Lista Detalhada de Leads:', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(8);
      pdf.setTextColor(50, 50, 50);

      leads.forEach((lead, index) => {
        if (yPosition > pageHeight - 50) {
          pdf.addPage();
          yPosition = 30;
        }

        // Lead card background
        if (index % 2 === 0) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(20, yPosition - 2, pageWidth - 40, 25, 'F');
        }

        // Lead info in card format
        pdf.setFontSize(9);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`${index + 1}. ${lead.email}`, 25, yPosition + 4);

        pdf.setFontSize(8);
        pdf.setTextColor(80, 80, 80);
        pdf.text(`WhatsApp: ${lead.whatsapp}`, 25, yPosition + 10);
        pdf.text(`Prêmio: ${lead.premio_nome}`, 25, yPosition + 16);

        if (lead.premio_cupom) {
          pdf.setTextColor(255, 165, 0); // Orange for coupon
          pdf.text(`Cupom: ${lead.premio_cupom}`, 25, yPosition + 22);
        }

        // Date on the right
        pdf.setTextColor(100, 100, 100);
        const dateStr = new Date(lead.created_at).toLocaleDateString('pt-BR');
        pdf.text(dateStr, pageWidth - 45, yPosition + 4);

        yPosition += 28;
      });

      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Way Technologies - Relatório Confidencial', 20, pdf.internal.pageSize.height - 10);

      // Generate filename and download
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `Way_Roleta_Relatorio_${timestamp}.pdf`;

      pdf.save(filename);

      setExportStatus({
        type: 'PDF',
        status: 'success',
        message: `Relatório PDF com ${leads.length} leads gerado!`
      });

    } catch (error) {
      console.error('Error exporting PDF:', error);
      setExportStatus({
        type: 'PDF',
        status: 'error',
        message: 'Erro ao gerar relatório PDF'
      });
    }

    setTimeout(() => {
      setExportStatus({ type: '', status: 'idle', message: '' });
    }, 3000);
  };

  const exportOptions = [
    {
      id: 'csv',
      title: 'Exportar CSV',
      description: 'Arquivo simples para planilhas',
      icon: FileText,
      color: 'from-green-400 to-emerald-500',
      action: exportToCSV
    },
    {
      id: 'excel',
      title: 'Exportar Excel',
      description: 'Planilha completa com formatação',
      icon: FileSpreadsheet,
      color: 'from-blue-400 to-cyan-500',
      action: exportToExcel
    },
    {
      id: 'pdf',
      title: 'Relatório PDF',
      description: 'Documento profissional com estatísticas',
      icon: File,
      color: 'from-purple-400 to-pink-500',
      action: exportToPDF
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-yellow-400/20 rounded-xl flex items-center justify-center border border-yellow-400/30">
          <Download className="w-6 h-6 text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">
            Exportar Dados da Roleta
          </h1>
          <p className="text-white/70">Baixe os dados dos leads em diferentes formatos</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">Dados Disponíveis</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-black text-yellow-400">{totalLeads}</div>
            <div className="text-sm text-white/70">Total Leads</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-black text-green-400">{leads.filter(l => l.premio_cupom).length}</div>
            <div className="text-sm text-white/70">Com Cupom</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-black text-blue-400">{leads.filter(l => l.utm_source).length}</div>
            <div className="text-sm text-white/70">Com UTM</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-black text-purple-400">{[...new Set(leads.map(l => l.premio_nome))].length}</div>
            <div className="text-sm text-white/70">Tipos de Prêmios</div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid md:grid-cols-3 gap-6">
        {exportOptions.map((option) => {
          const Icon = option.icon;
          const isLoading = exportStatus.status === 'loading' && exportStatus.type === option.title.split(' ')[1];
          const isSuccess = exportStatus.status === 'success' && exportStatus.type === option.title.split(' ')[1];
          const isError = exportStatus.status === 'error' && exportStatus.type === option.title.split(' ')[1];

          return (
            <div key={option.id} className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 overflow-hidden relative">

              {/* Energy Corner */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full shadow-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">

                {/* Icon & Title */}
                <div className="space-y-3">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${option.color} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white drop-shadow-sm" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Status Message */}
                {(isLoading || isSuccess || isError) && (
                  <div className={`p-3 rounded-lg border ${
                    isLoading ? 'bg-white/10 border-yellow-400/30' :
                    isSuccess ? 'bg-green-500/20 border-green-400/50' :
                    'bg-red-500/20 border-red-400/50'
                  }`}>
                    <div className="flex items-center gap-2">
                      {isLoading && <Loader2 className="w-4 h-4 text-yellow-400 animate-spin" />}
                      {isSuccess && <CheckCircle className="w-4 h-4 text-green-400" />}
                      {isError && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      <span className={`text-sm font-medium ${
                        isLoading ? 'text-yellow-400' :
                        isSuccess ? 'text-green-400' :
                        'text-red-400'
                      }`}>
                        {exportStatus.message}
                      </span>
                    </div>
                  </div>
                )}

                {/* Export Button */}
                <button
                  onClick={option.action}
                  disabled={isLoading}
                  className={`w-full h-12 bg-gradient-to-r ${option.color} text-white font-bold rounded-xl hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
                      Exportando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2 inline" />
                      {option.title}
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-white/60 mt-8">
        <Clock className="w-3 h-3" />
        <span>Dados atualizados: {new Date().toLocaleString('pt-BR')}</span>
        <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
      </div>
    </div>
  );
}
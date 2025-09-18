'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  Users,
  Search,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Mail,
  Phone,
  Gift,
  Globe,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { EditLeadModal } from './edit-lead-modal';
import { DeleteLeadModal } from './delete-lead-modal';

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

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const itemsPerPage = 10;

  const fetchLeads = async (page = 1, search = '', showRefresh = false) => {
    try {
      if (showRefresh) setIsRefreshing(true);
      else setIsLoading(true);

      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        console.error('Supabase não está configurado');
        setLeads([]);
        setTotalCount(0);
        return;
      }

      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage - 1;

      let query = supabase
        .from('way_roleta_leads')
        .select('*', { count: 'exact' })
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .range(start, end);

      if (search) {
        query = query.or(`email.ilike.%${search}%,whatsapp.ilike.%${search}%,premio_nome.ilike.%${search}%`);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Erro Supabase:', error);
        throw error;
      }

      setLeads(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Erro ao buscar leads:', error);
      setLeads([]);
      setTotalCount(0);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeads(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDetails(true);
  };

  const handleEditLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowEditModal(true);
  };

  const handleDeleteLead = (lead: Lead) => {
    setSelectedLead(lead);
    setShowDeleteModal(true);
  };

  const handleSaveSuccess = () => {
    fetchLeads(currentPage, searchTerm, true);
  };

  const handleDeleteSuccess = () => {
    fetchLeads(currentPage, searchTerm, true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
          <span className="text-white text-lg">Carregando leads...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-black text-white mb-1 xs:mb-2">Leads da Roleta Premiada</h1>
          <p className="text-white/70 text-sm xs:text-base">Gerenciar participantes e contatos</p>
        </div>
        <div className="flex items-center gap-2 xs:gap-3 w-full xs:w-auto">
          <button
            onClick={() => fetchLeads(currentPage, searchTerm, true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200 disabled:opacity-50 text-sm xs:text-base w-full xs:w-auto justify-center"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden xs:inline">{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
            <span className="xs:hidden">{isRefreshing ? '...' : '↻'}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl xs:rounded-2xl p-4 xs:p-6">
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 xs:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-white/60" />
            <input
              type="text"
              placeholder="Buscar por email, WhatsApp ou prêmio..."
              className="w-full pl-9 xs:pl-10 pr-4 py-2 xs:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none text-sm xs:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-white/70 justify-center xs:justify-start">
            <Users className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="font-medium text-sm xs:text-base">{totalCount} leads</span>
          </div>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden sm:block bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-white">Contato</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Prêmio</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Data</th>
                <th className="text-left py-4 px-6 font-semibold text-white">Origem</th>
                <th className="text-center py-4 px-6 font-semibold text-white">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Mail className="w-4 h-4 text-yellow-400" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Phone className="w-4 h-4 text-green-400" />
                        {lead.whatsapp}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Gift className="w-4 h-4 text-purple-400" />
                        {lead.premio_nome}
                      </div>
                      {lead.premio_cupom && (
                        <div className="text-yellow-400 text-sm font-mono">
                          {lead.premio_cupom}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(lead.created_at)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {lead.utm_source && (
                        <div className="text-white/70 text-sm">
                          <span className="text-blue-400">Source:</span> {lead.utm_source}
                        </div>
                      )}
                      {lead.utm_medium && (
                        <div className="text-white/70 text-sm">
                          <span className="text-blue-400">Medium:</span> {lead.utm_medium}
                        </div>
                      )}
                      {lead.utm_campaign && (
                        <div className="text-white/70 text-sm">
                          <span className="text-blue-400">Campaign:</span> {lead.utm_campaign}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(lead)}
                        className="p-2 text-white/70 hover:text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all duration-200"
                        title="Ver detalhes"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditLead(lead)}
                        className="p-2 text-white/70 hover:text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-all duration-200"
                        title="Editar lead"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead)}
                        className="p-2 text-white/70 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                        title="Excluir lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile */}
      <div className="sm:hidden space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-200"
          >
            {/* Header with Prize and Actions */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Gift className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="truncate">{lead.premio_nome}</span>
                </div>
                {lead.premio_cupom && (
                  <div className="text-yellow-400 text-sm font-mono">
                    {lead.premio_cupom}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={() => handleViewDetails(lead)}
                  className="p-2 text-white/70 hover:text-blue-400 hover:bg-blue-400/20 rounded-lg transition-all duration-200"
                  title="Ver detalhes"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditLead(lead)}
                  className="p-2 text-white/70 hover:text-yellow-400 hover:bg-yellow-400/20 rounded-lg transition-all duration-200"
                  title="Editar"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteLead(lead)}
                  className="p-2 text-white/70 hover:text-red-400 hover:bg-red-400/20 rounded-lg transition-all duration-200"
                  title="Excluir"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-white text-sm">
                <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="truncate">{lead.email}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{lead.whatsapp}</span>
              </div>
            </div>

            {/* Date and UTM Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <Calendar className="w-3 h-3" />
                {formatDate(lead.created_at)}
              </div>
              {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
                <div className="text-white/50 text-xs">
                  {lead.utm_source && <span className="text-blue-400">Source: {lead.utm_source}</span>}
                  {lead.utm_source && (lead.utm_medium || lead.utm_campaign) && <span> • </span>}
                  {lead.utm_medium && <span className="text-blue-400">Medium: {lead.utm_medium}</span>}
                  {lead.utm_medium && lead.utm_campaign && <span> • </span>}
                  {lead.utm_campaign && <span className="text-blue-400">Campaign: {lead.utm_campaign}</span>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 xs:p-6">
          <div className="flex flex-col xs:flex-row items-center justify-between gap-3">
            <div className="text-white/70 text-xs xs:text-sm order-2 xs:order-1">
              Página {currentPage} de {totalPages} ({totalCount} total)
            </div>
            <div className="flex items-center gap-2 order-1 xs:order-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 rounded-lg text-sm min-w-[2rem] text-center">
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetails && selectedLead && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 xs:p-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl xs:rounded-2xl p-4 xs:p-6 max-w-2xl w-full max-h-[90vh] xs:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 xs:mb-6">
              <h2 className="text-lg xs:text-xl font-bold text-white">Detalhes do Lead</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 xs:space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-yellow-400 mb-2 xs:mb-3">Informações de Contato</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 xs:gap-3">
                    <Mail className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-white text-sm xs:text-base break-all">{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3">
                    <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white text-sm xs:text-base">{selectedLead.whatsapp}</span>
                  </div>
                </div>
              </div>

              {/* Prize Info */}
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-yellow-400 mb-2 xs:mb-3">Prêmio Ganho</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 xs:gap-3">
                    <Gift className="w-4 h-4 xs:w-5 xs:h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-white text-sm xs:text-base">{selectedLead.premio_nome}</span>
                  </div>
                  {selectedLead.premio_cupom && (
                    <div className="flex items-center gap-2 xs:gap-3">
                      <span className="w-4 h-4 xs:w-5 xs:h-5 flex items-center justify-center text-yellow-400 font-bold text-sm">#</span>
                      <span className="text-yellow-400 font-mono text-sm xs:text-base">{selectedLead.premio_cupom}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Info */}
              <div>
                <h3 className="text-base xs:text-lg font-semibold text-yellow-400 mb-2 xs:mb-3">Informações Técnicas</h3>
                <div className="space-y-2 text-xs xs:text-sm">
                  {selectedLead.ip_address && (
                    <div className="flex items-center gap-2 xs:gap-3">
                      <Globe className="w-3 h-3 xs:w-4 xs:h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-white/70">IP: {selectedLead.ip_address}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 xs:gap-3">
                    <Clock className="w-3 h-3 xs:w-4 xs:h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-white/70">Criado: {formatDate(selectedLead.created_at)}</span>
                  </div>
                  {selectedLead.user_agent && (
                    <div className="flex items-start gap-2 xs:gap-3">
                      <span className="w-3 h-3 xs:w-4 xs:h-4 flex items-center justify-center text-gray-400 text-[10px] xs:text-xs flex-shrink-0">UA</span>
                      <span className="text-white/70 break-all">{selectedLead.user_agent}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* UTM Parameters */}
              {(selectedLead.utm_source || selectedLead.utm_medium || selectedLead.utm_campaign) && (
                <div>
                  <h3 className="text-base xs:text-lg font-semibold text-yellow-400 mb-2 xs:mb-3">Parâmetros UTM</h3>
                  <div className="space-y-2 text-xs xs:text-sm">
                    {selectedLead.utm_source && (
                      <div className="flex items-center gap-2 xs:gap-3">
                        <span className="text-blue-400 w-12 xs:w-16 flex-shrink-0">Source:</span>
                        <span className="text-white break-all">{selectedLead.utm_source}</span>
                      </div>
                    )}
                    {selectedLead.utm_medium && (
                      <div className="flex items-center gap-2 xs:gap-3">
                        <span className="text-blue-400 w-12 xs:w-16 flex-shrink-0">Medium:</span>
                        <span className="text-white break-all">{selectedLead.utm_medium}</span>
                      </div>
                    )}
                    {selectedLead.utm_campaign && (
                      <div className="flex items-center gap-2 xs:gap-3">
                        <span className="text-blue-400 w-12 xs:w-16 flex-shrink-0">Campaign:</span>
                        <span className="text-white break-all">{selectedLead.utm_campaign}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <EditLeadModal
        isOpen={showEditModal}
        lead={selectedLead}
        onClose={() => {
          setShowEditModal(false);
          setSelectedLead(null);
        }}
        onSave={handleSaveSuccess}
      />

      {/* Delete Modal */}
      <DeleteLeadModal
        isOpen={showDeleteModal}
        lead={selectedLead}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedLead(null);
        }}
        onDelete={handleDeleteSuccess}
      />
    </div>
  );
}
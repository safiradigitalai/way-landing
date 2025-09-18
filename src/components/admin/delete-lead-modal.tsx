'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  X,
  Trash2,
  Loader2,
  AlertTriangle
} from 'lucide-react';

interface Lead {
  id: string;
  email: string;
  whatsapp: string;
  premio_nome: string;
  premio_cupom?: string;
  created_at: string;
}

interface DeleteLeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteLeadModal({ isOpen, lead, onClose, onDelete }: DeleteLeadModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !lead) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Soft delete - apenas marcar como inativo
      const { error } = await supabase
        .from('way_roleta_leads')
        .update({
          is_active: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', lead.id);

      if (error) {
        throw error;
      }

      onDelete();
      onClose();
    } catch (err) {
      console.error('Erro ao deletar lead:', err);
      setError('Erro ao deletar lead. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">Confirmar Exclusão</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-400 text-sm mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <p className="text-white/90 mb-4">
            Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.
          </p>

          <div className="bg-white/10 border border-white/20 rounded-lg p-4 space-y-2">
            <div className="text-white font-medium">{lead.email}</div>
            <div className="text-white/70 text-sm">{lead.whatsapp}</div>
            <div className="text-purple-400 text-sm">Prêmio: {lead.premio_nome}</div>
            {lead.premio_cupom && (
              <div className="text-yellow-400 text-sm">Cupom: {lead.premio_cupom}</div>
            )}
            <div className="text-white/60 text-xs">
              Cadastrado em: {new Date(lead.created_at).toLocaleString('pt-BR')}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Excluir Lead
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
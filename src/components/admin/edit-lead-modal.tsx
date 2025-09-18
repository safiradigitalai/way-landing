'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  X,
  Save,
  Loader2,
  Mail,
  Phone,
  Gift
} from 'lucide-react';

interface Lead {
  id: string;
  email: string;
  whatsapp: string;
  premio_id: number;
  premio_nome: string;
  premio_cupom?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  created_at: string;
}

interface EditLeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: () => void;
}

export function EditLeadModal({ isOpen, lead, onClose, onSave }: EditLeadModalProps) {
  const [formData, setFormData] = useState({
    email: lead?.email || '',
    whatsapp: lead?.whatsapp || '',
    utm_source: lead?.utm_source || '',
    utm_medium: lead?.utm_medium || '',
    utm_campaign: lead?.utm_campaign || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('way_roleta_leads')
        .update({
          email: formData.email,
          whatsapp: formData.whatsapp,
          utm_source: formData.utm_source || null,
          utm_medium: formData.utm_medium || null,
          utm_campaign: formData.utm_campaign || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', lead.id);

      if (error) {
        throw error;
      }

      onSave();
      onClose();
    } catch (err) {
      console.error('Erro ao atualizar lead:', err);
      setError('Erro ao atualizar lead. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Editar Lead</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              WhatsApp
            </label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              UTM Source
            </label>
            <input
              type="text"
              value={formData.utm_source}
              onChange={(e) => setFormData(prev => ({ ...prev, utm_source: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none"
              placeholder="instagram, facebook, google..."
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              UTM Medium
            </label>
            <input
              type="text"
              value={formData.utm_medium}
              onChange={(e) => setFormData(prev => ({ ...prev, utm_medium: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none"
              placeholder="social, cpc, email..."
            />
          </div>

          <div>
            <label className="block text-white/90 text-sm font-medium mb-2">
              UTM Campaign
            </label>
            <input
              type="text"
              value={formData.utm_campaign}
              onChange={(e) => setFormData(prev => ({ ...prev, utm_campaign: e.target.value }))}
              className="w-full px-3 py-2 bg-white/10 border border-white/30 rounded-lg text-white placeholder:text-white/60 focus:border-yellow-400 focus:outline-none"
              placeholder="roleta-natal, promo-desconto..."
            />
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Prêmio: <strong className="text-white">{lead.premio_nome}</strong></span>
            </div>
            {lead.premio_cupom && (
              <div className="text-yellow-400 text-sm font-mono mt-1">
                Cupom: {lead.premio_cupom}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white/20 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors font-medium flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
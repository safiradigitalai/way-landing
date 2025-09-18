import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para a aplicação
export interface RoletaLead {
  id?: string
  email: string
  whatsapp: string
  premio_id: number
  premio_nome: string
  premio_cupom?: string
  ip_address?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

export interface DuplicateCheckResponse {
  duplicate: boolean
  type?: 'email' | 'whatsapp'
  message: string
  existing_lead?: RoletaLead
}

export interface SubmitResponse {
  success: boolean
  lead_id?: string
  message: string
  error?: string
}
# WAY ROLETA PREMIADA - DOCUMENTAÇÃO DA API

## Resumo do Sistema

O sistema da roleta premiada captura leads através de um formulário que coleta **email** e **WhatsApp**, executa validações de duplicatas e registra o prêmio sorteado para cada participante.

## Estrutura de Dados

### Tabela: `way_roleta_leads`

```sql
{
  id: UUID (PK),
  email: string (único),
  whatsapp: string (único, apenas números),
  premio_id: number,
  premio_nome: string,
  premio_cupom: string?,
  ip_address: inet?,
  user_agent: string?,
  created_at: timestamp,
  updated_at: timestamp,
  is_active: boolean,
  attempt_count: number,
  utm_source: string?,
  utm_medium: string?,
  utm_campaign: string?,
  referrer: string?
}
```

## Endpoints Necessários

### 1. Verificar Duplicatas
**Endpoint:** `POST /api/roleta/check-duplicate`

```typescript
// Request
{
  email: string,
  whatsapp: string
}

// Response
{
  duplicate: boolean,
  type?: 'email' | 'whatsapp',
  message: string,
  existing_lead?: object
}
```

### 2. Submeter Lead
**Endpoint:** `POST /api/roleta/submit`

```typescript
// Request
{
  email: string,
  whatsapp: string,
  premio_id: number,
  premio_nome: string,
  premio_cupom?: string,
  utm_source?: string,
  utm_medium?: string,
  utm_campaign?: string,
  referrer?: string
}

// Response
{
  success: boolean,
  lead_id?: UUID,
  message: string,
  error?: string
}
```

### 3. Estatísticas (Admin)
**Endpoint:** `GET /api/roleta/stats` (Autenticado)

```typescript
// Response
{
  total_leads: number,
  emails_unicos: number,
  whatsapps_unicos: number,
  leads_hoje: number,
  leads_ultima_semana: number,
  leads_ultimo_mes: number,
  premios_distribuidos: Array<{
    premio_id: number,
    premio_nome: string,
    quantidade: number
  }>
}
```

## Implementação Frontend

### Integração com Supabase

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Tipos TypeScript

```typescript
// types/roleta.ts
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
  existing_lead?: any
}

export interface SubmitResponse {
  success: boolean
  lead_id?: string
  message: string
  error?: string
}
```

### Exemplo de Uso no Componente

```typescript
// No RoletaPremiadaSection.tsx
import { supabase } from '@/lib/supabase'

const enviarFormulario = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validarFormulario()) return

  try {
    // 1. Verificar duplicatas
    const { data: duplicateCheck } = await supabase
      .rpc('check_lead_duplicate', {
        p_email: dadosForm.email,
        p_whatsapp: dadosForm.whatsapp
      })

    if (duplicateCheck.duplicate) {
      setErrosForm({
        [duplicateCheck.type]: duplicateCheck.message
      })
      return
    }

    // 2. Prosseguir para roleta
    setEtapaAtual('roleta')

  } catch (error) {
    console.error('Erro ao verificar duplicatas:', error)
    setErrosForm({
      email: 'Erro no servidor. Tente novamente.'
    })
  }
}

const girarRoleta = async () => {
  if (roletaGirando) return

  setRoletaGirando(true)

  // Sortear prêmio (lógica existente)
  const premio = sortearPremio(dadosForm.email)
  setPremioGanho(premio)

  try {
    // Salvar lead no banco
    const { data: result } = await supabase
      .rpc('insert_roleta_lead', {
        p_email: dadosForm.email,
        p_whatsapp: dadosForm.whatsapp,
        p_premio_id: premio.id,
        p_premio_nome: premio.nome,
        p_premio_cupom: premio.cupom,
        p_ip_address: await getUserIP(),
        p_user_agent: navigator.userAgent,
        p_utm_source: getUTMParam('utm_source'),
        p_utm_medium: getUTMParam('utm_medium'),
        p_utm_campaign: getUTMParam('utm_campaign'),
        p_referrer: document.referrer
      })

    if (!result.success) {
      console.error('Erro ao salvar lead:', result.error)
    }

  } catch (error) {
    console.error('Erro ao salvar lead:', error)
  }

  // Animação da roleta (lógica existente)
  // ...
}
```

## Variáveis de Ambiente

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Scripts de Instalação

### 1. Instalar Supabase Client

```bash
npm install @supabase/supabase-js
```

### 2. Executar Script SQL

1. Acesse o Supabase Dashboard
2. Vá em "SQL Editor"
3. Cole o conteúdo do arquivo `supabase-setup.sql`
4. Execute o script

### 3. Configurar Variáveis de Ambiente

1. No Supabase Dashboard, vá em Settings > API
2. Copie a URL e as chaves
3. Adicione no arquivo `.env.local`

## Funções Utilitárias

```typescript
// utils/helpers.ts
export const getUserIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch {
    return null
  }
}

export const getUTMParam = (param: string): string | null => {
  if (typeof window === 'undefined') return null
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

export const formatWhatsAppForDB = (whatsapp: string): string => {
  return whatsapp.replace(/[^0-9]/g, '')
}
```

## Próximos Passos

1. **Executar o script SQL** no Supabase Dashboard
2. **Configurar variáveis de ambiente** no projeto
3. **Instalar dependências** do Supabase
4. **Implementar integração** no componente da roleta
5. **Testar fluxo completo** de submissão
6. **Configurar dashboard administrativo** para visualizar leads

## Segurança

- ✅ RLS habilitado na tabela
- ✅ Validações de duplicatas no banco
- ✅ Políticas de acesso configuradas
- ✅ Sanitização de dados
- ✅ Rate limiting recomendado no frontend
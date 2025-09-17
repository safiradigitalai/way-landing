// Funções utilitárias para a roleta

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

export const getAllUTMParams = () => {
  if (typeof window === 'undefined') return {}

  const urlParams = new URLSearchParams(window.location.search)
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_content: urlParams.get('utm_content'),
    utm_term: urlParams.get('utm_term')
  }
}
'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ConfettiEffect from '@/components/ui/ConfettiEffect';
import { supabase, type DuplicateCheckResponse, type SubmitResponse } from '@/lib/supabase';
import { getUserIP, getAllUTMParams } from '@/utils/helpers';

// Interface para prêmios
interface Premio {
  id: number;
  nome: string;
  cupom: string | null;
  peso: number;
  cor: string;
  icone: React.ReactNode;
}


const RoletaPremiadaSection = () => {
  // Estados principais
  const [etapaAtual, setEtapaAtual] = useState<'formulario' | 'roleta' | 'resultado'>('formulario');
  const [dadosForm, setDadosForm] = useState({ email: '', whatsapp: '', termos: false });
  const [premioGanho, setPremioGanho] = useState<Premio | null>(null);
  const [roletaGirando, setRoletaGirando] = useState(false);
  const [mostrarConfetti, setMostrarConfetti] = useState(false);
  const [errosForm, setErrosForm] = useState<{ [key: string]: string }>({});
  const [paddingTop, setPaddingTop] = useState('80px');
  const [paddingBottom, setPaddingBottom] = useState('80px');

  // Refs para animações
  const roletaRef = useRef<HTMLDivElement>(null);

  // Hook para responsividade do padding
  useEffect(() => {
    const updatePadding = () => {
      if (window.innerWidth >= 1024) {
        setPaddingTop('0px');
        setPaddingBottom('80px');
      } else {
        setPaddingTop('80px');
        setPaddingBottom('80px');
      }
    };

    updatePadding();
    window.addEventListener('resize', updatePadding);
    return () => window.removeEventListener('resize', updatePadding);
  }, []);

  // Definição dos prêmios
  const premios: Premio[] = useMemo(() => [
    {
      id: 1,
      nome: "50% OFF",
      cupom: "WAY50",
      peso: 5,
      cor: "#FFD700",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      id: 2,
      nome: "25% OFF",
      cupom: "WAY25",
      peso: 15,
      cor: "#FF6B6B",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    },
    {
      id: 3,
      nome: "15% OFF",
      cupom: "WAY15",
      peso: 30,
      cor: "#4ECDC4",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      nome: "10% OFF",
      cupom: "WAY10",
      peso: 35,
      cor: "#45B7D1",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      id: 5,
      nome: "Tente Novamente",
      cupom: null,
      peso: 15,
      cor: "#96CEB4",
      icone: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ], []);

  // Algoritmo de sorteio justo
  const sortearPremio = useCallback((email: string): Premio => {
    const seed = Date.now() + email.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const random = Math.sin(seed) * 10000;
    const numero = Math.abs(random % 100);

    let acumulado = 0;
    for (const premio of premios) {
      acumulado += premio.peso;
      if (numero < acumulado) return premio;
    }
    return premios[premios.length - 1];
  }, [premios]);


  // Validar formulário
  const validarFormulario = () => {
    const novosErros: { [key: string]: string } = {};

    if (!dadosForm.email) {
      novosErros.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(dadosForm.email)) {
      novosErros.email = 'Email inválido';
    }

    if (!dadosForm.whatsapp) {
      novosErros.whatsapp = 'WhatsApp é obrigatório';
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(dadosForm.whatsapp)) {
      novosErros.whatsapp = 'WhatsApp inválido (formato: (XX) XXXXX-XXXX)';
    }

    if (!dadosForm.termos) {
      novosErros.termos = 'Você deve aceitar os termos';
    }

    setErrosForm(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  // Formatar WhatsApp
  const formatarWhatsApp = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 11) {
      return numeros.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return valor;
  };

  // Enviar formulário
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      // Verificar duplicatas no banco de dados
      const { data: duplicateCheck, error } = await supabase
        .rpc('check_lead_duplicate', {
          p_email: dadosForm.email,
          p_whatsapp: dadosForm.whatsapp
        });

      if (error) {
        console.error('Erro ao verificar duplicatas:', error);
        setErrosForm({
          email: 'Erro no servidor. Tente novamente em alguns instantes.'
        });
        return;
      }

      if (duplicateCheck?.duplicate) {
        setErrosForm({
          [duplicateCheck.type]: duplicateCheck.message
        });
        return;
      }

      // Se passou por todas as validações, prosseguir para roleta
      setEtapaAtual('roleta');

    } catch (error) {
      console.error('Erro ao verificar duplicatas:', error);
      setErrosForm({
        email: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    }
  };

  // Girar roleta
  const girarRoleta = async () => {
    if (roletaGirando) return;

    setRoletaGirando(true);

    // Sortear prêmio
    const premio = sortearPremio(dadosForm.email);
    setPremioGanho(premio);

    // Salvar lead no banco de dados (em paralelo com a animação)
    const salvarLeadPromise = salvarLeadNoBanco(premio);

    // Calcular ângulo baseado no prêmio
    const anguloDosPremios = 360 / premios.length;
    const indicePremiado = premios.findIndex(p => p.id === premio.id);
    const anguloAlvo = (indicePremiado * anguloDosPremios) + (anguloDosPremios / 2);
    const voltas = 5; // Número de voltas completas
    const anguloFinal = (voltas * 360) + (360 - anguloAlvo);

    // Animar roleta
    if (roletaRef.current) {
      roletaRef.current.style.transition = 'transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      roletaRef.current.style.transform = `rotate(${anguloFinal}deg)`;
    }

    // Aguardar animação e resultado do banco
    setTimeout(async () => {
      // Aguardar que o lead seja salvo no banco
      await salvarLeadPromise;

      setRoletaGirando(false);
      setEtapaAtual('resultado');

      // Se ganhou prêmio, mostrar confetti
      if (premio.cupom) {
        setMostrarConfetti(true);
      }
    }, 4000);
  };

  // Função para salvar lead no banco
  const salvarLeadNoBanco = async (premio: Premio) => {
    try {
      // Coletar dados do usuário e sistema
      const userIP = await getUserIP();
      const utmParams = getAllUTMParams();

      const { data: result, error } = await supabase
        .rpc('insert_roleta_lead', {
          p_email: dadosForm.email,
          p_whatsapp: dadosForm.whatsapp,
          p_premio_id: premio.id,
          p_premio_nome: premio.nome,
          p_premio_cupom: premio.cupom,
          p_ip_address: userIP,
          p_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
          p_utm_source: utmParams.utm_source,
          p_utm_medium: utmParams.utm_medium,
          p_utm_campaign: utmParams.utm_campaign,
          p_referrer: typeof document !== 'undefined' ? document.referrer : null
        });

      if (error) {
        console.error('Erro ao salvar lead:', error);
        return;
      }

      if (!result?.success) {
        console.error('Erro ao salvar lead:', result?.error || 'Erro desconhecido');
        return;
      }

      console.log('Lead salvo com sucesso:', result.lead_id);

    } catch (error) {
      console.error('Erro ao salvar lead:', error);
    }
  };

  // Resetar jogo
  const resetarJogo = () => {
    setEtapaAtual('formulario');
    setDadosForm({ email: '', whatsapp: '', termos: false });
    setPremioGanho(null);
    setRoletaGirando(false);
    setMostrarConfetti(false);
    setErrosForm({});

    if (roletaRef.current) {
      roletaRef.current.style.transition = 'none';
      roletaRef.current.style.transform = 'rotate(0deg)';
    }
  };

  return (
    <>
      <style jsx>{`
        .premio-texto {
          transform: translateY(-120px);
        }
        @media (min-width: 640px) {
          .premio-texto {
            transform: translateY(-140px);
          }
        }
        @media (min-width: 768px) {
          .premio-texto {
            transform: translateY(-150px);
          }
        }
      `}</style>
    <section className="relative min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-600 overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
      </div>

      {/* Confetti Effect */}
      <ConfettiEffect
        ativo={mostrarConfetti}
        duracao={4000}
        onComplete={() => setMostrarConfetti(false)}
      />

      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen lg:flex lg:items-center lg:justify-center lg:py-20"
        style={{
          paddingTop,
          paddingBottom
        }}
      >

        {/* Layout Desktop: Split Screen */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center w-full">

          {/* Coluna Esquerda - Header e Descrição (Desktop) / Header Mobile */}
          <div className="text-center lg:text-left mb-8 sm:mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400/20 rounded-full border border-yellow-400/30 mb-6 lg:mb-8">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              <span className="text-white font-bold text-lg">Roleta Premiada Way</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-white mb-4 lg:mb-6">
              Ganhe até <span className="text-yellow-400">50% OFF</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed lg:max-w-none max-w-3xl mx-auto lg:mx-0">
              Deixe seus dados e rode nossa roleta para ganhar cupons de desconto exclusivos!
            </p>
          </div>

          {/* Coluna Direita - Conteúdo Principal */}
          <div className="w-full">

          {/* Etapa 1: Formulário */}
          {etapaAtual === 'formulario' && (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
                  Preencha seus dados para participar
                </h2>
                <p className="text-sm sm:text-base text-white/80">
                  Seus dados ficam seguros conosco e você ganha o direito de rodar nossa roleta!
                </p>
              </div>

              <form onSubmit={enviarFormulario} className="space-y-6">

                {/* Email */}
                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Seu melhor email
                  </label>
                  <input
                    type="email"
                    value={dadosForm.email}
                    onChange={(e) => setDadosForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    placeholder="seu.email@exemplo.com"
                  />
                  {errosForm.email && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errosForm.email}
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-white font-semibold mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z"/>
                    </svg>
                    Seu WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={dadosForm.whatsapp}
                    onChange={(e) => setDadosForm(prev => ({
                      ...prev,
                      whatsapp: formatarWhatsApp(e.target.value)
                    }))}
                    className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                    placeholder="(84) 99999-9999"
                    maxLength={15}
                  />
                  {errosForm.whatsapp && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errosForm.whatsapp}
                    </p>
                  )}
                </div>

                {/* Termos */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dadosForm.termos}
                      onChange={(e) => setDadosForm(prev => ({ ...prev, termos: e.target.checked }))}
                      className="mt-1 w-5 h-5 text-yellow-400 bg-white/20 border-white/30 rounded focus:ring-yellow-400 focus:ring-2"
                    />
                    <span className="text-white/90 text-sm leading-relaxed">
                      Aceito os <button type="button" className="text-yellow-400 underline hover:text-yellow-300">termos de uso</button> e
                      autorizo o contato via WhatsApp e email para receber ofertas exclusivas da Way.
                    </span>
                  </label>
                  {errosForm.termos && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errosForm.termos}
                    </p>
                  )}
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl text-xl font-black hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Liberar Roleta Premiada
                </button>
              </form>
            </div>
          )}

            {/* Etapa 2: Roleta */}
            {etapaAtual === 'roleta' && (
              <div className="text-center">
              <div className="mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                  Sua vez de ganhar!
                </h2>
                <p className="text-white/80 text-sm sm:text-base lg:text-lg">
                  Clique no botão para girar a roleta e descobrir seu prêmio
                </p>
              </div>

              {/* Roleta */}
              <div className="relative mx-auto mb-8 w-80 h-80 sm:w-96 sm:h-96 md:w-[400px] md:h-[400px]">

                {/* Ponteiro */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-lg" />
                </div>

                {/* Círculo da Roleta */}
                <div
                  ref={roletaRef}
                  className="relative w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden"
                  style={{
                    background: `conic-gradient(${premios.map((premio, index) => {
                      const inicio = (index / premios.length) * 360;
                      const fim = ((index + 1) / premios.length) * 360;
                      return `${premio.cor} ${inicio}deg ${fim}deg`;
                    }).join(', ')})`
                  }}
                >
                  {/* Setores da roleta */}
                  {premios.map((premio, index) => {
                    const angulo = (360 / premios.length) * index;
                    const anguloTexto = angulo + (360 / premios.length) / 2;

                    return (
                      <div
                        key={premio.id}
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          transform: `rotate(${anguloTexto}deg)`,
                          transformOrigin: 'center'
                        }}
                      >
                        <div
                          className="text-white font-bold text-xs sm:text-sm md:text-base text-center premio-texto"
                          style={{
                            textShadow: '1px 1px 2px rgba(0,0,0,0.7)'
                          }}
                        >
                          <div className="mb-1 scale-75 sm:scale-90 md:scale-100">{premio.icone}</div>
                          <div className="whitespace-nowrap text-[10px] sm:text-xs md:text-sm">{premio.nome}</div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Centro da roleta */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botão Girar */}
              <button
                onClick={girarRoleta}
                disabled={roletaGirando}
                className={`px-8 sm:px-12 py-3 sm:py-4 rounded-2xl text-lg sm:text-xl font-black transition-all duration-300 touch-manipulation ${
                  roletaGirando
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/25 active:scale-95'
                }`}
              >
                {roletaGirando ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                    Girando...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    GIRAR ROLETA
                  </div>
                )}
              </button>
            </div>
          )}

            {/* Etapa 3: Resultado */}
            {etapaAtual === 'resultado' && premioGanho && (
              <div className="text-center">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">

                {premioGanho.cupom ? (
                  <>
                    {/* Resultado Positivo */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
                        PARABÉNS!
                      </h2>
                      <p className="text-lg sm:text-xl lg:text-2xl text-yellow-400 font-bold mb-4 sm:mb-6">
                        Você ganhou {premioGanho.nome}
                      </p>
                    </div>

                    {/* Cupom */}
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="text-black">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">SEU CUPOM DE DESCONTO</h3>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider border-2 border-dashed border-black rounded-lg py-3 sm:py-4 px-4 sm:px-6 bg-white/20 break-all">
                          {premioGanho.cupom}-{Math.random().toString(36).substr(2, 4).toUpperCase()}
                        </div>
                        <p className="text-xs sm:text-sm mt-3 opacity-80">
                          Use este cupom no seu primeiro pedido
                        </p>
                      </div>
                    </div>

                    {/* Instruções */}
                    <div className="bg-white/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left">
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-sm sm:text-base">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Como usar seu cupom:
                      </h4>
                      <ol className="text-white/80 space-y-2 text-sm sm:text-base">
                        <li>1. Baixe o app Way na Play Store</li>
                        <li>2. Faça seu cadastro</li>
                        <li>3. Vá em &quot;Cupons&quot; e digite o código acima</li>
                        <li>4. Aproveite seu desconto na primeira viagem!</li>
                      </ol>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Resultado Negativo */}
                    <div className="mb-8">
                      <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-white mb-4">
                        Que pena!
                      </h2>
                      <p className="text-xl text-white/80 mb-6">
                        Desta vez não foi, mas não desista!
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-6 mb-8">
                      <p className="text-white/80">
                        Continue acompanhando nossas redes sociais para mais oportunidades de ganhar cupons de desconto exclusivos!
                      </p>
                    </div>
                  </>
                )}

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button
                    onClick={resetarJogo}
                    className="px-6 sm:px-8 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors duration-300 text-sm sm:text-base"
                  >
                    Tentar Novamente
                  </button>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mobapps.client.waydriver&hl=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:scale-105 transition-transform duration-300 text-sm sm:text-base"
                  >
                    Baixar App Way
                  </a>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default RoletaPremiadaSection;
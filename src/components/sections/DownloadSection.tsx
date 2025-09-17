'use client';

import React, { useState } from 'react';

const DownloadSection = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('android');

  const appFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Interface otimizada',
      description: 'Design intuitivo e rápido para facilitar o uso diário'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Login seguro',
      description: 'Autenticação com biometria e verificação em duas etapas'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: 'Pagamentos múltiplos',
      description: 'Cartão, PIX, dinheiro e carteiras digitais'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'GPS de precisão',
      description: 'Localização exata e rotas otimizadas em tempo real'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Chat integrado',
      description: 'Comunicação direta com motorista sem revelar seu número'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Sistema de avaliação',
      description: 'Avalie e seja avaliado para manter a qualidade alta'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      title: 'Botão de emergência',
      description: 'Contato direto com autoridades em situações de risco'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Histórico completo',
      description: 'Todas suas viagens organizadas com recibos detalhados'
    }
  ];

  const motoristaFeatures = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Ganhe mais',
      description: '90% do valor da corrida fica com você',
      highlight: 'Até R$ 1.200 a mais por mês'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Aprovação rápida',
      description: 'Documentos verificados em até 24 horas',
      highlight: 'Comece hoje mesmo'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
        </svg>
      ),
      title: 'Suporte total',
      description: 'Equipe dedicada 24/7 para motoristas',
      highlight: 'Sempre ao seu lado'
    }
  ];

  return (
    <section id="download" className="relative section bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-400/20 rounded-full border border-yellow-400/30 mb-8">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-white font-bold">Disponível para Download</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-6">
            Baixe o app <span className="text-yellow-400">Way</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Disponível gratuitamente para iOS e Android. Uma experiência moderna, 
            rápida e segura para revolucionar seus deslocamentos.
          </p>
        </div>

        {/* Download Section - Nova Diagramação */}
        <div className="max-w-6xl mx-auto mb-20">

          {/* Cards Simétricos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Card 1 - Downloads */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-black mb-2">Baixe Grátis</h4>
                <p className="text-black/70">Instalação rápida e segura</p>
              </div>

              {/* Platform Selector */}
              <div className="flex justify-center mb-6">
                <div className="bg-black/80 backdrop-blur-sm p-2 rounded-2xl inline-flex border border-black/20">
                  <button
                    onClick={() => setSelectedPlatform('android')}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                      selectedPlatform === 'android'
                        ? 'bg-white text-black shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Android
                  </button>
                  <button
                    onClick={() => setSelectedPlatform('ios')}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 text-sm ${
                      selectedPlatform === 'ios'
                        ? 'bg-white text-black shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    iOS
                  </button>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="space-y-3">
                {selectedPlatform === 'android' ? (
                  <a
                    href="https://play.google.com/store/apps/details?id=com.mobapps.client.waydriver&hl=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-2xl text-base font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 group w-full flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    Google Play
                  </a>
                ) : (
                  <a
                    href="#"
                    className="relative overflow-hidden bg-gray-400 text-gray-700 px-6 py-4 rounded-2xl text-base font-bold cursor-not-allowed group w-full flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    App Store
                  </a>
                )}
                <button className="px-6 py-3 rounded-2xl text-base font-semibold text-black border-2 border-black/30 hover:border-black hover:bg-black/10 transition-all duration-300 w-full">
                  Enviar por WhatsApp
                </button>
              </div>
            </div>

            {/* Card 2 - Estatísticas */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-black mb-2">Avaliações</h4>
                <p className="text-black/70">Confiança dos usuários</p>
              </div>

              {/* Stats Grid */}
              <div className="space-y-6">
                <div className="text-center p-4 bg-purple-600/10 rounded-2xl border border-purple-600/20">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="text-3xl font-black text-purple-600">4.8</div>
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <div className="text-sm font-bold text-purple-600">Avaliação Média</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-black/5 rounded-2xl">
                    <div className="text-2xl font-black text-black mb-1">100k+</div>
                    <div className="text-xs font-semibold text-black/60">Downloads</div>
                  </div>
                  <div className="text-center p-3 bg-black/5 rounded-2xl">
                    <div className="text-2xl font-black text-green-600 mb-1">Grátis</div>
                    <div className="text-xs font-semibold text-black/60">Para sempre</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-xl text-sm font-bold">
                  Compatível com {selectedPlatform === 'ios' ? 'iOS 12+' : 'Android 7+'}
                </div>
              </div>
            </div>

            {/* Card 3 - Recursos Principais */}
            <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-black mb-2">Recursos</h4>
                <p className="text-black/70">Principais funcionalidades</p>
              </div>

              <div className="space-y-4">
                {appFeatures.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors duration-300">
                    <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                      {React.cloneElement(feature.icon, { className: "w-4 h-4" })}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold text-black">{feature.title}</h5>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="text-purple-600 font-bold text-sm hover:text-purple-800 transition-colors duration-300">
                  Ver todos os recursos →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Motoristas Section */}
        <div id="motoristas" className="bg-black/90 backdrop-blur-sm rounded-3xl p-12 border border-black/20 text-white">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white mb-4">
              Seja um motorista <span className="text-yellow-400">Way</span>
            </h3>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              Ganhe mais dirigindo com a Way. Cadastro rápido, aprovação em 24h e os melhores 
              repasses do mercado.
            </p>
          </div>

          <div className="grid-12 gap-8 mb-16">
            {motoristaFeatures.map((feature, index) => (
              <div key={index} className="col-span-12 lg:col-span-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-yellow-400">
                    {feature.icon}
                  </div>
                  <h4 className="text-h4 mb-2">{feature.title}</h4>
                  <p className="text-white/80 mb-4">{feature.description}</p>
                  <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-xl text-body-sm font-bold">
                    {feature.highlight}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group">
                <span className="relative z-10">Quero ser motorista</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button className="px-8 py-4 rounded-xl text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300">
                Falar com consultor
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
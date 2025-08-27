'use client';

import React from 'react';

const VantagesSection = () => {
  const vantagens = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Preços transparentes e justos',
      description: 'Tarifas claras sem surpresas. Pagamos mais para motoristas e cobramos menos dos passageiros através de nossa estrutura otimizada.',
      benefit: 'Economia de até 15%',
      color: 'purple'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Velocidade comprovada',
      description: 'IA avançada otimiza rotas e conecta você com o motorista ideal em segundos. Sistema testado em milhões de corridas.',
      benefit: 'Chegada em 3-5 min',
      color: 'blue'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Segurança certificada',
      description: 'Verificação rigorosa, GPS em tempo real, botão de emergência e equipe de suporte 24/7. Conformidade total com regulamentações.',
      benefit: '99.8% segurança',
      color: 'green'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'Motoristas valorizados',
      description: 'Repasses justos de até 92% da corrida. Sem taxas ocultas, processos transparentes e suporte dedicado para parceiros.',
      benefit: '92% de repasse',
      color: 'orange'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Tecnologia intuitiva',
      description: 'Interface pensada para simplicidade e eficiência. App otimizado que funciona perfeitamente em qualquer dispositivo.',
      benefit: '4.8 estrelas',
      color: 'indigo'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: 'Impacto sustentável',
      description: 'Incentivamos veículos elétricos e híbridos. Otimização de rotas reduz emissões. Juntos por um futuro mais limpo.',
      benefit: 'CO2 reduzido',
      color: 'emerald'
    }
  ];

  const comparacao = [
    { 
      item: 'Taxa da plataforma', 
      way: '7,99%', 
      others: '9,5-25%',
      description: 'A menor taxa do mercado para beneficiar motoristas e passageiros'
    },
    { 
      item: 'Tempo de espera médio', 
      way: '3-5 min', 
      others: '8-15 min',
      description: 'IA otimizada conecta você mais rapidamente'
    },
    { 
      item: 'Verificação de segurança', 
      way: '100%', 
      others: '60-80%',
      description: 'Todos os motoristas passam por verificação completa'
    },
    { 
      item: 'Disponibilidade de suporte', 
      way: '24/7', 
      others: 'Horário comercial',
      description: 'Equipe sempre disponível para emergências'
    },
    { 
      item: 'Transparência de preços', 
      way: 'Total', 
      others: 'Limitada',
      description: 'Preço final conhecido antes da viagem'
    }
  ];

  const colorClasses = {
    purple: 'bg-purple-100 text-way-purple',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600'
  };

  return (
    <section id="vantagens" className="relative section bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-white/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-4">
            Por que escolher a <span className="text-yellow-400">Way</span>
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Transparência, tecnologia e compromisso com a qualidade. Cada decisão é pensada 
            para beneficiar toda nossa comunidade de mobilidade urbana.
          </p>
        </div>

        {/* Vantagens Grid */}
        <div className="grid-12 gap-8 mb-20">
          {vantagens.map((vantagem, index) => (
            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group">
                <div className="flex flex-col h-full">
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors duration-300">
                    <div className="text-white group-hover:text-black transition-colors duration-300">
                      {vantagem.icon}
                    </div>
                  </div>
                  <h3 className="text-h4 mb-4 text-black group-hover:text-purple-600 transition-colors duration-300">{vantagem.title}</h3>
                  <p className="text-body text-black/70 mb-6 flex-1">
                    {vantagem.description}
                  </p>
                  <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-xl text-body-sm font-bold">
                    {vantagem.benefit}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparação */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-h3 mb-6 text-black">
              Comparação com a concorrência
            </h3>
            <p className="text-body text-black/70">
              Veja como nos comparamos com outras plataformas do mercado
            </p>
          </div>

          <div className="space-y-6">
            {comparacao.map((item, index) => (
              <div key={index} className="border border-black/10 rounded-2xl p-6 hover:shadow-lg hover:shadow-black/10 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h4 className="text-h4 mb-2 text-black">{item.item}</h4>
                    <p className="text-body-sm text-black/60">{item.description}</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-xl font-bold">
                      Way: {item.way}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-black/10 text-black/70 rounded-xl">
                      Outros: {item.others}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 pt-8 border-t border-black/10">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white inline-block p-6 mb-6 rounded-2xl">
              <h4 className="text-h4 mb-2">Nossa missão</h4>
              <p className="text-body-lg opacity-90">
                Criar um ecossistema de mobilidade mais justo e eficiente para todos
              </p>
            </div>
            <div>
              <button 
                onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <span className="relative z-10">Experimentar agora</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VantagesSection;
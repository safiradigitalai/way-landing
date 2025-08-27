'use client';

import React, { useState } from 'react';

const TarifasSection = () => {
  const [selectedDistance, setSelectedDistance] = useState('5km');

  // Taxas reais das plataformas
  const platformRates = {
    way: 0.0799,     // 7.99%
    uber: 0.25,      // 25%
    nn: 0.1999,      // 19.99%
    inDrive: 0.095   // 9.5%
  };

  // Custo base da viagem (incluindo combustível, tempo do motorista, etc)
  const baseCosts = {
    '5km': 5.50,
    '10km': 11.00,
    '15km': 16.50,
    '20km': 22.00
  };

  const calculateFinalPrice = (baseCost: number, platformRate: number) => {
    // Preço final = custo base / (1 - taxa da plataforma)
    return baseCost / (1 - platformRate);
  };

  const tarifaComparison = Object.keys(baseCosts).reduce((acc, distance) => {
    const baseCost = baseCosts[distance as keyof typeof baseCosts];
    acc[distance] = {
      way: calculateFinalPrice(baseCost, platformRates.way),
      uber: calculateFinalPrice(baseCost, platformRates.uber),
      nn: calculateFinalPrice(baseCost, platformRates.nn),
      inDrive: calculateFinalPrice(baseCost, platformRates.inDrive)
    };
    return acc;
  }, {} as Record<string, Record<string, number>>);

  const currentTarifa = tarifaComparison[selectedDistance as keyof typeof tarifaComparison];
  const savings = {
    uber: currentTarifa.uber - currentTarifa.way,
    nn: currentTarifa.nn - currentTarifa.way,
    inDrive: currentTarifa.inDrive - currentTarifa.way
  };

  const avgSavings = (savings.uber + savings.nn + savings.inDrive) / 3;

  const motoristaFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Repasse de 92%',
      description: 'Enquanto outros cobram 9,5-25%, nossa taxa é de apenas 7,99%. Você fica com mais.',
      highlight: 'Ganhe até R$ 1.200 a mais por mês'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Pagamento instantâneo',
      description: 'Dinheiro na conta imediatamente após a corrida. Sem esperar dias para receber.',
      highlight: 'Disponível 24/7'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6.219-6.219a4.5 4.5 0 00-6.364 0L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 6.364L12 20.364l7.682-7.682a4.5 4.5 0 000-6.364z" />
        </svg>
      ),
      title: 'Transparência total',
      description: 'Sem taxas ocultas. O que você vê na tela é exatamente o que vai receber.',
      highlight: '100% transparente'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Bonificações extras',
      description: 'Ganhe mais em horários de pico, metas semanais e campanhas especiais.',
      highlight: 'Até R$ 300 em bônus por semana'
    }
  ];

  return (
    <section id="tarifas" className="relative section bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-black/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-600/20 rounded-full border border-purple-600/30 mb-6">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 002 2z" />
            </svg>
            <span className="text-black font-bold">Calculadora de Economia</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-black mb-4">
            Compare e <span className="text-purple-600">economize</span>
          </h2>
          <p className="text-base md:text-lg text-black/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Selecione a distância e veja o quanto você economiza escolhendo a Way. 
            Compare nossas tarifas com a concorrência e descubra por que somos a melhor escolha.
          </p>
        </div>

        {/* Price Calculator - Nova Diagramação */}
        <div className="max-w-7xl mx-auto mb-20">

          {/* Distance Selector */}
          <div className="flex justify-center mb-12 px-4">
            <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-3xl p-2 flex gap-1 w-full max-w-lg overflow-x-auto">
              {Object.keys(tarifaComparison).map((distance) => (
                <button
                  key={distance}
                  onClick={() => setSelectedDistance(distance)}
                  className={`px-4 sm:px-6 py-3 rounded-2xl font-bold transition-all duration-300 text-sm sm:text-base flex-1 min-w-0 ${
                    selectedDistance === distance
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-black/70 hover:text-purple-600 hover:bg-purple-600/10'
                  }`}
                >
                  {distance}
                </button>
              ))}
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Way - Destaque */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-3xl p-8 relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl">
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black">
                  MELHOR PREÇO
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-black mb-2">Way</h4>
                <div className="text-4xl font-black text-yellow-400 mb-2">
                  R$ {currentTarifa.way.toFixed(2)}
                </div>
                <p className="text-white/80 text-sm">Preço justo garantido</p>
              </div>
            </div>

            {/* Competitors */}
            {[
              { name: 'Uber', price: currentTarifa.uber, savings: savings.uber, color: 'bg-black' },
              { name: '99', price: currentTarifa.nn, savings: savings.nn, color: 'bg-yellow-500' },
              { name: 'inDrive', price: currentTarifa.inDrive, savings: savings.inDrive, color: 'bg-blue-600' }
            ].map((competitor) => (
              <div key={competitor.name} className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 ${competitor.color} rounded-2xl flex items-center justify-center mb-4 text-white`}>
                    <span className="font-black text-lg">{competitor.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-xl font-bold text-black mb-2">{competitor.name}</h4>
                  <div className="text-3xl font-black text-black mb-2">
                    R$ {competitor.price.toFixed(2)}
                  </div>
                  <div className="mt-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-2xl font-bold text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                      </svg>
                      +R$ {competitor.savings.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Economia Destacada */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-3xl p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="text-3xl md:text-4xl font-black text-white">
                  Sua Economia
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white/80 mb-2">Distância</div>
                  <div className="text-4xl font-black text-white">{selectedDistance}</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-white/80 mb-2">Você economiza</div>
                  <div className="text-6xl font-black text-white mb-2">
                    R$ {avgSavings.toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-white/80">por viagem</div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-white/80 mb-2">Por mês*</div>
                  <div className="text-4xl font-black text-white">R$ 600</div>
                  <div className="text-sm font-semibold text-white/70">*usuários frequentes</div>
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-green-600 px-12 py-4 rounded-2xl text-xl font-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
                >
                  Começar a economizar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Benefits */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-black mb-4">
              Motoristas ganham <span className="text-purple-600">mais</span> na Way
            </h3>
            <p className="text-base md:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto">
              Repasses justos e transparência total. Veja por que motoristas estão migrando para a Way.
            </p>
          </div>

          <div className="grid-12 gap-8">
            {motoristaFeatures.map((feature, index) => (
              <div key={index} className="col-span-12 lg:col-span-6">
                <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-2xl p-8 h-full hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center flex-shrink-0 text-white group-hover:bg-purple-600 transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-h4 mb-4 text-black group-hover:text-purple-600 transition-colors duration-300">{feature.title}</h4>
                      <p className="text-body text-black/70 mb-6">
                        {feature.description}
                      </p>
                      <div className="inline-flex items-center px-4 py-2 bg-yellow-400 text-black rounded-xl text-body-sm font-bold">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-12 max-w-3xl mx-auto border border-black/20">
            <h3 className="text-h3 mb-6 text-white">
              Comece a economizar hoje mesmo
            </h3>
            <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
              Junte-se à revolução do transporte urbano. Menos gasto para você, 
              mais ganho para motoristas, melhor para todos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group"
              >
                <span className="relative z-10">Baixar app - Passageiro</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              <button 
                onClick={() => document.getElementById('motoristas')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-xl text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                Cadastrar - Motorista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TarifasSection;
'use client';

import React, { useState } from 'react';

const ComoFuncionaSection = () => {
  const [activeTab, setActiveTab] = useState<'passageiro' | 'motorista'>('passageiro');

  const passageiroSteps = [
    {
      number: '01',
      title: 'Abra o app e defina destino',
      description: 'Digite seu endereço de destino ou selecione um local no mapa. Nosso sistema calcula automaticamente a melhor rota.',
      details: [
        'Busca inteligente por endereços',
        'Sugestões baseadas no histórico',
        'Cálculo automático de rota e tempo'
      ]
    },
    {
      number: '02',
      title: 'Conectamos você ao motorista ideal',
      description: 'Nosso algoritmo seleciona o motorista mais próximo e bem avaliado para sua viagem, garantindo rapidez e qualidade.',
      details: [
        'Motoristas verificados e qualificados',
        'Informações completas do veículo',
        'Tempo estimado de chegada preciso'
      ]
    },
    {
      number: '03',
      title: 'Acompanhe sua viagem em tempo real',
      description: 'Veja a localização do motorista, acompanhe o trajeto e compartilhe sua viagem com contatos de confiança.',
      details: [
        'GPS preciso e atualizado',
        'Chat direto com o motorista',
        'Compartilhamento de viagem'
      ]
    },
    {
      number: '04',
      title: 'Pague de forma segura',
      description: 'Múltiplas formas de pagamento disponíveis. Avalie sua experiência e ajude outros usuários.',
      details: [
        'Pagamento automático seguro',
        'Recibo detalhado por e-mail',
        'Sistema de avaliação transparente'
      ]
    }
  ];

  const motoristaSteps = [
    {
      number: '01',
      title: 'Cadastro e verificação completa',
      description: 'Processo rigoroso mas rápido de verificação. Nossa equipe analisa todos os documentos em até 24 horas.',
      details: [
        'Verificação de antecedentes criminais',
        'Validação de CNH e documentos',
        'Inspeção virtual do veículo'
      ]
    },
    {
      number: '02',
      title: 'Ative o modo motorista',
      description: 'Escolha quando e onde trabalhar. Você tem total flexibilidade de horários e localização.',
      details: [
        'Defina suas áreas preferenciais',
        'Controle total dos seus horários',
        'Pause quando precisar'
      ]
    },
    {
      number: '03',
      title: 'Aceite corridas compatíveis',
      description: 'Veja detalhes da corrida antes de aceitar: destino, distância estimada e valor aproximado.',
      details: [
        'Informações completas da viagem',
        'Rota otimizada pelo GPS',
        'Comunicação direta com passageiro'
      ]
    },
    {
      number: '04',
      title: 'Receba seus ganhos rapidamente',
      description: 'Ganhe até 90% do valor da corrida. Repasses automáticos e transparência total nos cálculos.',
      details: [
        'Repasse de até 90% do valor',
        'Transferência automática',
        'Relatórios detalhados de ganhos'
      ]
    }
  ];

  const currentSteps = activeTab === 'passageiro' ? passageiroSteps : motoristaSteps;

  return (
    <section id="como-funciona" className="relative section bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-black/5 rounded-full blur-2xl" />
      </div>
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-black mb-4">
            Como a <span className="text-purple-600">Way</span> funciona
          </h2>
          <p className="text-base md:text-lg text-black/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Um processo simples e seguro, pensado para oferecer a melhor experiência tanto 
            para passageiros quanto para motoristas.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-20">
          <div className="bg-black/80 backdrop-blur-sm p-2 rounded-2xl inline-flex border border-black/20">
            <button
              onClick={() => setActiveTab('passageiro')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'passageiro'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Para Passageiros
            </button>
            <button
              onClick={() => setActiveTab('motorista')}
              className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'motorista'
                  ? 'bg-white text-black shadow-lg'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Para Motoristas
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="grid-12 gap-8 mb-20">
          {currentSteps.map((step, index) => (
            <div key={index} className="col-span-12 lg:col-span-6">
              <div className="bg-white/95 backdrop-blur-sm border border-black/10 rounded-2xl p-8 h-full hover:shadow-xl hover:shadow-black/20 transition-all duration-300 group">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-purple-600 transition-colors duration-300">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h4 mb-4 text-black group-hover:text-purple-600 transition-colors duration-300">{step.title}</h3>
                    <p className="text-body text-black/70 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-3 text-body-sm text-black/60">
                          <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-black/90 backdrop-blur-sm rounded-3xl p-12 max-w-3xl mx-auto border border-black/20">
            <h3 className="text-h3 mb-6 text-white">
              {activeTab === 'passageiro' 
                ? 'Pronto para sua primeira viagem?' 
                : 'Pronto para começar a ganhar?'
              }
            </h3>
            <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
              {activeTab === 'passageiro'
                ? 'Junte-se a milhares de pessoas que já descobriram uma forma melhor de se locomover na cidade.'
                : 'Milhares de motoristas já escolheram a Way. Comece hoje mesmo e veja a diferença.'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {activeTab === 'passageiro' ? (
                <>
                  <button 
                    onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <span className="relative z-10">Baixar app grátis</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('motorista')}
                    className="px-8 py-4 rounded-xl text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Ver para motoristas
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => document.getElementById('motoristas')?.scrollIntoView({ behavior: 'smooth' })}
                    className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group"
                  >
                    <span className="relative z-10">Cadastrar-se agora</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <button 
                    onClick={() => setActiveTab('passageiro')}
                    className="px-8 py-4 rounded-xl text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300"
                  >
                    Ver para passageiros
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;
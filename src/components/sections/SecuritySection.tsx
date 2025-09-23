'use client';

import React from 'react';

const SecuritySection = () => {
  return (
    <section id="seguranca" className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full mb-8">
            <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-body font-medium text-green-700">
              Segurança comprovada
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-black mb-4">
            Sua segurança é nossa <span className="text-purple-600">garantia</span>
          </h2>
          
          <p className="text-base md:text-lg text-black/70 mb-12 leading-relaxed max-w-2xl mx-auto">
            Implementamos os mais rigorosos padrões de segurança da indústria para 
            garantir que cada viagem seja protegida e confiável.
          </p>
        </div>

        <div className="grid-12 mb-20">
          {/* Main Security Features */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-8">
              {/* Driver Verification */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 group">
                <div className="grid-12">
                  <div className="col-span-12 md:col-span-3">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-4 lg:mb-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors duration-300">Verificação completa de motoristas</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Todos os motoristas passam por um processo rigoroso de verificação que inclui:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Antecedentes criminais verificados em órgãos oficiais</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">CNH válida com pontuação atualizada</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Documentação do veículo e seguro obrigatório</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Treinamento obrigatório em segurança</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Real-time Safety */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                <div className="grid-12">
                  <div className="col-span-12 md:col-span-3">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-4 lg:mb-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">Monitoramento em tempo real</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Nossa central de monitoramento acompanha todas as viagens 24 horas por dia:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">GPS preciso e atualizado</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Alertas automáticos de desvio</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Compartilhamento de viagem</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Gravação de áudio opcional</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Emergency Support */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 group">
                <div className="grid-12">
                  <div className="col-span-12 md:col-span-3">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-4 lg:mb-0 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-red-600 transition-colors duration-300">Botão de emergência</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Em situações de emergência, você tem acesso direto a:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Contato direto com autoridades</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Central de emergência 24/7</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Localização automática</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700">Notificação de contatos</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Stats */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-3xl p-8 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              <h4 className="text-2xl font-bold mb-8">Resultados de segurança</h4>
              
              <div className="space-y-8">
                <div className="text-center border-b border-white/20 pb-6 group hover:border-white/40 transition-colors duration-300">
                  <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">99.8%</div>
                  <div className="text-sm opacity-90">Viagens completadas com segurança</div>
                </div>
                
                <div className="text-center border-b border-white/20 pb-6 group hover:border-white/40 transition-colors duration-300">
                  <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">&lt;30s</div>
                  <div className="text-sm opacity-90">Tempo médio de resposta em emergências</div>
                </div>
                
                <div className="text-center border-b border-white/20 pb-6 group hover:border-white/40 transition-colors duration-300">
                  <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm opacity-90">Motoristas verificados</div>
                </div>
                
                <div className="text-center group">
                  <div className="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-sm opacity-90">Monitoramento ativo</div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-black/95 backdrop-blur-sm rounded-3xl p-12 max-w-2xl mx-auto border border-black/20">
            <h3 className="text-3xl font-bold mb-6 text-white">Segurança que você pode confiar</h3>
            <p className="text-lg text-white/80 mb-8">
              Milhares de pessoas já escolheram a Way pela nossa dedicação à segurança. 
              Junte-se a elas e viaje com tranquilidade.
            </p>
            <button 
              onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group"
            >
              <span className="relative z-10">Começar agora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
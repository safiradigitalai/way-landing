'use client';

import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      
      {/* Clean Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle brand purple overlay */}
        <div className="absolute inset-0 bg-purple-900/20" />
        
        {/* Interactive light effect */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4) 0%, transparent 60%)`
          }}
        />
        
        {/* Minimalist geometric accent */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-purple-500/10 rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-purple-600/5 rounded-lg rotate-12" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" 
             style={{
               backgroundImage: 'linear-gradient(rgba(147, 51, 234, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.5) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-20">
        
        {/* Location Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center space-x-2 px-6 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">Disponível em Natal • RN</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            {/* Epic Title */}
            <h1 className="relative mb-8">
              <div className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-4">
                <span className="block">O FUTURO</span>
                <span className="block text-purple-400">
                  DO TRANSPORTE
                </span>
              </div>
              <div className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light tracking-wide">
                chegou em <span className="text-yellow-400 font-bold">Natal</span>
              </div>
              
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 lg:left-0 right-0 lg:right-auto">
                <div className="w-32 h-1 bg-purple-500 rounded-full animate-pulse mx-auto lg:mx-0" />
              </div>
            </h1>

            {/* Cinematic Description */}
            <p className="text-base md:text-lg text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="text-white font-semibold">Way</span> conecta você aos motoristas mais qualificados 
              com tecnologia de <span className="text-purple-400">última geração</span>, 
              <span className="text-yellow-400"> preços justos</span> e segurança total.
              Uma nova era de mobilidade urbana está começando.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">
                  2min
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wide">Resposta média</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                  100%
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wide">Verificado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
                  24/7
                </div>
                <div className="text-gray-400 text-xs uppercase tracking-wide">Suporte</div>
              </div>
            </div>

          </div>

          {/* Right Side - Interactive Elements */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Feature Card */}
            <div className="relative">
              
              {/* Glowing effect */}
              <div className="absolute -inset-1 bg-purple-600 rounded-2xl blur opacity-25 animate-pulse" />
              
              {/* Card */}
              <div className="relative bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl p-8">
                
                {/* Way Online Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white font-semibold">Way Online</span>
                  </div>
                  <div className="text-purple-400 text-sm">Natal • RN</div>
                </div>
                
                {/* Mock App Interface */}
                <div className="space-y-4">
                  
                  {/* Location Input */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">De onde?</div>
                    <div className="flex items-center space-x-2 text-white">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Shopping Midway Mall</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="text-gray-400 text-xs mb-1">Para onde?</div>
                    <div className="flex items-center space-x-2 text-white">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>Praia de Ponta Negra</span>
                    </div>
                  </div>
                  
                  {/* Driver Card */}
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">JS</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">João Silva</div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            <span className="text-yellow-400">4.9</span>
                          </div>
                          <span className="text-gray-300">• Civic Branco</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-green-400">R$ 24,85</div>
                        <div className="text-gray-400 text-xs">16 min • 10.6 km</div>
                      </div>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-200">
                        Chamar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-600/20 rounded-full blur-xl" />
            
          </div>
        </div>
        
        {/* Full Width CTA Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* App Cliente Android */}
            <a
              href="https://play.google.com/store/apps/details?id=com.mobapps.client.waydriver&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="relative z-10">App Cliente</span>
              </div>
              <span className="text-sm opacity-80">Android • Grátis</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </a>

            {/* App Motorista Android */}
            <a
              href="https://play.google.com/store/apps/details?id=com.mobapps.driver.waydriver&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-5 rounded-xl text-lg font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2 relative z-10">
                <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <span className="text-black">App Motorista</span>
              </div>
              <span className="text-sm opacity-80 text-black relative z-10">Android • Ganhe mais</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* App Cliente iOS */}
            <button
              onClick={scrollToDownload}
              className="group relative px-8 py-5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gray-800/25 flex flex-col items-center gap-2 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="relative z-10">App Cliente</span>
              </div>
              <span className="text-sm opacity-80">iOS • Em breve</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
          </div>

          {/* Banner da Roleta Premiada */}
          <div className="mt-8">
            <a
              href="/wayroleta"
              className="group relative block w-full max-w-2xl mx-auto p-4 xs:p-6 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-500/20 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4">
                <svg className="w-6 h-6 xs:w-8 xs:h-8 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <div className="text-center flex-1">
                  <h3 className="text-lg xs:text-xl font-black text-white mb-1">ROLETA PREMIADA</h3>
                  <p className="text-yellow-300 font-bold text-sm xs:text-base">Ganhe até 50% OFF • Clique aqui!</p>
                </div>
                <svg className="w-5 h-5 xs:w-6 xs:h-6 text-yellow-400 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0 hidden xs:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
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

  const scrollToMotoristas = () => {
    const element = document.getElementById('motoristas');
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
            <span className="text-white/90 text-sm font-medium">Chegando em Natal • RN</span>
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
                está chegando em <span className="text-yellow-400 font-bold">Natal</span>
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
                        <div className="text-2xl font-bold text-green-400">R$ 12,50</div>
                        <div className="text-gray-400 text-xs">3 min • 1.2 km</div>
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
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={scrollToDownload}
              className="group relative px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xl rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex-1"
            >
              <span className="relative z-10">Baixar o App</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </button>
            
            <button 
              onClick={scrollToMotoristas}
              className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-5 rounded-xl text-xl font-bold hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 group flex-1"
            >
              <span className="relative z-10">Seja Motorista</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
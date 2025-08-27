'use client';

import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Cinematic Header */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-2xl border-b border-purple-500/20' 
          : 'bg-purple-900/90 backdrop-blur-xl'
      }`}>
        
        {/* Ambient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/10 to-transparent opacity-60" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className={`transition-all duration-300 ${
            isScrolled ? 'h-20' : 'h-24'
          }`}>
            
            <div className="flex h-full items-center justify-between">
              
              {/* Logo Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group relative flex items-center space-x-3"
                >
                  <div className="relative">
                    <img 
                      src="/logo-branco.png" 
                      alt="Way" 
                      className={`transition-all duration-300 group-hover:scale-110 filter brightness-0 invert ${
                        isScrolled ? 'h-12' : 'h-16'
                      }`}
                    />
                    <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg blur-md -z-10" />
                  </div>
                </button>
              </div>

              {/* Center Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {[
                  { label: 'O App', id: 'como-funciona' },
                  { label: 'Diferenciais', id: 'vantagens' },
                  { label: 'Segurança', id: 'seguranca' },
                  { label: 'Preços', id: 'tarifas' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <div className="absolute inset-0 bg-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100" />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                  </button>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => scrollToSection('download')}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 rounded-lg transition-all duration-300 hover:bg-purple-900/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Baixar App</span>
                </button>
                
                <button
                  onClick={() => scrollToSection('motoristas')}
                  className="hidden lg:flex relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 group"
                >
                  <span className="relative z-10">Seja Motorista</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden relative p-2 text-gray-300 hover:text-white transition-all duration-300 z-[110]"
                >
                  <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                    }`} />
                    <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`} />
                    <span className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cinematic Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Panel */}
        <div className={`absolute top-20 inset-x-4 bg-gradient-to-br from-gray-900/95 to-purple-900/95 backdrop-blur-2xl rounded-2xl border border-purple-500/30 transition-all duration-300 transform ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-2 opacity-0 scale-95'
        }`}>
          <div className="relative">
            
            {/* Header com Close */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white font-semibold text-sm">Menu</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Separador */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-6" />
            
            {/* Mobile Navigation */}
            <div className="px-6 py-6">
              <div className="space-y-2 mb-8">
                {[
                  { label: 'O App', id: 'como-funciona' },
                  { label: 'Diferenciais', id: 'vantagens' },
                  { label: 'Segurança', id: 'seguranca' },
                  { label: 'Preços', id: 'tarifas' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-gray-300 hover:text-white hover:bg-purple-800/30 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-4">
                <button
                  onClick={() => scrollToSection('download')}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-4 text-base font-medium text-purple-300 border border-purple-500/30 rounded-xl hover:bg-purple-900/20 hover:border-purple-400/50 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Baixar Aplicativo</span>
                </button>
                
                <button
                  onClick={() => scrollToSection('motoristas')}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-4 rounded-xl text-base font-bold hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 group"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Seja Motorista</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
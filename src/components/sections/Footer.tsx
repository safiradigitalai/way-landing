'use client';

import React from 'react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      href: '#'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      href: '#'
    }
  ];

  return (
    <footer className="relative bg-white text-black overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-600/5 rounded-full blur-2xl" />
      </div>
      
      {/* Main Footer - Nova Diagramação */}
      <div className="container footer-main-section relative z-10">
        
        {/* Hero Section do Footer */}
        <div className="text-center mb-16">
          <img 
            src="/logo-roxo.png" 
            alt="Way" 
            className="h-20 mx-auto mb-8"
          />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-6 leading-tight">
            O futuro do transporte <br/>
            <span className="text-purple-600">já chegou em Natal</span>
          </h2>
          <p className="text-xl text-black/80 leading-relaxed font-medium max-w-3xl mx-auto">
            Revolucionando o transporte urbano com <span className="text-purple-600 font-bold">tecnologia</span>, <span className="text-purple-600 font-bold">segurança</span> e <span className="text-purple-600 font-bold">tarifas justas</span>. 
          </p>
        </div>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Card 1 - App Download */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-3xl p-8 text-white col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Baixe Agora</h3>
            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 transition-all duration-300 backdrop-blur-sm border border-white/20 cursor-not-allowed opacity-70"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-sm opacity-80">iOS</div>
                  <div className="font-bold">Em breve</div>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.mobapps.client.waydriver&hl=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-2xl p-4 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.92 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div>
                  <div className="text-sm opacity-80">Android</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          {/* Card 2 - Navegação */}
          <div className="bg-black/5 rounded-3xl p-8 border border-black/10">
            <h3 className="text-2xl font-bold text-black mb-6">Navegação</h3>
            <div className="space-y-4">
              {[
                { label: 'Como funciona', id: 'como-funciona' },
                { label: 'Segurança', id: 'seguranca' },
                { label: 'Vantagens', id: 'vantagens' },
                { label: 'Preços', id: 'tarifas' },
                { label: 'Download', id: 'download' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block text-left text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium w-full"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3 - Suporte */}
          <div className="bg-black/5 rounded-3xl p-8 border border-black/10">
            <h3 className="text-2xl font-bold text-black mb-6">Suporte</h3>
            <div className="space-y-4">
              <a href="#" className="block text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium">
                Central de ajuda
              </a>
              <a href="#" className="block text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium">
                Fale conosco
              </a>
              <a href="/termos-de-uso" className="block text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium">
                Termos de uso
              </a>
              <a href="#" className="block text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium">
                Política de privacidade
              </a>
              <a href="#" className="block text-black/70 hover:text-purple-600 transition-colors duration-300 text-lg font-medium">
                Código de conduta
              </a>
            </div>
          </div>

          {/* Card 4 - Contato */}
          <div className="bg-yellow-400 rounded-3xl p-8 text-black">
            <h3 className="text-2xl font-bold mb-6">Contato 24/7</h3>
            <div className="space-y-4">
              <a 
                href="tel:84920039860" 
                className="flex items-center gap-3 text-black hover:text-purple-600 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-black/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-lg font-bold">Way Fone</span>
              </a>
              <a 
                href="mailto:contato@waydrivebr.com.br" 
                className="flex items-center gap-3 text-black hover:text-purple-600 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-black/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-lg font-bold">E-mail</span>
              </a>
              <a 
                href="https://wa.me/5584920039860" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-black hover:text-purple-600 transition-colors duration-300"
              >
                <div className="w-10 h-10 bg-black/10 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Redes Sociais */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-black/10">
          
          {/* Social Media */}
          <div className="flex items-center gap-6">
            <span className="text-lg font-bold text-black">Siga-nos:</span>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.href}
                  className="w-12 h-12 bg-black/10 hover:bg-purple-600 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-black hover:text-white"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/10">
        <div className="container footer-bottom-section relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-body-sm text-black/60">
              © {currentYear} Way Technologies. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-body-sm text-black/60">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Dados protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Voltar ao topo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
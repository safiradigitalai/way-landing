'use client';

import { useEffect } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ComoFuncionaSection from '@/components/sections/ComoFuncionaSection';
import SecuritySection from '@/components/sections/SecuritySection';
import VantagesSection from '@/components/sections/VantagesSection';
import TarifasSection from '@/components/sections/TarifasSection';
import DownloadSection from '@/components/sections/DownloadSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  useEffect(() => {
    // Verifica se há um hash na URL quando a página carrega
    if (window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        // Aguarda um pouco para garantir que a página foi renderizada
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ComoFuncionaSection />
        <SecuritySection />
        <VantagesSection />
        <TarifasSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}

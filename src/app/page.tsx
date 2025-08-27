import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ComoFuncionaSection from '@/components/sections/ComoFuncionaSection';
import SecuritySection from '@/components/sections/SecuritySection';
import VantagesSection from '@/components/sections/VantagesSection';
import TarifasSection from '@/components/sections/TarifasSection';
import DownloadSection from '@/components/sections/DownloadSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
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

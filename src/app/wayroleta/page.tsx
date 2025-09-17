import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import RoletaPremiadaSection from '@/components/sections/RoletaPremiadaSection';

export const metadata: Metadata = {
  title: 'Way Roleta Premiada - Ganhe até 50% OFF',
  description: 'Participe da roleta premiada Way! Ganhe cupons de desconto de até 50% OFF para suas viagens. Cadastre-se e rode a roleta agora!',
  keywords: 'way, roleta, desconto, cupom, transporte, natal, prêmio',
  openGraph: {
    title: 'Way Roleta Premiada - Ganhe até 50% OFF',
    description: 'Participe da roleta premiada Way! Ganhe cupons de desconto de até 50% OFF para suas viagens.',
    url: '/wayroleta',
    siteName: 'Way Driver',
    images: [
      {
        url: '/og-roleta.jpg',
        width: 1200,
        height: 630,
        alt: 'Way Roleta Premiada',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Way Roleta Premiada - Ganhe até 50% OFF',
    description: 'Participe da roleta premiada Way! Ganhe cupons de desconto de até 50% OFF.',
    images: ['/og-roleta.jpg'],
  },
};

export default function WayRoletaPage() {
  return (
    <div className="min-h-screen">
      {/* Header Simplificado para Landing */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-branco.png"
              alt="Way"
              width={100}
              height={32}
              className="h-8 w-auto"
            />
          </Link>

          {/* Badge promocional */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-full">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span className="text-yellow-300 text-sm font-bold">Promoção Instagram</span>
          </div>

          {/* Link para página principal */}
          <Link
            href="/"
            className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Espaçamento para o header fixo */}
      <div className="h-16"></div>

      <RoletaPremiadaSection />

      {/* Footer Simplificado para Landing */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <Image
              src="/logo-branco.png"
              alt="Way"
              width={150}
              height={48}
              className="h-12 w-auto mx-auto mb-4"
            />
            <p className="text-white/80 text-lg">
              O futuro do transporte urbano
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <Link
              href="/"
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              Página Inicial
            </Link>
            <a
              href="https://play.google.com/store/apps/details?id=com.mobapps.client.waydriver&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-semibold"
            >
              Baixar App Cliente
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.mobapps.driver.waydriver&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-semibold"
            >
              Ser Motorista
            </a>
            <a
              href="https://wa.me/5584920039860"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Way Technologies. Todos os direitos reservados.
            </p>
            <p className="text-white/40 text-xs mt-2">
              Promoção válida por tempo limitado. Termos e condições se aplicam.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
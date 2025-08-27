import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Way - Mobilidade Inteligente para Todos",
  description: "A Way revoluciona o transporte urbano com tarifas até 15% menores, tecnologia avançada e segurança total. Conectamos passageiros e motoristas de forma justa e inteligente.",
  keywords: "transporte urbano, aplicativo de transporte, mobilidade, Way, corridas, motorista, passageiro, economia, segurança",
  authors: [{ name: "Way Technologies" }],
  creator: "Way Technologies",
  publisher: "Way Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wayapp.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Way - Mobilidade Inteligente para Todos",
    description: "Tarifas até 15% menores, motoristas ganham mais e você chega onde precisa com segurança total. Baixe o app Way agora!",
    url: "https://wayapp.com.br",
    siteName: "Way App",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Way - App de Transporte Inteligente",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Way - Mobilidade Inteligente para Todos",
    description: "Tarifas até 15% menores, motoristas ganham mais. Baixe o app Way agora!",
    creator: "@WayApp",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

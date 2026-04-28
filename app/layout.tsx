import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Chefinhos Especiais | +50 Receitas para Crianças no Espectro Autista',
  description:
    'E-book Chefinhos Especiais com +50 receitas pensadas para crianças no espectro autista, bônus exclusivos, garantia de 14 dias e acesso imediato.',
  openGraph: {
    title: 'Chefinhos Especiais | +50 Receitas para Crianças no Espectro Autista',
    description:
      'E-book com +50 receitas adaptadas, bônus exclusivos e garantia de 14 dias.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} scroll-smooth`}>
      <body className="font-poppins">{children}</body>
    </html>
  );
}

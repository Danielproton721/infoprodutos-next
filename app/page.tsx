import AccessBlock from '@/components/AccessBlock';
import Author from '@/components/Author';
import Bonus from '@/components/Bonus';
import ExitPopup from '@/components/ExitPopup';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Guarantee from '@/components/Guarantee';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PainVsGain from '@/components/PainVsGain';
import Preview from '@/components/Preview';
import Pricing from '@/components/Pricing';
import StickyBar from '@/components/StickyBar';
import Testimonials from '@/components/Testimonials';
import Verticalizado from '@/components/Verticalizado';
import WhatPackage from '@/components/WhatPackage';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PainVsGain />
        <Features />
        <Preview />
        <Verticalizado />
        <WhatPackage />
        <Testimonials />
        <AccessBlock
          tag="ACESSO IMEDIATO"
          title="Comece a cozinhar AGORA!"
          text="Receba seu material em até 2 minutos no seu e-mail após a confirmação da compra."
          ctaLabel="Quero garantir meu acesso"
          ctaHref="#planos"
          trust={['✓ Entrega Imediata', '✓ Garantia de 14 dias', '✓ Suporte Especializado']}
        />
        <Bonus />
        <Pricing />
        <Guarantee />
        <Author />
        <FAQ />
        <AccessBlock
          tag="ÚLTIMA CHAMADA"
          title="Chega de tentativa e erro todo santo dia"
          text="Garanta seu acesso agora e tenha em mãos o material que transforma a refeição em algo previsível, leve e possível."
          ctaLabel="QUERO ACESSAR AGORA"
          ctaHref="#planos"
          footnote="Oferta promocional válida enquanto esta página estiver ativa hoje."
        />
      </main>
      <Footer />
      <StickyBar />
      <ExitPopup />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [viewers, setViewers] = useState<number>(19);

  useEffect(() => {
    const tick = () => {
      setViewers(15 + Math.floor(Math.random() * 11));
      schedule();
    };
    let timeoutId: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 8000 + Math.random() * 4000;
      timeoutId = setTimeout(tick, delay);
    };
    schedule();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden text-center min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--card) 100%)', padding: '80px 0 60px' }}
    >
      <div
        aria-hidden
        className="absolute rounded-full blur-3xl"
        style={{ top: '18%', left: '18%', width: 380, height: 380, background: 'rgba(255,215,108,0.45)' }}
      />
      <div
        aria-hidden
        className="absolute rounded-full blur-3xl"
        style={{ bottom: '18%', right: '18%', width: 320, height: 320, background: 'rgba(255,123,84,0.28)' }}
      />
      <div className="relative z-10 max-w-[820px] mx-auto px-5">
        <div
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-extrabold text-sm mb-7"
          style={{
            background: 'linear-gradient(180deg, #fff7e2, #ffe4b8)',
            border: '1px solid rgba(255, 123, 84, 0.25)',
            color: '#8a4f10',
            boxShadow: '0 14px 30px rgba(255, 123, 84, 0.15)',
          }}
        >
          🍽️ +1.200 famílias já transformaram a hora da refeição
        </div>
        <h1
          className="font-bold mb-5 text-[var(--title)]"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.04 }}
        >
          Sua cozinha mais leve com <span className="text-[var(--primary)]">+50 receitas</span> pensadas para crianças
          no espectro
        </h1>
        <p className="text-[var(--muted)] max-w-[640px] mx-auto mb-9 text-lg">
          Domine a hora da refeição com o único material acolhedor, prático e direto ao ponto — feito para famílias que
          vivem a rotina da seletividade alimentar.
        </p>
        <div className="mt-2">
          <a className="btn-primary" href="#planos">
            VER MATERIAL POR DENTRO →
          </a>
        </div>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--green)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--green)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--green)]" />
          </span>
          {viewers} pessoas vendo esta página agora
        </div>
      </div>
    </section>
  );
}

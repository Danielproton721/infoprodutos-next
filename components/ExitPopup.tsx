'use client';

import { useEffect, useRef, useState } from 'react';

export default function ExitPopup() {
  const [open, setOpen] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);
  const shownRef = useRef<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const onMouseOut = (e: MouseEvent): void => {
      if (e.clientY <= 0 && !shownRef.current) {
        shownRef.current = true;
        setOpen(true);
      }
    };
    document.addEventListener('mouseout', onMouseOut);
    return () => document.removeEventListener('mouseout', onMouseOut);
  }, []);

  useEffect(() => {
    if (!open) return;
    timerRef.current = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 0 : s - 1));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open]);

  const close = (): void => setOpen(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-5"
      style={{ background: 'rgba(34,25,53,0.66)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative overflow-hidden"
        style={{
          width: 'min(560px, 100%)',
          background: 'linear-gradient(180deg, #fffdf7 0%, #fff2df 100%)',
          borderRadius: 30,
          border: '1px solid rgba(255,123,84,0.2)',
          boxShadow: '0 28px 70px rgba(31,17,56,0.24)',
          padding: 30,
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fechar oferta"
          className="absolute grid place-items-center cursor-pointer border-0"
          style={{
            top: 16,
            right: 16,
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(46,53,109,0.08)',
            color: 'var(--title)',
            fontSize: '1.2rem',
          }}
        >
          ×
        </button>
        <h2
          className="text-[var(--title)] font-bold mb-3"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', lineHeight: 1.1 }}
        >
          Espera. Antes de sair, destrava <span className="text-[var(--primary)]">R$5 de desconto</span> no plano
          completo.
        </h2>
        <p className="text-[var(--muted)]">
          Se o motivo da saída é &quot;vou pensar depois&quot;, isso normalmente significa &quot;vou esquecer&quot;. Aqui
          vai um empurrão final com prazo curto.
        </p>
        <div
          className="inline-flex my-4 font-black text-[var(--green)]"
          style={{ padding: '10px 14px', borderRadius: 999, background: 'rgba(46,167,111,0.12)' }}
        >
          Desconto extra de R$5 liberado agora
        </div>
        <div className="grid grid-cols-2 gap-4 my-5">
          <div
            className="text-center"
            style={{
              padding: 18,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(87,72,128,0.08)',
            }}
          >
            <strong className="block text-[var(--primary)] font-bold mb-1.5" style={{ fontSize: '2rem', lineHeight: 1 }}>
              {seconds}
            </strong>
            <span className="text-sm text-[var(--muted)]">segundos restantes</span>
          </div>
          <div
            className="text-center"
            style={{
              padding: 18,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(87,72,128,0.08)',
            }}
          >
            <strong className="block text-[var(--primary)] font-bold mb-1.5" style={{ fontSize: '2rem', lineHeight: 1 }}>
              R$32,90
            </strong>
            <span className="text-sm text-[var(--muted)]">valor promocional do completo</span>
          </div>
        </div>
        <a className="btn-primary w-full" href="/checkout?plano=completo">
          Quero aproveitar o desconto
        </a>
      </div>
    </div>
  );
}

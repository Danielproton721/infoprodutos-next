'use client';

import Image from 'next/image';
import { useRef, useState, type TouchEvent } from 'react';

const SLIDES: { src: string; alt: string }[] = [
  { src: '/assets/testimonials/juliana-costa.png', alt: 'Depoimento Juliana Costa' },
  { src: '/assets/testimonials/carlos-souza.png', alt: 'Depoimento Carlos Souza' },
  { src: '/assets/testimonials/ana-lima.png', alt: 'Depoimento Ana Lima' },
];

export default function Testimonials() {
  const [idx, setIdx] = useState<number>(0);
  const startX = useRef<number>(0);
  const currentX = useRef<number>(0);
  const dragging = useRef<boolean>(false);

  const go = (i: number): void => {
    setIdx(Math.max(0, Math.min(SLIDES.length - 1, i)));
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX;
    currentX.current = startX.current;
    dragging.current = true;
  };
  const onTouchMove = (e: TouchEvent<HTMLDivElement>): void => {
    if (dragging.current) currentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (): void => {
    if (!dragging.current) return;
    const dx = currentX.current - startX.current;
    if (Math.abs(dx) > 50) go(idx + (dx < 0 ? 1 : -1));
    dragging.current = false;
  };

  return (
    <section id="depoimentos" className="section-padded section-alt">
      <div className="container-page">
        <h2 className="section-title">Quem já está usando</h2>
        <p className="section-copy">Veja o que outras famílias relataram depois de aplicar o material no dia a dia.</p>

        <div className="relative flex items-center gap-3 sm:gap-5 max-w-[900px] mx-auto">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(idx - 1)}
            disabled={idx === 0}
            className="grid place-items-center rounded-full disabled:opacity-50 disabled:cursor-default cursor-pointer transition-transform hover:-translate-y-0.5"
            style={{
              width: 54,
              height: 54,
              border: '1px solid rgba(87,72,128,0.12)',
              background: 'rgba(255,255,255,0.92)',
              color: 'var(--title)',
              fontSize: '1.6rem',
              fontWeight: 900,
              boxShadow: '0 14px 28px rgba(60,39,95,0.12)',
            }}
          >
            &lt;
          </button>
          <div className="flex-1 overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${idx * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {SLIDES.map((s) => (
                <article key={s.src} className="flex-[0_0_100%] min-w-full flex justify-center p-1.5">
                  <figure
                    className="overflow-hidden"
                    style={{
                      width: 'min(100%, 380px)',
                      background: '#ece5dd',
                      borderRadius: 32,
                      boxShadow: '0 22px 48px rgba(50,37,80,0.14)',
                      border: '1px solid rgba(7,94,84,0.1)',
                    }}
                  >
                    <Image src={s.src} alt={s.alt} width={760} height={1200} className="w-full h-auto" />
                  </figure>
                </article>
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Próximo"
            onClick={() => go(idx + 1)}
            disabled={idx === SLIDES.length - 1}
            className="grid place-items-center rounded-full disabled:opacity-50 disabled:cursor-default cursor-pointer transition-transform hover:-translate-y-0.5"
            style={{
              width: 54,
              height: 54,
              border: '1px solid rgba(87,72,128,0.12)',
              background: 'rgba(255,255,255,0.92)',
              color: 'var(--title)',
              fontSize: '1.6rem',
              fontWeight: 900,
              boxShadow: '0 14px 28px rgba(60,39,95,0.12)',
            }}
          >
            &gt;
          </button>
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => go(i)}
              className="rounded-full transition-all"
              style={{
                width: 12,
                height: 12,
                border: 'none',
                background: i === idx ? 'var(--primary)' : 'rgba(46,53,109,0.18)',
                transform: i === idx ? 'scale(1.2)' : 'scale(1)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

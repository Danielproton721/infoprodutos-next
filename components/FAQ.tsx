'use client';

import { useState } from 'react';

const ITEMS: { q: string; a: string }[] = [
  {
    q: '1. O material serve apenas para crianças com diagnóstico de autismo?',
    a: 'Não. Foi pensado para crianças no espectro, mas também ajuda famílias que lidam com seletividade alimentar, sensibilidade a texturas ou resistência na hora da refeição.',
  },
  {
    q: '2. Preciso saber cozinhar bem para aplicar as receitas?',
    a: 'Não. As receitas foram organizadas para serem simples, práticas e possíveis na rotina real. Nada de técnica gourmet que só serve para cansar mais você.',
  },
  {
    q: '3. Como recebo o e-book depois da compra?',
    a: 'O acesso é digital e enviado imediatamente para o seu e-mail após a confirmação do pagamento. Funciona no celular, tablet ou computador.',
  },
  {
    q: '4. O plano completo realmente vale mais a pena?',
    a: 'Sim. O e-book sozinho entrega conteúdo. Os bônus encurtam a adaptação da rotina e reduzem as chances de você travar na primeira dificuldade real.',
  },
  {
    q: '5. Tenho acesso por quanto tempo?',
    a: 'Acesso vitalício no plano completo. Você baixa o material e recebe atualizações futuras sem pagar nada a mais.',
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="section-padded section-alt-rev">
      <div className="container-page">
        <h2 className="section-title">Dúvidas frequentes</h2>
        <p className="section-copy">Tudo que você precisa saber antes de garantir o seu acesso.</p>

        <div className="max-w-[760px] mx-auto grid gap-4">
          {ITEMS.map((item, i) => {
            const active = i === openIdx;
            return (
              <article key={item.q} className="card-base overflow-hidden">
                <button
                  type="button"
                  aria-expanded={active}
                  onClick={() => setOpenIdx(active ? -1 : i)}
                  className="w-full bg-transparent border-0 cursor-pointer text-left flex justify-between items-center gap-5"
                  style={{ padding: '22px 24px' }}
                >
                  <span className="text-base text-[var(--title)] font-black">{item.q}</span>
                  <div
                    className="grid place-items-center font-black transition-transform"
                    style={{
                      minWidth: 36,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'rgba(79,124,255,0.08)',
                      color: 'var(--blue)',
                      fontSize: '1.2rem',
                      transform: active ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </div>
                </button>
                <div
                  className="overflow-hidden text-[var(--muted)] transition-all"
                  style={{
                    maxHeight: active ? 240 : 0,
                    padding: active ? '0 24px 22px' : '0 24px',
                  }}
                >
                  <p>{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

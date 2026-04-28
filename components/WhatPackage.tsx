type Feat = { icon: string; title: string; text: string };

const FEATS: Feat[] = [
  { icon: '📖', title: 'E-book Completo (PDF)', text: '+50 receitas adaptadas, atualizadas e prontas para aplicar.' },
  { icon: '🧾', title: 'Guia de Substituições', text: 'Atalho para trocar ingredientes, textura e consistência sem desmontar tudo.' },
  { icon: '🎴', title: 'Cards Visuais Imprimíveis', text: 'Cartões para a criança ganhar autonomia e segurança na rotina alimentar.' },
  { icon: '♾️', title: 'Acesso Vitalício', text: 'Receba atualizações futuras sem pagar nada a mais. Compra única.' },
];

export default function WhatPackage() {
  return (
    <section className="section-padded section-alt-rev">
      <div className="container-page">
        <h2 className="section-title">Tudo que você recebe na hora</h2>
        <p className="section-copy">
          Estude e aplique onde e quando quiser — material 100% digital, com acesso vitalício.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1080px] mx-auto mb-8">
          {FEATS.map((f) => (
            <article
              key={f.title}
              className="card-base text-center"
              style={{
                padding: '26px 22px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(251,247,255,0.96))',
              }}
            >
              <div
                className="grid place-items-center text-2xl mx-auto mb-4"
                style={{ width: 56, height: 56, borderRadius: 18, background: 'linear-gradient(145deg, #fff6d8, #ffe7bd)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-[var(--title)] font-black text-base mb-2">{f.title}</h3>
              <p className="text-[var(--muted)] text-sm">{f.text}</p>
            </article>
          ))}
        </div>
        <div
          className="max-w-[880px] mx-auto text-center"
          style={{
            padding: 32,
            background: 'rgba(255,255,255,0.85)',
            border: '1px dashed rgba(255,123,84,0.3)',
            borderRadius: 24,
          }}
        >
          <h3 className="text-[var(--title)] text-xl font-black mb-2">🚀 Use em qualquer dispositivo</h3>
          <p className="text-[var(--muted)]">
            Material 100% digital e responsivo. Abre no celular, tablet ou computador — sempre na palma da mão na hora
            de cozinhar.
          </p>
        </div>
      </div>
    </section>
  );
}

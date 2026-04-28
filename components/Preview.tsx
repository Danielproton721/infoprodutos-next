import Image from 'next/image';

type Recipe = { src: string; title: string; desc: string; tag: string };

const RECIPES: Recipe[] = [
  { src: '/assets/panqueca.png', title: 'Panquequinhas macias', desc: 'Receita com variações de textura e apresentação visual', tag: 'DOCE' },
  { src: '/assets/muffins.png', title: 'Muffin colorido sem complicação', desc: 'Passo a passo visual e adaptação sensorial completa', tag: 'LANCHE' },
  { src: '/assets/snacks.png', title: 'Snack crocante assado', desc: 'Alternativa prática para ampliar o repertório alimentar', tag: 'SALGADO' },
  { src: '/assets/frango.png', title: 'Frango empanado dourado', desc: 'Textura ajustável e apresentação que a criança topa', tag: 'ALMOÇO' },
];

export default function Preview() {
  return (
    <section id="showcase" className="section-padded section-alt-rev">
      <div className="container-page">
        <div className="text-center mb-12">
          <div className="eyebrow mb-5">Visual limpo, aceitação acelerada</div>
          <h2 className="section-title mb-3">O design acolhedor que faz a criança aceitar 2x mais rápido</h2>
        </div>
        <div className="max-w-[900px] mx-auto grid gap-4">
          {RECIPES.map((r) => (
            <div
              key={r.title}
              className="card-base grid items-center gap-5"
              style={{
                gridTemplateColumns: '90px 1fr auto',
                padding: '22px 24px',
                background: 'rgba(255,255,255,0.92)',
              }}
            >
              <div
                className="overflow-hidden bg-white"
                style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 18, border: '1px solid var(--border)' }}
              >
                <Image
                  src={r.src}
                  alt={r.title}
                  width={180}
                  height={180}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[var(--title)] font-black text-base mb-1">{r.title}</h4>
                <span className="text-[var(--muted)] text-sm">{r.desc}</span>
              </div>
              <span
                className="hidden md:inline-block px-3 py-1.5 rounded-full font-extrabold text-xs"
                style={{ background: 'rgba(255,215,108,0.25)', color: '#8a6610' }}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

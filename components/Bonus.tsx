type BonusItem = { title: string; text: string; oldPrice: string };

const BONUSES: BonusItem[] = [
  {
    title: '📋 Guia de Substituições Sensoriais',
    text: 'Trocas inteligentes de ingredientes, temperatura e textura sem perder a estrutura da receita.',
    oldPrice: 'R$37',
  },
  {
    title: '🎴 Cards Visuais Imprimíveis',
    text: 'Cartões para deixar a criança mais segura com a rotina alimentar e ganhar autonomia.',
    oldPrice: 'R$27',
  },
  {
    title: '🍽️ Cardápio Semanal Pronto',
    text: 'Planejamento de 7 dias estruturado para você economizar tempo e parar de improvisar.',
    oldPrice: 'R$19',
  },
];

export default function Bonus() {
  return (
    <section className="section-padded section-alt">
      <div className="container-page">
        <div className="text-center mb-4">
          <div
            className="eyebrow"
            style={{
              background: 'rgba(255,107,122,0.12)',
              color: '#d83b4d',
              borderColor: 'rgba(255,107,122,0.3)',
            }}
          >
            ⏳ BÔNUS POR TEMPO LIMITADO
          </div>
        </div>
        <h2 className="section-title">Apenas as 100 primeiras famílias vão garantir</h2>
        <p className="section-copy">
          Bônus que aceleram a aplicação na rotina — menos teoria, mais ferramenta prática.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-[1080px] mx-auto">
          {BONUSES.map((b) => (
            <article
              key={b.title}
              className="card-base relative overflow-hidden"
              style={{
                padding: '28px 24px',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,250,237,0.96))',
              }}
            >
              <div
                aria-hidden
                className="absolute"
                style={{
                  right: -40,
                  top: -40,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,215,108,0.35), rgba(255,215,108,0))',
                }}
              />
              <span
                className="inline-block relative z-10 mb-3"
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: 'var(--green)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                }}
              >
                GRÁTIS
              </span>
              <h3 className="relative z-10 text-[var(--title)] text-base font-black mb-2">{b.title}</h3>
              <p className="relative z-10 text-[var(--muted)] text-sm">{b.text}</p>
              <div className="relative z-10 flex items-baseline gap-2.5 mt-4 font-black">
                <del className="text-[#b59999] text-sm">{b.oldPrice}</del>
                <strong className="text-[var(--green)] text-lg">GRÁTIS</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <div
            className="inline-block mt-8 font-black"
            style={{
              padding: '14px 22px',
              background: 'rgba(255,107,122,0.1)',
              color: '#d83b4d',
              borderRadius: 999,
            }}
          >
            ⚠️ Vagas limitadas! Apenas 27 vagas restantes
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import Link from 'next/link';

type Plan = {
  id: 'basico' | 'completo';
  img: string;
  subtitle: string;
  title: string;
  price: string;
  features: string[];
  cta: string;
  variant: 'basic' | 'complete';
  tag?: string;
};

const PLANS: Plan[] = [
  {
    id: 'basico',
    img: '/assets/Gemini_20conto.png',
    subtitle: 'PLANO BÁSICO',
    title: 'Começar com o essencial',
    price: 'R$20,00',
    features: ['E-book Chefinhos Especiais', '+50 receitas adaptadas', 'Acesso digital imediato'],
    cta: 'QUERO O BÁSICO',
    variant: 'basic',
  },
  {
    id: 'completo',
    img: '/assets/Gemini_40conto.png',
    subtitle: 'PLANO COMPLETO',
    title: 'Pacote completo com bônus',
    price: 'R$40,00',
    features: [
      'E-book Chefinhos Especiais',
      'Bônus 1: Guia de Substituições',
      'Bônus 2: Cards Visuais Imprimíveis',
      'Bônus 3: Cardápio Semanal Pronto',
      'Acesso vitalício ao material',
    ],
    cta: 'QUERO O COMPLETO',
    variant: 'complete',
    tag: 'MAIS VENDIDO',
  },
];

export default function Pricing() {
  return (
    <section id="planos" className="section-padded section-alt-rev">
      <div className="container-page">
        <h2 className="section-title">Escolha seu plano</h2>
        <p className="section-copy">
          Aplicação garantida ou seu dinheiro de volta em 14 dias — sem perguntas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[880px] mx-auto items-stretch">
          {PLANS.map((p) => {
            const isComplete = p.variant === 'complete';
            return (
              <article
                key={p.id}
                className="card-base relative"
                style={{
                  padding: '36px 30px',
                  background: isComplete
                    ? 'linear-gradient(180deg, rgba(255,250,237,0.98), rgba(255,241,208,0.98))'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,250,255,0.96))',
                  border: isComplete ? '2px solid rgba(255,123,84,0.45)' : '1px solid var(--border)',
                  boxShadow: isComplete ? '0 26px 50px rgba(255,123,84,0.16)' : undefined,
                }}
              >
                {p.tag && (
                  <div
                    className="absolute"
                    style={{
                      top: 18,
                      right: 18,
                      padding: '9px 12px',
                      borderRadius: 999,
                      background: 'linear-gradient(180deg, #ff7b54, #ff5f66)',
                      color: '#fff',
                      fontSize: '0.78rem',
                      fontWeight: 900,
                      boxShadow: '0 10px 20px rgba(255,95,102,0.24)',
                    }}
                  >
                    {p.tag}
                  </div>
                )}
                <Image
                  src={p.img}
                  alt={`E-book Chefinhos Especiais — ${p.subtitle}`}
                  width={440}
                  height={440}
                  className="block mx-auto mb-5"
                  style={{
                    width: '100%',
                    maxWidth: 220,
                    height: 'auto',
                    borderRadius: 14,
                    boxShadow: '0 14px 30px rgba(74,42,113,0.18)',
                  }}
                />
                <div
                  className="inline-flex font-black mb-3"
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: 'rgba(79,124,255,0.08)',
                    color: 'var(--blue)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.02em',
                  }}
                >
                  {p.subtitle}
                </div>
                <h3 className="text-[var(--title)] text-base font-black mb-2">{p.title}</h3>
                <div className="text-[var(--title)] font-bold my-3" style={{ fontSize: '3rem', lineHeight: 1 }}>
                  {p.price}
                  <small className="text-[var(--muted)] text-sm font-semibold ml-1">pagamento único</small>
                </div>
                <ul className="grid gap-3 my-6 list-none">
                  {p.features.map((f) => (
                    <li key={f} className="relative pl-7 text-[var(--text)] font-bold">
                      <span className="absolute left-0 text-[var(--green)] font-black">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/checkout?plano=${p.id}`}
                  className={isComplete ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {p.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type Pain = { icon: string; title: string; text: string };

const PAINS: Pain[] = [
  { icon: '⏰', title: 'A refeição vira batalha?', text: 'Hora da comida virou desgaste diário e cada tentativa nova consome a sua energia.' },
  { icon: '🍝', title: 'Cardápio sempre igual?', text: 'Você não sabe adaptar texturas e sabores e sente culpa por não conseguir variar o prato.' },
  { icon: '😩', title: 'Tentativa e erro sem fim?', text: 'Improvisa receitas da internet que não funcionam pra criança no espectro e desiste.' },
  { icon: '🎯', title: 'Falta de um caminho claro?', text: 'Você precisa de previsibilidade — não de mais uma promessa milagrosa que não cabe na rotina.' },
];

export default function PainVsGain() {
  return (
    <section className="section-padded section-alt-rev">
      <div className="container-page">
        <h2 className="section-title">Se você se identifica com isso...</h2>
        <p className="section-copy">
          Muita família tenta &quot;na raça&quot; e se culpa porque a criança rejeita quase tudo. O problema não é falta
          de esforço — é falta de método pensado pra essa realidade.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[880px] mx-auto">
          {PAINS.map((p) => (
            <div
              key={p.title}
              className="card-base p-8"
              style={{ background: 'linear-gradient(180deg, rgba(255,241,244,0.95), rgba(255,255,255,0.95))' }}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="text-[var(--title)] text-lg font-black mb-2">{p.title}</h3>
              <p className="text-[var(--muted)]">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

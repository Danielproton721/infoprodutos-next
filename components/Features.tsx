type Row = { icon: string; title: string; text: string };

const ROWS: Row[] = [
  {
    icon: '🥕',
    title: 'Receitas pensadas para seletividade',
    text: 'Combinações com texturas mais aceitas, formas simples de apresentação e ideias para ampliar o repertório sem forçar a barra.',
  },
  {
    icon: '🧩',
    title: 'Passo a passo visual e acolhedor',
    text: 'Orientações claras para a criança participar do processo e entender cada etapa, o que reduz ansiedade e aumenta conexão.',
  },
  {
    icon: '⚡',
    title: 'Menos tentativa aleatória',
    text: 'Um repertório organizado pra parar de repetir o mesmo ciclo de frustração, cansaço e culpa na cozinha.',
  },
];

export default function Features() {
  return (
    <section className="section-padded section-alt">
      <div className="container-page">
        <h2 className="section-title">O método que vai transformar a sua rotina</h2>
        <p className="section-copy">
          Estruturamos o conteúdo para reduzir resistência, aumentar a participação da criança e tornar cada tentativa
          menos confusa.
        </p>
        <div className="grid gap-4 max-w-[760px] mx-auto">
          {ROWS.map((r) => (
            <div
              key={r.title}
              className="card-base grid items-center gap-5"
              style={{
                gridTemplateColumns: '56px 1fr',
                padding: '26px 28px',
                background: 'linear-gradient(180deg, #fff, rgba(255, 248, 233, 0.8))',
              }}
            >
              <div
                className="grid place-items-center text-2xl"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 18,
                  background: 'linear-gradient(145deg, #fff6d8, #ffe7bd)',
                }}
              >
                {r.icon}
              </div>
              <div>
                <h3 className="text-[var(--title)] text-lg font-black mb-1">{r.title}</h3>
                <p className="text-[var(--muted)] text-base">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

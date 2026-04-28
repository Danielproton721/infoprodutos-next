const ITEMS: string[] = [
  'CAFÉ DA MANHÃ ACOLHEDOR',
  'LANCHES PRÁTICOS DA TARDE',
  'ALMOÇOS COM ACEITAÇÃO',
  'JANTAS LEVES E RÁPIDAS',
  'DOCES SEM CULPA',
  'SNACKS CROCANTES',
  'RECEITAS COM VEGETAIS ESCONDIDOS',
  'BEBIDAS NUTRITIVAS',
  'ADAPTAÇÕES SENSORIAIS POR TEXTURA',
  'CARDÁPIO SEMANAL ESTRUTURADO',
];

export default function Verticalizado() {
  return (
    <section className="section-padded section-alt">
      <div className="container-page">
        <h2 className="section-title">Conteúdo do e-book verticalizado</h2>
        <p className="section-copy">
          Domine cada categoria com receitas testadas e organizadas para a rotina real da sua família.
        </p>
        <div className="max-w-[780px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 font-extrabold text-[var(--title)]"
              style={{
                padding: '18px 22px',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid var(--border)',
                borderRadius: 16,
              }}
            >
              <span className="text-[var(--green)] font-black text-lg">✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Guarantee() {
  return (
    <section className="section-padded section-alt">
      <div className="container-page">
        <div
          className="max-w-[720px] mx-auto text-center"
          style={{
            padding: '44px 34px',
            background: 'linear-gradient(180deg, rgba(237,255,244,0.95), #fff)',
            border: '2px dashed rgba(46,167,111,0.4)',
            borderRadius: 34,
          }}
        >
          <div className="text-5xl mb-3">🛡️</div>
          <h2
            className="text-[var(--title)] font-bold mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
          >
            Garantia Incondicional de 14 Dias
          </h2>
          <p className="text-[var(--muted)] mb-4">
            Experimente sem risco. Se em 14 dias o material não fizer sentido pra sua rotina, devolvemos 100% do seu
            dinheiro. Sem perguntas, sem burocracia.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {['✓ 100% do dinheiro de volta', '✓ Sem perguntas', '✓ Risco zero pra você'].map((t) => (
              <span
                key={t}
                className="text-[var(--green)] font-extrabold text-sm"
                style={{
                  padding: '10px 16px',
                  borderRadius: 999,
                  background: '#fff',
                  border: '1px solid rgba(46,167,111,0.2)',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

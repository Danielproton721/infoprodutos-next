type Props = {
  tag: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  trust?: string[];
  footnote?: string;
};

export default function AccessBlock({ tag, title, text, ctaLabel, ctaHref, trust, footnote }: Props) {
  return (
    <section className="section-padded section-alt-rev">
      <div className="container-page">
        <div
          className="max-w-[760px] mx-auto text-center shadow-soft"
          style={{
            padding: '48px 36px',
            background: 'linear-gradient(180deg, #fff, #fff4e1)',
            border: '1px solid var(--border)',
            borderRadius: 34,
          }}
        >
          <div
            className="inline-block mb-4"
            style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: 'linear-gradient(180deg, #ff8e53, #ff6d47)',
              color: '#fff',
              fontWeight: 900,
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
            }}
          >
            {tag}
          </div>
          <h2
            className="text-[var(--title)] font-bold mb-3"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
          >
            {title}
          </h2>
          <p className="text-[var(--muted)] mb-7">{text}</p>
          <a className="btn-primary" href={ctaHref}>
            {ctaLabel}
          </a>
          {trust && trust.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-7">
              {trust.map((t) => (
                <span
                  key={t}
                  className="text-[var(--green)] font-extrabold text-sm"
                  style={{ padding: '10px 16px', borderRadius: 999, background: 'rgba(46,167,111,0.12)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {footnote && <p className="text-sm text-[var(--muted)] mt-4">{footnote}</p>}
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';

export default function Author() {
  return (
    <section className="section-padded section-alt-rev">
      <div className="container-page">
        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-center max-w-[860px] mx-auto">
          <div
            className="mx-auto rounded-full overflow-hidden"
            style={{
              width: 220,
              height: 220,
              border: '6px solid #fff',
              boxShadow: '0 22px 50px rgba(74,42,113,0.18)',
            }}
          >
            <Image
              src="/assets/author/autora-chefinhos.png"
              alt="Dra. Marina Alencar"
              width={440}
              height={440}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div
              className="eyebrow mb-4"
              style={{ background: 'rgba(46,167,111,0.12)', color: 'var(--green)', borderColor: 'rgba(46,167,111,0.25)' }}
            >
              Quem está por trás do material
            </div>
            <h2 className="text-[var(--title)] text-3xl font-bold mb-4">Dra. Marina Alencar</h2>
            <p className="text-[var(--muted)] mb-3">
              Nutricionista materno-infantil com mais de 10 anos de experiência em seletividade alimentar e crianças no
              espectro autista. Atendeu mais de 1.200 famílias e desenvolveu o método aplicado neste e-book a partir da
              prática clínica.
            </p>
            <p className="text-[var(--muted)]">
              O Chefinhos Especiais nasceu da necessidade real de mães e pais que precisavam de um caminho prático,
              acolhedor e sem promessas vazias.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

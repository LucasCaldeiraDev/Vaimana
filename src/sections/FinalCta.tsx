import { Reveal } from '../components/Reveal'
import { brand, finalCta } from '../content/site'

export function FinalCta() {
  return (
    <section
      id="reservas"
      className="relative isolate overflow-hidden bg-ink py-28 lg:py-40"
      aria-labelledby="reservas-titulo"
    >
      <img
        src="/images/06-jantar.jpg"
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 veil-center" />

      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <p className="eyebrow text-brass">{finalCta.eyebrow}</p>

          <h2
            id="reservas-titulo"
            className="mt-6 font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.12] text-bone"
          >
            {finalCta.title}
          </h2>

          <p className="mx-auto mt-7 max-w-xl leading-relaxed text-bone/75">
            {finalCta.body}
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a
              href={`mailto:${brand.email}`}
              className="w-full border border-brass bg-brass px-10 py-4 text-xs tracking-[0.24em] text-ink uppercase transition-colors hover:bg-transparent hover:text-brass sm:w-auto"
            >
              {finalCta.cta}
            </a>
            <a
              href={`tel:${brand.phone.replace(/[^+\d]/g, '')}`}
              className="w-full border border-bone/35 px-10 py-4 text-xs tracking-[0.24em] text-bone uppercase transition-colors hover:border-bone sm:w-auto"
            >
              {brand.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

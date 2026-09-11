import { Reveal } from '../components/Reveal'
import { villas, villasNote } from '../content/site'

export function Villas() {
  return (
    <section
      id="acomodacoes"
      className="bg-bone py-24 text-ink lg:py-32"
      aria-labelledby="acomodacoes-titulo"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-lagoon">Acomodações</p>
          <h2
            id="acomodacoes-titulo"
            className="mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.1]"
          >
            Três formas de ocupar o atol
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-8 lg:grid-cols-3">
          {villas.map((villa, index) => (
            <li key={villa.id}>
              <Reveal delay={index * 0.08}>
                <article
                  className={`flex h-full flex-col border ${
                    villa.featured ? 'border-brass' : 'border-ink/12'
                  }`}
                >
                  <img
                    src={villa.image}
                    alt={villa.alt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="aspect-4/3 w-full object-cover"
                  />

                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl">{villa.name}</h3>
                      {villa.featured ? (
                        <span className="eyebrow shrink-0 text-brass">Mais procurada</span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm text-ink/55">
                      {villa.area} · {villa.guests}
                    </p>

                    <ul className="mt-7 flex-1 space-y-3 text-sm leading-relaxed text-ink/75">
                      {villa.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-brass" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-8 border-t border-ink/12 pt-6 font-display text-3xl">
                      {villa.price}
                      <span className="ml-2 font-sans text-sm tracking-wide text-ink/50">
                        {villa.unit}
                      </span>
                    </p>

                    <a
                      href="#reservas"
                      className="mt-6 block border border-ink/25 py-3.5 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:border-brass hover:bg-brass hover:text-ink"
                    >
                      Consultar datas
                    </a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ink/55">{villasNote}</p>
        </Reveal>
      </div>
    </section>
  )
}

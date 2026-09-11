import { Reveal } from '../components/Reveal'
import { faq } from '../content/site'

export function Faq() {
  return (
    <section
      id="perguntas"
      className="bg-bone py-24 text-ink lg:py-32"
      aria-labelledby="perguntas-titulo"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-10">
        <Reveal>
          <p className="eyebrow text-lagoon">Antes de reservar</p>
          <h2
            id="perguntas-titulo"
            className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.1]"
          >
            As perguntas que sempre chegam
          </h2>
        </Reveal>

        <Reveal as="div" delay={0.1}>
          <dl className="divide-y divide-ink/12 border-y border-ink/12">
            {faq.map((item) => (
              <details key={item.q} name="faq" className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left">
                  <dt className="font-display text-xl leading-snug">{item.q}</dt>
                  <span
                    aria-hidden="true"
                    className="mt-2 shrink-0 text-lagoon transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="pb-7 text-sm leading-relaxed text-ink/70">{item.a}</dd>
              </details>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}

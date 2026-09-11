import { Reveal } from '../components/Reveal'
import { experiences } from '../content/site'

export function Experiences() {
  return (
    <section
      id="experiencias"
      className="bg-ink py-24 lg:py-32"
      aria-labelledby="experiencias-titulo"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-brass">Experiências</p>
          <h2
            id="experiencias-titulo"
            className="mt-5 font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.1] text-bone"
          >
            O que existe além da vila
          </h2>
          <p className="mt-6 leading-relaxed text-bone/65">
            Todas as experiências abaixo estão incluídas na diária e são agendadas com o
            mordomo da sua vila, sem número mínimo de participantes.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience, index) => (
            <li key={experience.title}>
              <Reveal delay={(index % 3) * 0.08}>
                <div className="border-t border-bone/15 pt-6">
                  <h3 className="font-display text-2xl text-bone">{experience.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-bone/60">
                    {experience.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

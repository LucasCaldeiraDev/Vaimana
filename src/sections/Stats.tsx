import { Reveal } from '../components/Reveal'
import { stats } from '../content/site'

export function Stats() {
  return (
    <section className="bg-ink py-24 lg:py-32" aria-label="O atol em números">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <dl className="grid gap-14 sm:grid-cols-3 sm:gap-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="border-t border-bone/15 pt-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(3rem,6vw,4.5rem)] leading-none text-bone">
                    {stat.value}
                  </span>
                  <span className="mt-4 block max-w-[22ch] text-sm leading-relaxed text-bone/60">
                    {stat.label}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}

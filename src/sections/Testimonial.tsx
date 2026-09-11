import { Reveal } from '../components/Reveal'
import { testimonial } from '../content/site'

export function Testimonial() {
  return (
    <section className="bg-sand py-24 text-ink lg:py-32" aria-label="Depoimento de hóspede">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <figure>
            <blockquote>
              <p className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.25]">
                “{testimonial.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-10 text-sm tracking-wide text-ink/55">
              {testimonial.author} — {testimonial.detail}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

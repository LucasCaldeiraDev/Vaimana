import { useEffect, useRef } from 'react'
import { ScrollStage } from '../components/ScrollStage'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useEnvironment'
import { hero } from '../content/site'

type Props = { cinematic: boolean; ambientVideo: boolean }

export function Hero({ cinematic, ambientVideo }: Props) {
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // A capa se afasta enquanto a câmera desce: o texto sobe e some antes do pin
  // terminar, deixando a imagem sozinha no fim da cena.
  useEffect(() => {
    const node = copyRef.current
    if (!node || reduced || !cinematic) return

    const animation = gsap.to(node, {
      y: -60,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: node.closest('[data-stage]') ?? node,
        start: 'top top',
        end: '55% top',
        scrub: 0.5,
      },
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [cinematic, reduced])

  return (
    <section id="topo" data-stage aria-labelledby="hero-title">
      <ScrollStage
        videoSrc={hero.video}
        poster={hero.poster}
        alt={hero.alt}
        cinematic={cinematic}
        ambientVideo={ambientVideo}
        veil="center"
        eager
        fadeIn={false}
        scrubHeight="260vh"
      >
        <div className="flex h-full items-center justify-center px-6">
          <div ref={copyRef} className="max-w-3xl text-center">
            <p className="eyebrow text-brass">{hero.eyebrow}</p>

            <h1
              id="hero-title"
              className="mt-7 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.05] whitespace-pre-line text-bone"
            >
              {hero.title}
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-[clamp(1rem,1.4vw,1.2rem)] leading-relaxed text-bone/80">
              {hero.subtitle}
            </p>

            <a
              href="#reservas"
              className="mt-11 inline-block border border-bone/45 px-10 py-4 text-xs tracking-[0.24em] text-bone uppercase transition-colors hover:border-brass hover:bg-brass hover:text-ink"
            >
              {hero.cta}
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 text-bone/55"
        >
          <span className="text-[0.625rem] tracking-[0.3em] uppercase">
            {hero.scrollHint}
          </span>
          <span className="h-12 w-px bg-linear-to-b from-bone/60 to-transparent" />
        </div>
      </ScrollStage>
    </section>
  )
}

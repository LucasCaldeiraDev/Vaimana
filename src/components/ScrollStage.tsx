import { useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { governor } from '../lib/scrollGovernor'

type Veil = 'left' | 'right' | 'center' | 'none'

type Props = {
  videoSrc: string
  poster: string
  alt: string
  /** Quando falso, a cena vira uma seção estática com o poster. */
  cinematic: boolean
  /** Altura de rolagem consumida pela narrativa da cena. */
  scrubHeight?: string
  veil?: Veil
  /** O herói carrega imediatamente; as demais cenas esperam se aproximar. */
  eager?: boolean
  /**
   * Dip-to-black nas bordas da cena: entra revelando do escuro e sai
   * escurecendo. Com isso nenhum corte entre vídeos vizinhos fica visível —
   * a emenda acontece sempre em ink sobre ink.
   */
  fadeIn?: boolean
  fadeOut?: boolean
  /** Cartela de capítulo exibida sobre o escuro enquanto a cena entra. */
  intro?: { index: string; label: string }
  children?: ReactNode
}

const smooth = (t: number) => t * t * (3 - 2 * t)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))

/**
 * Fração do deslize de entrada (100vh) em que a cortina termina de revelar
 * o vídeo. Curta de propósito: o gap preto entre cenas deve durar o mínimo
 * de rolagem possível.
 */
const REVEAL_SPAN = 0.4
/** Fração final do scroll da cena usada pelo escurecimento de saída. */
const EDGE_OUT = 0.08

const veilClass: Record<Veil, string> = {
  left: 'veil-left',
  right: 'veil-right',
  center: 'veil-center',
  none: '',
}

export function ScrollStage({
  videoSrc,
  poster,
  alt,
  cinematic,
  scrubHeight = 'var(--scene-scrub)',
  veil = 'center',
  eager = false,
  fadeIn = true,
  fadeOut = true,
  intro,
  children,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(eager)
  const [painted, setPainted] = useState(false)

  // Só anexa o src quando a cena está a menos de uma tela de distância.
  useEffect(() => {
    if (!cinematic || mounted) return
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100% 0px 100% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [cinematic, mounted])

  // Liga o progresso da rolagem ao tempo do vídeo.
  useEffect(() => {
    if (!cinematic || !mounted) return
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    let tween: gsap.core.Tween | undefined
    const playhead = { time: 0 }

    const attach = () => {
      const duration = video.duration
      if (!Number.isFinite(duration) || duration <= 0) return

      // O vídeo nunca toca sozinho: quem avança o tempo é a rolagem.
      video.pause()
      setPainted(true)

      tween = gsap.to(playhead, {
        time: duration,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.55,
          invalidateOnRefresh: true,
          // Avisa o governador enquanto a narrativa está fixada na viewport.
          onToggle: (self) => (self.isActive ? governor.enter(section) : governor.leave(section)),
        },
        onUpdate: () => {
          // Ignora enquanto um seek anterior não terminou e ignora deltas
          // menores que um quadro — as duas coisas causam travamento.
          if (video.seeking || video.readyState < 2) return
          if (Math.abs(video.currentTime - playhead.time) < 1 / 50) return
          video.currentTime = playhead.time
        },
      })
    }

    if (video.readyState >= 1) attach()
    else video.addEventListener('loadedmetadata', attach, { once: true })

    return () => {
      video.removeEventListener('loadedmetadata', attach)
      governor.leave(section)
      tween?.scrollTrigger?.kill()
      tween?.kill()
    }
  }, [cinematic, mounted])

  // Cortina do dip-to-black: gatilhos próprios, independentes do vídeo — o
  // progresso cru da rolagem (sem o atraso do scrub) dirige a opacidade.
  //
  // Coreografia do handoff (os 100vh em que duas cenas dividem a viewport):
  // a cena que SAI continua exibindo vídeo enquanto desliza para cima,
  // escurecendo ao longo do deslize — nunca antes dele. A cena que ENTRA
  // segura a cortina só até 40% do deslize (REVEAL_SPAN) e revela o vídeo já
  // em movimento — o mais cedo que a composição permite. A cartela de
  // capítulo recebe um contra-deslocamento que a prende ao centro real da
  // viewport enquanto o bloco (seu elemento pai) ainda está entrando de
  // baixo para cima: sem isso ela nasce centralizada num bloco que ainda
  // está fora da tela, e o trecho escuro fica vazio.
  useEffect(() => {
    if (!cinematic || !(fadeIn || fadeOut)) return
    const section = sectionRef.current
    const curtain = curtainRef.current
    if (!section || !curtain) return

    const state = { entering: fadeIn ? 1 : 0, leaving: 0 }
    const apply = () => {
      curtain.style.opacity = String(Math.max(state.entering, state.leaving))
    }
    apply()

    const triggers: ScrollTrigger[] = []

    if (fadeIn) {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top top',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            state.entering = 1 - smooth(clamp01(p / REVEAL_SPAN))
            apply()

            const introNode = introRef.current
            if (introNode) {
              // O centro natural do cartão (sem transform) fica em
              // stageTop(p) + 50svh, porque ele é centralizado dentro de um
              // bloco de 100svh cujo topo está a stageTop(p) da viewport.
              // translateY(-stageTop) cancela esse deslocamento e trava o
              // cartão no centro real da tela do início ao fim do deslize.
              introNode.style.opacity = String(state.entering)
              introNode.style.transform = `translateY(${(p - 1) * 100}svh)`
            }
          },
        }),
      )
    }

    if (fadeOut) {
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            state.leaving = p > 1 - EDGE_OUT ? smooth((p - (1 - EDGE_OUT)) / EDGE_OUT) : 0
            apply()
          },
        }),
      )
    }

    return () => triggers.forEach((t) => t.kill())
  }, [cinematic, fadeIn, fadeOut])

  const stage = (
    <div className="sticky top-0 h-[100svh] w-full bg-ink">
      {/*
        O recorte de mídia vive num invólucro interno, separado do bloco
        sticky externo. A cortina e o cartão de capítulo, logo abaixo, ficam
        FORA desse recorte: durante o handoff eles recebem um transform que os
        desloca para fora dos limites locais deste bloco (que ainda está fora
        da tela), e um `overflow-hidden` no mesmo nó cortaria exatamente esse
        deslocamento — o card renderizaria com as coordenadas certas e,
        mesmo assim, invisível.
      */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={poster}
          alt={alt}
          width={1920}
          height={1080}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          // React 18 só repassa o atributo em caixa baixa.
          {...({ fetchpriority: eager ? 'high' : 'auto' } as Record<string, string>)}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {cinematic && mounted ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              painted ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : null}

        {veil !== 'none' ? (
          <div className={`absolute inset-0 ${veilClass[veil]}`} aria-hidden="true" />
        ) : null}

        <div className="relative h-full">{children}</div>
      </div>

      {/* cortina do dip-to-black — acima do vídeo e do texto */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-ink"
        style={{ opacity: fadeIn ? 1 : 0 }}
      />

      {/* cartela de capítulo — ocupa o escuro enquanto a cena desliza para dentro */}
      {intro ? (
        <div
          ref={introRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-5"
          style={{ opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(-100svh)' : undefined }}
        >
          <span className="eyebrow text-brass">{intro.index}</span>
          <span className="font-display text-[clamp(2.25rem,5vw,4rem)] text-bone">
            {intro.label}
          </span>
          <span className="h-10 w-px bg-linear-to-b from-bone/50 to-transparent" />
        </div>
      ) : null}
    </div>
  )

  // Sem modo cinematográfico não há pin: a cena ocupa uma tela e segue adiante.
  if (!cinematic) {
    return (
      <div ref={sectionRef} className="relative h-[100svh]">
        <div className="relative h-full w-full overflow-hidden bg-ink">
          <img
            src={poster}
            alt={alt}
            width={1920}
            height={1080}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            // React 18 só repassa o atributo em caixa baixa.
          {...({ fetchpriority: eager ? 'high' : 'auto' } as Record<string, string>)}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {veil !== 'none' ? (
            <div className={`absolute inset-0 ${veilClass[veil]}`} aria-hidden="true" />
          ) : null}
          <div className="relative h-full">{children}</div>
          {/* No modo estático os posters se emendam em ink pelas bordas. */}
          {fadeIn ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-ink to-transparent"
            />
          ) : null}
          {fadeOut ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-ink to-transparent"
            />
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative" style={{ height: scrubHeight }}>
      {stage}
    </div>
  )
}

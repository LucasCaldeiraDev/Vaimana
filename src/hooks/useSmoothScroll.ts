import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { governor } from '../lib/scrollGovernor'

/** Limite de delta por evento de roda durante uma cena de vídeo fixada. */
const SCRUB_DELTA_LIMIT = 70
/** Limite fora das cenas: só apara flicks violentos, sem pesar a página. */
const FREE_DELTA_LIMIT = 160

/**
 * Rolagem suavizada sincronizada com o ticker do GSAP.
 *
 * O scrub de vídeo depende de um delta de rolagem contínuo: sem isso, a roda do
 * mouse entrega saltos discretos e o seek do vídeo fica granulado. Lenis só é
 * ligado no modo cinematográfico — no mobile a rolagem nativa é melhor.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      // Governador: aperta o passo da roda enquanto uma narrativa está ativa,
      // para que nenhum flick atravesse meio vídeo num único evento.
      virtualScroll: (data) => {
        const limit = governor.scrubbing() ? SCRUB_DELTA_LIMIT : FREE_DELTA_LIMIT
        data.deltaY = Math.max(-limit, Math.min(limit, data.deltaY))
        return true
      },
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(tick)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [enabled])
}

import { useEffect, useState } from 'react'

function subscribe(query: string, onChange: (matches: boolean) => void) {
  const mql = window.matchMedia(query)
  const handler = (event: MediaQueryListEvent) => onChange(event.matches)
  mql.addEventListener('change', handler)
  onChange(mql.matches)
  return () => mql.removeEventListener('change', handler)
}

function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial)
  useEffect(() => subscribe(query, setMatches), [query])
  return matches
}

export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Verdadeiro quando o hardware e a rede aguentam vídeo em movimento — em
 * qualquer tamanho de tela. Falso libera o fallback estático (poster):
 * economia de dados/bateria, não característica de mobile.
 */
export function useMotionCapable() {
  const [capable, setCapable] = useState(false)

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 4
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection
    const thrifty = connection?.saveData === true
    const slow = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'
    setCapable(cores >= 4 && memory >= 4 && !thrifty && !slow)
  }, [])

  return capable
}

/**
 * Verdadeiro sempre que o hardware aguenta e não há preferência por movimento
 * reduzido — em qualquer largura de tela. É o modo com vídeo controlado pelo
 * scroll (pin + scrub): o vídeo só avança quando o visitante rola, nunca
 * sozinho. O toque dirige `currentTime` do mesmo jeito que a roda do mouse.
 */
export function useCinematicMode() {
  const reduced = useReducedMotion()
  const capable = useMotionCapable()
  return capable && !reduced
}

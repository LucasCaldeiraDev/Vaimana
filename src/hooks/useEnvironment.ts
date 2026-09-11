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
 * Abaixo deste ponto a narrativa deixa de usar vídeo scrubado: aparelhos móveis
 * não fazem seek confiável e o custo de banda não se justifica.
 */
export function useIsCompact() {
  return useMediaQuery('(max-width: 1023px)', true)
}

/**
 * Verdadeiro apenas quando a experiência completa pode rodar: tela larga,
 * sem preferência por movimento reduzido e hardware com alguma folga.
 */
export function useCinematicMode() {
  const reduced = useReducedMotion()
  const compact = useIsCompact()
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

  return capable && !reduced && !compact
}

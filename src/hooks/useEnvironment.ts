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
 * Abaixo deste ponto a página troca o pin de scroll de 300vh por seções
 * empilhadas de uma tela — o layout que combina com rolagem por toque.
 * Isso é uma decisão de LAYOUT, não de mídia: mesmo em modo compacto o
 * dispositivo pode reproduzir vídeo (ver useMotionCapable).
 */
export function useIsCompact() {
  return useMediaQuery('(max-width: 1023px)', true)
}

/**
 * Verdadeiro quando o hardware e a rede aguentam vídeo em movimento, esteja a
 * tela no modo compacto ou não. Falso libera o fallback estático (poster) em
 * qualquer tamanho de tela — economia de dados/bateria, não característica de
 * mobile.
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
 * Verdadeiro apenas quando a experiência completa pode rodar: tela larga,
 * sem preferência por movimento reduzido e hardware com alguma folga. É o
 * modo com vídeo controlado pelo scroll (pin + scrub).
 */
export function useCinematicMode() {
  const reduced = useReducedMotion()
  const compact = useIsCompact()
  const capable = useMotionCapable()
  return capable && !reduced && !compact
}

/**
 * Modo compacto "imersivo": tela estreita, mas hardware/rede aguentam vídeo.
 * Cada cena reproduz seu clipe uma única vez ao entrar na viewport (sem
 * scrubbing — toque não faz seek confiável) e fica parada no último quadro.
 * Sem isso, mobile via só fotos estáticas, que é o que motivou este modo.
 */
export function useAmbientVideoMode() {
  const reduced = useReducedMotion()
  const compact = useIsCompact()
  const capable = useMotionCapable()
  return capable && !reduced && compact
}

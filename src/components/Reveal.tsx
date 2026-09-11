import { useEffect, useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { useReducedMotion } from '../hooks/useEnvironment'

type Props = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  /** Deslocamento vertical inicial, em pixels. */
  distance?: number
}

/**
 * Entrada discreta ao alcançar a viewport. Sem preferência por movimento, o
 * conteúdo já nasce no estado final — nunca escondido atrás de uma animação.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  distance = 24,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return

    const animation = gsap.fromTo(
      node,
      { autoAlpha: 0, y: distance },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: node, start: 'top 88%', once: true },
      },
    )

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
      gsap.set(node, { clearProps: 'opacity,visibility,transform' })
    }
  }, [delay, distance, reduced])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

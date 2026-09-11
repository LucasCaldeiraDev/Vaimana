import { useEffect, useState } from 'react'
import { brand } from '../content/site'

const links = [
  { href: '#vila', label: 'A vila' },
  { href: '#acomodacoes', label: 'Acomodações' },
  { href: '#experiencias', label: 'Experiências' },
  { href: '#perguntas', label: 'Perguntas' },
]

export function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-ink/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10"
      >
        <a
          href="#topo"
          className="font-display text-xl tracking-[0.32em] text-bone uppercase"
        >
          {brand.name}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-bone/75 transition-colors hover:text-bone"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservas"
          className="border border-bone/35 px-5 py-2.5 text-xs tracking-[0.2em] text-bone uppercase transition-colors hover:border-brass hover:bg-brass hover:text-ink"
        >
          Reservar
        </a>
      </nav>
    </header>
  )
}

import { brand } from '../content/site'

export function Footer() {
  return (
    <footer className="border-t border-bone/12 bg-ink py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div>
          <p className="font-display text-lg tracking-[0.32em] text-bone uppercase">
            {brand.name}
          </p>
          <p className="mt-3 text-sm text-bone/50">
            {brand.legal} — {brand.location}
          </p>
        </div>

        <div className="text-sm text-bone/50">
          <p>
            <a href={`mailto:${brand.email}`} className="transition-colors hover:text-bone">
              {brand.email}
            </a>
          </p>
          <p className="mt-2">{brand.phone}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-10">
        <p className="border-t border-bone/12 pt-6 text-xs leading-relaxed text-bone/35">
          Peça demonstrativa de portfólio. Vaimana é uma marca fictícia; diárias,
          depoimentos e políticas são ilustrativos e não representam nenhuma propriedade
          real. Imagens e vídeos gerados por IA.
        </p>
      </div>
    </footer>
  )
}

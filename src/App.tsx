import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { SceneSection } from './sections/SceneSection'
import { Stats } from './sections/Stats'
import { Villas } from './sections/Villas'
import { Experiences } from './sections/Experiences'
import { Testimonial } from './sections/Testimonial'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { useCinematicMode } from './hooks/useEnvironment'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import { scenes } from './content/site'

export default function App() {
  const cinematic = useCinematicMode()
  useSmoothScroll(cinematic)

  // Trocar de modo remonta as cenas: os gatilhos precisam remedir as alturas.
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [cinematic])

  return (
    <>
      <a
        href="#acomodacoes"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-bone focus:px-5 focus:py-3 focus:text-ink"
      >
        Pular para as acomodações
      </a>

      <Nav />

      <main>
        <Hero cinematic={cinematic} />

        {scenes.slice(0, 2).map((scene) => (
          <SceneSection key={scene.id} scene={scene} cinematic={cinematic} />
        ))}

        <Stats />

        {scenes.slice(2, 3).map((scene) => (
          <SceneSection key={scene.id} scene={scene} cinematic={cinematic} />
        ))}

        {/* Respiro editorial entre o deck (dia) e a piscina (entardecer):
            além do dip-to-black, o salto de luz ganha uma pausa narrativa. */}
        <Testimonial />

        {scenes.slice(3).map((scene) => (
          <SceneSection key={scene.id} scene={scene} cinematic={cinematic} />
        ))}

        <Villas />
        <Experiences />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </>
  )
}

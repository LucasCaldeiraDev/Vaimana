import { ScrollStage } from '../components/ScrollStage'
import { Reveal } from '../components/Reveal'
import { scenes, type Scene } from '../content/site'

type Props = { scene: Scene; cinematic: boolean }

const placement: Record<Scene['align'], string> = {
  left: 'items-end justify-start text-left',
  right: 'items-end justify-end text-left',
  center: 'items-center justify-center text-center',
}

export function SceneSection({ scene, cinematic }: Props) {
  const headingId = `${scene.id}-titulo`
  // Capítulo 01 é o herói; as cenas continuam a contagem a partir de 02.
  const chapter = String(scenes.findIndex((s) => s.id === scene.id) + 2).padStart(2, '0')

  return (
    <section id={scene.id} aria-labelledby={headingId}>
      <ScrollStage
        videoSrc={scene.video}
        poster={scene.poster}
        alt={scene.alt}
        cinematic={cinematic}
        veil={scene.align}
        intro={{ index: chapter, label: scene.eyebrow }}
      >
        <div
          className={`flex h-full px-6 pb-20 sm:px-10 lg:px-16 ${placement[scene.align]}`}
        >
          <Reveal className="max-w-xl">
            <p className="eyebrow text-brass">{scene.eyebrow}</p>

            <h2
              id={headingId}
              className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.1] text-bone"
            >
              {scene.title}
            </h2>

            <p className="mt-6 text-[clamp(0.95rem,1.15vw,1.1rem)] leading-relaxed text-bone/80">
              {scene.body}
            </p>
          </Reveal>
        </div>
      </ScrollStage>
    </section>
  )
}

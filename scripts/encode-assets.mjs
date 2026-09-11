/**
 * Pipeline de assets: converte os arquivos brutos do Higgsfield, em raw-assets/,
 * nos arquivos servidos em public/.
 *
 * Os vídeos são reencodados para scrub: o GOP curto é o que permite ao
 * navegador saltar para um tempo arbitrário sem decodificar meio segundo de
 * quadros intermediários. Sem isso a rolagem trava mesmo com o arquivo em cache.
 *
 * Uso: npm run assets:encode
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const raw = resolve(root, 'raw-assets')

/** Cenas na ordem da narrativa. `start` é o keyframe que vira poster. */
const scenes = [
  { slug: '01-descida', start: 'k01' },
  { slug: '02-chegada', start: 'k02' },
  { slug: '03-vila', start: 'k03' },
  { slug: '04-deck', start: 'k04' },
  { slug: '05-piscina', start: 'k05' },
  { slug: '06-jantar', start: 'k06' },
]

/** Imagens estáticas: origem em raw-assets, destino em public/images. */
const stills = [
  { from: 'villa-lagoon', to: 'villa-lagoon', width: 1200 },
  { from: 'villa-reef', to: 'villa-reef', width: 1200 },
  { from: 'villa-atoll', to: 'villa-atoll', width: 1200 },
  { from: 'k07', to: '06-jantar', width: 1920 },
]

const VIDEO_WIDTH = 1600
const CRF = 27
/** Um keyframe a cada 5 quadros: o seek nunca decodifica mais que isso. */
const GOP = 5

function ffmpeg(args) {
  execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: 'inherit' })
}

function ensure(...dirs) {
  for (const dir of dirs) if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

const outVideo = resolve(root, 'public/video')
const outPoster = resolve(root, 'public/posters')
const outImage = resolve(root, 'public/images')
ensure(outVideo, outPoster, outImage)

let encoded = 0
let skipped = 0

for (const scene of scenes) {
  const source = resolve(raw, `${scene.slug}.mp4`)

  if (existsSync(source)) {
    ffmpeg([
      '-i', source,
      '-an',
      // O Flux entrega 1920x1088; o crop devolve o 16:9 exato antes de escalar.
      '-vf', `crop=iw:trunc(iw*9/16/2)*2,scale=${VIDEO_WIDTH}:-2:flags=lanczos`,
      '-c:v', 'libx264',
      '-profile:v', 'high',
      '-pix_fmt', 'yuv420p',
      '-crf', String(CRF),
      '-preset', 'slow',
      '-g', String(GOP),
      '-keyint_min', String(GOP),
      '-sc_threshold', '0',
      '-movflags', '+faststart',
      resolve(outVideo, `${scene.slug}.mp4`),
    ])
    encoded += 1
  } else {
    console.warn(`vídeo ausente, pulando: raw-assets/${scene.slug}.mp4`)
    skipped += 1
  }

  // O poster é sempre o quadro inicial da cena: idêntico ao primeiro frame do
  // vídeo, então a troca poster → vídeo não pisca.
  const startFrame = resolve(raw, `${scene.start}.png`)
  if (existsSync(startFrame)) {
    ffmpeg([
      '-i', startFrame,
      '-vf', 'scale=1920:-2:flags=lanczos',
      '-q:v', '5',
      resolve(outPoster, `${scene.slug}.jpg`),
    ])
  } else {
    console.warn(`keyframe ausente, pulando poster: raw-assets/${scene.start}.png`)
  }
}

for (const still of stills) {
  const source = resolve(raw, `${still.from}.png`)
  if (!existsSync(source)) {
    console.warn(`imagem ausente, pulando: raw-assets/${still.from}.png`)
    continue
  }
  ffmpeg([
    '-i', source,
    '-vf', `scale=${still.width}:-2:flags=lanczos`,
    '-q:v', '5',
    resolve(outImage, `${still.to}.jpg`),
  ])
}

console.log(`\nconcluído — ${encoded} vídeo(s) codificado(s), ${skipped} pendente(s).`)

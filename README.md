# Vaimana — landing imersiva de resort

Peça demonstrativa de portfólio: landing page cinematográfica para um atol
privativo fictício no Oceano Índico. A rolagem controla seis vídeos encadeados
que levam o visitante das nuvens ao jantar no deck — oceano → chegada → quarto →
deck → piscina → noite.

**Vaimana é uma marca fictícia.** Diárias, depoimentos e políticas são
ilustrativos. Imagens e vídeos gerados por IA (Higgsfield — Nano Banana 2 +
FLUX 3 Video).

## Rodar

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de produção em dist/
```

Os assets já processados estão em `public/`. Para reprocessar a partir dos
originais (`raw-assets/`, fora do git): `npm run assets:encode` (requer ffmpeg).

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS v4 · GSAP/ScrollTrigger · Lenis

## Como funciona

- **Narrativa por keyframes encadeados** — o quadro final de cada vídeo é o
  quadro inicial do seguinte; não há emenda visível entre as seções.
- **Scrub real** — vídeos reencodados com GOP de 5 quadros; a rolagem escreve
  em `currentTime` com amortecimento e guardas contra fila de seek.
- **Três modos** — cinematográfico (desktop capaz), compacto (mobile/tablet ou
  hardware modesto: posters estáticos, zero bytes de vídeo) e reduzido
  (`prefers-reduced-motion`: nada se move).

A documentação de processo está em [`docs/`](docs/): briefing, manifesto de
assets com os prompts, plano de animação, direção visual e orçamento de
desempenho.

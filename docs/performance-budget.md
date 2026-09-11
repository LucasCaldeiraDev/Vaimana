# Orçamento de desempenho

## Medido no build de produção (2026-08-28)

| Recurso | Tamanho | Observação |
|---|---|---|
| HTML | 2,3 kB | |
| CSS | 22,5 kB (5,2 kB gzip) | Tailwind v4, apenas classes usadas |
| JS | ~302 kB (~105 kB gzip) | React + GSAP/ScrollTrigger + Lenis |
| Poster do herói | ~250 kB | Único recurso de imagem com `preload` |
| Posters (6) | 1,5 MB no total | Carregados por proximidade, `loading="lazy"` |
| Imagens de conteúdo | 744 kB no total | 1200 px, lazy |
| Vídeos (6) | 19 MB no total, 2–4,3 MB cada | **Nunca carregados juntos** — ver política abaixo |

## Política de carregamento de vídeo

1. Nenhuma tag `<video>` recebe `src` no primeiro paint, exceto o herói.
2. Cada cena anexa o `src` apenas quando um `IntersectionObserver` com
   `rootMargin: 100%` a declara a menos de uma tela de distância.
3. No modo compacto (mobile/tablet) e sob `prefers-reduced-motion`, os vídeos
   **nunca** são carregados: as cenas usam somente os posters.
4. O poster é o primeiro quadro do vídeo, então a promoção poster → vídeo é
   invisível e não gera CLS.

Custo de primeira visita no mobile: HTML + CSS + JS + posters conforme a rolagem.
Nenhum byte de vídeo.

## Parâmetros de encode

`libx264 crf 27 preset slow`, 1600 px, GOP 5, `+faststart`, sem áudio.
O GOP de 5 quadros triplica o bitrate em relação a um GOP 250, e é o preço
consciente do scrub responsivo — pago apenas no desktop, onde a banda comporta.

## CLS

Todas as imagens declaram `width`/`height`; as cenas têm altura fixa em `svh`;
o vídeo entra por opacidade sobre o poster já pintado. Não há fonte de layout
shift conhecida na página.

## Pendências reais

- Converter posters para AVIF com fallback JPEG (`<picture>`) — economia
  estimada de ~40% nos posters.
- Gerar variante de vídeo 960 px para telas de notebook menores (hoje o mesmo
  1600 px serve 1024–1920).
- Auditoria Lighthouse em produção após deploy (dev server não é representativo).

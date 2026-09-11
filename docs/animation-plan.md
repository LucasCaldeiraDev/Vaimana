# Plano de animação

## Princípio

Cada animação da página existe para sustentar uma única ideia: **a rolagem é o
deslocamento físico do visitante até a vila**. Nada se move para decorar.

## Os três modos da página

O modo é decidido uma vez, em `useCinematicMode()`, e vale para toda a sessão.

| Modo | Condição | Comportamento |
|---|---|---|
| **Cinematográfico** | ≥ 1024 px, sem `prefers-reduced-motion`, ≥ 4 núcleos, ≥ 4 GB, sem `saveData` nem rede 2G | Vídeo scrubado pela rolagem, seções fixadas, Lenis ativo |
| **Compacto** | Abaixo de 1024 px, ou hardware/rede modestos | Cenas viram seções de uma tela com o poster, rolagem nativa, sem pin, sem vídeo |
| **Reduzido** | `prefers-reduced-motion: reduce` | Igual ao compacto, e as entradas de texto são suprimidas — tudo nasce no estado final |

Trocar de modo dispara `ScrollTrigger.refresh()`, porque as alturas das seções
mudam junto.

## Cenas com vídeo scrubado

**Mecânica.** A seção tem altura de 300 vh (260 vh no herói) e contém um filho
`position: sticky` de uma tela. A rolagem através dessas 300 vh mapeia
linearmente para os 5 s do vídeo.

Optei por `sticky` do CSS em vez do `pin` do ScrollTrigger: o pin insere um
espaçador no DOM e reposiciona o elemento, o que produz salto de layout no
momento exato em que o elemento entra e sai do estado fixado — justamente a
transição mais visível da página. O `sticky` não move nada.

**O seek.** Um objeto `{ time: 0 }` é interpolado por um tween com
`scrub: 0.55`, e o `onUpdate` escreve em `video.currentTime`. Duas guardas
impedem o travamento clássico do scrub:

```js
if (video.seeking || video.readyState < 2) return          // seek anterior em curso
if (Math.abs(video.currentTime - playhead.time) < 1 / 50) return  // delta menor que um quadro
```

Sem a primeira, a fila de seeks cresce mais rápido do que o decodificador
consome e a imagem congela. Sem a segunda, gasta-se decodificação em movimento
que ninguém percebe.

O `scrub: 0.55` é o amortecimento: a rolagem para, o vídeo leva pouco mais de
meio segundo alcançando o destino. É o que faz o movimento parecer inércia de
câmera em vez de resposta digital.

**Por que Lenis.** A roda do mouse entrega deltas discretos e grandes. Ligada
direto ao `currentTime`, ela produz saltos visíveis. Lenis interpola esses
deltas num fluxo contínuo. Ele roda apenas no modo cinematográfico — no toque, a
rolagem nativa é melhor do que qualquer emulação.

**Governador de rolagem.** Cada cena registra em `lib/scrollGovernor.ts` quando
o seu scrub está fixado na viewport (via `onToggle` do ScrollTrigger). O
`virtualScroll` do Lenis consulta esse estado a cada evento de roda e limita o
delta: **70 px por evento dentro de uma narrativa, 160 px fora dela**. Um flick
violento deixa de atravessar meio vídeo num único evento — a viagem mantém o
passo de câmera — sem deixar as seções editoriais (fichas, FAQ) lentas de
percorrer. O limite não se aplica ao toque (`syncTouch: false`) nem existe no
modo compacto, onde não há Lenis.

**Carregamento.** Cada cena só recebe o atributo `src` quando um
`IntersectionObserver` com `rootMargin: 100%` avisa que ela está a menos de uma
tela de distância. Só o herói carrega de imediato. O poster fica sempre na
camada de baixo, e o vídeo aparece com transição de opacidade de 700 ms quando
os metadados chegam — nunca há quadro em branco.

## Herói

A cópia sobe 60 px e desaparece entre o topo e 55% da rolagem da seção,
com `scrub: 0.5`. Ao fim do trecho fixado, a imagem fica sozinha e a entrada na
cena seguinte acontece sem competição entre dois blocos de texto.

## Blocos editoriais

`<Reveal>`: opacidade 0 → 1 e deslocamento de 24 px, `power3.out`, 1,1 s,
disparado a 88% da viewport, **uma única vez**. Cartões e itens de lista
escalonam em 80 ms.

Não há animação de saída. Conteúdo que reaparece ao rolar para cima é ruído.

## Regras que a implementação respeita

- GSAP é a única biblioteca a tocar em `transform` e `opacity`. Não há
  concorrência com outra engine de animação sobre a mesma propriedade.
- Toda animação anima apenas `transform` e `opacity` — nada que force layout.
- Todo `ScrollTrigger` é morto no cleanup do efeito; o `Reveal` ainda limpa as
  props inline para não deixar resíduo de estilo.
- `invalidateOnRefresh: true` em todos os scrubs, para que o redimensionamento
  da janela remeça as alturas em vez de dessincronizar o vídeo.
- Nenhum vídeo toca sozinho. `video.pause()` é chamado assim que os metadados
  chegam, e `play()` nunca é invocado.

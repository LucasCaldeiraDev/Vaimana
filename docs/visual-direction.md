# Direção visual

## Ideia

O site é uma janela, não um catálogo. A interface se retrai para que a imagem
ocupe o quadro inteiro; a tipografia entra como legenda de um filme, não como
cartaz. Sempre que houver dúvida entre acrescentar um elemento de UI e remover
um, remove-se.

## Paleta

| Token | Valor | Papel |
|---|---|---|
| `--color-ink` | `#0B1D24` | Fundo dominante. Verde-azulado muito escuro, não preto — conversa com a água em vez de brigar com ela |
| `--color-ink-soft` | `#17323C` | Separadores e superfícies elevadas |
| `--color-bone` | `#F6F1E9` | Texto sobre escuro e fundo das seções claras |
| `--color-sand` | `#E8DFD2` | Fundo do depoimento, quebra o ritmo entre dois blocos claros |
| `--color-lagoon` | `#1E6E78` | Sobrenomes tipográficos nas seções claras |
| `--color-brass` | `#B08D4F` | **Único acento.** Sobrenomes em fundo escuro, CTA primário, marcadores |

O latão aparece pouco e sempre no mesmo papel. Um acento usado três vezes lê
como sistema; usado dez vezes, lê como enfeite.

Não há gradiente decorativo em lugar nenhum da página. Os únicos gradientes são
os véus de legibilidade sobre vídeo, e eles são funcionais.

## Tipografia

**Cormorant Garamond** (300) para display. Serifa de alto contraste, eixo
humanista, desenhada para corpo grande — em títulos de 3 a 5,5 rem os traços
finos aparecem e o texto ganha a delicadeza que o produto vende. Em corpo
pequeno ela desmancharia, e por isso não é usada lá.

**Jost** (300/400) para interface e corpo de texto. Geométrica, sem os
maneirismos da Futura, legível em tamanho pequeno e neutra o suficiente para não
disputar atenção com a serifa.

Escala fluida com `clamp()` em todo título — sem breakpoints tipográficos, sem
salto de tamanho ao redimensionar.

**Sobrenome de seção** (`.eyebrow`): 11 px, caixa alta, `letter-spacing: 0.28em`.
O tracking largo é o que impede que uma linha de 11 px pareça um erro; nessa
medida ela vira um elemento gráfico deliberado.

`text-wrap: balance` nos títulos e `pretty` nos parágrafos evitam a linha órfã
de uma palavra — o detalhe que mais denuncia página não trabalhada.

## Legibilidade sobre vídeo

Três véus em `index.css`, escolhidos pelo alinhamento do texto da cena:
`veil-left`, `veil-right` (gradientes lineares direcionais) e `veil-center`
(radial). O véu escurece o lado onde o texto se apoia e deixa o lado oposto
limpo.

Isso é o par da decisão tomada na geração das imagens: **cada keyframe foi
prompted com espaço negativo do lado certo**. O véu é a segunda camada de
segurança, não a primeira — se a composição já estiver certa, ele quase não
precisa trabalhar.

## Ritmo

A página alterna deliberadamente entre imersão e respiro:

```
vídeo → vídeo → escuro (números) → vídeo → vídeo → vídeo
      → claro (acomodações) → areia (depoimento) → escuro (experiências)
      → claro (FAQ) → escuro com imagem (reservas)
```

Seis telas seguidas de vídeo cansariam. O bloco de estatísticas no meio da
narrativa é uma pausa curta que também entrega a informação de exclusividade no
momento exato em que o visitante começa a se perguntar com quem vai dividir o
lugar.

## O que foi evitado

Glassmorphism, sombras coloridas, cartões sem função, ícones genéricos,
contadores animados, carrosséis, cursor customizado, preloader de marca. Todos
são atalhos que fazem uma página parecer produzida sem que ela tenha sido
projetada.

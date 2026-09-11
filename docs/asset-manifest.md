# Manifesto de assets

Todos os assets foram gerados no Higgsfield. Imagens: `nano_banana_2`, 2K, 16:9
(4:3 nas fichas de acomodação). Vídeos: `flux_3_video`, 1080p, 5 s, sem áudio.

## Decisão central: encadeamento de quadros

A narrativa tem **6 cenas**, o que normalmente exigiria 12 keyframes (um par
inicial/final por cena). Aqui são **7**, porque o quadro final de cada cena é o
quadro inicial da seguinte:

```
K1 ──cena 1──▶ K2 ──cena 2──▶ K3 ──cena 3──▶ K4 ──cena 4──▶ K5 ──cena 5──▶ K6 ──cena 6──▶ K7
```

Duas consequências, ambas desejadas:

1. **Custo.** 7 imagens em vez de 12 — 40% a menos de créditos em keyframes.
2. **Continuidade.** Não existe emenda entre as seções. O último quadro que o
   visitante vê na cena 3 é literalmente o primeiro quadro da cena 4, então a
   troca de seção é invisível mesmo com a rolagem parada no ponto exato da
   transição.

Cada keyframe foi gerado usando o **anterior como `image_references`**, o que
preserva arquitetura, materiais, cor da lagoa e direção da luz ao longo de toda
a viagem.

## Keyframes

| # | Arquivo | Cena | Enquadramento | Luz | Espaço negativo |
|---|---|---|---|---|---|
| K1 | `k01.png` | Abertura | Aéreo nivelado, 24 mm, acima das nuvens | Sol nascente, superior esquerdo | Centro do quadro |
| K2 | `k02.png` | Abertura → chegada | Aéreo levemente inclinado, abaixo das nuvens | Idem | Bordas superiores |
| K3 | `k03.png` | Chegada → vila | Aéreo baixo (~25 m), vila em primeiro plano à direita | Manhã, esquerda | Metade esquerda |
| K4 | `k04.png` | Vila → deck | Nível do olhar, interior, perspectiva de um ponto | Luz entrando pela abertura | Faixa direita |
| K5 | `k05.png` | Deck → piscina | Nível do olhar, no deck | Fim da manhã, esquerda | Metade esquerda |
| K6 | `k06.png` | Piscina → jantar | ~1 m de altura, borda infinita alinhada ao horizonte | Golden hour, sol baixo à esquerda | Céu superior direito |

> **Revisão do K6.** A primeira versão não tinha a mesa de jantar, e o vídeo 6
> a materializava no meio da tomada. O K6 foi regerado com a mesa **já posta e
> com as lanternas apagadas**: na cena 5 ela entra em quadro naturalmente com o
> movimento de câmera, e na cena 6 (câmera travada) apenas as velas acendem com
> o anoitecer. Regra geral extraída disso: **objeto novo entra em cena por
> movimento de câmera ou por luz — nunca por materialização em plano fixo.**
| K7 | `k07.png` | Encerramento | Idêntico ao K6 | Crepúsculo, lanternas e luz de piscina | Céu superior esquerdo |

### Elementos imutáveis entre quadros

Telhado de palha trançada, deck de teca mel, guarda-corpo branco em X, pilares
brancos, gradiente da lagoa (branco → jade → safira), lente equivalente a 24 mm,
direção principal da luz. A única mudança deliberada é temporal: K5 → K6 → K7
percorre fim da manhã → golden hour → noite, e isso é parte do conceito.

## Vídeos

| # | Arquivo | Par | Movimento | Duração |
|---|---|---|---|---|
| 1 | `01-descida.mp4` | K1 → K2 | Descida contínua atravessando as nuvens, câmera nivelada | 5 s |
| 2 | `02-chegada.mp4` | K2 → K3 | Voo para a frente e descida até as vilas | 5 s |
| 3 | `03-vila.mp4` | K3 → K4 | Descida + push através da parede de vidro aberta | 5 s |
| 4 | `04-deck.mp4` | K4 → K5 | Dolly para a frente, do quarto ao deck | 5 s |
| 5 | `05-piscina.mp4` | K5 → K6 | Dolly baixo até a borda infinita + transição para golden hour | 5 s |
| 6 | `06-jantar.mp4` | K6 → K7 | Câmera praticamente travada, passagem do tempo até a noite | 5 s |

Todos os prompts de vídeo carregam as mesmas restrições: **um único movimento
contínuo, velocidade constante, sem cortes, sem zoom, sem troca de lente, sem
tremor e sem rotação**. Movimento previsível é requisito funcional aqui, não
preferência estética: a rolagem controla o tempo do vídeo, e qualquer aceleração
inesperada é lida pelo visitante como travamento da página.

## Imagens estáticas

| Arquivo | Uso | Proporção |
|---|---|---|
| `villa-lagoon.png` | Ficha Lagoon Villa | 4:3 |
| `villa-reef.png` | Ficha Reef Residence | 4:3 |
| `villa-atoll.png` | Ficha Atoll House | 4:3 |
| `k07.png` | Fundo do bloco de reservas | 16:9 |

## Pipeline até `public/`

`npm run assets:encode` (`scripts/encode-assets.mjs`) faz a ponte entre
`raw-assets/` e `public/`:

- **Vídeo** → H.264, 1600 px de largura, CRF 27, **GOP de 5 quadros**,
  `faststart`, faixa de áudio removida.
- **Poster** → o quadro inicial da cena, 1920 px, JPEG q5. Como o poster é
  exatamente o primeiro frame do vídeo, a troca poster → vídeo não pisca.
- **Imagens** → 1200 px (fichas) e 1920 px (fundo), JPEG q5.

O GOP curto é a decisão que faz o scrub funcionar: com GOP padrão (~250), cada
seek forçaria o decodificador a processar segundos de quadros intermediários e a
rolagem engasgaria mesmo com o arquivo inteiro em cache.

`raw-assets/` está no `.gitignore` — os originais de 2K pesam ~80 MB e não
pertencem ao repositório.

## Restrições aplicadas a todos os prompts

Sem texto, sem marca d'água, sem logotipo, sem pessoas, sem barcos, sem
televisão nos interiores. Nenhum produto ou marca real foi representado.

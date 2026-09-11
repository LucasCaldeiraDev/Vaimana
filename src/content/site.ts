/**
 * Conteúdo da landing page.
 *
 * PROJETO DEMONSTRATIVO. "Vaimana" é uma marca fictícia criada como peça de
 * portfólio. Nomes, diárias, prêmios e depoimentos são ilustrativos e não
 * descrevem nenhuma propriedade real.
 */

export const brand = {
  name: 'Vaimana',
  legal: 'Vaimana Private Atoll',
  location: 'Oceano Índico',
  email: 'reservas@vaimana.example',
  phone: '+55 11 4000-0000',
} as const

export type Scene = {
  id: string
  eyebrow: string
  title: string
  body: string
  video: string
  poster: string
  alt: string
  /** Lado em que o bloco de texto se apoia. */
  align: 'left' | 'right' | 'center'
}

export const hero = {
  eyebrow: 'Atol privativo — Oceano Índico',
  title: 'Onde o mapa termina,\nVaimana começa',
  subtitle:
    'Vinte e duas vilas sobre a água, num atol que não divide com mais ninguém.',
  cta: 'Verificar disponibilidade',
  scrollHint: 'Role para descer',
  video: '/video/01-descida.mp4',
  poster: '/posters/01-descida.jpg',
  alt: 'Vista aérea acima de um mar de nuvens ao amanhecer sobre o Oceano Índico.',
} as const

export const scenes: Scene[] = [
  {
    id: 'chegada',
    eyebrow: 'A chegada',
    title: 'Os últimos noventa segundos são de hidroavião',
    body:
      'Não há ponte, estrada ou porto. Vaimana é alcançável apenas por voo panorâmico partindo de Malé — e é ali, quando a lagoa aparece inteira sob a asa, que a viagem realmente começa.',
    video: '/video/02-chegada.mp4',
    poster: '/posters/02-chegada.jpg',
    alt: 'Sobrevoo baixo da lagoa turquesa revelando a fileira curva de vilas sobre a água.',
    align: 'left',
  },
  {
    id: 'vila',
    eyebrow: 'A vila',
    title: 'Cento e dez metros quadrados abertos para o mar',
    body:
      'Teto em palha trançada à mão por artesãos das ilhas, piso de teca recuperada e uma parede inteira que desliza para o nada. Sem corredor, sem porta de vizinho, sem outro som além da água batendo nos pilares.',
    video: '/video/03-vila.mp4',
    poster: '/posters/03-vila.jpg',
    alt: 'Interior da vila sobre a água, com painel de vidro aberto para a lagoa.',
    align: 'right',
  },
  {
    id: 'deck',
    eyebrow: 'O deck',
    title: 'A escada leva direto ao recife',
    body:
      'Cada vila tem seu deck de teca com rede suspensa sobre a água e uma escada que desce ao mar. O recife começa a quatro metros da última tábua.',
    video: '/video/04-deck.mp4',
    poster: '/posters/04-deck.jpg',
    alt: 'Deck privativo de teca com rede suspensa e escada descendo para a lagoa.',
    align: 'left',
  },
  {
    id: 'piscina',
    eyebrow: 'A piscina',
    title: 'A borda que não existe',
    body:
      'Piscina privativa aquecida com borda infinita alinhada ao horizonte. Ao entardecer, a linha entre a água da piscina e o Índico simplesmente desaparece.',
    video: '/video/05-piscina.mp4',
    poster: '/posters/05-piscina.jpg',
    alt: 'Piscina de borda infinita no deck da vila, alinhada ao horizonte do mar.',
    align: 'right',
  },
  {
    id: 'jantar',
    eyebrow: 'O jantar',
    title: 'A última mesa antes do horizonte',
    body:
      'Menu de sete tempos servido no seu próprio deck, preparado por chef privativo com o pescado do dia. Depois, as luzes se apagam e o céu do hemisfério sul faz o resto.',
    video: '/video/06-jantar.mp4',
    poster: '/posters/06-jantar.jpg',
    alt: 'Mesa de jantar montada no deck da vila ao anoitecer, sob céu estrelado.',
    align: 'center',
  },
]

export const stats = [
  { value: '22', label: 'vilas em todo o atol' },
  { value: '40 km', label: 'de mar aberto até a propriedade mais próxima' },
  { value: '1', label: 'recife de uso exclusivo dos hóspedes' },
] as const

export const villas = [
  {
    id: 'lagoon',
    name: 'Lagoon Villa',
    area: '110 m²',
    guests: 'até 2 hóspedes',
    price: 'R$ 18.400',
    unit: '/ noite',
    image: '/images/villa-lagoon.jpg',
    alt: 'Lagoon Villa vista do mar, com deck de teca e piscina privativa.',
    featured: false,
    features: [
      'Deck privativo com rede sobre a água',
      'Piscina aquecida de 6 metros',
      'Painel de vidro retrátil de 7 metros',
      'Escada privativa para o recife',
    ],
  },
  {
    id: 'reef',
    name: 'Reef Residence',
    area: '180 m²',
    guests: 'até 4 hóspedes',
    price: 'R$ 27.900',
    unit: '/ noite',
    image: '/images/villa-reef.jpg',
    alt: 'Reef Residence com piso de vidro sobre o recife e piscina de doze metros.',
    featured: true,
    features: [
      'Piso de vidro sobre o recife na sala',
      'Piscina aquecida de 12 metros',
      'Chef privativo sob demanda',
      'Dois banheiros com ducha ao ar livre',
    ],
  },
  {
    id: 'atoll',
    name: 'Atoll House',
    area: '320 m²',
    guests: 'até 6 hóspedes',
    price: 'R$ 46.500',
    unit: '/ noite',
    image: '/images/villa-atoll.jpg',
    alt: 'Atoll House de dois pavimentos com terraço superior e piscina de dezoito metros.',
    featured: false,
    features: [
      'Dois pavimentos com terraço solar',
      'Piscina aquecida de 18 metros',
      'Mordomo e chef exclusivos 24h',
      'Dhoni privativo com tripulação',
    ],
  },
] as const

export const villasNote =
  'Diárias por vila, com estadia mínima de quatro noites. Incluem traslado de hidroavião a partir de Malé, pensão completa e as experiências do atol.'

export const experiences = [
  {
    title: 'Mergulho no recife externo',
    body: 'Descida guiada na parede do atol, onde a plataforma cai de 12 para 400 metros.',
  },
  {
    title: 'Navegação em dhoni',
    body: 'Barco tradicional de madeira com tripulação local, ao amanhecer ou no pôr do sol.',
  },
  {
    title: 'Spa sobre a água',
    body: 'Dois pavilhões com piso de vidro e tratamentos com óleos prensados nas ilhas.',
  },
  {
    title: 'Ceia no banco de areia',
    body: 'Jantar montado num banco de areia que só existe durante a maré baixa.',
  },
  {
    title: 'Observação astronômica',
    body: 'Telescópio e astrônomo residente. Zero poluição luminosa em qualquer direção.',
  },
  {
    title: 'Pesca artesanal',
    body: 'Saída de linha de mão com pescadores do atol, antes de o sol nascer.',
  },
] as const

export const testimonial = {
  quote:
    'Passei os dois primeiros dias esperando algum barulho começar. Nunca começou.',
  author: 'Helena V.',
  detail: 'sete noites na Reef Residence',
} as const

export const faq = [
  {
    q: 'Como se chega a Vaimana?',
    a: 'Voo internacional até Malé e, de lá, um hidroavião privativo de aproximadamente 40 minutos. O traslado está incluído na diária e é agendado pela nossa equipe conforme o horário do seu voo.',
  },
  {
    q: 'Qual a estadia mínima?',
    a: 'Quatro noites durante a maior parte do ano e sete noites nos períodos de alta temporada, entre 20 de dezembro e 10 de janeiro.',
  },
  {
    q: 'O que está incluído na diária?',
    a: 'Traslado de hidroavião, pensão completa, bebidas selecionadas, as experiências do atol e o serviço de mordomo da vila. Spa, mergulho técnico e cave de vinhos são cobrados à parte.',
  },
  {
    q: 'A propriedade recebe crianças?',
    a: 'Sim. A Reef Residence e a Atoll House acomodam famílias, e o atol conta com equipe dedicada. As Lagoon Villas são reservadas a hóspedes a partir de 16 anos.',
  },
  {
    q: 'Qual a melhor época para ir?',
    a: 'De janeiro a abril a visibilidade da água é máxima e a chuva é rara. De maio a novembro o mar traz mais vida ao recife, com aparições frequentes de arraias-manta.',
  },
  {
    q: 'Como funciona o cancelamento?',
    a: 'Reembolso integral até 60 dias antes da chegada e reembolso de 50% até 30 dias. Dentro de 30 dias, o valor fica disponível como crédito por 18 meses.',
  },
] as const

export const finalCta = {
  eyebrow: 'Reservas',
  title: 'O atol recebe uma família por vez em cada vila',
  body:
    'A agenda abre com doze meses de antecedência e as datas de alta temporada costumam fechar no primeiro trimestre. Conte para nós quando você pretende viajar e devolvemos a disponibilidade real em até 24 horas.',
  cta: 'Solicitar disponibilidade',
} as const

export const seo = {
  title: 'Vaimana — Atol privativo no Oceano Índico',
  description:
    'Vinte e duas vilas sobre a água num atol privativo do Oceano Índico. Traslado de hidroavião, pensão completa e recife exclusivo. Peça demonstrativa de portfólio.',
  url: 'https://vaimana.example/',
} as const

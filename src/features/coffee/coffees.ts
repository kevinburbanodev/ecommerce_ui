import type { Lang } from '@/shared/i18n/translations'

export type Taste = 'sweet' | 'bright' | 'cocoa'
export type Landscape = 'valley' | 'volcano' | 'river' | 'peak' | 'palms' | 'sea'
export type Grind = 'whole' | 'filter' | 'moka' | 'press'

export const GRINDS: Grind[] = ['whole', 'filter', 'moka', 'press']
export const TASTES: Taste[] = ['sweet', 'bright', 'cocoa']

type Text = Record<Lang, string>

export interface Coffee {
  id: number
  region: string
  town: string
  price: number
  altitude: number
  taste: Taste
  notes: Text
  description: Text
  process: Text
  roast: Text
  landscape: Landscape
  /** Two inks, as in two-colour printing. */
  field: string
  line: string
}

/* Illustrative catalogue: real growing regions, invented products and prices. */
export const coffees: Coffee[] = [
  {
    id: 1,
    region: 'Huila',
    town: 'Pitalito',
    price: 42000,
    altitude: 1650,
    taste: 'sweet',
    notes: { es: 'Panela y naranja', en: 'Panela and orange' },
    description: {
      es: 'El más fácil de querer: dulce desde el primer sorbo y con un final de naranja. Bueno si vienes del café de siempre.',
      en: 'The easiest one to love: sweet from the first sip with an orange finish. Good if you are used to everyday coffee.',
    },
    process: { es: 'Lavado', en: 'Washed' },
    roast: { es: 'Medio', en: 'Medium' },
    landscape: 'valley',
    field: '#f2a81d',
    line: '#6f1c0d',
  },
  {
    id: 2,
    region: 'Nariño',
    town: 'La Unión',
    price: 48000,
    altitude: 1950,
    taste: 'bright',
    notes: { es: 'Limón dulce y caña', en: 'Sweet lime and cane' },
    description: {
      es: 'Crece alto y frío, y se nota: limpio, brillante y con acidez de fruta. Pídelo en filtro.',
      en: 'Grown high and cold, and you can tell: clean, bright, with a fruit acidity. Best as a filter coffee.',
    },
    process: { es: 'Lavado', en: 'Washed' },
    roast: { es: 'Claro', en: 'Light' },
    landscape: 'volcano',
    field: '#c9d62c',
    line: '#0c4526',
  },
  {
    id: 3,
    region: 'Cauca',
    town: 'Inzá',
    price: 40000,
    altitude: 1750,
    taste: 'cocoa',
    notes: { es: 'Cacao y nuez', en: 'Cocoa and walnut' },
    description: {
      es: 'Redondo y con cuerpo, para tomar con leche o después del almuerzo.',
      en: 'Round and full-bodied, for drinking with milk or after lunch.',
    },
    process: { es: 'Lavado', en: 'Washed' },
    roast: { es: 'Medio', en: 'Medium' },
    landscape: 'river',
    field: '#f08a5c',
    line: '#4a1722',
  },
  {
    id: 4,
    region: 'Tolima',
    town: 'Planadas',
    price: 46000,
    altitude: 1800,
    taste: 'bright',
    notes: { es: 'Mora e hibisco', en: 'Blackberry and hibiscus' },
    description: {
      es: 'Fermentado con la fruta, sabe a moras maduras. El más distinto de los seis.',
      en: 'Fermented with the fruit on, it tastes of ripe blackberries. The most unusual of the six.',
    },
    process: { es: 'Natural', en: 'Natural' },
    roast: { es: 'Claro', en: 'Light' },
    landscape: 'peak',
    field: '#f0607f',
    line: '#430b3f',
  },
  {
    id: 5,
    region: 'Quindío',
    town: 'Salento',
    price: 39000,
    altitude: 1700,
    taste: 'sweet',
    notes: { es: 'Caramelo y manzana', en: 'Caramel and apple' },
    description: {
      es: 'Suave y parejo, el que se deja hecho en el termo y sigue rico a las cuatro de la tarde.',
      en: 'Mild and even, the one you leave in the flask and still enjoy at four in the afternoon.',
    },
    process: { es: 'Miel', en: 'Honey' },
    roast: { es: 'Medio', en: 'Medium' },
    landscape: 'palms',
    field: '#46b57c',
    line: '#05352c',
  },
  {
    id: 6,
    region: 'Sierra Nevada',
    town: 'Santa Marta',
    price: 43000,
    altitude: 1400,
    taste: 'cocoa',
    notes: { es: 'Chocolate y clavo', en: 'Chocolate and clove' },
    description: {
      es: 'De montaña con vista al mar: intenso, de tueste más oscuro, para greca.',
      en: 'From a mountain that looks at the sea: intense, roasted darker, made for the moka pot.',
    },
    process: { es: 'Lavado', en: 'Washed' },
    roast: { es: 'Medio alto', en: 'Medium dark' },
    landscape: 'sea',
    field: '#4aa5d8',
    line: '#0a2150',
  },
]

export function findCoffee(id: number) {
  return coffees.find((coffee) => coffee.id === id)
}

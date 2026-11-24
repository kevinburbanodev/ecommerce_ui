import type { Grind, Taste } from '@/features/coffee/coffees'

export type Lang = 'en' | 'es'

export type FieldName = 'fullName' | 'email' | 'phone' | 'address' | 'city' | 'department'

export interface Dictionary {
  heroTitle: string
  heroSub: string
  filterLabel: string
  all: string
  results: (count: number) => string
  selvage: string
  tastes: Record<Taste, string>
  shop: string
  envelope: string
  envelopeCount: (count: number) => string
  switchLang: string
  grindTitle: string
  grindSub: string
  grinds: Record<Grind, { name: string; recipe: string }>
  originTitle: string
  originText: string
  facts: { town: string; altitude: string; process: string; roast: string; content: string; contentValue: string }
  grindLabel: string
  quantity: string
  less: string
  more: string
  stick: (price: string) => string
  stuck: (region: string) => string
  seeEnvelope: string
  back: string
  others: string
  cartTitle: string
  emptyTitle: string
  emptySub: string
  choose: string
  empty: string
  remove: (name: string) => string
  shipping: string
  included: string
  total: string
  toCheckout: string
  checkoutTitle: string
  who: string
  where: string
  payment: string
  payments: { transfer: string; delivery: string }
  demoNote: string
  fields: Record<FieldName, string>
  placeholders: Record<FieldName, string>
  errors: Record<FieldName, string>
  send: (price: string) => string
  sending: string
  sentTitle: string
  sentText: (email: string) => string
  demoSent: string
  order: string
  wantOne: string
  sender: string
  hint: { name: string; street: string; place: string }
  footer: string
  madeBy: string
  notFoundTitle: string
  notFoundSub: string
  errorTitle: string
  retry: string
}

const es: Dictionary = {
  heroTitle: 'Seis cafés de Colombia, listos para enviar.',
  heroSub: 'Elige una estampilla, dinos cómo lo preparas y lo molemos así.',
  filterLabel: '¿A qué quieres que sepa?',
  all: 'A todo',
  results: (count) => (count === 6 ? 'Los seis cafés de la serie.' : `${count} cafés de la serie.`),
  selvage: 'Serie Colombia, seis valores',
  tastes: { sweet: 'Dulce', bright: 'Frutal', cocoa: 'Chocolate' },
  shop: 'Cafés',
  envelope: 'Sobre',
  envelopeCount: (count) => (count === 1 ? '1 bolsa en tu sobre' : `${count} bolsas en tu sobre`),
  switchLang: 'Switch to English',
  grindTitle: 'Molido para tu cafetera',
  grindSub: 'La misma bolsa cambia mucho según la molienda. Estas son nuestras recetas para una taza.',
  grinds: {
    whole: { name: 'En grano', recipe: 'Para moler en casa justo antes de preparar.' },
    filter: { name: 'Filtro', recipe: '15 g de café, 250 ml de agua, 3 minutos.' },
    moka: { name: 'Greca', recipe: 'Canasta llena sin apretar, fuego bajo, 4 minutos.' },
    press: { name: 'Prensa', recipe: '18 g de café, 270 ml de agua, 4 minutos.' },
  },
  originTitle: 'Se recoge a mano, cereza por cereza',
  originText: 'En la misma rama hay frutos verdes y maduros. Por eso cada mata se recorre varias veces y solo se toman los rojos.',
  facts: { town: 'Municipio', altitude: 'Altura', process: 'Proceso', roast: 'Tueste', content: 'Contenido', contentValue: 'Bolsa de 340 g' },
  grindLabel: '¿Cómo lo preparas?',
  quantity: 'Bolsas',
  less: 'Una bolsa menos',
  more: 'Una bolsa más',
  stick: (price) => `Pegar en el sobre, ${price}`,
  stuck: (region) => `${region} ya está en tu sobre.`,
  seeEnvelope: 'Ver el sobre',
  back: 'Todos los cafés',
  others: 'También en esta serie',
  cartTitle: 'Tu sobre',
  emptyTitle: 'Este sobre todavía no lleva estampillas.',
  emptySub: 'Pega la primera y aparecerá en la esquina.',
  choose: 'Elegir un café',
  empty: 'Vaciar el sobre',
  remove: (name) => `Despegar ${name}`,
  shipping: 'Envío',
  included: 'Incluido',
  total: 'Total',
  toCheckout: 'Escribir la dirección',
  checkoutTitle: '¿A dónde lo enviamos?',
  who: 'Quién lo recibe',
  where: 'Dónde',
  payment: 'Cómo pagas',
  payments: { transfer: 'Transferencia', delivery: 'Al recibir' },
  demoNote: 'Esta tienda es una demostración: no se cobra nada ni se guardan tus datos.',
  fields: { fullName: 'Nombre', email: 'Correo', phone: 'Celular', address: 'Dirección', city: 'Ciudad', department: 'Departamento' },
  placeholders: {
    fullName: 'Ana Gómez',
    email: 'ana@correo.com',
    phone: '300 000 0000',
    address: 'Calle 5 # 38-20, apto 301',
    city: 'Cali',
    department: 'Valle del Cauca',
  },
  errors: {
    fullName: 'Escribe quién recibe el paquete.',
    email: 'Revisa el correo, le falta algo.',
    phone: 'Escribe un celular de 10 dígitos.',
    address: 'Escribe la dirección completa.',
    city: 'Escribe la ciudad.',
    department: 'Escribe el departamento.',
  },
  send: (price) => `Enviar pedido, ${price}`,
  sending: 'Sellando el sobre',
  sentTitle: 'Tu sobre va en camino.',
  sentText: (email) => `En una tienda real, la confirmación llegaría a ${email}.`,
  demoSent: 'Como es una demostración, no se cobró ni se envió nada.',
  order: 'Pedido',
  wantOne: 'Quiero una tienda así',
  sender: 'Remite: Café Remite, Cali',
  hint: { name: 'Nombre de quien recibe', street: 'Dirección', place: 'Ciudad, departamento' },
  footer: 'Café Remite es una tienda inventada para mostrar cómo puede verse la de un negocio real. Productos y precios son ejemplos.',
  madeBy: 'Hecha por Kevin Burbano',
  notFoundTitle: 'Dirección desconocida.',
  notFoundSub: 'Esta página no existe. Devuelta al remitente.',
  errorTitle: 'Algo se dañó en el camino.',
  retry: 'Intentar otra vez',
}

const en: Dictionary = {
  heroTitle: 'Six Colombian coffees, ready to post.',
  heroSub: 'Pick a stamp, tell us how you brew and we grind it that way.',
  filterLabel: 'What should it taste like?',
  all: 'Anything',
  results: (count) => (count === 6 ? 'All six coffees in the issue.' : `${count} coffees in the issue.`),
  selvage: 'Colombia issue, six values',
  tastes: { sweet: 'Sweet', bright: 'Fruity', cocoa: 'Chocolate' },
  shop: 'Coffees',
  envelope: 'Envelope',
  envelopeCount: (count) => (count === 1 ? '1 bag in your envelope' : `${count} bags in your envelope`),
  switchLang: 'Cambiar a español',
  grindTitle: 'Ground for your brewer',
  grindSub: 'The same bag changes a lot with the grind. These are our one-cup recipes.',
  grinds: {
    whole: { name: 'Whole bean', recipe: 'To grind at home right before brewing.' },
    filter: { name: 'Filter', recipe: '15 g of coffee, 250 ml of water, 3 minutes.' },
    moka: { name: 'Moka pot', recipe: 'Full basket, not pressed, low heat, 4 minutes.' },
    press: { name: 'Press', recipe: '18 g of coffee, 270 ml of water, 4 minutes.' },
  },
  originTitle: 'Picked by hand, cherry by cherry',
  originText: 'One branch holds green and ripe fruit at once, so every tree is visited several times and only the red ones are taken.',
  facts: { town: 'Town', altitude: 'Altitude', process: 'Process', roast: 'Roast', content: 'Content', contentValue: '340 g bag' },
  grindLabel: 'How do you brew?',
  quantity: 'Bags',
  less: 'One bag less',
  more: 'One bag more',
  stick: (price) => `Stick it on, ${price}`,
  stuck: (region) => `${region} is on your envelope.`,
  seeEnvelope: 'See the envelope',
  back: 'All coffees',
  others: 'Also in this issue',
  cartTitle: 'Your envelope',
  emptyTitle: 'This envelope has no stamps yet.',
  emptySub: 'Stick the first one and it will show up in the corner.',
  choose: 'Choose a coffee',
  empty: 'Empty the envelope',
  remove: (name) => `Peel off ${name}`,
  shipping: 'Shipping',
  included: 'Included',
  total: 'Total',
  toCheckout: 'Write the address',
  checkoutTitle: 'Where do we send it?',
  who: 'Who receives it',
  where: 'Where',
  payment: 'How you pay',
  payments: { transfer: 'Bank transfer', delivery: 'On delivery' },
  demoNote: 'This shop is a demo: nothing is charged and your details are not stored.',
  fields: { fullName: 'Name', email: 'Email', phone: 'Mobile', address: 'Address', city: 'City', department: 'Department' },
  placeholders: {
    fullName: 'Ana Gómez',
    email: 'ana@mail.com',
    phone: '300 000 0000',
    address: 'Calle 5 # 38-20, apt 301',
    city: 'Cali',
    department: 'Valle del Cauca',
  },
  errors: {
    fullName: 'Write who receives the parcel.',
    email: 'Check the email, something is missing.',
    phone: 'Write a 10-digit mobile number.',
    address: 'Write the full address.',
    city: 'Write the city.',
    department: 'Write the department.',
  },
  send: (price) => `Send order, ${price}`,
  sending: 'Sealing the envelope',
  sentTitle: 'Your envelope is on its way.',
  sentText: (email) => `In a real shop, the confirmation would go to ${email}.`,
  demoSent: 'As this is a demo, nothing was charged or sent.',
  order: 'Order',
  wantOne: 'I want a shop like this',
  sender: 'From: Café Remite, Cali',
  hint: { name: 'Name of the receiver', street: 'Address', place: 'City, department' },
  footer: 'Café Remite is an invented shop that shows what a real one could look like. Products and prices are examples.',
  madeBy: 'Made by Kevin Burbano',
  notFoundTitle: 'Address unknown.',
  notFoundSub: 'This page does not exist. Returned to sender.',
  errorTitle: 'Something broke on the way.',
  retry: 'Try again',
}

export const dictionaries: Record<Lang, Dictionary> = { en, es }

export type Lang = 'en' | 'es'

export interface Dictionary {
  season: string
  heroTitle: string
  heroSub: string
  searchPlaceholder: string
  noResults: string
  shop: string
  cart: string
  backToShop: string
  freeShipping: string
  returns: string
  addToCart: string
  addToCartFor: (price: string) => string
  yourCart: string
  clearCart: string
  orderSummary: string
  subtotal: string
  shipping: string
  free: string
  total: string
  proceedToCheckout: string
  continueShopping: string
  emptyCartTitle: string
  emptyCartSub: string
  startShopping: string
  backToCart: string
  checkout: string
  sectionContact: string
  sectionShipping: string
  sectionPayment: string
  payFor: (price: string) => string
  demoNote: string
  orderConfirmed: string
  confirmedThanks: (brand: string) => string
  orderLine: (orderNo: string, amount: string) => string
  footerTag: string
  addedToCart: string
  categoryAll: string
  categories: Record<string, string>
  fields: {
    fullName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
    cardNumber: string
    expiry: string
    cvc: string
  }
  placeholders: {
    fullName: string
    email: string
    address: string
    city: string
    postalCode: string
    country: string
    cardNumber: string
    expiry: string
    cvc: string
  }
  errors: {
    fullName: string
    email: string
    address: string
    required: string
    country: string
    cardNumber: string
    expiry: string
    cvc: string
  }
  quantityEach: (price: string) => string
  quantityLabel: (qty: number) => string
  reviewsSuffix: (count: number) => string
  ratingLine: (rating: string, reviews: number) => string
}

const en: Dictionary = {
  season: 'New season · 2026',
  heroTitle: 'Everything, curated.',
  heroSub: 'Clothing, jewelery and electronics — shipped free.',
  searchPlaceholder: 'Search products',
  noResults: 'No products match your search.',
  shop: 'Shop',
  cart: 'Cart',
  backToShop: 'Back to shop',
  freeShipping: 'Free shipping',
  returns: '30-day returns',
  addToCart: 'Add to cart',
  addToCartFor: (price) => `Add to cart · ${price}`,
  yourCart: 'Your cart',
  clearCart: 'Clear cart',
  orderSummary: 'Order summary',
  subtotal: 'Subtotal',
  shipping: 'Shipping',
  free: 'Free',
  total: 'Total',
  proceedToCheckout: 'Proceed to checkout',
  continueShopping: 'Continue shopping',
  emptyCartTitle: 'Your cart is empty',
  emptyCartSub: 'Browse the shop and add something you love.',
  startShopping: 'Start shopping',
  backToCart: 'Back to cart',
  checkout: 'Checkout',
  sectionContact: 'Contact',
  sectionShipping: 'Shipping',
  sectionPayment: 'Payment',
  payFor: (price) => `Pay ${price}`,
  demoNote: '🔒 Demo only — no real payment is processed',
  orderConfirmed: 'Order confirmed',
  confirmedThanks: (brand) => `Thanks for shopping with ${brand}. A receipt is on its way to your inbox.`,
  orderLine: (orderNo, amount) => `Order #${orderNo} · ${amount}`,
  footerTag: 'Portfolio demo · sample data',
  addedToCart: 'Added to cart',
  categoryAll: 'All',
  categories: {
    electronics: 'Electronics',
    jewelery: 'Jewelery',
    "men's clothing": "Men's Clothing",
    "women's clothing": "Women's Clothing",
  },
  fields: {
    fullName: 'Full name',
    email: 'Email',
    address: 'Address',
    city: 'City',
    postalCode: 'Postal code',
    country: 'Country',
    cardNumber: 'Card number',
    expiry: 'Expiry',
    cvc: 'CVC',
  },
  placeholders: {
    fullName: 'Jane Appleseed',
    email: 'jane@email.com',
    address: '123 Market Street',
    city: 'Portland',
    postalCode: '97201',
    country: 'United States',
    cardNumber: '4242 4242 4242 4242',
    expiry: 'MM / YY',
    cvc: '123',
  },
  errors: {
    fullName: 'Enter your full name',
    email: 'Enter a valid email',
    address: 'Enter your address',
    required: 'Required',
    country: 'Enter your country',
    cardNumber: 'Enter a 16-digit card number',
    expiry: 'Use MM/YY format',
    cvc: 'Enter a valid CVC',
  },
  quantityEach: (price) => `${price} each`,
  quantityLabel: (qty) => `Qty ${qty}`,
  reviewsSuffix: (count) => `(${count})`,
  ratingLine: (rating, reviews) => `${rating} · ${reviews} reviews`,
}

const es: Dictionary = {
  season: 'Nueva temporada · 2026',
  heroTitle: 'Todo, con criterio.',
  heroSub: 'Ropa, joyería y electrónica — envío gratis.',
  searchPlaceholder: 'Buscar productos',
  noResults: 'Ningún producto coincide con tu búsqueda.',
  shop: 'Tienda',
  cart: 'Carrito',
  backToShop: 'Volver a la tienda',
  freeShipping: 'Envío gratis',
  returns: 'Devoluciones en 30 días',
  addToCart: 'Añadir al carrito',
  addToCartFor: (price) => `Añadir al carrito · ${price}`,
  yourCart: 'Tu carrito',
  clearCart: 'Vaciar carrito',
  orderSummary: 'Resumen del pedido',
  subtotal: 'Subtotal',
  shipping: 'Envío',
  free: 'Gratis',
  total: 'Total',
  proceedToCheckout: 'Ir a pagar',
  continueShopping: 'Seguir comprando',
  emptyCartTitle: 'Tu carrito está vacío',
  emptyCartSub: 'Explora la tienda y añade algo que te encante.',
  startShopping: 'Empezar a comprar',
  backToCart: 'Volver al carrito',
  checkout: 'Pago',
  sectionContact: 'Contacto',
  sectionShipping: 'Envío',
  sectionPayment: 'Pago',
  payFor: (price) => `Pagar ${price}`,
  demoNote: '🔒 Solo demo — no se procesa ningún pago real',
  orderConfirmed: 'Pedido confirmado',
  confirmedThanks: (brand) => `Gracias por comprar en ${brand}. Te enviaremos un recibo por correo.`,
  orderLine: (orderNo, amount) => `Pedido n.º ${orderNo} · ${amount}`,
  footerTag: 'Demo de portafolio · datos de ejemplo',
  addedToCart: 'Añadido al carrito',
  categoryAll: 'Todos',
  categories: {
    electronics: 'Electrónica',
    jewelery: 'Joyería',
    "men's clothing": 'Ropa de hombre',
    "women's clothing": 'Ropa de mujer',
  },
  fields: {
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    address: 'Dirección',
    city: 'Ciudad',
    postalCode: 'Código postal',
    country: 'País',
    cardNumber: 'Número de tarjeta',
    expiry: 'Vencimiento',
    cvc: 'CVC',
  },
  placeholders: {
    fullName: 'Ana García',
    email: 'ana@correo.com',
    address: 'Calle Mayor 12',
    city: 'Madrid',
    postalCode: '28013',
    country: 'España',
    cardNumber: '4242 4242 4242 4242',
    expiry: 'MM / AA',
    cvc: '123',
  },
  errors: {
    fullName: 'Introduce tu nombre completo',
    email: 'Introduce un correo válido',
    address: 'Introduce tu dirección',
    required: 'Requerido',
    country: 'Introduce tu país',
    cardNumber: 'Introduce una tarjeta de 16 dígitos',
    expiry: 'Usa el formato MM/AA',
    cvc: 'Introduce un CVC válido',
  },
  quantityEach: (price) => `${price} c/u`,
  quantityLabel: (qty) => `Cant. ${qty}`,
  reviewsSuffix: (count) => `(${count})`,
  ratingLine: (rating, reviews) => `${rating} · ${reviews} reseñas`,
}

export const dictionaries: Record<Lang, Dictionary> = { en, es }

import type { Product } from '@/features/products/types/product.types'

const BASE_URL = 'https://fakestoreapi.com'

// FakeStore sits behind bot protection that 403s requests with no browser-like
// headers — this happens reliably from CI/build environments (e.g. Vercel's build step).
const REQUEST_HEADERS = {
  accept: 'application/json',
  'user-agent': 'Mozilla/5.0 (compatible; ShopfrontPortfolioDemo/1.0)',
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`, { next: { revalidate: 3600 }, headers: REQUEST_HEADERS })
  if (!response.ok) throw new Error(`Failed to load products: ${response.status}`)
  return response.json() as Promise<Product[]>
}

export async function getProduct(id: number): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/products/${id}`, { next: { revalidate: 3600 }, headers: REQUEST_HEADERS })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Failed to load product ${id}: ${response.status}`)
  return response.json() as Promise<Product>
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`, { next: { revalidate: 3600 }, headers: REQUEST_HEADERS })
  if (!response.ok) throw new Error(`Failed to load categories: ${response.status}`)
  return response.json() as Promise<string[]>
}

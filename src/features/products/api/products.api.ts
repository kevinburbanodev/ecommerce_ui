import type { Product } from '@/features/products/types/product.types'

const BASE_URL = 'https://fakestoreapi.com'

// These are called from client components (see the `useProducts`/`useProduct` hooks),
// not from Server Components. FakeStore's bot protection blocks requests from cloud/
// datacenter IPs (Vercel's build step and its serverless functions both got 403s) but
// allows ordinary browser requests, which is also the API's intended usage pattern.
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`, { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`Failed to load products: ${response.status}`)
  return response.json() as Promise<Product[]>
}

export async function getProduct(id: number): Promise<Product | null> {
  const response = await fetch(`${BASE_URL}/products/${id}`, { headers: { accept: 'application/json' } })
  if (response.status === 404) return null
  if (!response.ok) throw new Error(`Failed to load product ${id}: ${response.status}`)
  return response.json() as Promise<Product>
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`, { headers: { accept: 'application/json' } })
  if (!response.ok) throw new Error(`Failed to load categories: ${response.status}`)
  return response.json() as Promise<string[]>
}

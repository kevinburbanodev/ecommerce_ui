import { getCategories, getProducts } from '@/features/products/api/products.api'
import { ProductBrowser } from '@/features/products/components/ProductBrowser'

// Render on request instead of prerendering at build time — the build step runs
// from a different network than deployed functions, and FakeStore's bot protection
// has 403'd requests specifically from CI/build environments.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return <ProductBrowser products={products} categories={categories} />
}

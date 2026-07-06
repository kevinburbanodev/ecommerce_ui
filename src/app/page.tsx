import { getCategories, getProducts } from '@/features/products/api/products.api'
import { ProductBrowser } from '@/features/products/components/ProductBrowser'

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  return <ProductBrowser products={products} categories={categories} />
}

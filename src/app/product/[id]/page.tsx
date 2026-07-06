import { notFound } from 'next/navigation'
import { getProduct } from '@/features/products/api/products.api'
import { ProductDetailView } from '@/features/products/components/ProductDetailView'

// See src/app/page.tsx for why this route opts out of build-time prerendering.
export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number(id)
  const product = Number.isNaN(productId) ? null : await getProduct(productId)

  if (!product) notFound()

  return <ProductDetailView product={product} />
}

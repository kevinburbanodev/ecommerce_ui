'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/features/products/types/product.types'
import { StarRating } from '@/features/products/components/StarRating'
import { AddToCartButton } from '@/features/products/components/AddToCartButton'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatCurrency } from '@/shared/lib/format'

export function ProductCard({ product, animationDelayMs = 0 }: { product: Product; animationDelayMs?: number }) {
  const { t } = useLanguage()

  return (
    <div
      className="animate-fade-up flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-text-lo hover:shadow-[0_16px_36px_rgba(0,0,0,0.22)]"
      style={{ animationDelay: `${animationDelayMs}ms` }}
    >
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative flex aspect-square items-center justify-center bg-white">
          <Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain p-6" />
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 pt-4">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-text-lo">
            {t.categories[product.category] ?? product.category}
          </span>
          <h3 className="line-clamp-2 font-heading text-[15px] font-semibold leading-tight tracking-tight text-text-hi">
            {product.title}
          </h3>
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        </div>
      </Link>
      <div className="flex flex-col gap-2.5 px-4 pb-4 pt-2">
        <span className="font-mono text-base font-bold text-text-hi">{formatCurrency(product.price)}</span>
        <AddToCartButton product={product} className="w-full" />
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/features/products/types/product.types'
import { ProductDetailActions } from '@/features/products/components/ProductDetailActions'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatCurrency } from '@/shared/lib/format'

function starGlyphs(rate: number): string {
  const full = Math.round(rate)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

export function ProductDetailView({ product }: { product: Product }) {
  const { t } = useLanguage()

  return (
    <div className="mx-auto max-w-5xl px-4 py-7 sm:px-6">
      <Link href="/" className="mb-[26px] inline-flex items-center gap-1.5 font-heading text-sm font-medium text-text-mid transition-colors hover:text-text-hi">
        <span className="text-base leading-none">←</span> {t.backToShop}
      </Link>
      <div className="flex flex-wrap gap-12">
        <div className="min-w-[300px] flex-1 basis-[380px]">
          <div className="relative flex aspect-square items-center justify-center rounded-[20px] border border-border bg-white">
            <Image src={product.image} alt={product.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-contain p-10" />
          </div>
        </div>
        <div className="min-w-[300px] flex-1 basis-[360px] pt-1.5">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo">
            {t.categories[product.category] ?? product.category}
          </div>
          <h1 className="mb-3.5 font-heading text-[32px] font-bold leading-tight tracking-tight text-text-hi">{product.title}</h1>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="text-base tracking-[2px] text-gold">{starGlyphs(product.rating.rate)}</span>
            <span className="font-mono text-[13px] text-text-mid">{t.ratingLine(product.rating.rate.toFixed(1), product.rating.count)}</span>
          </div>
          <div className="mb-5 font-mono text-[30px] font-bold text-text-hi">{formatCurrency(product.price)}</div>
          <p className="mb-7 max-w-[46ch] text-[15px] leading-relaxed text-text-mid">{product.description}</p>
          <ProductDetailActions product={product} />
          <div className="mt-[26px] flex gap-[22px] border-t border-divider pt-[22px]">
            <div className="font-mono text-xs text-text-mid">✓ {t.freeShipping}</div>
            <div className="font-mono text-xs text-text-mid">✓ {t.returns}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

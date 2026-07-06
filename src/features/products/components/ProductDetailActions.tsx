'use client'

import { useState } from 'react'
import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatCurrency } from '@/shared/lib/format'
import type { Product } from '@/features/products/types/product.types'

export function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="flex flex-wrap items-center gap-3.5">
      <div className="flex items-center overflow-hidden rounded-[11px] border border-border bg-bg-surface">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="h-12 w-11 text-xl text-text-hi transition-colors hover:bg-bg-hover"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-11 text-center font-mono text-base font-bold tabular-nums text-text-hi">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          className="h-12 w-11 text-xl text-text-hi transition-colors hover:bg-bg-hover"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={() => addItem(product, quantity)}
        className="h-[50px] min-w-[200px] flex-1 rounded-xl bg-accent font-heading text-[15px] font-semibold text-accent-text transition-colors hover:bg-accent-hover active:translate-y-px"
      >
        {t.addToCartFor(formatCurrency(product.price * quantity))}
      </button>
    </div>
  )
}

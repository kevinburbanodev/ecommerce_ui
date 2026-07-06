'use client'

import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'
import type { Product } from '@/features/products/types/product.types'

export function AddToCartButton({
  product,
  quantity = 1,
  className = '',
}: {
  product: Product
  quantity?: number
  className?: string
}) {
  const { addItem } = useCart()
  const { t } = useLanguage()

  return (
    <button
      type="button"
      onClick={() => addItem(product, quantity)}
      className={`rounded-[10px] bg-accent px-4 py-2.5 font-heading text-[13.5px] font-semibold text-accent-text transition-colors hover:bg-accent-hover active:translate-y-px ${className}`}
    >
      {t.addToCart}
    </button>
  )
}

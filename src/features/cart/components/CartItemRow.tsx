'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'
import type { CartItem } from '@/features/cart/types/cart.types'
import { formatCurrency } from '@/shared/lib/format'

export function CartItemRow({ item }: { item: CartItem }) {
  const { setQuantity, removeItem } = useCart()
  const { t } = useLanguage()

  return (
    <div className="flex flex-col gap-3 rounded-[15px] border border-border bg-bg-surface p-3.5 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-4">
        <Link href={`/product/${item.product.id}`} className="relative h-[84px] w-[84px] shrink-0 rounded-[11px] border border-border bg-white">
          <Image src={item.product.image} alt={item.product.title} fill sizes="84px" className="object-contain p-2" />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-lo">
            {t.categories[item.product.category] ?? item.product.category}
          </div>
          <Link href={`/product/${item.product.id}`} className="my-0.5 block font-heading text-[15px] font-semibold text-text-hi hover:underline">
            {item.product.title}
          </Link>
          <div className="font-mono text-xs text-text-mid">{t.quantityEach(formatCurrency(item.product.price))}</div>
        </div>
        <RemoveButton onClick={() => removeItem(item.product.id)} label={item.product.title} className="flex sm:hidden" />
      </div>

      <div className="flex items-center justify-between gap-3 pl-[100px] sm:pl-0">
        <div className="flex items-center overflow-hidden rounded-[9px] border border-border">
          <button
            type="button"
            onClick={() => setQuantity(item.product.id, item.quantity - 1)}
            className="h-9 w-[34px] text-[17px] text-text-hi transition-colors hover:bg-bg-hover"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center font-mono text-sm font-bold tabular-nums text-text-hi">{item.quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity(item.product.id, item.quantity + 1)}
            className="h-9 w-[34px] text-[17px] text-text-hi transition-colors hover:bg-bg-hover"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="shrink-0 text-right font-mono text-base font-bold text-text-hi sm:w-[78px]">
          {formatCurrency(item.product.price * item.quantity)}
        </span>
        <RemoveButton onClick={() => removeItem(item.product.id)} label={item.product.title} className="hidden sm:flex" />
      </div>
    </div>
  )
}

function RemoveButton({ onClick, label, className = '' }: { onClick: () => void; label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-[34px] w-[34px] shrink-0 items-center justify-center rounded-lg text-lg leading-none text-text-lo transition-colors hover:bg-danger/15 hover:text-danger ${className}`}
      aria-label={`Remove ${label}`}
    >
      ×
    </button>
  )
}

'use client'

import Link from 'next/link'
import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'
import { CartItemRow } from '@/features/cart/components/CartItemRow'
import { formatCurrency } from '@/shared/lib/format'

export default function CartPage() {
  const { items, subtotal, clear } = useCart()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="mb-[26px] font-heading text-[32px] font-bold tracking-tight text-text-hi">{t.yourCart}</h1>
        <div className="rounded-[18px] border border-border bg-bg-surface px-5 py-[72px] text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-bg-hover">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-text-lo">
              <path d="M6 7h12l-1 13H7L6 7Z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
          </div>
          <div className="mb-2 font-heading text-xl font-bold text-text-hi">{t.emptyCartTitle}</div>
          <p className="mb-6 text-sm text-text-mid">{t.emptyCartSub}</p>
          <Link
            href="/"
            className="rounded-xl bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover"
          >
            {t.startShopping}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-[26px] flex items-center justify-between">
        <h1 className="font-heading text-[32px] font-bold tracking-tight text-text-hi">{t.yourCart}</h1>
        <button type="button" onClick={clear} className="font-heading text-sm font-medium text-text-mid transition-colors hover:text-danger">
          {t.clearCart}
        </button>
      </div>

      <div className="flex flex-wrap items-start gap-8">
        <div className="flex min-w-[300px] flex-1 basis-[440px] flex-col gap-3.5">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>

        <div className="sticky top-[90px] min-w-[280px] flex-1 basis-[300px] rounded-2xl border border-border bg-bg-surface p-6">
          <div className="mb-[18px] font-heading text-[17px] font-bold text-text-hi">{t.orderSummary}</div>
          <div className="mb-[11px] flex justify-between text-sm text-text-mid">
            <span>{t.subtotal}</span>
            <span className="font-mono text-text-hi">{formatCurrency(subtotal)}</span>
          </div>
          <div className="mb-[11px] flex justify-between text-sm text-text-mid">
            <span>{t.shipping}</span>
            <span className="font-mono text-text-hi">{t.free}</span>
          </div>
          <div className="my-4 h-px bg-divider" />
          <div className="mb-5 flex items-baseline justify-between">
            <span className="font-heading text-base font-bold text-text-hi">{t.total}</span>
            <span className="font-mono text-xl font-bold text-text-hi">{formatCurrency(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full rounded-xl bg-accent py-3.5 text-center font-heading text-[15px] font-semibold text-accent-text transition-colors hover:bg-accent-hover active:translate-y-px"
          >
            {t.proceedToCheckout}
          </Link>
          <Link href="/" className="mt-3.5 block text-center font-heading text-[13px] text-text-mid transition-colors hover:text-text-hi">
            {t.continueShopping}
          </Link>
        </div>
      </div>
    </div>
  )
}

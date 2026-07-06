'use client'

import Link from 'next/link'
import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'

export function CartLink() {
  const { itemCount } = useCart()
  const { t } = useLanguage()

  return (
    <Link
      href="/cart"
      className="relative flex items-center gap-2 rounded-lg px-3.5 py-2 font-heading text-sm font-medium text-text-hi transition-colors hover:bg-bg-hover"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 7h12l-1 13H7L6 7Z" />
        <path d="M9 7a3 3 0 0 1 6 0" />
      </svg>
      <span className="hidden sm:inline">{t.cart}</span>
      {itemCount > 0 && (
        <span
          key={itemCount}
          className="animate-pop flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 font-mono text-[11px] font-bold text-accent-text"
        >
          {itemCount}
        </span>
      )}
    </Link>
  )
}

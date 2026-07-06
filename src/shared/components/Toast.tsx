'use client'

import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'

export function Toast() {
  const { toastNonce } = useCart()
  const { t } = useLanguage()

  if (toastNonce === 0) return null

  return (
    <div
      key={toastNonce}
      className="animate-toast-lifecycle pointer-events-none fixed bottom-7 left-1/2 z-[100] flex items-center gap-2.5 rounded-xl bg-accent px-6 py-3.5 font-heading text-sm font-medium text-accent-text opacity-0 shadow-[0_12px_30px_rgba(0,0,0,.35)]"
    >
      <span className="text-[15px] text-[#1f9b5e]">✓</span> {t.addedToCart}
    </div>
  )
}

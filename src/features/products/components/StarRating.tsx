'use client'

import { useLanguage } from '@/shared/i18n/language.context'

function starGlyphs(rate: number): string {
  const full = Math.round(rate)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

export function StarRating({ rate, count }: { rate: number; count: number }) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[13px] tracking-[1px] text-gold" aria-hidden="true">
        {starGlyphs(rate)}
      </span>
      <span className="font-mono text-[11px] text-text-lo">{t.reviewsSuffix(count)}</span>
    </div>
  )
}

'use client'

import { useLanguage } from '@/shared/i18n/language.context'

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3.5 px-4 py-7 sm:px-6">
        <div className="font-heading text-sm font-semibold text-text-hi">Shopfront</div>
        <div className="font-mono text-[11px] text-text-lo">
          {t.footerTag} · © {year}
        </div>
      </div>
    </footer>
  )
}

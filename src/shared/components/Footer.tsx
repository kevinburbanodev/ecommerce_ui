'use client'

import { useLanguage } from '@/shared/i18n/language.context'
import { SERVICES_URL } from '@/shared/lib/demo'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p>{t.footer}</p>
      <a href={SERVICES_URL}>{t.madeBy}</a>
    </footer>
  )
}

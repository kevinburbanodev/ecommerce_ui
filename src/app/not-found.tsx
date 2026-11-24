'use client'

import Link from 'next/link'
import { useLanguage } from '@/shared/i18n/language.context'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="plain">
      <h1>{t.notFoundTitle}</h1>
      <p>{t.notFoundSub}</p>
      <Link href="/" className="button">
        {t.back}
      </Link>
    </section>
  )
}

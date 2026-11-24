'use client'

import { useLanguage } from '@/shared/i18n/language.context'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useLanguage()

  return (
    <section className="plain">
      <h1>{t.errorTitle}</h1>
      <button type="button" className="button" onClick={reset}>
        {t.retry}
      </button>
    </section>
  )
}

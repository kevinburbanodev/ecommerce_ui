'use client'

import Link from 'next/link'
import { useEnvelope } from '@/features/envelope/envelope.context'
import { stampsFor } from '@/features/envelope/stamps'
import { useLanguage } from '@/shared/i18n/language.context'

export function Header() {
  const { lines, count } = useEnvelope()
  const { lang, toggleLang, t } = useLanguage()

  return (
    <header className="header">
      <Link href="/" className="brand">
        Café Remite
      </Link>
      <nav>
        <Link href="/" className="nav-shop">
          {t.shop}
        </Link>
        <button type="button" onClick={toggleLang} aria-label={t.switchLang}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <Link href="/cart" className="mini" aria-label={t.envelopeCount(count)}>
          <span className="mini-paper" aria-hidden="true">
            <span className="mini-stamps">
              {stampsFor(lines)
                .slice(-3)
                .map((coffee, i) => (
                  <i key={i} style={{ background: coffee.field, borderBottomColor: coffee.line }} />
                ))}
            </span>
            <span className="mini-lines" />
          </span>
          <span>
            {t.envelope}
            {count > 0 && <b key={count}> {count}</b>}
          </span>
        </Link>
      </nav>
    </header>
  )
}

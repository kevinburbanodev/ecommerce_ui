'use client'

import Link from 'next/link'
import { CartLink } from '@/shared/components/CartLink'
import { useTheme } from '@/shared/hooks/useTheme'
import { useLanguage } from '@/shared/i18n/language.context'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useLanguage()

  return (
    <header
      className="sticky top-0 z-40 border-b border-border backdrop-blur-md"
      style={{ background: 'var(--header-bg)' }}
    >
      <div className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-text-hi">
            <span className="h-[11px] w-[11px] rounded-[3px] border-2 border-bg-base" />
          </span>
          <span className="font-heading text-[19px] font-bold tracking-tight text-text-hi">Shopfront</span>
        </Link>
        <nav className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            title="Theme"
            aria-label="Toggle theme"
            className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-border text-text-hi transition-colors hover:bg-bg-hover"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="2" x2="12" y2="5" />
                <line x1="12" y1="19" x2="12" y2="22" />
                <line x1="2" y1="12" x2="5" y2="12" />
                <line x1="19" y1="12" x2="22" y2="12" />
                <line x1="4.9" y1="4.9" x2="7" y2="7" />
                <line x1="17" y1="17" x2="19.1" y2="19.1" />
                <line x1="4.9" y1="19.1" x2="7" y2="17" />
                <line x1="17" y1="7" x2="19.1" y2="4.9" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={toggleLang}
            title="Language"
            className="flex h-[38px] items-center gap-1.5 rounded-[9px] border border-border px-3 font-mono text-xs font-bold tracking-wide text-text-hi transition-colors hover:bg-bg-hover"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
            </svg>
            {lang.toUpperCase()}
          </button>
          <Link
            href="/"
            className="hidden rounded-lg px-3.5 py-2 font-heading text-sm font-medium text-text-hi transition-colors hover:bg-bg-hover sm:inline-block"
          >
            {t.shop}
          </Link>
          <CartLink />
        </nav>
      </div>
    </header>
  )
}

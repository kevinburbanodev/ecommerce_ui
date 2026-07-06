'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dictionaries, type Lang } from '@/shared/i18n/translations'

const STORAGE_KEY = 'ecommerce_ui_lang'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  t: (typeof dictionaries)['en']
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === 'en' || stored === 'es') setLang(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    window.localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  const toggleLang = () => setLang((current) => (current === 'es' ? 'en' : 'es'))

  return <LanguageContext.Provider value={{ lang, toggleLang, t: dictionaries[lang] }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}

'use client'

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'ecommerce_ui_theme'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored === 'dark' || stored === 'light') setTheme(stored)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}

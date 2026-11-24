import type { Lang } from '@/shared/i18n/translations'

function group(value: number, separator: string) {
  return String(value).replace(/\B(?=(\d{3})+$)/g, separator)
}

/** Colombian pesos. English readers get the currency code, so "$46.000" is never read as 46 dollars. */
export function formatPrice(value: number, lang: Lang): string {
  return lang === 'es' ? `$${group(value, '.')}` : `COP ${group(value, ',')}`
}

export function formatAltitude(metres: number, lang: Lang): string {
  return `${group(metres, lang === 'es' ? '.' : ',')} m`
}

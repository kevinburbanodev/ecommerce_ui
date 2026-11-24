'use client'

import { useLanguage } from '@/shared/i18n/language.context'

export function QuantityStepper({ value, onChange, label, min = 1 }: { value: number; onChange: (next: number) => void; label: string; min?: number }) {
  const { t } = useLanguage()

  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" aria-label={t.less} disabled={value <= min} onClick={() => onChange(value - 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14" />
        </svg>
      </button>
      <output>{value}</output>
      <button type="button" aria-label={t.more} disabled={value >= 20} onClick={() => onChange(value + 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M12 5v14" />
        </svg>
      </button>
    </div>
  )
}

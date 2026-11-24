'use client'

import Link from 'next/link'
import { useState } from 'react'
import { coffees, TASTES, type Taste } from '@/features/coffee/coffees'
import { Stamp } from '@/features/coffee/components/Stamp'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatPrice } from '@/shared/lib/format'

export function StampSheet() {
  const { t, lang } = useLanguage()
  const [taste, setTaste] = useState<Taste | null>(null)
  const shown = taste ? coffees.filter((coffee) => coffee.taste === taste) : coffees

  return (
    <section className="sheet-section" id="serie">
      <div className="sheet-intro">
        <div>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSub}</p>
        </div>
        <fieldset className="tastes">
          <legend>{t.filterLabel}</legend>
          <div>
            <button type="button" aria-pressed={taste === null} onClick={() => setTaste(null)}>
              {t.all}
            </button>
            {TASTES.map((value) => (
              <button key={value} type="button" aria-pressed={taste === value} onClick={() => setTaste(value)}>
                {t.tastes[value]}
              </button>
            ))}
          </div>
          <p role="status">{t.results(shown.length)}</p>
        </fieldset>
      </div>

      {/* One sheet of paper: filtering tears stamps out and leaves their place empty. */}
      <div className="sheet">
        <p className="selvage" aria-hidden="true">
          <span>Café Remite</span>
          <span className="inks">
            {coffees.map((coffee) => (
              <i key={coffee.id} style={{ background: coffee.field }} />
            ))}
          </span>
        </p>
        <ul>
          {shown.map((coffee) => (
            <li key={coffee.id}>
              <Link
                href={`/product/${coffee.id}`}
                aria-label={`${coffee.region}, ${coffee.notes[lang]}, ${formatPrice(coffee.price, lang)}`}
              >
                <Stamp coffee={coffee} />
              </Link>
            </li>
          ))}
        </ul>
        <p className="selvage" aria-hidden="true">
          <span>{t.selvage}</span>
        </p>
      </div>
    </section>
  )
}

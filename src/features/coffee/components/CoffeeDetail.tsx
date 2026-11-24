'use client'

import Link from 'next/link'
import { useState } from 'react'
import { coffees, GRINDS, type Coffee, type Grind } from '@/features/coffee/coffees'
import { Stamp } from '@/features/coffee/components/Stamp'
import { useEnvelope } from '@/features/envelope/envelope.context'
import { QuantityStepper } from '@/shared/components/QuantityStepper'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatAltitude, formatPrice } from '@/shared/lib/format'

export function CoffeeDetail({ coffee }: { coffee: Coffee }) {
  const { t, lang } = useLanguage()
  const { add } = useEnvelope()
  const [grind, setGrind] = useState<Grind>('filter')
  const [quantity, setQuantity] = useState(1)

  const facts = [
    [t.facts.town, coffee.town],
    [t.facts.altitude, formatAltitude(coffee.altitude, lang)],
    [t.facts.process, coffee.process[lang]],
    [t.facts.roast, coffee.roast[lang]],
    [t.facts.content, t.facts.contentValue],
  ]

  return (
    <>
      <section className="detail">
        <div className="detail-stamp" style={{ background: coffee.field }}>
          <Link href="/" className="detail-back" style={{ color: coffee.line }}>
            {t.back}
          </Link>
          <Stamp coffee={coffee} />
        </div>

        <div className="detail-body">
          <h1>{coffee.region}</h1>
          <p className="detail-notes">{coffee.notes[lang]}</p>
          <p className="detail-text">{coffee.description[lang]}</p>

          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <fieldset className="grind-picker">
            <legend>{t.grindLabel}</legend>
            <div>
              {GRINDS.map((value) => (
                <label key={value} className={value === grind ? 'on' : ''}>
                  <input type="radio" name="grind" value={value} checked={value === grind} onChange={() => setGrind(value)} />
                  {t.grinds[value].name}
                </label>
              ))}
            </div>
            <p aria-live="polite">{t.grinds[grind].recipe}</p>
          </fieldset>

          <div className="detail-buy">
            <QuantityStepper value={quantity} onChange={(next) => setQuantity(Math.max(1, Math.min(20, next)))} label={t.quantity} />
            <button type="button" className="button" onClick={() => add(coffee, grind, quantity)}>
              {t.stick(formatPrice(coffee.price * quantity, lang))}
            </button>
          </div>
        </div>
      </section>

      <section className="others">
        <h2>{t.others}</h2>
        <ul>
          {coffees
            .filter((other) => other.id !== coffee.id)
            .map((other) => (
              <li key={other.id}>
                <Link href={`/product/${other.id}`} aria-label={`${other.region}, ${other.notes[lang]}, ${formatPrice(other.price, lang)}`}>
                  <Stamp coffee={other} />
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </>
  )
}

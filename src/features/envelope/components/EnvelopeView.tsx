'use client'

import Link from 'next/link'
import { useEnvelope } from '@/features/envelope/envelope.context'
import { Envelope } from '@/features/envelope/components/Envelope'
import { QuantityStepper } from '@/shared/components/QuantityStepper'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatPrice } from '@/shared/lib/format'
import { stampsFor } from '@/features/envelope/stamps'

export function EnvelopeView() {
  const { lines, total, setQuantity, remove, clear } = useEnvelope()
  const { t, lang } = useLanguage()

  return (
    <section className="cart">
      <div className="cart-envelope">
        <Envelope stamps={stampsFor(lines)} placeholder={t.hint} sender={t.sender} />
      </div>

      <div className="cart-body">
        <h1>{lines.length === 0 ? t.emptyTitle : t.cartTitle}</h1>

        {lines.length === 0 ? (
          <>
            <p>{t.emptySub}</p>
            <Link href="/" className="button">
              {t.choose}
            </Link>
          </>
        ) : (
          <>
            <ul className="cart-lines">
              {lines.map((line) => (
                <li key={line.key}>
                  <div>
                    <Link href={`/product/${line.coffee.id}`}>{line.coffee.region}</Link>
                    <span>{t.grinds[line.grind].name}</span>
                  </div>
                  <QuantityStepper
                    value={line.quantity}
                    onChange={(next) => setQuantity(line.key, next)}
                    label={`${t.quantity}: ${line.coffee.region}`}
                  />
                  <span className="cart-price">{formatPrice(line.coffee.price * line.quantity, lang)}</span>
                  <button type="button" className="cart-remove" aria-label={t.remove(line.coffee.region)} onClick={() => remove(line.key)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <dl className="totals">
              <div>
                <dt>{t.shipping}</dt>
                <dd>{t.included}</dd>
              </div>
              <div className="grand">
                <dt>{t.total}</dt>
                <dd>{formatPrice(total, lang)}</dd>
              </div>
            </dl>
            <div className="cart-actions">
              <Link href="/checkout" className="button">
                {t.toCheckout}
              </Link>
              <button type="button" className="text-button" onClick={clear}>
                {t.empty}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

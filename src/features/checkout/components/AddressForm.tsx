'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkoutSchema, type CheckoutFormValues } from '@/features/checkout/schema/checkout.schema'
import { useEnvelope } from '@/features/envelope/envelope.context'
import { Envelope, type Address } from '@/features/envelope/components/Envelope'
import { stampsFor } from '@/features/envelope/stamps'
import type { Coffee } from '@/features/coffee/coffees'
import type { FieldName } from '@/shared/i18n/translations'
import { useLanguage } from '@/shared/i18n/language.context'
import { SERVICES_URL } from '@/shared/lib/demo'
import { formatPrice } from '@/shared/lib/format'
import { generateOrderNumber } from '@/shared/lib/order'

const GROUPS: { title: 'who' | 'where'; fields: { name: FieldName; type: string; autoComplete: string; wide?: boolean }[] }[] = [
  {
    title: 'who',
    fields: [
      { name: 'fullName', type: 'text', autoComplete: 'name', wide: true },
      { name: 'email', type: 'email', autoComplete: 'email' },
      { name: 'phone', type: 'tel', autoComplete: 'tel-national' },
    ],
  },
  {
    title: 'where',
    fields: [
      { name: 'address', type: 'text', autoComplete: 'street-address', wide: true },
      { name: 'city', type: 'text', autoComplete: 'address-level2' },
      { name: 'department', type: 'text', autoComplete: 'address-level1' },
    ],
  },
]

interface Placed {
  order: string
  date: string
  email: string
  address: Address
  stamps: Coffee[]
  summary: { key: string; text: string; price: string }[]
  total: string
}

export function AddressForm() {
  const { lines, total, clear } = useEnvelope()
  const { t, lang } = useLanguage()
  const [placed, setPlaced] = useState<Placed | null>(null)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { fullName: '', email: '', phone: '', address: '', city: '', department: '', payment: 'transfer' },
  })
  const [fullName, street, city, department, payment] = useWatch({
    control,
    name: ['fullName', 'address', 'city', 'department', 'payment'],
  })
  const address: Address = {
    name: fullName ?? '',
    street: street ?? '',
    place: [city, department].filter(Boolean).join(', '),
  }

  const onSubmit = async (values: CheckoutFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setPlaced({
      order: generateOrderNumber(),
      date: new Intl.DateTimeFormat(lang === 'es' ? 'es-CO' : 'en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        .format(new Date())
        .replace(/\./g, '')
        .replace(/ de /g, ' '),
      email: values.email,
      address: { name: values.fullName, street: values.address, place: `${values.city}, ${values.department}` },
      stamps: stampsFor(lines),
      summary: lines.map((line) => ({
        key: line.key,
        text: `${line.quantity} × ${line.coffee.region}, ${t.grinds[line.grind].name.toLowerCase()}`,
        price: formatPrice(line.coffee.price * line.quantity, lang),
      })),
      total: formatPrice(total, lang),
    })
    clear()
    window.scrollTo({ top: 0 })
  }

  if (placed) {
    return (
      <section className="placed">
        <Envelope stamps={placed.stamps} address={placed.address} placeholder={t.hint} sender={t.sender} postmark={placed} />
        <div className="placed-text" role="status">
          <h1>{t.sentTitle}</h1>
          <p>
            {t.sentText(placed.email)} {t.demoSent}
          </p>
          <dl className="totals">
            <div>
              <dt>{t.order}</dt>
              <dd>{placed.order}</dd>
            </div>
            {placed.summary.map((line) => (
              <div key={line.key}>
                <dt>{line.text}</dt>
                <dd>{line.price}</dd>
              </div>
            ))}
            <div className="grand">
              <dt>{t.total}</dt>
              <dd>{placed.total}</dd>
            </div>
          </dl>
          <div className="cart-actions">
            <a href={SERVICES_URL} className="button">
              {t.wantOne}
            </a>
            <Link href="/" className="text-button">
              {t.back}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  if (lines.length === 0) {
    return (
      <section className="plain">
        <h1>{t.emptyTitle}</h1>
        <p>{t.emptySub}</p>
        <Link href="/" className="button">
          {t.choose}
        </Link>
      </section>
    )
  }

  return (
    <section className="cart">
      <div className="cart-envelope is-live">
        <Envelope stamps={stampsFor(lines)} address={address} placeholder={t.hint} sender={t.sender} />
      </div>

      <form className="cart-body" noValidate onSubmit={handleSubmit(onSubmit)}>
        <h1>{t.checkoutTitle}</h1>
        {GROUPS.map((group) => (
          <fieldset key={group.title} className="fields">
            <legend>{t[group.title]}</legend>
            {group.fields.map((field) => {
              const error = errors[field.name]
              return (
                <div key={field.name} className={field.wide ? 'wide' : ''}>
                  <label htmlFor={field.name}>{t.fields[field.name]}</label>
                  <input
                    id={field.name}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={t.placeholders[field.name]}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${field.name}-error` : undefined}
                    {...register(field.name)}
                  />
                  {error && (
                    <p id={`${field.name}-error`} className="field-error">
                      {t.errors[field.name]}
                    </p>
                  )}
                </div>
              )
            })}
          </fieldset>
        ))}
        <fieldset className="grind-picker">
          <legend>{t.payment}</legend>
          <div>
            {(['transfer', 'delivery'] as const).map((value) => (
              <label key={value} className={payment === value ? 'on' : ''}>
                <input type="radio" value={value} {...register('payment')} />
                {t.payments[value]}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? t.sending : t.send(formatPrice(total, lang))}
        </button>
        <p>{t.demoNote}</p>
      </form>
    </section>
  )
}

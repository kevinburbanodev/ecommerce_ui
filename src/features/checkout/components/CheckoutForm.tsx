'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCart } from '@/features/cart/store/cart.context'
import { useLanguage } from '@/shared/i18n/language.context'
import { checkoutSchema, type CheckoutFormValues } from '@/features/checkout/schema/checkout.schema'
import { formatCurrency } from '@/shared/lib/format'
import { generateOrderNumber } from '@/shared/lib/order'

type FieldKey = keyof CheckoutFormValues

const CONTACT_FIELDS: { name: FieldKey; basis: string }[] = [
  { name: 'fullName', basis: '100%' },
  { name: 'email', basis: '100%' },
]
const SHIPPING_FIELDS: { name: FieldKey; basis: string }[] = [
  { name: 'address', basis: '100%' },
  { name: 'city', basis: '46%' },
  { name: 'postalCode', basis: '46%' },
  { name: 'country', basis: '100%' },
]
const PAYMENT_FIELDS: { name: FieldKey; basis: string }[] = [
  { name: 'cardNumber', basis: '100%' },
  { name: 'expiry', basis: '46%' },
  { name: 'cvc', basis: '46%' },
]

const FIELD_LABEL_KEY: Record<FieldKey, 'fullName' | 'email' | 'address' | 'city' | 'postalCode' | 'country' | 'cardNumber' | 'expiry' | 'cvc'> = {
  fullName: 'fullName',
  email: 'email',
  address: 'address',
  city: 'city',
  postalCode: 'postalCode',
  country: 'country',
  cardNumber: 'cardNumber',
  expiry: 'expiry',
  cvc: 'cvc',
}

const FIELD_ERROR_KEY: Partial<Record<FieldKey, 'fullName' | 'email' | 'address' | 'required' | 'country' | 'cardNumber' | 'expiry' | 'cvc'>> = {
  fullName: 'fullName',
  email: 'email',
  address: 'address',
  city: 'required',
  postalCode: 'required',
  country: 'country',
  cardNumber: 'cardNumber',
  expiry: 'expiry',
  cvc: 'cvc',
}

export function CheckoutForm() {
  const { items, subtotal, clear } = useCart()
  const { t } = useLanguage()
  const router = useRouter()
  const [isPlaced, setIsPlaced] = useState(false)
  const [orderNo, setOrderNo] = useState('')
  const [paidAmount, setPaidAmount] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({ resolver: zodResolver(checkoutSchema) })

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setOrderNo(generateOrderNumber())
    setPaidAmount(formatCurrency(subtotal))
    clear()
    setIsPlaced(true)
  }

  if (items.length === 0 && !isPlaced) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-bold text-text-hi">{t.emptyCartTitle}</h1>
        <p className="text-sm text-text-mid">{t.emptyCartSub}</p>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="mt-2 rounded-xl bg-accent px-5 py-2.5 font-heading text-sm font-semibold text-accent-text hover:bg-accent-hover"
        >
          {t.startShopping}
        </button>
      </div>
    )
  }

  if (isPlaced) {
    return (
      <div className="mx-auto max-w-[520px] px-4 py-10">
        <div className="animate-scale-in rounded-[20px] border border-border bg-bg-surface p-8 py-14 text-center sm:p-14">
          <div className="animate-scale-in mx-auto mb-6 flex h-[76px] w-[76px] items-center justify-center rounded-full bg-accent">
            <svg width="38" height="38" viewBox="0 0 40 40">
              <polyline
                points="10,21 17,28 30,13"
                fill="none"
                stroke="var(--accent-text)"
                strokeWidth="3.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-draw-check"
              />
            </svg>
          </div>
          <h1 className="mb-2.5 font-heading text-[26px] font-bold tracking-tight text-text-hi">{t.orderConfirmed}</h1>
          <p className="mb-1.5 text-[15px] leading-relaxed text-text-mid">{t.confirmedThanks('Shopfront')}</p>
          <div className="mb-7 font-mono text-[13px] text-text-lo">{t.orderLine(orderNo, paidAmount)}</div>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded-xl bg-accent px-7 py-3.5 font-heading text-sm font-semibold text-accent-text transition-colors hover:bg-accent-hover"
          >
            {t.continueShopping}
          </button>
        </div>
      </div>
    )
  }

  const sections: { title: string; number: string; fields: { name: FieldKey; basis: string }[] }[] = [
    { title: t.sectionContact, number: '01', fields: CONTACT_FIELDS },
    { title: t.sectionShipping, number: '02', fields: SHIPPING_FIELDS },
    { title: t.sectionPayment, number: '03', fields: PAYMENT_FIELDS },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="mb-7 font-heading text-[32px] font-bold tracking-tight text-text-hi">{t.checkout}</h1>
      <div className="flex flex-wrap items-start gap-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-w-[300px] flex-1 basis-[480px] flex-col gap-7">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-lo">
                {section.number} · {section.title}
              </div>
              <div className="flex flex-wrap gap-3.5">
                {section.fields.map((field) => {
                  const error = errors[field.name]
                  const labelKey = FIELD_LABEL_KEY[field.name]
                  const errorKey = FIELD_ERROR_KEY[field.name]
                  return (
                    <div key={field.name} className="min-w-[140px] flex-1" style={{ flexBasis: field.basis }}>
                      <label htmlFor={field.name} className="mb-1.5 block font-heading text-[12.5px] font-semibold text-text-mid">
                        {t.fields[labelKey]}
                      </label>
                      <input
                        id={field.name}
                        type="text"
                        placeholder={t.placeholders[labelKey]}
                        {...register(field.name)}
                        className={`w-full rounded-[10px] border bg-bg-input px-3.5 py-3 text-sm text-text-hi outline-none transition-colors focus:border-text-hi ${
                          error ? 'border-danger' : 'border-border'
                        }`}
                      />
                      {error && errorKey && <p className="mt-1.5 font-mono text-xs text-danger">{t.errors[errorKey]}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-[52px] rounded-xl bg-accent font-heading text-[15px] font-semibold text-accent-text transition-colors hover:bg-accent-hover active:translate-y-px disabled:opacity-60"
          >
            {isSubmitting ? '…' : t.payFor(formatCurrency(subtotal))}
          </button>
          <div className="-mt-3.5 text-center font-mono text-[11px] text-text-lo">{t.demoNote}</div>
        </form>

        <aside className="sticky top-[90px] min-w-[280px] flex-1 basis-[300px] rounded-2xl border border-border bg-bg-surface p-6">
          <div className="mb-[18px] font-heading text-[17px] font-bold text-text-hi">{t.orderSummary}</div>
          <div className="mb-[18px] flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-2.5">
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-1 font-heading text-[13px] font-semibold text-text-hi">{item.product.title}</div>
                  <div className="font-mono text-[11px] text-text-lo">{t.quantityLabel(item.quantity)}</div>
                </div>
                <div className="shrink-0 font-mono text-[13px] font-bold text-text-hi">
                  {formatCurrency(item.product.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
          <div className="my-4 h-px bg-divider" />
          <div className="mb-[11px] flex justify-between text-sm text-text-mid">
            <span>{t.subtotal}</span>
            <span className="font-mono text-text-hi">{formatCurrency(subtotal)}</span>
          </div>
          <div className="mb-[11px] flex justify-between text-sm text-text-mid">
            <span>{t.shipping}</span>
            <span className="font-mono text-text-hi">{t.free}</span>
          </div>
          <div className="my-4 h-px bg-divider" />
          <div className="flex items-baseline justify-between">
            <span className="font-heading text-base font-bold text-text-hi">{t.total}</span>
            <span className="font-mono text-xl font-bold text-text-hi">{formatCurrency(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}

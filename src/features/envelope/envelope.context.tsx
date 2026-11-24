'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { findCoffee, GRINDS, type Coffee, type Grind } from '@/features/coffee/coffees'

const STORAGE_KEY = 'cafe_remite_envelope'
const MAX = 20

interface StoredLine {
  id: number
  grind: Grind
  quantity: number
}

export interface EnvelopeLine {
  key: string
  coffee: Coffee
  grind: Grind
  quantity: number
}

interface EnvelopeValue {
  lines: EnvelopeLine[]
  count: number
  total: number
  add: (coffee: Coffee, grind: Grind, quantity: number) => void
  setQuantity: (key: string, quantity: number) => void
  remove: (key: string) => void
  clear: () => void
  /** Last coffee added plus a counter, used to replay the "stuck" notice. */
  last: { coffee: Coffee; nonce: number } | null
}

const EnvelopeContext = createContext<EnvelopeValue | null>(null)

const keyOf = (line: StoredLine) => `${line.id}-${line.grind}`

function parse(raw: string | null): StoredLine[] {
  if (!raw) return []
  const data: unknown = JSON.parse(raw)
  if (!Array.isArray(data)) return []
  return data.filter(
    (l): l is StoredLine => !!findCoffee(l?.id) && GRINDS.includes(l?.grind) && Number.isInteger(l?.quantity) && l.quantity > 0 && l.quantity <= MAX,
  )
}

export function EnvelopeProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([])
  const [last, setLast] = useState<EnvelopeValue['last']>(null)
  const hasLoaded = useRef(false)

  useEffect(() => {
    // Reading localStorage must happen post-mount to keep server/client hydration output identical.
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStored(parse(window.localStorage.getItem(STORAGE_KEY)))
    } catch {
      // ignore malformed storage
    } finally {
      hasLoaded.current = true
    }
  }, [])

  useEffect(() => {
    if (!hasLoaded.current) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // storage unavailable: the envelope still works for this visit
    }
  }, [stored])

  const add = (coffee: Coffee, grind: Grind, quantity: number) => {
    setStored((current) => {
      const key = `${coffee.id}-${grind}`
      if (current.some((l) => keyOf(l) === key)) {
        return current.map((l) => (keyOf(l) === key ? { ...l, quantity: Math.min(MAX, l.quantity + quantity) } : l))
      }
      return [...current, { id: coffee.id, grind, quantity }]
    })
    setLast((current) => ({ coffee, nonce: (current?.nonce ?? 0) + 1 }))
  }

  const remove = (key: string) => setStored((current) => current.filter((l) => keyOf(l) !== key))

  const setQuantity = (key: string, quantity: number) => {
    if (quantity < 1) return remove(key)
    setStored((current) => current.map((l) => (keyOf(l) === key ? { ...l, quantity: Math.min(MAX, quantity) } : l)))
  }

  const clear = () => setStored([])

  const { lines, count, total } = useMemo(() => {
    const lines = stored.map((l) => ({ key: keyOf(l), coffee: findCoffee(l.id)!, grind: l.grind, quantity: l.quantity }))
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      total: lines.reduce((sum, l) => sum + l.quantity * l.coffee.price, 0),
    }
  }, [stored])

  return (
    <EnvelopeContext.Provider value={{ lines, count, total, add, setQuantity, remove, clear, last }}>
      {children}
    </EnvelopeContext.Provider>
  )
}

export function useEnvelope() {
  const context = useContext(EnvelopeContext)
  if (!context) throw new Error('useEnvelope must be used within an EnvelopeProvider')
  return context
}

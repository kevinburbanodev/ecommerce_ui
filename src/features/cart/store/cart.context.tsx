'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { Product } from '@/features/products/types/product.types'
import type { CartItem } from '@/features/cart/types/cart.types'

const STORAGE_KEY = 'ecommerce_ui_cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  setQuantity: (productId: number, quantity: number) => void
  clear: () => void
  toastNonce: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [toastNonce, setToastNonce] = useState(0)
  const hasLoaded = useRef(false)

  useEffect(() => {
    // Reading localStorage must happen post-mount to keep server/client hydration output identical.
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw) as CartItem[])
    } catch {
      // ignore malformed storage
    } finally {
      hasLoaded.current = true
    }
  }, [])

  useEffect(() => {
    if (!hasLoaded.current) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...current, { product, quantity }]
    })
    setToastNonce((n) => n + 1)
  }

  const removeItem = (productId: number) => {
    setItems((current) => current.filter((item) => item.product.id !== productId))
  }

  const setQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return removeItem(productId)
    setItems((current) => current.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clear = () => setItems([])

  const { itemCount, subtotal } = useMemo(
    () => ({
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
    }),
    [items],
  )

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, removeItem, setQuantity, clear, toastNonce }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}

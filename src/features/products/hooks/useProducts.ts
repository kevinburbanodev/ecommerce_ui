'use client'

import { useEffect, useState } from 'react'
import { getCategories, getProducts } from '@/features/products/api/products.api'
import type { Product } from '@/features/products/types/product.types'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    // Fetch-on-mount/retry: transitions to 'loading' before the async call settles.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus('loading')

    Promise.all([getProducts(), getCategories()])
      .then(([productsResult, categoriesResult]) => {
        if (cancelled) return
        setProducts(productsResult)
        setCategories(categoriesResult)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [retryKey])

  return {
    products,
    categories,
    isLoading: status === 'loading' || status === 'idle',
    isError: status === 'error',
    refetch: () => setRetryKey((key) => key + 1),
  }
}

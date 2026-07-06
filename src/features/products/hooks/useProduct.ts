'use client'

import { useEffect, useState } from 'react'
import { getProduct } from '@/features/products/api/products.api'
import type { Product } from '@/features/products/types/product.types'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'not-found'

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    // Fetch-on-mount/retry: transitions status before/after the async call settles.
    if (Number.isNaN(id)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus('not-found')
      return
    }

    let cancelled = false
    setStatus('loading')

    getProduct(id)
      .then((result) => {
        if (cancelled) return
        if (!result) {
          setStatus('not-found')
          return
        }
        setProduct(result)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [id, retryKey])

  return {
    product,
    isLoading: status === 'loading' || status === 'idle',
    isError: status === 'error',
    isNotFound: status === 'not-found',
    refetch: () => setRetryKey((key) => key + 1),
  }
}

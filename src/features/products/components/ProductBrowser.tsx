'use client'

import { useMemo, useState } from 'react'
import type { Product } from '@/features/products/types/product.types'
import { ProductCard } from '@/features/products/components/ProductCard'
import { useLanguage } from '@/shared/i18n/language.context'

export function ProductBrowser({ products, categories }: { products: Product[]; categories: string[] }) {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const matchesQuery = !normalizedQuery || product.title.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [products, activeCategory, query])

  return (
    <div className="mx-auto max-w-6xl px-4 pb-[72px] pt-10 sm:px-6">
      <div className="mb-7">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-text-lo">{t.season}</div>
        <h1 className="my-2 font-heading text-[40px] font-bold tracking-tight text-text-hi">{t.heroTitle}</h1>
        <p className="m-0 text-[15px] text-text-mid">{t.heroSub}</p>
      </div>

      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-[380px] flex-1 basis-[280px]">
          <svg
            className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 text-text-lo"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full rounded-[11px] border border-border bg-bg-input py-3 pl-10 pr-4 text-sm text-text-hi outline-none focus:border-text-hi"
          />
        </div>
        <div className="font-mono text-[13px] text-text-lo">
          {filtered.length} / {products.length}
        </div>
      </div>

      <div className="mb-[30px] flex flex-wrap gap-2.5">
        <CategoryPill label={t.categoryAll} active={activeCategory === 'all'} onClick={() => setActiveCategory('all')} />
        {categories.map((category) => (
          <CategoryPill
            key={category}
            label={t.categories[category] ?? category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-mono text-sm text-text-lo">{t.noResults}</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product, index) => (
            <ProductCard key={product.id} product={product} animationDelayMs={index * 50} />
          ))}
        </div>
      )}
    </div>
  )
}

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-[9px] font-heading text-[13px] font-medium transition-colors ${
        active ? 'border-accent bg-accent text-accent-text' : 'border-border bg-bg-surface text-text-hi hover:border-text-lo'
      }`}
    >
      {label}
    </button>
  )
}

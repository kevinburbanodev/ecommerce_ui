'use client'

import { useId } from 'react'
import type { Coffee } from '@/features/coffee/coffees'
import { ART_HEIGHT, ART_WIDTH, StampArt } from '@/features/coffee/components/StampArt'
import { perforation } from '@/features/coffee/perforation'
import { useLanguage } from '@/shared/i18n/language.context'
import { formatAltitude, formatPrice } from '@/shared/lib/format'

const W = 300
const H = 390
const OUTLINE = perforation(W, H, 14, 18, 5.6)
const X = (W - ART_WIDTH) / 2
const TOP = 20

export function Stamp({ coffee }: { coffee: Coffee }) {
  const { lang } = useLanguage()
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const clip = `${uid}-art`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="stamp" aria-hidden="true">
      <path d={OUTLINE} fill="#fbfdff" />
      <clipPath id={clip}>
        <rect x={X} y={TOP} width={ART_WIDTH} height={ART_HEIGHT} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <g transform={`translate(${X} ${TOP})`}>
          <StampArt landscape={coffee.landscape} field={coffee.field} line={coffee.line} uid={uid} />
        </g>
      </g>
      <rect x={X} y={TOP} width={ART_WIDTH} height={ART_HEIGHT} fill="none" stroke={coffee.line} strokeWidth={2} />
      <g fill={coffee.line}>
        <text x={X} y={291} className="stamp-strong" fontSize={coffee.region.length > 8 ? 32 : 38}>
          {coffee.region}
        </text>
        <text x={X} y={319} className="stamp-legend" fontSize={23}>
          {coffee.notes[lang]}
        </text>
        <path d={`M${X} 331H${W - X}`} stroke={coffee.line} strokeWidth={1.5} />
        <text x={X} y={365} className="stamp-strong" fontSize={lang === 'es' ? 34 : 29}>
          {formatPrice(coffee.price, lang)}
        </text>
        <text x={W - X} y={364} textAnchor="end" className="stamp-legend" fontSize={23}>
          {formatAltitude(coffee.altitude, lang)}
        </text>
      </g>
    </svg>
  )
}

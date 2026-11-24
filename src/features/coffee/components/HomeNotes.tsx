'use client'

import Link from 'next/link'
import { useId } from 'react'
import { GRINDS } from '@/features/coffee/coffees'
import { perforation } from '@/features/coffee/perforation'
import { useLanguage } from '@/shared/i18n/language.context'

/** A photograph printed as a special-issue stamp. */
function PhotoStamp({ src, width, height, holesX, holesY, y }: { src: string; width: number; height: number; holesX: number; holesY: number; y: number }) {
  const clip = useId().replace(/[^a-zA-Z0-9]/g, '')
  const margin = 22
  const imageHeight = (width - margin * 2) * 1.5

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="stamp" aria-hidden="true">
      <path d={perforation(width, height, holesX, holesY, 6.4)} fill="#fbfdff" />
      <clipPath id={clip}>
        <rect x={margin} y={margin} width={width - margin * 2} height={height - margin * 2} />
      </clipPath>
      <g clipPath={`url(#${clip})`}>
        <image href={src} x={margin} y={margin - y} width={width - margin * 2} height={imageHeight} preserveAspectRatio="xMidYMid slice" />
      </g>
    </svg>
  )
}

export function HomeNotes() {
  const { t } = useLanguage()

  return (
    <>
      <section className="origin">
        <PhotoStamp src="/photos/cerezas.webp" width={640} height={480} holesX={28} holesY={21} y={340} />
        <div>
          <h2>{t.originTitle}</h2>
          <p>{t.originText}</p>
        </div>
      </section>

      <section className="grinds">
        <div className="letter">
          <div className="letter-paper">
            <div className="letter-head">
              <div>
                <h2>{t.grindTitle}</h2>
                <p>{t.grindSub}</p>
              </div>
              <PhotoStamp src="/photos/filtrado.webp" width={300} height={390} holesX={14} holesY={18} y={0} />
            </div>
            <dl>
              {GRINDS.map((grind) => (
                <div key={grind}>
                  <dt>{t.grinds[grind].name}</dt>
                  <dd>{t.grinds[grind].recipe}</dd>
                </div>
              ))}
            </dl>
            <Link href="/#serie" className="button">
              {t.choose}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

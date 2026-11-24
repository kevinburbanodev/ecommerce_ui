import type { Coffee } from '@/features/coffee/coffees'
import { Stamp } from '@/features/coffee/components/Stamp'

const TILT = [2, -2.5, 1, -1, 2.5, -2]

export interface Address {
  name: string
  street: string
  place: string
}

export function Envelope({
  stamps,
  address,
  placeholder,
  sender,
  postmark,
  landing = false,
}: {
  stamps: Coffee[]
  address?: Address
  placeholder: Address
  sender: string
  postmark?: { order: string; date: string }
  /** Animate the newest stamp as it is stuck on. */
  landing?: boolean
}) {
  return (
    <div className="envelope">
      <div className="envelope-paper">
        <p className="envelope-sender">{sender}</p>
        <div className={`envelope-stamps n${stamps.length}`}>
          {stamps.map((coffee, i) => (
            <div
              key={i}
              className={`envelope-stamp${landing && i === stamps.length - 1 ? ' is-landing' : ''}`}
              style={{ rotate: `${TILT[i % TILT.length]}deg` }}
            >
              <Stamp coffee={coffee} />
            </div>
          ))}
          {postmark && (
            <>
              <svg className="postmark-ring" viewBox="0 0 160 160" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="3.5">
                  <circle cx="80" cy="80" r="74" />
                  <circle cx="80" cy="80" r="50" strokeWidth="2" />
                </g>
                <path id="postmark-arc" d="M23 80a57 57 0 1 1 114 0a57 57 0 1 1-114 0" fill="none" />
                <text fontSize="15.5">
                  <textPath href="#postmark-arc" startOffset="2%">
                    CAFÉ REMITE · PEDIDO {postmark.order} ·
                  </textPath>
                </text>
                <text x="80" y="86" textAnchor="middle" fontSize="14.5">
                  {postmark.date}
                </text>
              </svg>
              <svg className="postmark-waves" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
                {[6, 18, 30, 42, 54].map((y) => (
                  <path
                    key={y}
                    d={`M0 ${y}c18-9 32 9 50 0s32 9 50 0 32 9 50 0 32 9 50 0`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </>
          )}
        </div>
        <div className="envelope-address">
          {(['name', 'street', 'place'] as const).map((field) => {
            const text = address?.[field].trim()
            return (
              <p key={field} className={text ? '' : 'is-hint'}>
                {text || placeholder[field]}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}

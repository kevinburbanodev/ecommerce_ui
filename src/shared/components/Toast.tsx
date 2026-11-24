'use client'

import Link from 'next/link'
import { Envelope } from '@/features/envelope/components/Envelope'
import { useEnvelope } from '@/features/envelope/envelope.context'
import { stampsFor } from '@/features/envelope/stamps'
import { useLanguage } from '@/shared/i18n/language.context'

/** The envelope slides in and the new stamp lands on it. Keyed by the add counter; no timers. */
export function Toast() {
  const { last, lines, count } = useEnvelope()
  const { t } = useLanguage()

  return (
    <div role="status">
      {last && count > 0 && (
        <div key={last.nonce} className="toast">
          <Envelope stamps={stampsFor(lines)} placeholder={t.hint} sender={t.sender} landing />
          <p>
            {t.stuck(last.coffee.region)} <Link href="/cart">{t.seeEnvelope}</Link>
          </p>
        </div>
      )}
    </div>
  )
}

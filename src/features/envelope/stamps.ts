import type { Coffee } from '@/features/coffee/coffees'
import type { EnvelopeLine } from '@/features/envelope/envelope.context'

export const MAX_STAMPS = 6

/** One stamp per bag, newest last, as many as fit on the envelope. */
export function stampsFor(lines: EnvelopeLine[]): Coffee[] {
  return lines.flatMap((line) => Array.from({ length: line.quantity }, () => line.coffee)).slice(-MAX_STAMPS)
}

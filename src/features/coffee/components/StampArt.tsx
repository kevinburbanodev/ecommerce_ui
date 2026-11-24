import type { Landscape } from '@/features/coffee/coffees'

/* Landscapes drawn the way a stamp is engraved: flat ink areas shaded with parallel lines. */

const W = 264
const H = 232
const STEP = 6
const PAPER = '#fbfdff'

type Ridge = (x: number) => number

const n = (value: number) => value.toFixed(1)

function curve(f: Ridge, dy = 0) {
  let d = ''
  for (let x = 0; x <= W; x += STEP) d += `${x === 0 ? 'M' : 'L'}${x} ${n(f(x) + dy)}`
  return d
}

function area(f: Ridge) {
  return `${curve(f)}L${W} ${H}L0 ${H}Z`
}

/** Lines that follow the ridge and spread apart as they go down. */
function Hatch({ f, ink, count = 16, gap = 4, weight = 1.5 }: { f: Ridge; ink: string; count?: number; gap?: number; weight?: number }) {
  let dy = 2
  const lines = []
  for (let i = 0; i < count; i++) {
    dy += gap + i * 0.45
    lines.push(<path key={i} d={curve(f, dy)} fill="none" stroke={ink} strokeWidth={Math.max(0.6, weight - i * 0.05)} />)
  }
  return <g>{lines}</g>
}

function Hill({ f, fill, ink, id, ...hatch }: { f: Ridge; fill: string; ink: string; id: string; count?: number; gap?: number; weight?: number }) {
  return (
    <g>
      <clipPath id={id}>
        <path d={area(f)} />
      </clipPath>
      <path d={area(f)} fill={fill} />
      <g clipPath={`url(#${id})`}>
        <Hatch f={f} ink={ink} {...hatch} />
      </g>
      <path d={curve(f)} fill="none" stroke={ink} strokeWidth={2} />
    </g>
  )
}

function Sky({ ink, until }: { ink: string; until: number }) {
  const lines = []
  for (let y = 5, i = 0; y < until; y += 5 + i * 0.35, i++) {
    lines.push(<path key={i} d={`M0 ${n(y)}H${W}`} stroke={ink} strokeWidth={Math.max(0.35, 1.3 - i * 0.06)} opacity={0.55} />)
  }
  return <g>{lines}</g>
}

function Sun({ cx, cy, r, ink }: { cx: number; cy: number; r: number; ink: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={PAPER} stroke={ink} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={r - 6} fill="none" stroke={ink} strokeWidth={0.8} />
    </g>
  )
}

const rough = (x: number, a: number, p: number) => Math.sin(x / 11 + p) * a + Math.sin(x / 5.3 + p * 2) * a * 0.45

function Palm({ x, top, base, ink }: { x: number; top: number; base: number; ink: string }) {
  const fronds = [-84, -58, -30, 0, 30, 58, 84]
  return (
    <g stroke={ink} fill="none" strokeLinecap="round">
      <path d={`M${x} ${base}L${x} ${top}`} strokeWidth={3.4} stroke={PAPER} />
      <path d={`M${x + 1.2} ${base}L${x + 1.2} ${top}`} strokeWidth={1.8} />
      {fronds.map((a) => {
        const r = (a * Math.PI) / 180
        const ex = x + Math.sin(r) * 25
        const ey = top - Math.cos(r) * 15 + Math.abs(a) * 0.12
        return <path key={a} d={`M${x} ${top}Q${n(x + Math.sin(r) * 14)} ${n(top - Math.cos(r) * 19 - 4)} ${n(ex)} ${n(ey)}`} strokeWidth={3} />
      })}
    </g>
  )
}

export function StampArt({ landscape, field, line, uid }: { landscape: Landscape; field: string; line: string; uid: string }) {
  const id = (name: string) => `${uid}-${landscape}-${name}`

  return (
    <g>
      <rect width={W} height={H} fill={field} />
      {landscape === 'valley' && (
        <>
          <Sky ink={line} until={120} />
          <Sun cx={132} cy={86} r={38} ink={line} />
          <Hill id={id('a')} f={(x) => 150 - Math.abs(x - 132) * 0.42 + rough(x, 3, 1)} fill={field} ink={line} count={14} />
          <Hill id={id('b')} f={(x) => 84 + x * 0.92 + rough(x, 4, 0)} fill={PAPER} ink={line} gap={3.4} weight={2} count={24} />
          <Hill id={id('c')} f={(x) => 84 + (W - x) * 0.92 + rough(x, 4, 2)} fill={line} ink={field} gap={4} count={24} />
        </>
      )}
      {landscape === 'volcano' && (
        <>
          <Sky ink={line} until={150} />
          <path
            d="M119 66c-5-13-22-16-17-30s22-9 31-16 20-13 42-9 27 20 10 29-27 3-33 13-18 6-22 13Z"
            fill={PAPER}
            stroke={line}
            strokeWidth={2}
          />
          <Hill
            id={id('a')}
            f={(x) => {
              const d = Math.abs(x - 128)
              return d < 20 ? 64 + Math.sin(x / 4) * 1.5 : 64 + Math.pow(d - 20, 0.92) * 1.15 + rough(x, 1.6, 3)
            }}
            fill={line}
            ink={field}
            gap={4}
            count={26}
          />
          <Hill id={id('b')} f={(x) => 176 + Math.sin(x / 42) * 12} fill={PAPER} ink={line} gap={3} count={14} weight={1.9} />
          <Hill id={id('c')} f={(x) => 206 + Math.sin(x / 36 + 2) * 8} fill={field} ink={line} gap={4} count={8} />
        </>
      )}
      {landscape === 'river' && (
        <>
          <Sky ink={line} until={80} />
          <Sun cx={206} cy={46} r={24} ink={line} />
          <Hill id={id('a')} f={(x) => 82 + Math.sin(x / 34 + 1) * 22 + rough(x, 2, 0)} fill={PAPER} ink={line} gap={3.2} count={18} weight={1.8} />
          <Hill id={id('b')} f={(x) => 124 + Math.sin(x / 44 + 3.4) * 22} fill={line} ink={field} gap={4} count={18} />
          <Hill id={id('c')} f={(x) => 160 + Math.sin(x / 60 + 5.4) * 14} fill={field} ink={line} gap={4.6} count={12} />
          <path
            d={`M128 156c34 10-56 18-40 30s92 8 70 24-70 14-82 ${H - 210}H196c8-16 46-26 22-44s-74-16-68-24 14-6 4-10Z`}
            fill={PAPER}
            stroke={line}
            strokeWidth={2}
          />
        </>
      )}
      {landscape === 'peak' && (
        <>
          <Sky ink={line} until={160} />
          <Hill id={id('a')} f={(x) => 138 - Math.max(0, 70 - Math.abs(x - 214) * 1.2) + rough(x, 3, 5)} fill={field} ink={line} gap={4} count={16} />
          <Hill id={id('b')} f={(x) => 40 + Math.abs(x - 112) * 1.12 + rough(x, 4.5, 1)} fill={line} ink={field} gap={4.2} count={26} />
          <path
            d={`M112 40L60 ${n(98)}l14-6 10 14 14-18 12 20 13-19 12 15 12-14 15 8Z`}
            fill={PAPER}
            stroke={line}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <Hill id={id('c')} f={(x) => 186 + Math.sin(x / 30) * 9} fill={PAPER} ink={line} gap={3} count={12} weight={1.9} />
        </>
      )}
      {landscape === 'palms' && (
        <>
          <Sky ink={line} until={140} />
          <Hill id={id('a')} f={(x) => 112 + Math.sin(x / 46 + 2.2) * 24} fill={field} ink={line} gap={3.8} count={16} />
          <Hill id={id('b')} f={(x) => 158 + Math.sin(x / 52 + 0.4) * 18} fill={line} ink={field} gap={4} count={14} />
          <Palm x={58} top={48} base={188} ink={line} />
          <Palm x={112} top={84} base={170} ink={line} />
          <Palm x={164} top={34} base={178} ink={line} />
          <Palm x={218} top={70} base={190} ink={line} />
          <Hill id={id('c')} f={(x) => 192 + Math.sin(x / 40 + 3) * 11} fill={PAPER} ink={line} gap={3} count={12} weight={1.9} />
        </>
      )}
      {landscape === 'sea' && (
        <>
          <Sky ink={line} until={130} />
          <Hill id={id('a')} f={(x) => 46 + Math.abs(x - 150) * 0.78 + rough(x, 5, 2)} fill={PAPER} ink={line} gap={3.4} count={26} weight={1.8} />
          <Hill id={id('b')} f={(x) => 92 + Math.abs(x - 60) * 0.5 + rough(x, 4, 4)} fill={line} ink={field} gap={4} count={22} />
          <rect y={166} width={W} height={H - 166} fill={field} />
          {Array.from({ length: 9 }, (_, i) => (
            <path
              key={i}
              d={curve((x) => 172 + i * 7.2 + Math.sin(x / (9 + i * 2.2) + i) * (1.4 + i * 0.4))}
              fill="none"
              stroke={i % 3 === 1 ? PAPER : line}
              strokeWidth={1.4 + i * 0.28}
            />
          ))}
          <path d="M0 166H264" stroke={line} strokeWidth={2} />
        </>
      )}
    </g>
  )
}

export const ART_WIDTH = W
export const ART_HEIGHT = H

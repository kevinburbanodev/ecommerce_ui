/** Outline of a perforated stamp: half-circle bites, evenly spaced so neighbours share round holes. */
export function perforation(width: number, height: number, holesX: number, holesY: number, r: number) {
  const sx = width / holesX
  const sy = height / holesY
  const n = (value: number) => value.toFixed(2)
  let d = 'M0 0'
  for (let i = 0; i < holesX; i++) d += `H${n(sx * i + sx / 2 - r)}a${r} ${r} 0 0 0 ${r * 2} 0`
  d += `H${width}`
  for (let i = 0; i < holesY; i++) d += `V${n(sy * i + sy / 2 - r)}a${r} ${r} 0 0 0 0 ${r * 2}`
  d += `V${height}`
  for (let i = holesX - 1; i >= 0; i--) d += `H${n(sx * i + sx / 2 + r)}a${r} ${r} 0 0 0 ${-r * 2} 0`
  d += 'H0'
  for (let i = holesY - 1; i >= 0; i--) d += `V${n(sy * i + sy / 2 + r)}a${r} ${r} 0 0 0 0 ${-r * 2}`
  return `${d}V0Z`
}

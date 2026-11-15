/** Rounds a maximum up to a tidy number so axis ticks land on clean values. */
export function niceMax(value: number, ticks = 4): number {
  if (value <= 0) return 1
  const rough = value / ticks
  const magnitude = Math.pow(10, Math.floor(Math.log10(rough)))
  const step = [1, 2, 3, 4, 5, 6, 8, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? 10 * magnitude
  return step * ticks
}

export const tickValues = (max: number, ticks = 4) => Array.from({ length: ticks + 1 }, (_, i) => (max / ticks) * i)

/** Year labels along the x axis: every 5 years, or fewer for short terms. */
export function yearTicks(years: number): number[] {
  const step = years <= 10 ? 2 : years <= 20 ? 4 : 5
  const out: number[] = []
  for (let y = 0; y <= years; y += step) out.push(y)
  if (out.at(-1) !== years && years - (out.at(-1) ?? 0) >= step / 2) out.push(years)
  return out
}

/** Axis money labels: one style per axis, compact once the axis reaches £10,000. */
export function axisPounds(value: number, max: number): string {
  if (value === 0) return '£0'
  if (max >= 1_000_000) return `£${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 2).replace(/0$/, '')}M`
  if (max >= 10_000) return `£${Math.round(value / 1_000)}K`
  return `£${Math.round(value).toLocaleString('en-GB')}`
}

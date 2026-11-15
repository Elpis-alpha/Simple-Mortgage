const gbp0 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 })
const gbp2 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2, maximumFractionDigits: 2 })
const gbpCompact = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  notation: 'compact',
  maximumFractionDigits: 1,
})
const int = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 })

/** £1,234 */
export const pounds = (n: number) => gbp0.format(Number.isFinite(n) ? Math.round(n) : 0)
/** £1,234.56 */
export const poundsExact = (n: number) => gbp2.format(Number.isFinite(n) ? n : 0)
/** £1.2M, £250K */
export const poundsCompact = (n: number) => gbpCompact.format(Number.isFinite(n) ? n : 0).replace('k', 'K').replace('m', 'M').replace('bn', 'B')
/** 1,234 */
export const integer = (n: number) => int.format(Number.isFinite(n) ? Math.round(n) : 0)
/** 5.25% */
export const percent = (n: number, digits = 2) => `${(Number.isFinite(n) ? n : 0).toFixed(digits)}%`

/** "24 years 3 months", "11 months" */
export function duration(months: number): string {
  const total = Math.max(0, Math.round(months))
  const y = Math.floor(total / 12)
  const m = total % 12
  const parts: string[] = []
  if (y > 0) parts.push(`${y} ${y === 1 ? 'year' : 'years'}`)
  if (m > 0 || y === 0) parts.push(`${m} ${m === 1 ? 'month' : 'months'}`)
  return parts.join(' ')
}

export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

/**
 * Stamp Duty Land Tax for residential purchases in England and Northern
 * Ireland, using the bands in force from 1 April 2025. Scotland (LBTT) and
 * Wales (LTT) use different taxes and are not covered.
 */

export type BuyerType = 'first-time' | 'home-mover' | 'additional'

export interface BandResult {
  from: number
  /** Upper edge of the band; Infinity for the top band. */
  to: number
  /** Rate as a percentage. */
  rate: number
  /** Slice of the price that falls inside this band. */
  taxable: number
  tax: number
}

export interface StampDutyResult {
  total: number
  /** Total tax as a percentage of the price. */
  effectiveRate: number
  bands: BandResult[]
  /** True when first-time buyer relief was actually used. */
  reliefApplied: boolean
}

type Band = [upTo: number, rate: number]

const STANDARD: Band[] = [
  [125_000, 0],
  [250_000, 2],
  [925_000, 5],
  [1_500_000, 10],
  [Infinity, 12],
]

const FIRST_TIME: Band[] = [
  [300_000, 0],
  [500_000, 5],
]

/** Relief is lost entirely above this price. */
export const FIRST_TIME_BUYER_CAP = 500_000
/** Higher rate for additional dwellings, added to every band. */
export const ADDITIONAL_SURCHARGE = 5

export function calcStampDuty(price: number, buyer: BuyerType): StampDutyResult {
  const value = Math.max(0, price)
  const reliefApplied = buyer === 'first-time' && value <= FIRST_TIME_BUYER_CAP
  const table = reliefApplied ? FIRST_TIME : STANDARD
  const surcharge = buyer === 'additional' ? ADDITIONAL_SURCHARGE : 0

  const bands: BandResult[] = []
  let from = 0
  for (const [to, baseRate] of table) {
    const rate = baseRate + surcharge
    const taxable = Math.max(0, Math.min(value, to) - from)
    bands.push({ from, to, rate, taxable, tax: (taxable * rate) / 100 })
    from = to
  }

  const total = bands.reduce((sum, b) => sum + b.tax, 0)
  return {
    total,
    effectiveRate: value > 0 ? (total / value) * 100 : 0,
    bands,
    reliefApplied,
  }
}

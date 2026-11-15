/**
 * Illustrative mortgage products. These are made-up figures in the region of
 * late-2026 UK market rates, used to give the demo something to compare.
 */

export type ProductKind = 'fix2' | 'fix5' | 'tracker'

export interface Product {
  id: string
  kind: ProductKind
  /** Highest loan-to-value this product accepts, as a percentage. */
  maxLtv: number
  rate: number
  fee: number
}

export const productKinds: Record<ProductKind, { label: string; short: string; note: string }> = {
  fix2: { label: '2-year fixed', short: '2 yr fix', note: 'Rate held for two years, then the lender’s variable rate.' },
  fix5: { label: '5-year fixed', short: '5 yr fix', note: 'Rate held for five years. Early repayment charges apply.' },
  tracker: { label: '2-year tracker', short: 'Tracker', note: 'Follows the Bank of England base rate, up or down.' },
}

const tiers = [60, 75, 85, 90, 95] as const

const rates: Record<ProductKind, readonly number[]> = {
  fix2: [5.14, 5.29, 5.52, 5.84, 6.19],
  fix5: [5.09, 5.21, 5.44, 5.72, 6.05],
  tracker: [4.89, 5.04, 5.31, 5.69, 6.14],
}

const fees: Record<ProductKind, number> = { fix2: 999, fix5: 1_295, tracker: 495 }

export const products: Product[] = (Object.keys(rates) as ProductKind[]).flatMap((kind) =>
  tiers.map((maxLtv, i) => ({
    id: `${kind}-${maxLtv}`,
    kind,
    maxLtv,
    rate: rates[kind][i]!,
    fee: fees[kind],
  })),
)

export const ltvTiers = tiers

/** Cheapest tier a given loan-to-value qualifies for, or null above 95%. */
export function productFor(kind: ProductKind, ltv: number): Product | null {
  return products.find((p) => p.kind === kind && ltv <= p.maxLtv) ?? null
}

/** The headline rate used as a default across the site. */
export const DEFAULT_RATE = productFor('fix5', 80)!.rate

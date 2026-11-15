/**
 * A deliberately simple income-multiple model. Real lenders run a full
 * affordability assessment; this gives a believable range for a demo.
 */

export interface AffordabilityInput {
  /** Gross annual income of the first applicant. */
  income: number
  /** Gross annual income of a second applicant, if any. */
  partnerIncome?: number
  /** Monthly loans, credit cards, childcare and similar commitments. */
  monthlyCommitments?: number
  dependants?: number
  deposit?: number
}

export interface AffordabilityResult {
  /** Income the estimate is based on, after commitments and dependants. */
  assessedIncome: number
  cautious: number
  typical: number
  stretch: number
  /** Highest property price reachable at the typical figure plus deposit. */
  maxPrice: number
}

export const MULTIPLES = { cautious: 4, typical: 4.5, stretch: 5 } as const
/** Allowance deducted from income for each dependant, per year. */
export const DEPENDANT_ALLOWANCE = 3_000

const roundTo = (n: number, step: number) => Math.max(0, Math.floor(n / step) * step)

export function estimateBorrowing(input: AffordabilityInput): AffordabilityResult {
  const gross = Math.max(0, input.income) + Math.max(0, input.partnerIncome ?? 0)
  const commitments = Math.max(0, input.monthlyCommitments ?? 0) * 12
  const dependants = Math.max(0, input.dependants ?? 0) * DEPENDANT_ALLOWANCE
  const assessedIncome = Math.max(0, gross - commitments - dependants)

  const cautious = roundTo(assessedIncome * MULTIPLES.cautious, 500)
  const typical = roundTo(assessedIncome * MULTIPLES.typical, 500)
  const stretch = roundTo(assessedIncome * MULTIPLES.stretch, 500)

  return {
    assessedIncome,
    cautious,
    typical,
    stretch,
    maxPrice: typical + Math.max(0, input.deposit ?? 0),
  }
}

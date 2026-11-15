import { describe, expect, it } from 'vitest'
import { estimateBorrowing } from './affordability'

describe('estimateBorrowing', () => {
  it('applies the income multiples to a single income', () => {
    const r = estimateBorrowing({ income: 50_000 })
    expect(r).toMatchObject({ assessedIncome: 50_000, cautious: 200_000, typical: 225_000, stretch: 250_000 })
  })

  it('combines two incomes and adds the deposit to the price', () => {
    const r = estimateBorrowing({ income: 40_000, partnerIncome: 30_000, deposit: 35_000 })
    expect(r.typical).toBe(315_000)
    expect(r.maxPrice).toBe(350_000)
  })

  it('reduces the estimate for commitments and dependants', () => {
    const r = estimateBorrowing({ income: 60_000, monthlyCommitments: 500, dependants: 2 })
    expect(r.assessedIncome).toBe(48_000)
    expect(r.typical).toBe(216_000)
  })

  it('never goes negative', () => {
    const r = estimateBorrowing({ income: 10_000, monthlyCommitments: 2_000 })
    expect(r).toMatchObject({ assessedIncome: 0, cautious: 0, typical: 0, stretch: 0, maxPrice: 0 })
  })
})

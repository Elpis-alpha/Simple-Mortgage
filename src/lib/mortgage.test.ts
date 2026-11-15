import { describe, expect, it } from 'vitest'
import { buildSchedule, equityShare, loanToValue, monthlyPayment } from './mortgage'

describe('monthlyPayment', () => {
  it('matches the standard annuity figure', () => {
    // £200,000 over 25 years at 5%: a widely published reference value.
    expect(monthlyPayment(200_000, 5, 300)).toBeCloseTo(1169.18, 2)
  })

  it('splits the loan evenly when the rate is zero', () => {
    expect(monthlyPayment(120_000, 0, 240)).toBe(500)
  })

  it('returns zero for an empty loan or term', () => {
    expect(monthlyPayment(0, 5, 300)).toBe(0)
    expect(monthlyPayment(100_000, 5, 0)).toBe(0)
  })
})

describe('buildSchedule', () => {
  const base = { principal: 200_000, annualRate: 5, termYears: 25 }

  it('clears the balance exactly at the end of the term', () => {
    const s = buildSchedule(base)
    expect(s.months).toBe(300)
    expect(s.balances).toHaveLength(301)
    expect(s.balances.at(-1)).toBe(0)
    expect(s.balloon).toBe(0)
  })

  it('pays back the principal plus the interest', () => {
    const s = buildSchedule(base)
    expect(s.totalPaid).toBeCloseTo(200_000 + s.totalInterest, 2)
    expect(s.totalInterest).toBeCloseTo(1169.18 * 300 - 200_000, -1)
  })

  it('produces one row per year whose principal sums to the loan', () => {
    const s = buildSchedule(base)
    expect(s.years).toHaveLength(25)
    const repaid = s.years.reduce((sum, y) => sum + y.principalPaid, 0)
    expect(repaid).toBeCloseTo(200_000, 2)
    // Interest is front-loaded on a repayment mortgage.
    expect(s.years[0]!.interestPaid).toBeGreaterThan(s.years[24]!.interestPaid)
  })

  it('finishes early and saves interest when overpaying', () => {
    const plain = buildSchedule(base)
    const over = buildSchedule({ ...base, monthlyOverpayment: 200 })
    expect(over.months).toBeLessThan(plain.months)
    expect(over.totalInterest).toBeLessThan(plain.totalInterest)
    expect(over.balances.at(-1)).toBe(0)
    expect(over.monthlyPayment).toBeCloseTo(plain.monthlyPayment, 6)
  })

  it('keeps the capital outstanding on an interest-only loan', () => {
    const s = buildSchedule({ ...base, type: 'interest-only' })
    expect(s.monthlyPayment).toBeCloseTo(833.33, 2)
    expect(s.balloon).toBe(200_000)
    expect(s.totalInterest).toBeCloseTo(250_000, 2)
    expect(s.totalPaid).toBeCloseTo(450_000, 2)
  })

  it('copes with a zero rate', () => {
    const s = buildSchedule({ principal: 120_000, annualRate: 0, termYears: 10 })
    expect(s.totalInterest).toBe(0)
    expect(s.balances.at(-1)).toBe(0)
  })

  it('returns an empty schedule for an empty loan', () => {
    const s = buildSchedule({ principal: 0, annualRate: 5, termYears: 25 })
    expect(s.months).toBe(0)
    expect(s.totalPaid).toBe(0)
    expect(s.years).toEqual([])
  })
})

describe('equity helpers', () => {
  it('computes loan-to-value', () => {
    expect(loanToValue(225_000, 300_000)).toBe(75)
    expect(loanToValue(100, 0)).toBe(0)
  })

  it('starts at the deposit share and ends at full ownership', () => {
    const s = buildSchedule({ principal: 225_000, annualRate: 5, termYears: 25 })
    expect(equityShare(s, 300_000, 0)).toBeCloseTo(0.25, 6)
    expect(equityShare(s, 300_000, 300)).toBe(1)
    expect(equityShare(s, 300_000, 9999)).toBe(1)
  })
})

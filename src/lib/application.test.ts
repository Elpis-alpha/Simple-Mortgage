import { describe, expect, it } from 'vitest'
import { assess, emptyApplication, type ApplicationData } from './application'

const base: ApplicationData = { ...emptyApplication, firstName: 'Ada', lastName: 'Okoye' }

describe('assess', () => {
  it('agrees a loan that sits inside the income multiple', () => {
    const d = assess({ ...base, income: 70_000, propertyValue: 300_000, deposit: 60_000 })
    expect(d.outcome).toBe('agreed')
    expect(d.loan).toBe(240_000)
    expect(d.ltv).toBe(80)
    expect(d.product?.maxLtv).toBe(85)
    expect(d.monthly).toBeGreaterThan(0)
  })

  it('refers a loan above five times income', () => {
    const d = assess({ ...base, income: 30_000, monthlyCommitments: 0, propertyValue: 300_000, deposit: 30_000 })
    expect(d.outcome).toBe('refer')
    expect(d.maxLoan).toBe(150_000)
  })

  it('refers a deposit below 5%', () => {
    const d = assess({ ...base, income: 200_000, propertyValue: 300_000, deposit: 6_000 })
    expect(d.outcome).toBe('refer')
    expect(d.product).toBeNull()
    expect(d.monthly).toBe(0)
  })

  it('only counts a second income when there are two applicants', () => {
    const solo = assess({ ...base, applicants: 1, income: 30_000, partnerIncome: 40_000, monthlyCommitments: 0 })
    const joint = assess({ ...base, applicants: 2, income: 30_000, partnerIncome: 40_000, monthlyCommitments: 0 })
    expect(solo.maxLoan).toBe(150_000)
    expect(joint.maxLoan).toBe(350_000)
  })

  it('flags extra paperwork for the self-employed', () => {
    const d = assess({ ...base, income: 90_000, employment: 'self-employed' })
    expect(d.notes.join(' ')).toMatch(/two years of accounts/)
  })
})

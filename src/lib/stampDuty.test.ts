import { describe, expect, it } from 'vitest'
import { calcStampDuty } from './stampDuty'

describe('calcStampDuty', () => {
  it('charges nothing at or below the nil-rate band', () => {
    expect(calcStampDuty(125_000, 'home-mover').total).toBe(0)
  })

  it('applies the standard bands to a home mover', () => {
    // 0% of 125k + 2% of 125k + 5% of 50k
    expect(calcStampDuty(300_000, 'home-mover').total).toBe(5_000)
    // ... + 5% of 675k + 10% of 75k
    expect(calcStampDuty(1_000_000, 'home-mover').total).toBe(43_750)
    // ... + 10% of 575k + 12% of 500k
    expect(calcStampDuty(2_000_000, 'home-mover').total).toBe(153_750)
  })

  it('gives first-time buyers relief up to £500,000', () => {
    expect(calcStampDuty(300_000, 'first-time')).toMatchObject({ total: 0, reliefApplied: true })
    expect(calcStampDuty(450_000, 'first-time')).toMatchObject({ total: 7_500, reliefApplied: true })
    expect(calcStampDuty(500_000, 'first-time')).toMatchObject({ total: 10_000, reliefApplied: true })
  })

  it('withdraws first-time buyer relief completely above the cap', () => {
    expect(calcStampDuty(600_000, 'first-time')).toMatchObject({ total: 20_000, reliefApplied: false })
  })

  it('adds the 5% surcharge to every band for additional homes', () => {
    expect(calcStampDuty(300_000, 'additional').total).toBe(20_000)
    expect(calcStampDuty(100_000, 'additional').total).toBe(5_000)
  })

  it('reports the effective rate and a band-by-band breakdown', () => {
    const r = calcStampDuty(300_000, 'home-mover')
    expect(r.effectiveRate).toBeCloseTo(1.667, 3)
    expect(r.bands.map((b) => b.tax)).toEqual([0, 2_500, 2_500, 0, 0])
    expect(r.bands.reduce((s, b) => s + b.taxable, 0)).toBe(300_000)
  })

  it('treats a negative price as zero', () => {
    expect(calcStampDuty(-5, 'home-mover')).toMatchObject({ total: 0, effectiveRate: 0 })
  })
})

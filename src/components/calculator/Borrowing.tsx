import { ArrowRight, Minus, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DimensionLine } from '@/components/drawing/DimensionLine'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { FigLabel } from '@/components/ui/Figure'
import { RangeField } from '@/components/ui/RangeField'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { Segmented } from '@/components/ui/Segmented'
import { readChoice, readNumber, useUrlSync } from '@/hooks/useUrlSync'
import { DEPENDANT_ALLOWANCE, estimateBorrowing, MULTIPLES } from '@/lib/affordability'
import { useAuth } from '@/lib/auth'
import { percent, pounds } from '@/lib/format'
import { loanToValue, monthlyPayment } from '@/lib/mortgage'
import { productFor } from '@/lib/products'
import { ResultBar } from './ResultBar'

const applicantOptions = [
  { value: '1', label: 'Just me' },
  { value: '2', label: 'Two of us' },
] as const

const TERM = 30

export function Borrowing({ active, onUseBudget }: { active: boolean; onUseBudget: (price: number, deposit: number) => void }) {
  const [params] = useSearchParams()
  const { user } = useAuth()
  const summaryRef = useRef<HTMLElement>(null)

  const [applicants, setApplicants] = useState<'1' | '2'>(() => readChoice(params, 'applicants', ['1', '2'] as const, '1'))
  const [income, setIncome] = useState(() => readNumber(params, 'income', 52_000, 0, 500_000))
  const [partner, setPartner] = useState(() => readNumber(params, 'partner', 38_000, 0, 500_000))
  const [commitments, setCommitments] = useState(() => readNumber(params, 'commitments', 300, 0, 5_000))
  const [dependants, setDependants] = useState(() => Math.round(readNumber(params, 'dependants', 0, 0, 6)))
  const [deposit, setDeposit] = useState(() => readNumber(params, 'savings', 40_000, 0, 1_000_000))

  useUrlSync({ applicants, income, partner, commitments, dependants, savings: deposit }, active)

  const result = estimateBorrowing({
    income,
    partnerIncome: applicants === '2' ? partner : 0,
    monthlyCommitments: commitments,
    dependants,
    deposit,
  })
  const gross = income + (applicants === '2' ? partner : 0)
  const ltv = loanToValue(result.typical, result.maxPrice)
  const product = productFor('fix5', ltv)
  const rate = product?.rate ?? 6.05

  const tiers = [
    { key: 'cautious', label: 'Cautious', amount: result.cautious, note: 'Most lenders, most of the time' },
    { key: 'typical', label: 'Typical', amount: result.typical, note: 'What we would plan around' },
    { key: 'stretch', label: 'Stretch', amount: result.stretch, note: 'A few lenders, strong profile' },
  ] as const

  const scaleMax = Math.max(1, result.stretch * 1.12)
  const pos = (n: number) => `${(n / scaleMax) * 100}%`

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22.5rem_minmax(0,1fr)] lg:gap-8">
      <form className="sheet ticks self-start lg:sticky lg:top-24" onSubmit={(e) => e.preventDefault()} aria-label="Your income and outgoings">
        <div className="border-b border-line px-6 py-3.5">
          <FigLabel>Your income</FigLabel>
        </div>
        <div className="space-y-5 px-6 py-6">
          <Segmented label="Who is applying?" options={applicantOptions} value={applicants} onChange={setApplicants} />
          <RangeField label={applicants === '2' ? 'Your income, before tax' : 'Income before tax'} prefix="£" value={income} min={0} max={250_000} step={1_000} onChange={setIncome} hint="Salary plus regular bonus, per year" />
          {applicants === '2' && <RangeField label="Second income, before tax" prefix="£" value={partner} min={0} max={250_000} step={1_000} onChange={setPartner} />}
          <RangeField
            label="Monthly commitments"
            prefix="£"
            value={commitments}
            min={0}
            max={3_000}
            step={25}
            onChange={setCommitments}
            tone="red"
            hint="Loans, car finance, credit cards, childcare"
          />
          <div>
            <p className="field-label">Dependants</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDependants((d) => Math.max(0, d - 1))}
                disabled={dependants === 0}
                aria-label="One fewer dependant"
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink disabled:opacity-40"
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <output className="tnum w-8 text-center text-xl font-semibold" aria-live="polite" aria-label={`${dependants} dependants`}>
                {dependants}
              </output>
              <button
                type="button"
                onClick={() => setDependants((d) => Math.min(6, d + 1))}
                disabled={dependants === 6}
                aria-label="One more dependant"
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink disabled:opacity-40"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
              <span className="text-[0.8125rem] text-ink-3">children or others you support</span>
            </div>
          </div>
          <RangeField label="Deposit saved" prefix="£" value={deposit} min={0} max={400_000} step={1_000} onChange={setDeposit} />
        </div>
      </form>

      <div className="min-w-0 space-y-6">
        <section ref={summaryRef} className="sheet scroll-mt-24">
          <div className="px-6 py-7 sm:px-8">
            <p className="label">You could typically borrow</p>
            <p className="mt-2">
              <RollingNumber text={pounds(result.typical)} className="text-[clamp(3rem,7vw,4.5rem)] font-semibold tracking-[-0.045em]" />
            </p>
            <p className="mt-1 text-sm text-ink-3">
              {MULTIPLES.typical} times an assessed income of <span className="tnum font-medium text-ink">{pounds(result.assessedIncome)}</span>
            </p>

            {/* The range, drawn to scale. */}
            <div className="mt-9" aria-hidden="true">
              <div className="relative h-2 rounded-full bg-blue-wash">
                <div
                  className="absolute inset-y-0 rounded-full bg-blue/45 transition-[left,right] duration-700 ease-(--ease-out-expo)"
                  style={{ left: pos(result.cautious), right: `${100 - (result.stretch / scaleMax) * 100}%` }}
                />
                <div
                  className="absolute top-1/2 size-[1.125rem] -translate-1/2 rounded-full border-2 border-blue bg-raised shadow-sm transition-[left] duration-700 ease-(--ease-out-expo)"
                  style={{ left: pos(result.typical) }}
                />
              </div>
            </div>
            <dl className="mt-5 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.key} className={`px-4 py-4 bg-raised ${tier.key === 'typical' ? 'shadow-[inset_0_0_0_99px_var(--blue-wash)]' : ''}`}>
                  <dt className="label flex items-center justify-between">
                    {tier.label}
                    <span>{MULTIPLES[tier.key]}×</span>
                  </dt>
                  <dd className="tnum mt-1.5 text-[1.375rem] font-semibold tracking-[-0.025em]">{pounds(tier.amount)}</dd>
                  <dd className="tnum mt-0.5 text-[0.8125rem] text-ink-2">{pounds(monthlyPayment(tier.amount, rate, TERM * 12))} a month</dd>
                  <dd className="mt-2 text-[0.8125rem] text-ink-3">{tier.note}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-3 normal-case tracking-normal">
              Monthly figures use {percent(rate)} over {TERM} years, an illustrative five-year fix.
            </p>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="sheet">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="06">Your budget</FigLabel>
            </div>
            <div className="px-6 py-6">
              <p className="label">Homes up to</p>
              <p className="tnum mt-1.5 text-[2rem] leading-none font-semibold tracking-[-0.035em]">{pounds(result.maxPrice)}</p>
              <DimensionLine
                className="mt-7"
                segments={[
                  { share: result.maxPrice > 0 ? deposit / result.maxPrice : 0, label: 'Deposit', value: pounds(deposit), tone: 'blue' },
                  { share: result.maxPrice > 0 ? result.typical / result.maxPrice : 1, label: 'Mortgage', value: pounds(result.typical), tone: 'ink' },
                ]}
              />
              <p className="mt-5 text-[0.9375rem] text-ink-2">
                {result.maxPrice > 0 ? (
                  <>
                    That is a loan to value of {percent(ltv, 0)}.{' '}
                    {product ? `It puts you in our up-to-${product.maxLtv}% band.` : 'You would need a larger deposit to reach the 95% most lenders stop at.'}
                  </>
                ) : (
                  'Add an income to see a budget.'
                )}
              </p>
            </div>
          </section>

          <section className="sheet">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="07">The working</FigLabel>
            </div>
            <dl className="space-y-2.5 px-6 py-6 font-mono text-[0.8125rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-2">Income before tax</dt>
                <dd className="tnum">{pounds(gross)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-2">Commitments × 12</dt>
                <dd className="tnum text-red-ink">− {pounds(commitments * 12)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-2">
                  Dependants × {pounds(DEPENDANT_ALLOWANCE)}
                </dt>
                <dd className="tnum text-red-ink">− {pounds(dependants * DEPENDANT_ALLOWANCE)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line-strong pt-2.5">
                <dt className="text-ink">Assessed income</dt>
                <dd className="tnum font-semibold">{pounds(result.assessedIncome)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-2">× {MULTIPLES.typical}, rounded down</dt>
                <dd className="tnum font-semibold text-blue-ink">{pounds(result.typical)}</dd>
              </div>
            </dl>
            <p className="border-t border-line px-6 py-4 text-[0.8125rem] text-ink-3">
              A simple income-multiple model. A real lender also looks at your credit history, spending and the property itself.
            </p>
          </section>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => onUseBudget(result.maxPrice, deposit)} disabled={result.maxPrice < 50_000} className="btn btn-solid">
            See repayments on this budget
            <ArrowRight className="btn-arrow" aria-hidden="true" />
          </button>
          <ButtonLink to={user ? '/application/new' : '/signup'} variant="outline">
            Get an agreement in principle
          </ButtonLink>
        </div>
      </div>
      <ResultBar label="You could borrow" value={pounds(result.typical)} target={summaryRef} active={active} />
    </div>
  )
}

import { ArrowRight, Download, Link2, TrendingDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { BalanceChart } from '@/components/charts/BalanceChart'
import { SplitBar } from '@/components/charts/SplitBar'
import { YearBars } from '@/components/charts/YearBars'
import { FigLabel } from '@/components/ui/Figure'
import { RangeField } from '@/components/ui/RangeField'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { Segmented } from '@/components/ui/Segmented'
import { Stat } from '@/components/ui/Stat'
import { useToast } from '@/components/ui/Toast'
import { readChoice, readNumber, useUrlSync } from '@/hooks/useUrlSync'
import { saveScenario } from '@/lib/application'
import { ResultBar } from './ResultBar'
import { clamp, duration, percent, pounds } from '@/lib/format'
import { buildSchedule, loanToValue, monthlyPayment, type RepaymentType } from '@/lib/mortgage'
import { DEFAULT_RATE, productFor, productKinds, type ProductKind } from '@/lib/products'

const types = [
  { value: 'repayment', label: 'Repayment' },
  { value: 'interest-only', label: 'Interest only' },
] as const

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })

export interface RepaymentPreset {
  price: number
  deposit: number
  /** Changes every time a preset is sent, so the same values can be re-applied. */
  nonce: number
}

export function Repayments({ active, preset }: { active: boolean; preset: RepaymentPreset | null }) {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [price, setPrice] = useState(() => readNumber(params, 'price', 320_000, 50_000, 3_000_000))
  const [depositPct, setDepositPct] = useState(() => clamp(readNumber(params, 'deposit', 48_000, 0, 3_000_000) / readNumber(params, 'price', 320_000, 50_000, 3_000_000), 0, 0.95))
  const [rate, setRate] = useState(() => readNumber(params, 'rate', DEFAULT_RATE, 0.1, 15))
  const [term, setTerm] = useState(() => Math.round(readNumber(params, 'term', 30, 5, 40)))
  const [over, setOver] = useState(() => readNumber(params, 'over', 0, 0, 5_000))
  const [type, setType] = useState<RepaymentType>(() => readChoice(params, 'type', ['repayment', 'interest-only'] as const, 'repayment'))
  const [showAll, setShowAll] = useState(false)
  const summaryRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!preset) return
    setPrice(clamp(preset.price, 50_000, 3_000_000))
    setDepositPct(clamp(preset.deposit / preset.price, 0, 0.95))
  }, [preset])

  const deposit = Math.round((price * depositPct) / 500) * 500
  const loan = price - deposit
  const ltv = loanToValue(loan, price)

  useUrlSync({ price, deposit, rate, term, over, type }, active)

  const schedule = useMemo(
    () => buildSchedule({ principal: loan, annualRate: rate, termYears: term, type, monthlyOverpayment: over }),
    [loan, rate, term, type, over],
  )
  const baseline = useMemo(
    () => (over > 0 ? buildSchedule({ principal: loan, annualRate: rate, termYears: term, type }) : null),
    [loan, rate, term, type, over],
  )

  const interestOnly = type === 'interest-only'
  const payoff = new Date()
  payoff.setMonth(payoff.getMonth() + schedule.months)
  const monthsSaved = baseline ? baseline.months - schedule.months : 0
  const interestSaved = baseline ? baseline.totalInterest - schedule.totalInterest : 0

  const quickRates = (Object.keys(productKinds) as ProductKind[]).flatMap((kind) => {
    const product = productFor(kind, ltv)
    return product ? [{ kind, rate: product.rate }] : []
  })

  const stress = [-1, 0, 1, 2, 3]
    .map((delta) => rate + delta)
    .filter((r) => r > 0)
    .map((r) => ({
      rate: r,
      monthly: interestOnly ? (loan * r) / 100 / 12 : monthlyPayment(loan, r, term * 12),
    }))

  const rows = showAll ? schedule.years : schedule.years.slice(0, 5)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast('Link to this calculation copied')
    } catch {
      toast('Copy the address bar to share this calculation')
    }
  }

  const downloadCsv = () => {
    const lines = [
      'Year,Interest,Capital,Balance,Share owned (%)',
      ...schedule.years.map((y) =>
        [y.year, y.interestPaid.toFixed(2), y.principalPaid.toFixed(2), y.balance.toFixed(2), ((1 - y.balance / price) * 100).toFixed(1)].join(','),
      ),
    ]
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'mortgage-schedule.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast('Schedule downloaded')
  }

  const apply = () => {
    saveScenario({ propertyValue: price, deposit, termYears: term })
    navigate('/application/new', { viewTransition: true })
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22.5rem_minmax(0,1fr)] lg:gap-8">
      {/* ---- Inputs ---------------------------------------------------- */}
      <form className="sheet ticks self-start lg:sticky lg:top-24" onSubmit={(e) => e.preventDefault()} aria-label="Mortgage details">
        <div className="border-b border-line px-6 py-3.5">
          <FigLabel>Your mortgage</FigLabel>
        </div>
        <div className="space-y-5 px-6 py-6">
          <RangeField label="Property price" prefix="£" value={price} min={50_000} max={1_500_000} step={5_000} onChange={setPrice} />
          <RangeField
            label="Deposit"
            prefix="£"
            value={deposit}
            min={0}
            max={Math.floor((price * 0.95) / 500) * 500}
            step={500}
            onChange={(v) => setDepositPct(clamp(v / price, 0, 0.95))}
            hint={`${percent(depositPct * 100, 0)} of the price, so you borrow ${pounds(loan)}`}
          />
          <div>
            <RangeField label="Interest rate" suffix="%" decimals={2} value={rate} min={0.5} max={12} step={0.05} onChange={setRate} />
            {quickRates.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {quickRates.map((q) => (
                  <button
                    key={q.kind}
                    type="button"
                    onClick={() => setRate(q.rate)}
                    aria-pressed={rate === q.rate}
                    className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-[0.6875rem] text-ink-2 transition-colors hover:border-blue hover:text-blue-ink aria-pressed:border-blue aria-pressed:bg-blue-wash aria-pressed:text-blue-ink"
                  >
                    {productKinds[q.kind].short} {percent(q.rate)}
                  </button>
                ))}
              </div>
            )}
          </div>
          <RangeField label="Term" suffix="years" value={term} min={5} max={40} onChange={setTerm} />
          <Segmented label="Repayment type" options={types} value={type} onChange={setType} />
          <RangeField
            label="Monthly overpayment"
            prefix="£"
            value={over}
            min={0}
            max={2_000}
            step={25}
            onChange={setOver}
            tone="red"
            hint="Most lenders allow up to 10% of the balance a year without a charge"
          />
        </div>
        <div className="grid gap-2.5 border-t border-line px-6 py-5">
          <button type="button" onClick={apply} className="btn btn-solid w-full">
            Apply with these numbers
            <ArrowRight className="btn-arrow" aria-hidden="true" />
          </button>
          <button type="button" onClick={copyLink} className="btn btn-ghost btn-sm w-full">
            <Link2 aria-hidden="true" />
            Copy a link to this calculation
          </button>
        </div>
      </form>

      {/* ---- Results --------------------------------------------------- */}
      <div className="min-w-0 space-y-6">
        <section ref={summaryRef} className="sheet scroll-mt-24" aria-label="Summary">
          <div>
            <div className="px-6 pt-7 pb-6 sm:px-8">
              <p className="label">{interestOnly ? 'Monthly interest' : 'Monthly payment'}</p>
              <p className="mt-2 flex items-baseline gap-2">
                <RollingNumber text={pounds(schedule.monthlyPayment)} className="text-[clamp(3rem,7vw,4.5rem)] font-semibold tracking-[-0.045em]" />
              </p>
              <p className="mt-1 min-h-5 text-sm text-ink-3">
                {over > 0 ? (
                  <>
                    plus {pounds(over)} overpayment, so <span className="tnum font-medium text-ink">{pounds(schedule.monthlyPayment + over)}</span> leaves your account
                  </>
                ) : (
                  <>
                    at {percent(rate)} over {term} years
                  </>
                )}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line px-6 py-6 sm:px-8 xl:grid-cols-4">
              <Stat label="You borrow" value={pounds(loan)} sub={`${percent(ltv, 0)} loan to value`} />
              <Stat label="Total interest" value={pounds(schedule.totalInterest)} sub={loan > 0 ? `${Math.round((schedule.totalInterest / loan) * 100)}p per £1 borrowed` : undefined} />
              <Stat label="Total repaid" value={pounds(schedule.totalPaid)} sub="capital and interest" />
              <Stat
                label={interestOnly && schedule.balloon > 0 ? 'Due at the end' : 'Mortgage-free'}
                value={interestOnly && schedule.balloon > 0 ? pounds(schedule.balloon) : monthYear.format(payoff)}
                sub={interestOnly && schedule.balloon > 0 ? `in ${monthYear.format(payoff)}` : `in ${duration(schedule.months)}`}
              />
            </dl>
          </div>

          {baseline && (interestSaved > 0 || monthsSaved > 0) && (
            <div className="flex items-start gap-3.5 border-t border-line bg-good-wash px-6 py-4 sm:px-8" style={{ animation: 'fade-in 0.5s ease both' }}>
              <span className="mt-0.5 grid size-7 flex-none place-items-center rounded-full bg-good text-white">
                <TrendingDown className="size-3.5" aria-hidden="true" />
              </span>
              <p className="text-[0.9375rem] text-ink">
                Overpaying {pounds(over)} a month saves <strong className="tnum font-semibold">{pounds(interestSaved)}</strong> in interest
                {monthsSaved > 0 ? (
                  <>
                    {' '}
                    and clears the mortgage <strong className="font-semibold">{duration(monthsSaved)} early</strong>.
                  </>
                ) : (
                  <>
                    {' '}
                    and leaves <strong className="tnum font-semibold">{pounds(schedule.balloon)}</strong> to repay at the end instead of {pounds(baseline.balloon)}.
                  </>
                )}
              </p>
            </div>
          )}
        </section>

        <section className="sheet">
          <div className="border-b border-line px-6 py-3.5 sm:px-8">
            <FigLabel
              n="02"
              aside={
                baseline ? (
                  <span className="flex items-center gap-4 normal-case tracking-normal">
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-3.5 rounded-full bg-blue" aria-hidden="true" /> With overpayments
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-0.5 w-3.5" style={{ backgroundImage: 'linear-gradient(90deg, var(--ink-3) 60%, transparent 60%)', backgroundSize: '5px 2px' }} aria-hidden="true" /> Without
                    </span>
                  </span>
                ) : undefined
              }
            >
              What you still owe
            </FigLabel>
          </div>
          <div className="px-3 pt-5 pb-3 sm:px-5">
            <BalanceChart balances={schedule.balances} baseline={baseline?.balances} termYears={term} propertyValue={price} />
          </div>
        </section>

        <section className="sheet">
          <div className="border-b border-line px-6 py-3.5 sm:px-8">
            <FigLabel
              n="03"
              aside={
                <span className="flex items-center gap-4 normal-case tracking-normal">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-[3px] bg-red" aria-hidden="true" /> Interest
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-[3px] bg-blue" aria-hidden="true" /> Capital
                  </span>
                </span>
              }
            >
              Where each year’s payments go
            </FigLabel>
          </div>
          <div className="px-3 pt-5 pb-3 sm:px-5">
            <YearBars years={schedule.years} termYears={term} />
          </div>
          <div className="border-t border-line px-6 py-5 sm:px-8">
            <p className="label mb-3">Every pound you pay the lender</p>
            <SplitBar
              ariaLabel="Total paid, split into capital and interest"
              parts={[
                { label: 'Capital', value: loan, color: 'var(--blue)' },
                { label: 'Interest', value: schedule.totalInterest, color: 'var(--red)' },
              ]}
            />
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_1.35fr]">
          <section className="sheet self-start">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="04">If your rate changes</FigLabel>
            </div>
            <div className="px-6 pb-2">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Rate</th>
                    <th scope="col">Monthly</th>
                    <th scope="col">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {stress.map((s) => {
                    const diff = s.monthly - schedule.monthlyPayment
                    const current = s.rate === rate
                    return (
                      <tr key={s.rate} className={current ? 'bg-blue-wash' : ''}>
                        <th scope="row" className="text-left font-normal">
                          <span className={current ? 'pl-2 font-semibold' : ''}>{percent(s.rate)}</span>
                          {current && <span className="label ml-2 text-blue-ink">now</span>}
                        </th>
                        <td className={current ? 'font-semibold' : ''}>{pounds(s.monthly)}</td>
                        <td className={current ? 'text-ink-3' : diff > 0 ? 'text-red-ink' : 'text-good'}>
                          <span className={current ? 'pr-2' : ''}>{current ? '—' : `${diff > 0 ? '+' : '−'}${pounds(Math.abs(diff))}`}</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sheet min-w-0">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel
                n="05"
                aside={
                  <button type="button" onClick={downloadCsv} className="inline-flex items-center gap-1.5 text-blue-ink hover:text-blue">
                    <Download className="size-3" aria-hidden="true" />
                    CSV
                  </button>
                }
              >
                Schedule
              </FigLabel>
            </div>
            <div className="relative overflow-x-auto px-6">
              <table className="table">
                <caption className="sr-only">Year by year repayment schedule</caption>
                <thead>
                  <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Interest</th>
                    <th scope="col">Capital</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Yours</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((y) => (
                    <tr key={y.year}>
                      <th scope="row" className="text-left font-normal text-ink-2">
                        {y.year}
                      </th>
                      <td>{pounds(y.interestPaid)}</td>
                      <td>{pounds(y.principalPaid)}</td>
                      <td>{pounds(y.balance)}</td>
                      <td className="text-ink-2">{Math.round((1 - y.balance / price) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {schedule.years.length > 5 && (
              <div className="px-6 py-3.5">
                <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll} className="link text-sm font-medium text-blue-ink">
                  {showAll ? 'Show the first five years' : `Show all ${schedule.years.length} years`}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <ResultBar label={interestOnly ? 'Monthly interest' : 'Monthly payment'} value={pounds(schedule.monthlyPayment)} target={summaryRef} active={active} />
    </div>
  )
}

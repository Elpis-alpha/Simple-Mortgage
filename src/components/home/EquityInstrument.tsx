import { Pause, Play } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DimensionLine } from '@/components/drawing/DimensionLine'
import { HouseElevation } from '@/components/drawing/HouseElevation'
import { FigLabel } from '@/components/ui/Figure'
import { RangeField } from '@/components/ui/RangeField'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { clamp, percent, pounds } from '@/lib/format'
import { buildSchedule, equityShare, loanToValue } from '@/lib/mortgage'
import { productFor, productKinds } from '@/lib/products'

const PLAY_MS = 6000

/**
 * The hero instrument. Three sliders set up a mortgage; the timeline under
 * the drawing scrubs through its life, and the house fills with the share
 * you own at that point.
 */
export function EquityInstrument() {
  const [price, setPrice] = useState(320_000)
  const [depositPct, setDepositPct] = useState(0.15)
  const [term, setTerm] = useState(30)
  const [year, setYear] = useState(0)
  const [playing, setPlaying] = useState(false)
  const touched = useRef(false)

  const deposit = Math.round((price * depositPct) / 500) * 500
  const loan = price - deposit
  const ltv = loanToValue(loan, price)
  const product = productFor('fix5', ltv)
  const rate = product?.rate ?? 6.05

  const schedule = useMemo(() => buildSchedule({ principal: loan, annualRate: rate, termYears: term }), [loan, rate, term])
  const share = equityShare(schedule, price, year * 12)

  // Keep the timeline inside the term when the term shortens.
  useEffect(() => setYear((y) => Math.min(y, term)), [term])

  // A short opening move so the fill visibly rises, hinting that time is draggable.
  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!touched.current) setYear(8)
    }, 2100)
    return () => window.clearTimeout(id)
  }, [])

  // "Play" runs the whole term in a few seconds.
  useEffect(() => {
    if (!playing) return
    let frame = 0
    const from = year >= term ? 0 : year
    const started = performance.now() - (from / term) * PLAY_MS
    const tick = (now: number) => {
      const t = clamp((now - started) / PLAY_MS, 0, 1)
      setYear(Math.round(t * term * 4) / 4)
      if (t < 1) frame = requestAnimationFrame(tick)
      else setPlaying(false)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
    // Only restart when play is toggled; `year` is read once as the start point.
  }, [playing, term])

  const touch = () => {
    touched.current = true
    setPlaying(false)
  }

  const wholeYear = Math.round(year)
  const story =
    wholeYear === 0
      ? `On day one you own ${Math.round(share * 100)}%: your deposit.`
      : wholeYear >= term
        ? `After ${term} years the house is entirely yours.`
        : `After ${wholeYear} ${wholeYear === 1 ? 'year' : 'years'} you own ${Math.round(share * 100)}% of your home.`

  const query = new URLSearchParams({ price: String(price), deposit: String(deposit), term: String(term), rate: String(rate) })

  return (
    <div className="sheet ticks relative">
      <div className="border-b border-line px-5 py-3.5 sm:px-6">
        <FigLabel
          n="01"
          aside={
            <span className="flex items-center gap-3.5 normal-case tracking-normal">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-[2px] bg-blue/25 ring-1 ring-blue/50" aria-hidden="true" /> Yours
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-[2px] ring-1 ring-line-strong"
                  style={{ background: 'repeating-linear-gradient(45deg, var(--line-strong) 0 1px, transparent 1px 3.5px)' }}
                  aria-hidden="true"
                />
                Lender’s
              </span>
            </span>
          }
        >
          Equity elevation
        </FigLabel>
      </div>

      <div className="px-5 pt-3 sm:px-6">
        <HouseElevation share={share} />
        <DimensionLine
          className="mx-[25%] -mt-2"
          segments={[
            { share: deposit / price, label: 'Deposit', value: pounds(deposit), tone: 'blue' },
            { share: loan / price, label: 'Mortgage', value: pounds(loan), tone: 'ink' },
          ]}
        />

        {/* Timeline */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              touched.current = true
              setPlaying((p) => !p)
            }}
            aria-label={playing ? 'Pause the timeline' : 'Play through the whole term'}
            className="grid size-9 flex-none place-items-center rounded-full bg-solid text-on-solid transition-colors hover:bg-blue hover:text-white"
          >
            {playing ? <Pause className="size-3.5" fill="currentColor" aria-hidden="true" /> : <Play className="size-3.5 translate-x-px" fill="currentColor" aria-hidden="true" />}
          </button>
          <div className="min-w-0 flex-1">
            <input
              type="range"
              className="range range-red"
              min={0}
              max={term}
              step={0.25}
              value={year}
              onChange={(e) => {
                touch()
                setYear(Number(e.target.value))
              }}
              aria-label="Years into the mortgage"
              aria-valuetext={`Year ${wholeYear} of ${term}`}
              style={{ '--fill': `${(year / term) * 100}%` } as CSSProperties}
            />
            <div className="label -mt-1 flex justify-between">
              <span>Today</span>
              <span className="text-red-ink">Year {wholeYear}</span>
              <span>Year {term}</span>
            </div>
          </div>
        </div>
        <p className="mt-2 text-[0.9375rem] text-ink-2" aria-live="polite">
          {story}
        </p>
      </div>

      <div className="mt-4 grid gap-x-8 gap-y-6 border-t border-line px-5 py-4 sm:grid-cols-[auto_1fr] sm:px-6">
        <div className="sm:min-w-44">
          <p className="label">Monthly payment</p>
          <p className="mt-1.5 flex items-baseline gap-1.5 text-ink">
            <RollingNumber text={pounds(schedule.monthlyPayment)} className="text-[2.625rem] font-semibold tracking-[-0.04em]" />
          </p>
          <dl className="mt-3 space-y-1 font-mono text-[0.75rem] text-ink-3">
            <div className="flex justify-between gap-4">
              <dt>Rate</dt>
              <dd className="tnum text-ink-2">{percent(rate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Loan to value</dt>
              <dd className="tnum text-ink-2">{percent(ltv, 0)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Total interest</dt>
              <dd className="tnum text-ink-2">{pounds(schedule.totalInterest)}</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-2">
          <RangeField
            label="Property price"
            prefix="£"
            value={price}
            min={100_000}
            max={1_200_000}
            step={5_000}
            onChange={(v) => {
              touch()
              setPrice(v)
            }}
          />
          <RangeField
            label="Deposit"
            prefix="£"
            value={deposit}
            min={Math.ceil((price * 0.05) / 500) * 500}
            max={Math.floor((price * 0.6) / 500) * 500}
            step={500}
            onChange={(v) => {
              touch()
              setDepositPct(clamp(v / price, 0.05, 0.6))
            }}
          />
          <RangeField
            label="Term"
            suffix="years"
            value={term}
            min={5}
            max={40}
            onChange={(v) => {
              touch()
              setTerm(v)
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line px-5 py-3 sm:px-6">
        <p className="label normal-case tracking-normal">
          {productKinds.fix5.label}, illustrative. Assumes the value of the home stays the same.
        </p>
        <Link to={`/calculator?${query}`} viewTransition className="group inline-flex items-center gap-1.5 text-sm font-medium text-blue-ink">
          <span className="link">Open the full calculator</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}

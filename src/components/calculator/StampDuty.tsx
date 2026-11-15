import { Info } from 'lucide-react'
import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FigLabel } from '@/components/ui/Figure'
import { RangeField } from '@/components/ui/RangeField'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { Segmented } from '@/components/ui/Segmented'
import { readChoice, readNumber, useUrlSync } from '@/hooks/useUrlSync'
import { percent, pounds, poundsCompact } from '@/lib/format'
import { calcStampDuty, FIRST_TIME_BUYER_CAP, type BuyerType } from '@/lib/stampDuty'
import { ResultBar } from './ResultBar'

const buyers = [
  { value: 'first-time', label: 'First home' },
  { value: 'home-mover', label: 'Moving' },
  { value: 'additional', label: 'Additional' },
] as const

const buyerNames: Record<BuyerType, string> = {
  'first-time': 'First-time buyer',
  'home-mover': 'Moving home',
  additional: 'Additional property',
}

/** One hue, light to dark: a heavier tax rate gets a heavier block. */
const rampOpacity = [0.14, 0.34, 0.56, 0.78, 1]

const bandName = (from: number, to: number) => (to === Infinity ? `Over ${poundsCompact(from)}` : `${from === 0 ? '£0' : poundsCompact(from)} – ${poundsCompact(to)}`)

export function StampDuty({ active }: { active: boolean }) {
  const [params] = useSearchParams()
  const summaryRef = useRef<HTMLElement>(null)
  const [price, setPrice] = useState(() => readNumber(params, 'value', 320_000, 40_000, 3_000_000))
  const [buyer, setBuyer] = useState<BuyerType>(() => readChoice(params, 'buyer', ['first-time', 'home-mover', 'additional'] as const, 'home-mover'))

  useUrlSync({ value: price, buyer }, active)

  const result = calcStampDuty(price, buyer)
  const used = result.bands.filter((b) => b.taxable > 0)
  const reliefLost = buyer === 'first-time' && !result.reliefApplied

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[22.5rem_minmax(0,1fr)] lg:gap-8">
      <form className="sheet ticks self-start lg:sticky lg:top-24" onSubmit={(e) => e.preventDefault()} aria-label="Purchase details">
        <div className="border-b border-line px-6 py-3.5">
          <FigLabel>Your purchase</FigLabel>
        </div>
        <div className="space-y-6 px-6 py-6">
          <RangeField label="Purchase price" prefix="£" value={price} min={40_000} max={2_000_000} step={5_000} onChange={setPrice} />
          <Segmented label="What are you buying?" options={buyers} value={buyer} onChange={setBuyer} />
        </div>
        <p className="flex gap-2.5 border-t border-line px-6 py-4 text-[0.8125rem] text-ink-3">
          <Info className="mt-0.5 size-3.5 flex-none" aria-hidden="true" />
          Stamp Duty Land Tax for England and Northern Ireland, at the rates in force since 1 April 2025. Scotland and Wales charge their own taxes.
        </p>
      </form>

      <div className="min-w-0 space-y-6">
        <section ref={summaryRef} className="sheet scroll-mt-24">
          <div className="grid gap-x-10 gap-y-6 px-6 py-7 sm:px-8 xl:grid-cols-[auto_1fr] xl:items-end">
            <div>
              <p className="label">Stamp duty to pay</p>
              <p className="mt-2">
                <RollingNumber text={pounds(result.total)} className="text-[clamp(3rem,7vw,4.5rem)] font-semibold tracking-[-0.045em]" />
              </p>
              <p className="mt-1 text-sm text-ink-3">
                {result.total === 0 ? 'Nothing to pay at this price' : <>an effective rate of {percent(result.effectiveRate)} of the price</>}
              </p>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3">
              {(Object.keys(buyerNames) as BuyerType[]).map((b) => {
                const selected = b === buyer
                return (
                  <li key={b}>
                    <button
                      type="button"
                      onClick={() => setBuyer(b)}
                      aria-pressed={selected}
                      className={`block size-full px-4 py-3.5 text-left transition-colors ${selected ? 'bg-raised shadow-[inset_0_0_0_99px_var(--blue-wash)]' : 'bg-raised hover:bg-paper'}`}
                    >
                      <span className="label block">{buyerNames[b]}</span>
                      <span className="tnum mt-1 block text-lg font-semibold tracking-tight">{pounds(calcStampDuty(price, b).total)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          {reliefLost && (
            <p className="flex items-start gap-3 border-t border-line bg-red-wash px-6 py-4 text-[0.9375rem] text-ink sm:px-8">
              <Info className="mt-0.5 size-4 flex-none text-red-ink" aria-hidden="true" />
              First-time buyer relief stops completely above {pounds(FIRST_TIME_BUYER_CAP)}, so the standard rates apply to the whole price.
            </p>
          )}
        </section>

        <section className="sheet">
          <div className="border-b border-line px-6 py-3.5 sm:px-8">
            <FigLabel n="08">The price, band by band</FigLabel>
          </div>
          <div className="px-6 py-6 sm:px-8">
            {/* A ruler the length of the price, cut where each band ends. */}
            <div
              role="img"
              aria-label={`The price split across tax bands: ${used.map((b) => `${pounds(b.taxable)} at ${b.rate}%`).join(', ')}`}
              className="flex h-7 gap-0.5"
            >
              {used.map((b) => {
                const index = result.bands.indexOf(b)
                const share = (b.taxable / price) * 100
                const opacity = rampOpacity[Math.min(index, rampOpacity.length - 1)]!
                return (
                  <div
                    key={b.from}
                    title={`${pounds(b.taxable)} taxed at ${b.rate}%`}
                    className="relative flex min-w-1 items-center overflow-hidden rounded-[4px] transition-[flex-basis] duration-700 ease-(--ease-out-expo)"
                    style={{ flexBasis: `${share}%` }}
                  >
                    <span className="absolute inset-0 bg-blue" style={{ opacity }} />
                    {share >= 9 && <span className={`tnum relative px-2 text-[0.75rem] font-semibold ${opacity > 0.5 ? 'text-white' : 'text-ink'}`}>{b.rate}%</span>}
                  </div>
                )
              })}
            </div>
            <div className="label mt-2 flex justify-between">
              <span>£0</span>
              <span>{pounds(price)}</span>
            </div>
          </div>
          <div className="relative overflow-x-auto border-t border-line px-6 pb-2 sm:px-8">
            <table className="table">
              <caption className="sr-only">Stamp duty by band</caption>
              <thead>
                <tr>
                  <th scope="col">Band</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Taxed in band</th>
                  <th scope="col">Tax</th>
                </tr>
              </thead>
              <tbody>
                {result.bands.map((b, i) => (
                  <tr key={b.from} className={b.taxable === 0 ? 'text-ink-3' : ''}>
                    <th scope="row" className="text-left font-normal">
                      <span className="mr-2.5 inline-block size-2.5 rounded-[3px] bg-blue align-baseline" style={{ opacity: rampOpacity[Math.min(i, rampOpacity.length - 1)] }} aria-hidden="true" />
                      {bandName(b.from, b.to)}
                    </th>
                    <td>{b.rate}%</td>
                    <td>{pounds(b.taxable)}</td>
                    <td className={b.tax > 0 ? 'font-semibold' : ''}>{pounds(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row" className="py-3 text-left font-semibold">
                    Total
                  </th>
                  <td className="border-0 text-ink-2">{percent(result.effectiveRate)}</td>
                  <td className="border-0 text-ink-2">{pounds(price)}</td>
                  <td className="border-0 text-base font-semibold">{pounds(result.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>
      <ResultBar label="Stamp duty" value={pounds(result.total)} target={summaryRef} active={active} />
    </div>
  )
}

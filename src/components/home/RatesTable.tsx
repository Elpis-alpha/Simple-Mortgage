import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Segmented } from '@/components/ui/Segmented'
import { percent, pounds } from '@/lib/format'
import { monthlyPayment } from '@/lib/mortgage'
import { productKinds, products, type ProductKind } from '@/lib/products'

const kinds = (Object.keys(productKinds) as ProductKind[]).map((k) => ({ value: k, label: productKinds[k].short }))
const EXAMPLE_LOAN = 200_000
const EXAMPLE_TERM = 25

export function RatesTable() {
  const [kind, setKind] = useState<ProductKind>('fix5')
  const rows = products.filter((p) => p.kind === kind)
  const best = Math.min(...rows.map((r) => r.rate))

  return (
    <div className="sheet ticks">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-7">
        <p className="text-[0.9375rem] text-ink-2">{productKinds[kind].note}</p>
        <div className="w-full sm:w-auto sm:min-w-[21rem]">
          <Segmented label="Product type" hideLabel options={kinds} value={kind} onChange={setKind} />
        </div>
      </div>
      <div className="relative overflow-x-auto px-5 pb-2 sm:px-7">
        <table className="table min-w-[34rem]">
          <caption className="sr-only">Illustrative {productKinds[kind].label} rates by loan-to-value</caption>
          <thead>
            <tr>
              <th scope="col">Loan to value</th>
              <th scope="col">Rate</th>
              <th scope="col">Product fee</th>
              <th scope="col">Monthly, per £200k</th>
              <th scope="col">
                <span className="sr-only">Try it</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="group">
                <th scope="row" className="py-3.5 text-left font-normal">
                  Up to {row.maxLtv}%
                  {row.rate === best && <span className="label ml-3 rounded-full bg-blue-wash px-2 py-0.5 text-blue-ink">Lowest</span>}
                </th>
                <td>
                  <span className="text-[1.0625rem] font-semibold tracking-tight">{percent(row.rate)}</span>
                </td>
                <td className="text-ink-2">{pounds(row.fee)}</td>
                <td className="text-ink-2">{pounds(monthlyPayment(EXAMPLE_LOAN, row.rate, EXAMPLE_TERM * 12))}</td>
                <td>
                  <Link
                    to={`/calculator?rate=${row.rate}`}
                    viewTransition
                    aria-label={`Try ${percent(row.rate)} in the calculator`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-ink opacity-70 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                  >
                    Try it
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="label border-t border-line px-5 py-3 normal-case tracking-normal sm:px-7">
        Illustrative rates for this concept, not real offers. Monthly figures assume a {EXAMPLE_TERM}-year repayment mortgage of {pounds(EXAMPLE_LOAN)}.
      </p>
    </div>
  )
}

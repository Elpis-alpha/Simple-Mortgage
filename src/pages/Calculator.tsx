import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Borrowing } from '@/components/calculator/Borrowing'
import { Repayments, type RepaymentPreset } from '@/components/calculator/Repayments'
import { StampDuty } from '@/components/calculator/StampDuty'
import { CallToAction } from '@/components/layout/CallToAction'
import { PageHeader } from '@/components/layout/PageHeader'
import { Segmented } from '@/components/ui/Segmented'
import { useMeta } from '@/hooks/useMeta'
import { readChoice } from '@/hooks/useUrlSync'

const tabs = [
  { value: 'repayments', label: 'Repayments' },
  { value: 'borrow', label: 'Borrowing' },
  { value: 'stamp-duty', label: 'Stamp duty' },
] as const

type Tab = (typeof tabs)[number]['value']

export default function Calculator() {
  useMeta('Mortgage calculators', 'Work out monthly repayments, how much you could borrow and the stamp duty on a purchase. Every figure shows its working.')
  const [params, setParams] = useSearchParams()
  const tab = readChoice<Tab>(params, 'tab', ['repayments', 'borrow', 'stamp-duty'], 'repayments')
  const [preset, setPreset] = useState<RepaymentPreset | null>(null)

  // Each calculator keeps its own values in the query; switching starts a clean one.
  const go = (next: Tab) => setParams(next === 'repayments' ? {} : { tab: next }, { replace: true, preventScrollReset: true })

  return (
    <>
      <PageHeader
        sheet="Sheet 02 · Calculators"
        title={
          <>
            Do the sums <em>in the open</em>.
          </>
        }
        lede="Three calculators, no sign-up. Move a slider and every figure, chart and table updates with it. The address bar keeps your numbers, so a result can be bookmarked or shared."
      >
        <div className="max-w-xl">
          <Segmented label="Calculator" hideLabel size="lg" options={tabs} value={tab} onChange={go} />
        </div>
      </PageHeader>

      {/* All three stay mounted so switching back keeps what you entered. */}
      <div className="wrap">
        <div hidden={tab !== 'repayments'}>
          <Repayments active={tab === 'repayments'} preset={preset} />
        </div>
        <div hidden={tab !== 'borrow'}>
          <Borrowing
            active={tab === 'borrow'}
            onUseBudget={(price, deposit) => {
              setPreset({ price, deposit, nonce: Date.now() })
              go('repayments')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </div>
        <div hidden={tab !== 'stamp-duty'}>
          <StampDuty active={tab === 'stamp-duty'} />
        </div>
      </div>

      <CallToAction />
    </>
  )
}

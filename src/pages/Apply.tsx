import { ArrowLeft, ArrowRight, Check, Pencil } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ServiceGlyph } from '@/components/home/ServiceGlyph'
import { MoneyField, SelectField, TextField } from '@/components/ui/Field'
import { FigLabel } from '@/components/ui/Figure'
import { RangeField } from '@/components/ui/RangeField'
import { RollingNumber } from '@/components/ui/RollingNumber'
import { Segmented } from '@/components/ui/Segmented'
import { useToast } from '@/components/ui/Toast'
import { useMeta } from '@/hooks/useMeta'
import {
  assess,
  createApplication,
  emptyApplication,
  employments,
  loadDraft,
  loadScenario,
  purposes,
  saveApplication,
  saveDraft,
  type ApplicationData,
  type Employment,
  type Purpose,
} from '@/lib/application'
import { useAuth } from '@/lib/auth'
import { clamp, percent, pounds } from '@/lib/format'
import { productKinds, type ProductKind } from '@/lib/products'
import { remove } from '@/lib/storage'

const steps = ['About you', 'Income', 'Property', 'Review'] as const
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Errors = Partial<Record<keyof ApplicationData | 'consent', string>>

const applicantOptions = [
  { value: '1', label: 'Just me' },
  { value: '2', label: 'Two of us' },
] as const

const productOptions = (Object.keys(productKinds) as ProductKind[]).map((k) => ({ value: k, label: productKinds[k].short }))

function ageOn(dateOfBirth: string, today = new Date()): number {
  const dob = new Date(dateOfBirth)
  if (Number.isNaN(dob.getTime())) return -1
  let age = today.getFullYear() - dob.getFullYear()
  const beforeBirthday = today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  if (beforeBirthday) age--
  return age
}

function validate(step: number, d: ApplicationData): Errors {
  const e: Errors = {}
  if (step === 0) {
    if (d.firstName.trim().length < 1) e.firstName = 'Enter your first name'
    if (d.lastName.trim().length < 1) e.lastName = 'Enter your last name'
    const age = ageOn(d.dateOfBirth)
    if (age < 0) e.dateOfBirth = 'Enter your date of birth'
    else if (age < 18) e.dateOfBirth = 'You need to be 18 or over to apply'
    else if (age > 100) e.dateOfBirth = 'Check the year'
    if (!EMAIL.test(d.email.trim())) e.email = 'Enter an email address like name@example.com'
    if (d.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a phone number with at least 10 digits'
  }
  if (step === 1) {
    if (d.income < 1_000) e.income = 'Enter your yearly income before tax'
    if (d.applicants === 2 && d.partnerIncome < 0) e.partnerIncome = 'Enter the second income, or 0'
  }
  if (step === 2) {
    if (d.propertyValue < 50_000) e.propertyValue = 'Enter a price of at least £50,000'
    if (d.deposit <= 0) e.deposit = 'Enter your deposit'
    else if (d.deposit >= d.propertyValue) e.deposit = 'The deposit needs to be less than the price'
  }
  return e
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className="border-b border-line py-5 first:pt-0">
      <div className="flex items-center justify-between">
        <h3 className="label text-ink">{title}</h3>
        <button type="button" onClick={onEdit} className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-ink hover:text-blue">
          <Pencil className="size-3" aria-hidden="true" />
          Edit
        </button>
      </div>
      <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">{children}</dl>
    </div>
  )
}

const Row = ({ k, v }: { k: string; v: ReactNode }) => (
  <div className="flex justify-between gap-4 text-[0.9375rem]">
    <dt className="text-ink-3">{k}</dt>
    <dd className="tnum text-right font-medium text-ink">{v}</dd>
  </div>
)

export default function Apply() {
  useMeta('Agreement in principle', 'Four short steps to an agreement in principle.')
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const accountId = user!.id

  const [data, setData] = useState<ApplicationData>(() => {
    const draft = loadDraft(accountId)
    const scenario = loadScenario()
    const [first = '', ...rest] = user!.name.split(' ')
    return {
      ...emptyApplication,
      firstName: first,
      lastName: rest.join(' '),
      email: user!.email.endsWith('.example') ? '' : user!.email,
      ...(scenario ?? {}),
      ...(draft ?? {}),
    }
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const set = <K extends keyof ApplicationData>(key: K, value: ApplicationData[K]) => {
    setData((d) => ({ ...d, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  // Save as you go, so closing the tab does not lose anything.
  useEffect(() => saveDraft(accountId, data), [accountId, data])

  const decision = useMemo(() => assess(data), [data])
  const usage = decision.maxLoan > 0 ? decision.loan / decision.maxLoan : 2

  const goTo = (next: number) => {
    setStep(clamp(next, 0, steps.length - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (step < steps.length - 1) {
      const found = validate(step, data)
      setErrors(found)
      if (Object.keys(found).length === 0) goTo(step + 1)
      return
    }
    if (!consent) return setErrors({ consent: 'Tick the box to continue' })
    setSubmitting(true)
    window.setTimeout(() => {
      saveApplication(createApplication(accountId, data))
      remove(`draft:${accountId}`)
      remove('scenario')
      toast('Your agreement in principle is ready')
      navigate('/application', { viewTransition: true })
    }, 1300)
  }

  return (
    <section className="wrap pt-8 lg:pt-12">
      <p className="label flex items-center gap-3">
        <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
        Sheet 06 · Agreement in principle
      </p>

      {/* Progress: a dimension line with a station for each step. */}
      <ol className="mt-6 grid grid-cols-4 border-t border-line-strong">
        {steps.map((name, i) => {
          const state = i < step ? 'done' : i === step ? 'current' : 'todo'
          return (
            <li key={name} className="relative pt-4">
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-0.5 bg-blue transition-[width] duration-700 ease-(--ease-out-expo)"
                style={{ width: state === 'done' ? '100%' : state === 'current' ? '50%' : '0%' }}
              />
              <button
                type="button"
                onClick={() => i < step && goTo(i)}
                disabled={i > step}
                aria-current={state === 'current' ? 'step' : undefined}
                className="flex items-center gap-2.5 text-left disabled:cursor-default"
              >
                <span
                  className={`grid size-6 flex-none place-items-center rounded-full border font-mono text-[0.6875rem] transition-colors duration-300 ${
                    state === 'done' ? 'border-blue bg-blue text-white' : state === 'current' ? 'border-ink bg-solid text-on-solid' : 'border-line-strong text-ink-3'
                  }`}
                >
                  {state === 'done' ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : i + 1}
                </span>
                <span className={`hidden text-sm sm:block ${state === 'todo' ? 'text-ink-3' : 'font-medium text-ink'}`}>{name}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <form onSubmit={submit} noValidate className="sheet ticks">
          <div key={step} className="px-6 py-8 sm:px-10 sm:py-10" style={{ animation: 'fade-up 0.6s var(--ease-out-expo) both' }}>
            <p className="label">
              Step {step + 1} of {steps.length}
            </p>

            {step === 0 && (
              <>
                <h1 className="h-section mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)]">
                  First, a little <em>about you</em>.
                </h1>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <TextField label="First name" value={data.firstName} onChange={(e) => set('firstName', e.target.value)} autoComplete="given-name" error={errors.firstName} />
                  <TextField label="Last name" value={data.lastName} onChange={(e) => set('lastName', e.target.value)} autoComplete="family-name" error={errors.lastName} />
                  <TextField label="Date of birth" type="date" value={data.dateOfBirth} onChange={(e) => set('dateOfBirth', e.target.value)} autoComplete="bday" error={errors.dateOfBirth} max={new Date().toISOString().slice(0, 10)} />
                  <TextField label="Phone" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} autoComplete="tel" error={errors.phone} placeholder="07700 900123" />
                  <div className="sm:col-span-2">
                    <TextField label="Email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} autoComplete="email" error={errors.email} placeholder="ada@example.com" hint="We send the certificate here." />
                  </div>
                  <div className="sm:col-span-2 sm:max-w-sm">
                    <Segmented label="Who is the mortgage for?" options={applicantOptions} value={String(data.applicants) as '1' | '2'} onChange={(v) => set('applicants', v === '2' ? 2 : 1)} />
                  </div>
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <h1 className="h-section mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)]">
                  What comes in, and <em>what goes out</em>.
                </h1>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <SelectField label="Employment" value={data.employment} onChange={(e) => set('employment', e.target.value as Employment)}>
                    {(Object.keys(employments) as Employment[]).map((k) => (
                      <option key={k} value={k}>
                        {employments[k]}
                      </option>
                    ))}
                  </SelectField>
                  <MoneyField label="Yearly income, before tax" value={data.income} onChange={(v) => set('income', v)} error={errors.income} hint="Include regular bonus or overtime." />
                  {data.applicants === 2 && <MoneyField label="Second applicant’s income" value={data.partnerIncome} onChange={(v) => set('partnerIncome', v)} error={errors.partnerIncome} />}
                  <MoneyField label="Monthly commitments" value={data.monthlyCommitments} onChange={(v) => set('monthlyCommitments', v)} hint="Loans, car finance, cards, childcare." suffix="a month" />
                  <SelectField label="Dependants" value={data.dependants} onChange={(e) => set('dependants', Number(e.target.value))}>
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n === 0 ? 'None' : n}
                      </option>
                    ))}
                  </SelectField>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="h-section mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)]">
                  Now the <em>property</em>.
                </h1>
                <fieldset className="mt-8">
                  <legend className="field-label">What is the mortgage for?</legend>
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {(Object.keys(purposes) as Purpose[]).map((p) => {
                      const checked = data.purpose === p
                      return (
                        <label
                          key={p}
                          className={`relative cursor-pointer rounded-md border p-4 transition-colors duration-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus) ${
                            checked ? 'border-blue bg-blue-wash' : 'border-line-strong hover:border-ink-3'
                          }`}
                        >
                          <input type="radio" name="purpose" value={p} checked={checked} onChange={() => set('purpose', p)} className="sr-only" />
                          <ServiceGlyph kind={p} className="h-9 w-[3.375rem] text-ink" />
                          <span className="mt-3 block text-sm leading-snug font-medium">{purposes[p]}</span>
                          {checked && (
                            <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-blue text-white" style={{ animation: 'pop 0.35s var(--ease-spring) both' }}>
                              <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                            </span>
                          )}
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <MoneyField label={data.purpose === 'remortgage' ? 'Current value of the home' : 'Property price'} value={data.propertyValue} onChange={(v) => set('propertyValue', v)} error={errors.propertyValue} />
                  <MoneyField
                    label={data.purpose === 'remortgage' ? 'Equity you already own' : 'Deposit'}
                    value={data.deposit}
                    onChange={(v) => set('deposit', v)}
                    error={errors.deposit}
                    hint={data.propertyValue > 0 && data.deposit > 0 && data.deposit < data.propertyValue ? `${percent((data.deposit / data.propertyValue) * 100, 0)} of the price` : undefined}
                  />
                  <div className="sm:col-span-2">
                    <RangeField label="Term" suffix="years" value={data.termYears} min={5} max={40} onChange={(v) => set('termYears', v)} />
                  </div>
                  <Segmented label="Type of deal" options={productOptions} value={data.productKind} onChange={(v) => set('productKind', v)} />
                  <TextField label="Property postcode" value={data.postcode} onChange={(e) => set('postcode', e.target.value.toUpperCase())} optional autoComplete="postal-code" placeholder="E14 5EU" />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h1 className="h-section mt-3 text-[clamp(1.875rem,3.6vw,2.75rem)]">
                  Check it over, then <em>send</em>.
                </h1>
                <div className="mt-8">
                  <ReviewBlock title="About you" onEdit={() => goTo(0)}>
                    <Row k="Name" v={`${data.firstName} ${data.lastName}`} />
                    <Row k="Date of birth" v={new Date(data.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
                    <Row k="Email" v={<span className="break-all">{data.email}</span>} />
                    <Row k="Phone" v={data.phone} />
                    <Row k="Applicants" v={data.applicants === 2 ? 'Two' : 'One'} />
                  </ReviewBlock>
                  <ReviewBlock title="Income" onEdit={() => goTo(1)}>
                    <Row k="Employment" v={employments[data.employment]} />
                    <Row k="Income" v={pounds(data.income)} />
                    {data.applicants === 2 && <Row k="Second income" v={pounds(data.partnerIncome)} />}
                    <Row k="Commitments" v={`${pounds(data.monthlyCommitments)} a month`} />
                    <Row k="Dependants" v={data.dependants === 0 ? 'None' : data.dependants} />
                  </ReviewBlock>
                  <ReviewBlock title="Property" onEdit={() => goTo(2)}>
                    <Row k="Purpose" v={purposes[data.purpose]} />
                    <Row k="Price" v={pounds(data.propertyValue)} />
                    <Row k="Deposit" v={pounds(data.deposit)} />
                    <Row k="Term" v={`${data.termYears} years`} />
                    <Row k="Deal" v={productKinds[data.productKind].label} />
                    {data.postcode && <Row k="Postcode" v={data.postcode} />}
                  </ReviewBlock>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3.5">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked)
                      setErrors({})
                    }}
                    className="peer sr-only"
                  />
                  <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-[5px] border border-line-strong text-transparent transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus)">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[0.9375rem] text-ink-2">
                    I understand this is a concept site. No credit check is run, no lender sees this, and the result is illustrative.
                  </span>
                </label>
                {errors.consent && <p className="mt-2 pl-8 text-[0.8125rem] text-red-ink">{errors.consent}</p>}
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-5 sm:px-10">
            {step > 0 ? (
              <button type="button" onClick={() => goTo(step - 1)} className="btn btn-ghost">
                <ArrowLeft aria-hidden="true" />
                Back
              </button>
            ) : (
              <span className="label normal-case tracking-normal">Saved as you go</span>
            )}
            <button type="submit" disabled={submitting} className={`btn ${step === steps.length - 1 ? 'btn-blue' : 'btn-solid'}`}>
              {submitting ? 'Running the numbers…' : step === steps.length - 1 ? 'Get my agreement in principle' : 'Continue'}
              {!submitting && <ArrowRight className="btn-arrow" aria-hidden="true" />}
            </button>
          </div>
        </form>

        {/* Running estimate */}
        <aside className="sheet lg:sticky lg:top-24" aria-label="Running estimate">
          <div className="border-b border-line px-6 py-3.5">
            <FigLabel n="12">Running estimate</FigLabel>
          </div>
          <div className="px-6 py-6">
            <p className="label">You are asking to borrow</p>
            <p className="mt-1.5">
              <RollingNumber text={pounds(decision.loan)} className="text-[2.25rem] font-semibold tracking-[-0.04em]" />
            </p>
            <div className="mt-5">
              <div className="h-2 overflow-hidden rounded-full bg-blue-wash" role="img" aria-label={`The loan is ${Math.round(usage * 100)}% of the most we could assess`}>
                <div
                  className={`h-full rounded-full transition-[width,background-color] duration-700 ease-(--ease-out-expo) ${usage > 1 ? 'bg-red' : usage > 0.9 ? 'bg-blue/60' : 'bg-blue'}`}
                  style={{ width: `${clamp(usage, 0.02, 1) * 100}%` }}
                />
              </div>
              <p className="mt-2 text-[0.8125rem] text-ink-3">
                {usage > 1 ? 'Above' : `${Math.round(usage * 100)}% of`} the {pounds(decision.maxLoan)} this income could support
              </p>
            </div>
            <dl className="mt-6 space-y-2.5 border-t border-line pt-5 font-mono text-[0.8125rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Loan to value</dt>
                <dd className="tnum">{percent(decision.ltv, 0)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">{productKinds[data.productKind].short}</dt>
                <dd className="tnum">{decision.product ? percent(decision.product.rate) : 'Not available'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Monthly, about</dt>
                <dd className="tnum font-semibold text-ink">{decision.product ? pounds(decision.monthly) : '—'}</dd>
              </div>
            </dl>
          </div>
          <p className="border-t border-line px-6 py-4 text-[0.8125rem] text-ink-3">Updates as you type. The final answer comes when you send the form.</p>
        </aside>
      </div>
    </section>
  )
}

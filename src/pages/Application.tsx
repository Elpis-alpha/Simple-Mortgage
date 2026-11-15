import { ArrowRight, Check, FileText, Paperclip, Printer, RotateCcw, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DimensionLine } from '@/components/drawing/DimensionLine'
import { HouseElevation } from '@/components/drawing/HouseElevation'
import { LogoMark } from '@/components/layout/Logo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { FigLabel } from '@/components/ui/Figure'
import { Reveal } from '@/components/ui/Reveal'
import { Stat } from '@/components/ui/Stat'
import { useToast } from '@/components/ui/Toast'
import { useMeta } from '@/hooks/useMeta'
import { deleteApplication, loadApplication, loadDraft, purposes, requiredDocuments, saveApplication, saveDraft, type Application as App } from '@/lib/application'
import { useAuth } from '@/lib/auth'
import { percent, pounds } from '@/lib/format'
import { productKinds } from '@/lib/products'
import { site } from '@/lib/site'

const longDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

/* ---- Empty state --------------------------------------------------- */

function Welcome({ firstName, hasDraft }: { firstName: string; hasDraft: boolean }) {
  const points = ['Four short steps, about four minutes', 'A soft check that leaves no footprint', 'A certificate you can print for the estate agent']
  return (
    <section className="wrap grid items-center gap-12 pt-10 lg:grid-cols-2 lg:pt-16">
      <div style={{ animation: 'fade-up 0.9s var(--ease-out-expo) both' }}>
        <p className="label flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
          Sheet 06 · Your application
        </p>
        <h1 className="display mt-6 text-[clamp(2.5rem,6vw,4.5rem)]">
          Good to see you, <em>{firstName}</em>.
        </h1>
        <p className="lede mt-6 max-w-[44ch]">
          {hasDraft ? 'You have an agreement in principle part-way through. It is saved exactly where you left it.' : 'This sheet is blank for now. An agreement in principle is the first thing to draw on it.'}
        </p>
        <ul className="mt-7 space-y-2.5">
          {points.map((p) => (
            <li key={p} className="flex items-center gap-3 text-ink-2">
              <Check className="size-4 text-blue" strokeWidth={2.5} aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink to="/application/new" arrow>
            {hasDraft ? 'Carry on where you left off' : 'Start your agreement in principle'}
          </ButtonLink>
          <ButtonLink to="/calculator" variant="outline">
            Sketch it first
          </ButtonLink>
        </div>
      </div>
      <div className="sheet ticks" style={{ animation: 'fade-up 1s var(--ease-out-expo) 140ms both' }}>
        <div className="border-b border-line px-6 py-3.5">
          <FigLabel n="13">Awaiting your figures</FigLabel>
        </div>
        <div className="px-6 py-6">
          <HouseElevation share={0} bare />
        </div>
      </div>
    </section>
  )
}

/* ---- Dashboard ----------------------------------------------------- */

export default function Application() {
  useMeta('Your application', 'Your agreement in principle, documents and next steps.')
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const [app, setApp] = useState<App | null>(() => loadApplication(user!.id))
  const [confirming, setConfirming] = useState(false)

  const firstName = user!.name.split(' ')[0] ?? 'there'
  if (!app) return <Welcome firstName={firstName} hasDraft={loadDraft(user!.id) !== null} />

  const { data, decision } = app
  const agreed = decision.outcome === 'agreed'
  const docsDone = requiredDocuments.filter((d) => app.documents[d.id]).length
  const allDocs = docsDone === requiredDocuments.length

  const update = (next: App) => {
    saveApplication(next)
    setApp(next)
  }

  const addDocument = (id: string, file: File | undefined) => {
    if (!file) return
    update({ ...app, documents: { ...app.documents, [id]: { name: file.name, addedAt: new Date().toISOString() } } })
    toast(`${file.name} added`)
  }

  const removeDocument = (id: string) => {
    const documents = { ...app.documents }
    delete documents[id]
    update({ ...app, documents })
  }

  const startAgain = () => {
    // Keep the answers as a draft, so "start again" means "revise", not "retype".
    saveDraft(user!.id, data)
    deleteApplication(user!.id)
    navigate('/application/new', { viewTransition: true })
  }

  const stages = [
    { title: 'Agreement in principle', note: agreed ? `Issued ${longDate(app.createdAt)}` : 'With an adviser for review', state: agreed ? 'done' : 'current' },
    { title: 'Your documents', note: `${docsDone} of ${requiredDocuments.length} added`, state: !agreed ? 'todo' : allDocs ? 'done' : 'current' },
    { title: 'Full application', note: 'Your adviser submits it to the lender', state: agreed && allDocs ? 'current' : 'todo' },
    { title: 'Valuation', note: 'The lender checks the property', state: 'todo' },
    { title: 'Mortgage offer', note: 'Usually two to four weeks in', state: 'todo' },
    { title: 'Completion', note: 'Keys', state: 'todo' },
  ] as const

  return (
    <section className="wrap pt-10 lg:pt-14">
      <div className="no-print" style={{ animation: 'fade-up 0.9s var(--ease-out-expo) both' }}>
        <p className="label flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
          Sheet 06 · Your application
        </p>
        <h1 className="display mt-6 max-w-[14ch] text-[clamp(2.5rem,6vw,4.5rem)]">
          {agreed ? (
            <>
              Agreed in principle, <em>{firstName}</em>.
            </>
          ) : (
            <>
              One for an adviser, <em>{firstName}</em>.
            </>
          )}
        </h1>
        <p className="lede mt-5 max-w-[52ch]">
          {agreed
            ? `On the figures you gave us, a lender would expect to offer you ${pounds(decision.loan)}. The certificate below is valid until ${longDate(app.expiresAt)}.`
            : 'Your figures sit outside what we can agree automatically. That is common, and an adviser can often find a way through.'}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_23rem]">
        {/* ---- Certificate ------------------------------------------ */}
        <Reveal as="article" className="sheet ticks">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line px-6 py-4 sm:px-9">
            <div className="flex items-center gap-3">
              <LogoMark className="size-7 text-ink" />
              <div>
                <p className="font-serif text-lg leading-none tracking-[-0.02em]">{agreed ? 'Agreement in principle' : 'Application summary'}</p>
                <p className="label mt-1.5">{site.name}</p>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="label">Reference</p>
              <p className="tnum mt-1 font-mono text-[0.9375rem] tracking-wider">{app.reference}</p>
            </div>
          </header>

          <div className="grid gap-8 px-6 py-8 sm:px-9 md:grid-cols-[1fr_17rem] md:items-center">
            <div>
              <p className="label">{agreed ? 'We would expect to lend' : 'You asked to borrow'}</p>
              <p className="tnum mt-2 text-[clamp(2.75rem,6vw,4rem)] leading-none font-semibold tracking-[-0.045em]">{pounds(decision.loan)}</p>
              <p className="mt-3 text-ink-2">
                to {data.firstName} {data.lastName}
                {data.applicants === 2 ? ' and one other' : ''}, for {purposes[data.purpose].toLowerCase()}
                {data.postcode ? ` in ${data.postcode}` : ''}.
              </p>
              <span className={`label mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${agreed ? 'bg-good-wash text-good' : 'bg-red-wash text-red-ink'}`}>
                <span className={`size-1.5 rounded-full ${agreed ? 'bg-good' : 'bg-red'}`} aria-hidden="true" />
                {agreed ? `Valid until ${longDate(app.expiresAt)}` : 'Needs a conversation'}
              </span>
            </div>
            <div>
              <HouseElevation share={data.deposit / data.propertyValue} still />
              <DimensionLine
                className="mx-[25%] -mt-1"
                segments={[
                  { share: data.deposit / data.propertyValue, label: 'Deposit', value: pounds(data.deposit), tone: 'blue' },
                  { share: decision.loan / data.propertyValue, label: 'Loan', value: pounds(decision.loan), tone: 'ink' },
                ]}
              />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line px-6 py-7 sm:px-9 md:grid-cols-4">
            <Stat label="Property" value={pounds(data.propertyValue)} sub={`${percent(decision.ltv, 0)} loan to value`} />
            <Stat label="Deal" value={decision.product ? percent(decision.product.rate) : '—'} sub={productKinds[data.productKind].label} />
            <Stat label="Monthly, about" value={decision.product ? pounds(decision.monthly) : '—'} sub={`over ${data.termYears} years`} />
            <Stat label="Could support" value={pounds(decision.maxLoan)} sub="at five times income" />
          </dl>

          <div className="border-t border-line px-6 py-6 sm:px-9">
            <p className="label">Adviser’s notes</p>
            <ul className="mt-3 space-y-2">
              {decision.notes.map((note) => (
                <li key={note} className="flex gap-3 text-[0.9375rem] text-ink-2">
                  <span className="mt-2.5 h-px w-3 flex-none bg-red" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-line px-6 py-4 text-[0.75rem] leading-relaxed text-ink-3 sm:px-9">
            Issued {longDate(app.createdAt)}. This is an illustrative document from a concept website. It is not an offer of a mortgage, no credit search was made
            and no lender is bound by it.
          </p>

          <div className="no-print flex flex-wrap items-center justify-between gap-3 border-t border-line px-6 py-4 sm:px-9">
            <button type="button" onClick={() => window.print()} className="btn btn-solid btn-sm">
              <Printer aria-hidden="true" />
              Print or save as PDF
            </button>
            {confirming ? (
              <span className="flex items-center gap-2 text-sm" role="group" aria-label="Confirm starting again">
                <span className="text-ink-2">Replace this with a new one?</span>
                <button type="button" onClick={startAgain} className="btn btn-outline btn-sm">
                  Yes, revise
                </button>
                <button type="button" onClick={() => setConfirming(false)} className="btn btn-ghost btn-sm">
                  Keep it
                </button>
              </span>
            ) : (
              <button type="button" onClick={() => setConfirming(true)} className="btn btn-ghost btn-sm">
                <RotateCcw aria-hidden="true" />
                Change my figures
              </button>
            )}
          </div>
        </Reveal>

        {/* ---- Side column ------------------------------------------ */}
        <div className="no-print space-y-8">
          <Reveal delay={100} className="sheet">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="14">What happens next</FigLabel>
            </div>
            <ol className="px-6 py-6">
              {stages.map((stage, i) => (
                <li key={stage.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < stages.length - 1 && <span aria-hidden="true" className={`absolute top-6 bottom-0 left-[0.6875rem] w-px ${stage.state === 'done' ? 'bg-blue' : 'bg-line-strong'}`} />}
                  <span
                    className={`relative grid size-[1.4375rem] flex-none place-items-center rounded-full border font-mono text-[0.625rem] ${
                      stage.state === 'done' ? 'border-blue bg-blue text-white' : stage.state === 'current' ? 'border-ink bg-solid text-on-solid' : 'border-line-strong bg-raised text-ink-3'
                    }`}
                  >
                    {stage.state === 'done' ? <Check className="size-3" strokeWidth={3} aria-hidden="true" /> : i + 1}
                  </span>
                  <div className="-mt-0.5">
                    <p className={`text-[0.9375rem] ${stage.state === 'todo' ? 'text-ink-3' : 'font-medium text-ink'}`}>
                      {stage.title}
                      {stage.state === 'current' && <span className="label ml-2 text-blue-ink">Now</span>}
                    </p>
                    <p className="text-[0.8125rem] text-ink-3">{stage.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={160} className="sheet">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="15" aside={`${docsDone} / ${requiredDocuments.length}`}>
                Documents
              </FigLabel>
            </div>
            <ul className="px-6 py-2">
              {requiredDocuments.map((doc) => {
                const slot = app.documents[doc.id]
                return (
                  <li key={doc.id} className="flex items-center gap-3.5 border-b border-line py-3.5 last:border-0">
                    <span className={`grid size-8 flex-none place-items-center rounded-full ${slot ? 'bg-good-wash text-good' : 'bg-blue-wash text-blue-ink'}`}>
                      {slot ? <Check className="size-4" strokeWidth={2.5} aria-hidden="true" /> : <FileText className="size-4" aria-hidden="true" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.9375rem] font-medium">{doc.label}</p>
                      <p className="truncate text-[0.8125rem] text-ink-3">{slot ? slot.name : doc.hint}</p>
                    </div>
                    {slot ? (
                      <button type="button" onClick={() => removeDocument(doc.id)} aria-label={`Remove ${slot.name}`} className="grid size-8 flex-none place-items-center rounded-full text-ink-3 transition-colors hover:bg-red-wash hover:text-red-ink">
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <label className="btn btn-outline btn-sm flex-none cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--focus)">
                        <Paperclip aria-hidden="true" />
                        Add
                        <input type="file" className="sr-only" aria-label={`Add ${doc.label}`} onChange={(e) => addDocument(doc.id, e.target.files?.[0])} />
                      </label>
                    )}
                  </li>
                )
              })}
            </ul>
            <p className="border-t border-line px-6 py-4 text-[0.8125rem] text-ink-3">Only the file name is remembered, in this browser. Nothing is uploaded.</p>
          </Reveal>

          <Reveal delay={220} className="sheet px-6 py-6">
            <div className="flex items-center gap-4">
              <span className="grid size-12 flex-none place-items-center rounded-full bg-solid font-serif text-lg text-on-solid italic">IC</span>
              <div>
                <p className="label">Your adviser</p>
                <p className="mt-0.5 font-medium">Imani Clarke</p>
              </div>
            </div>
            <p className="mt-4 text-[0.9375rem] text-ink-2">
              {agreed ? 'I will call once your documents are in. If anything on the certificate looks off, tell me first.' : 'I have had a look at your figures. Let us talk it through; there is usually a route.'}
            </p>
            <ButtonLink to="/contact" variant="outline" size="sm" className="mt-5 w-full">
              Message Imani
              <ArrowRight className="btn-arrow" aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

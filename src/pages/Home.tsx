import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { EquityInstrument } from '@/components/home/EquityInstrument'
import { RatesTable } from '@/components/home/RatesTable'
import { ServiceGlyph, type ServiceKind } from '@/components/home/ServiceGlyph'
import { CallToAction } from '@/components/layout/CallToAction'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Faq, type FaqItem } from '@/components/ui/Faq'
import { SectionHeading } from '@/components/ui/Figure'
import { Reveal } from '@/components/ui/Reveal'
import { useMeta } from '@/hooks/useMeta'
import { estimateBorrowing } from '@/lib/affordability'
import { useAuth } from '@/lib/auth'
import { duration, percent, pounds, poundsCompact } from '@/lib/format'
import { buildSchedule } from '@/lib/mortgage'
import { DEFAULT_RATE, products } from '@/lib/products'
import { calcStampDuty } from '@/lib/stampDuty'

const lowest = (kind: 'fix2' | 'fix5' | 'tracker') => Math.min(...products.filter((p) => p.kind === kind).map((p) => p.rate))

const services: { kind: ServiceKind; title: string; hook: string; body: string; from: number }[] = [
  {
    kind: 'first-home',
    title: 'First home',
    hook: 'From a 5% deposit',
    body: 'We explain every line, from the survey to the solicitor, and go to the lenders who actually like first-time buyers.',
    from: lowest('fix5'),
  },
  {
    kind: 'moving',
    title: 'Moving home',
    hook: 'Port it or switch it',
    body: 'Take your current deal with you, or start again somewhere better. We price both before you make an offer.',
    from: lowest('fix2'),
  },
  {
    kind: 'remortgage',
    title: 'Remortgage',
    hook: 'Before your fix ends',
    body: 'We start looking six months ahead, so you never drift onto a lender’s standard variable rate by accident.',
    from: lowest('tracker'),
  },
  {
    kind: 'buy-to-let',
    title: 'Buy-to-let',
    hook: 'Let the rent do the work',
    body: 'Stress-tested against the rent you can expect, whether it is your first flat or the fifth on the street.',
    from: lowest('fix5') + 0.4,
  },
]

const steps = [
  { title: 'Sketch', time: '2 minutes', body: 'Rough out a budget with the calculators. Nothing is saved and nobody is checked.' },
  { title: 'Agree in principle', time: '4 minutes', body: 'Four short steps and a soft check. You get a certificate estate agents take seriously.' },
  { title: 'Apply in full', time: '2 – 4 weeks', body: 'We package the paperwork, pick the lender and chase the valuation so you do not have to.' },
  { title: 'Collect the keys', time: 'Completion day', body: 'Your solicitor completes, the keys change hands and the hatching starts turning blue.' },
]

// Worked examples for the answers below, computed rather than typed, so they stay true.
const example = { principal: 250_000, annualRate: DEFAULT_RATE, termYears: 30 }
const plain = buildSchedule(example)
const overpaid = buildSchedule({ ...example, monthlyOverpayment: 200 })

const faqs: FaqItem[] = [
  {
    q: 'What is an agreement in principle?',
    a: (
      <p>
        A short statement from a lender saying how much they would expect to lend you, based on your income and a soft credit check. It is not a mortgage
        offer, but estate agents usually want to see one before they take an offer seriously. Ours lasts 90 days.
      </p>
    ),
  },
  {
    q: 'How much deposit do I need?',
    a: (
      <p>
        Most lenders start at 5% of the price. Every extra 5% you can put down moves you into a cheaper band: on our illustrative rates, going from a 5%
        to a 15% deposit takes about {percent(products.find((p) => p.id === 'fix5-95')!.rate - products.find((p) => p.id === 'fix5-85')!.rate)} off the rate.
      </p>
    ),
  },
  {
    q: 'What does loan-to-value mean?',
    a: (
      <p>
        The share of the property the lender is paying for. Borrow £240,000 against a £300,000 home and your loan-to-value is 80%; the other 20% is yours
        from day one. In our drawings, that is the shaded part of the house.
      </p>
    ),
  },
  {
    q: 'Do overpayments really make a difference?',
    a: (
      <p>
        More than most people expect. On {pounds(example.principal)} over {example.termYears} years at {percent(example.annualRate)}, paying an extra £200 a
        month clears the mortgage {duration(plain.months - overpaid.months)} early and saves {pounds(plain.totalInterest - overpaid.totalInterest)} in
        interest.{' '}
        <Link to="/calculator?over=200" viewTransition className="link text-blue-ink">
          Try it with your own numbers
        </Link>
        .
      </p>
    ),
  },
  {
    q: 'Fixed or tracker?',
    a: (
      <p>
        A fixed rate buys certainty: your payment does not move for two or five years. A tracker follows the Bank of England base rate, so it is usually
        cheaper on day one and can go either way afterwards. If a rise of a hundred pounds a month would hurt, fix.
      </p>
    ),
  },
  {
    q: 'Is this a real mortgage broker?',
    a: (
      <p>
        No. Master Your Mortgage is a concept, built to show how a mortgage site could look and behave. The sums are real; the rates, the decisions and the
        company are not. Nothing you type leaves your browser.
      </p>
    ),
  },
]

/* ---- Small drawings for the calculator cards ----------------------- */

function SparkBalance() {
  const s = buildSchedule({ principal: 272_000, annualRate: DEFAULT_RATE, termYears: 30 })
  const pts = s.years.map((y, i) => `${((i + 1) / s.years.length) * 200},${60 - (y.balance / 272_000) * 56}`)
  const d = `M0,4 L${pts.join(' L')}`
  return (
    <svg viewBox="0 0 200 64" className="h-16 w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d} L200,60 L0,60 Z`} fill="var(--blue)" opacity="0.1" />
      <path d={d} fill="none" stroke="var(--blue)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <line x1="0" y1="60" x2="200" y2="60" stroke="var(--line-strong)" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function SparkRange() {
  return (
    <div className="flex h-16 flex-col justify-end" aria-hidden="true">
      <div className="relative h-2 rounded-full bg-blue-wash">
        <div className="absolute inset-y-0 left-[38%] right-[18%] rounded-full bg-blue/40" />
        <div className="absolute top-1/2 left-[62%] size-4 -translate-1/2 rounded-full border-2 border-blue bg-raised" />
      </div>
      <div className="label mt-2.5 flex justify-between">
        <span>Cautious</span>
        <span>Stretch</span>
      </div>
    </div>
  )
}

function SparkBands() {
  const heights = [10, 26, 62, 44, 20]
  return (
    <div className="flex h-16 items-end gap-0.5" aria-hidden="true">
      {heights.map((h, i) => (
        <div key={i} className="flex-1 rounded-t-[3px] bg-blue" style={{ height: `${h}%`, opacity: 0.25 + i * 0.18 }} />
      ))}
    </div>
  )
}

const sdlt = calcStampDuty(320_000, 'home-mover').total
const borrow = estimateBorrowing({ income: 62_000 }).typical

const instruments = [
  {
    to: '/calculator',
    title: 'Repayments',
    body: 'Monthly cost, total interest and what overpaying would save, with the whole schedule drawn out.',
    stat: pounds(buildSchedule({ principal: 272_000, annualRate: DEFAULT_RATE, termYears: 30 }).monthlyPayment),
    statLabel: 'a month on £272,000',
    art: <SparkBalance />,
  },
  {
    to: '/calculator?tab=borrow',
    title: 'How much can I borrow',
    body: 'A realistic range from your income and outgoings, not a single flattering number.',
    stat: poundsCompact(borrow),
    statLabel: 'typical on £62,000 a year',
    art: <SparkRange />,
  },
  {
    to: '/calculator?tab=stamp-duty',
    title: 'Stamp duty',
    body: 'Band by band, for first-time buyers, movers and second homes in England and Northern Ireland.',
    stat: pounds(sdlt),
    statLabel: 'on a £320,000 move',
    art: <SparkBands />,
  },
]

const tickerWords = ['First homes', 'Moving home', 'Remortgage', 'Buy-to-let', 'Overpayments', 'Stamp duty', 'Agreement in principle', 'Fixed rates', 'Trackers']

export default function Home() {
  useMeta(null)
  const { user } = useAuth()
  const applyHref = user ? '/application' : '/signup'

  return (
    <>
      {/* ---- Hero ---------------------------------------------------- */}
      <section className="wrap grid items-center gap-x-14 gap-y-12 pt-8 pb-16 lg:grid-cols-[1fr_minmax(0,34rem)] lg:pt-6 lg:pb-24">
        <div>
          <p className="label flex items-center gap-3" style={{ animation: 'fade-up 0.8s var(--ease-out-expo) both' }}>
            <span className="inline-block size-1.5 rounded-full bg-red" aria-hidden="true" />
            Mortgage brokers · London E14
          </p>
          <h1 className="display mt-6" style={{ animation: 'fade-up 1s var(--ease-out-expo) 80ms both' }}>
            Own <em>more</em> of your home,{' '}
            <span className="relative inline-block whitespace-nowrap">
              sooner.
              <svg viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full overflow-visible" aria-hidden="true">
                <path
                  d="M3 13 C 50 4, 96 5, 150 10 S 250 16, 297 6"
                  fill="none"
                  stroke="var(--red)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  pathLength="1"
                  className="house-draw"
                  style={{ animationDelay: '900ms', animationDuration: '0.9s' }}
                />
              </svg>
            </span>
          </h1>
          <p className="lede mt-7 max-w-[46ch]" style={{ animation: 'fade-up 1s var(--ease-out-expo) 180ms both' }}>
            A mortgage is a drawing of your next thirty years. We help you sketch it properly: what you will pay, what you will owe, and how quickly the house
            becomes yours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" style={{ animation: 'fade-up 1s var(--ease-out-expo) 280ms both' }}>
            <ButtonLink to={applyHref} arrow>
              Get an agreement in principle
            </ButtonLink>
            <ButtonLink to="/calculator" variant="outline">
              Open the calculators
            </ButtonLink>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-2" style={{ animation: 'fade-up 1s var(--ease-out-expo) 380ms both' }}>
            {['No fee to talk it through', 'Soft check, no credit footprint', 'An answer in about four minutes'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-3.5 text-blue" strokeWidth={2.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ animation: 'fade-up 1.1s var(--ease-out-expo) 200ms both' }}>
          <EquityInstrument />
        </div>
      </section>

      {/* ---- Ticker -------------------------------------------------- */}
      <div className="overflow-hidden border-y border-line bg-paper-raised/50 py-3.5" aria-hidden="true">
        <div className="flex w-max" style={{ animation: 'ticker 48s linear infinite' }}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="label flex flex-none items-center">
              {tickerWords.map((w) => (
                <li key={w} className="flex items-center">
                  <span className="px-7">{w}</span>
                  <span className="text-red">+</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---- Services ------------------------------------------------ */}
      <section className="wrap pt-24 lg:pt-32">
        <Reveal>
          <SectionHeading index="01" eyebrow="What we arrange" lede="Whatever stage you are at, the job is the same: find the cheapest honest way to borrow, and explain it in plain English.">
            Four kinds of mortgage, <em>one</em> way of working.
          </SectionHeading>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal as="li" key={s.kind} delay={i * 80} className="group flex flex-col bg-raised p-6 transition-colors duration-500 hover:bg-paper sm:p-7">
              <ServiceGlyph kind={s.kind} className="h-12 w-[4.5rem] text-ink transition-transform duration-700 ease-(--ease-out-expo) group-hover:-translate-y-1" />
              <p className="label mt-8">{s.hook}</p>
              <h3 className="h-card mt-2">{s.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] text-ink-2">{s.body}</p>
              <p className="mt-6 flex items-baseline justify-between border-t border-line pt-4">
                <span className="label">Rates from</span>
                <span className="tnum text-lg font-semibold tracking-tight">{percent(s.from)}</span>
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---- How it works -------------------------------------------- */}
      <section className="wrap pt-24 lg:pt-32">
        <Reveal>
          <SectionHeading index="02" eyebrow="How it works">
            From a rough sketch to a <em>front door</em>.
          </SectionHeading>
        </Reveal>
        <ol className="relative mt-14 grid gap-y-10 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 110} className="relative pl-10 lg:pr-8 lg:pl-0">
              {/* The run of the dimension line between steps. */}
              <span aria-hidden="true" className="absolute top-0 bottom-[-2.5rem] left-[0.6875rem] w-px bg-line-strong lg:top-[0.6875rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 grid size-[1.4375rem] place-items-center rounded-full border border-ink bg-paper font-mono text-[0.625rem] text-ink"
              >
                {i + 1}
              </span>
              <p className="label lg:mt-12">{step.time}</p>
              <h3 className="h-card mt-2">{step.title}</h3>
              <p className="mt-3 max-w-[32ch] text-[0.9375rem] text-ink-2">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ---- Rates --------------------------------------------------- */}
      <section className="wrap pt-24 lg:pt-32">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <SectionHeading index="03" eyebrow="Rates" lede="The bigger your share of the house, the less the lender charges for theirs.">
              Priced by how much is <em>already yours</em>.
            </SectionHeading>
          </Reveal>
        </div>
        <Reveal className="mt-12">
          <RatesTable />
        </Reveal>
      </section>

      {/* ---- Calculators --------------------------------------------- */}
      <section className="wrap pt-24 lg:pt-32">
        <Reveal>
          <SectionHeading index="04" eyebrow="Calculators" lede="Free to use, nothing to sign up for, and every figure shows its working.">
            Three instruments for the <em>back of the envelope</em>.
          </SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {instruments.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <Link
                to={item.to}
                viewTransition
                className="sheet group flex h-full flex-col p-6 transition-[transform,border-color] duration-500 ease-(--ease-out-expo) hover:-translate-y-1 hover:border-blue sm:p-7"
              >
                {item.art}
                <p className="mt-6 flex items-baseline gap-2">
                  <span className="tnum text-[1.75rem] font-semibold tracking-[-0.03em]">{item.stat}</span>
                  <span className="text-sm text-ink-3">{item.statLabel}</span>
                </p>
                <h3 className="h-card mt-5">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-[0.9375rem] text-ink-2">{item.body}</p>
                <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-blue-ink">
                  Open
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- Questions ----------------------------------------------- */}
      <section className="wrap grid gap-x-16 gap-y-10 pt-24 lg:grid-cols-[1fr_1.5fr] lg:pt-32">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="05" eyebrow="Questions" lede="The things people ask us on the first call, answered without the jargon.">
            Asked, and <em>answered</em>.
          </SectionHeading>
        </Reveal>
        <Reveal delay={100}>
          <Faq items={faqs} />
        </Reveal>
      </section>

      <CallToAction />
    </>
  )
}

import { HouseElevation } from '@/components/drawing/HouseElevation'
import { CallToAction } from '@/components/layout/CallToAction'
import { PageHeader } from '@/components/layout/PageHeader'
import { FigLabel, SectionHeading } from '@/components/ui/Figure'
import { Reveal } from '@/components/ui/Reveal'
import { useMeta } from '@/hooks/useMeta'

const rules = [
  {
    title: 'Show the working',
    body: 'Every figure we give you comes with the sum behind it. If we cannot explain a number in one sentence, we do not quote it.',
  },
  {
    title: 'Plain English, always',
    body: 'LTV, ERC, SVR. We translate each acronym the first time it appears, and we never use one to end a conversation.',
  },
  {
    title: 'The same fee, whatever you pick',
    body: 'The lender pays us a flat fee when you complete. It does not change with the deal you choose, and we tell you what it is before you apply.',
  },
]

const anatomy = [
  { term: 'Deposit', body: 'The money you put in on day one. It is the part of the house that is yours from the start.' },
  { term: 'Loan to value', body: 'The lender’s share of the price, as a percentage. Lower is cheaper: rates step down at 95, 90, 85, 75 and 60.' },
  { term: 'Equity', body: 'Everything above the redline. It grows as you repay capital, and again if the home rises in value.' },
  { term: 'Term', body: 'How long you take to repay. A longer term lowers the monthly payment and raises the total interest.' },
  { term: 'Rate', body: 'What the lender charges each year for the part that is still theirs. Fixed for a while, or tracking the base rate.' },
]

const notes = [
  { k: 'Whole of market', v: 'We are not tied to a panel. If the best deal is one you can only get direct, we will say so.' },
  { k: 'One adviser', v: 'The person who takes your first call is the person who sees you through to completion.' },
  { k: 'No footprint', v: 'An agreement in principle uses a soft check. Other lenders cannot see it and your score does not move.' },
  { k: 'Evenings and Saturdays', v: 'Most people cannot talk mortgages at eleven on a Tuesday. We are open until eight.' },
]

export default function About() {
  useMeta('About', 'Master Your Mortgage is a concept broker built on one idea: mortgage advice should show its working.')

  return (
    <>
      <PageHeader
        sheet="Sheet 03 · About"
        title={
          <>
            A broker that <em>shows its working</em>.
          </>
        }
        lede="Most mortgage advice arrives as a number with no explanation attached. We think you should be able to see every line of the sum, and change it."
      />

      <section className="wrap">
        <div className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:grid-cols-3">
          {rules.map((rule, i) => (
            <Reveal key={rule.title} delay={i * 90} className="bg-raised p-7 sm:p-9">
              <p className="font-serif text-[3.5rem] leading-none font-light text-blue italic">{i + 1}</p>
              <h2 className="h-card mt-8">{rule.title}</h2>
              <p className="mt-3 text-ink-2">{rule.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap grid items-start gap-x-16 gap-y-12 pt-24 lg:grid-cols-2 lg:pt-32">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <SectionHeading index="01" eyebrow="Anatomy of a mortgage" lede="Five words cover almost everything a lender will say to you. Here they are on one drawing.">
              Learn the drawing, and the rest <em>follows</em>.
            </SectionHeading>
          </Reveal>
          <Reveal delay={120} className="sheet ticks mt-10">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="09">Elevation at year twelve</FigLabel>
            </div>
            <div className="px-6 py-5">
              <HouseElevation share={0.42} />
            </div>
          </Reveal>
        </div>
        <ol className="border-t border-line-strong">
          {anatomy.map((item, i) => (
            <Reveal as="li" key={item.term} delay={i * 70} className="flex gap-6 border-b border-line py-7">
              <span className="label w-6 flex-none pt-2">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="h-card">{item.term}</h3>
                <p className="mt-2.5 max-w-[46ch] text-ink-2">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="wrap pt-24 lg:pt-32">
        <Reveal>
          <SectionHeading index="02" eyebrow="How we work">
            Small print, in <em>large type</em>.
          </SectionHeading>
        </Reveal>
        <dl className="mt-12 grid gap-x-12 border-t border-line-strong sm:grid-cols-2">
          {notes.map((n, i) => (
            <Reveal key={n.k} delay={(i % 2) * 90} className="border-b border-line py-7">
              <dt className="label text-blue-ink">{n.k}</dt>
              <dd className="mt-3 font-serif text-[1.375rem] leading-snug tracking-[-0.015em] text-ink sm:text-[1.5rem]">{n.v}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <CallToAction />
    </>
  )
}

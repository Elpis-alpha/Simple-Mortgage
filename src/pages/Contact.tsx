import { ArrowRight, Check, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { LocationPlan } from '@/components/drawing/LocationPlan'
import { PageHeader } from '@/components/layout/PageHeader'
import { SelectField, TextArea, TextField } from '@/components/ui/Field'
import { FigLabel } from '@/components/ui/Figure'
import { Reveal } from '@/components/ui/Reveal'
import { Segmented } from '@/components/ui/Segmented'
import { useMeta } from '@/hooks/useMeta'
import { useAuth } from '@/lib/auth'
import { site } from '@/lib/site'
import { makeReference, readJSON, writeJSON } from '@/lib/storage'

const topics = ['Buying my first home', 'Moving home', 'Remortgaging', 'Buy-to-let', 'Something else']
const replyOptions = [
  { value: 'email', label: 'Email me' },
  { value: 'phone', label: 'Call me' },
] as const

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  useMeta('Contact', 'Call, write or send a message. Advisers are available weekdays until 8pm and on Saturdays.')
  const { user } = useAuth()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState('')
  const [topic, setTopic] = useState(topics[0]!)
  const [reply, setReply] = useState<'email' | 'phone'>('email')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Tell us your name'
    if (!EMAIL.test(email.trim())) next.email = 'Enter an email address like name@example.com'
    if (reply === 'phone' && phone.replace(/\D/g, '').length < 10) next.phone = 'Add a number we can call you on'
    if (message.trim().length < 10) next.message = 'A sentence or two helps us route this to the right adviser'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSending(true)
    // There is no server. The message is kept in this browser so the demo has a real outcome.
    window.setTimeout(() => {
      const reference = makeReference()
      writeJSON('messages', [...readJSON<unknown[]>('messages', []), { reference, name, email, phone, topic, reply, message, at: new Date().toISOString() }])
      setSending(false)
      setSent(reference)
    }, 900)
  }

  const reset = () => {
    setSent(null)
    setMessage('')
  }

  return (
    <>
      <PageHeader
        sheet="Sheet 04 · Contact"
        title={
          <>
            Talk to someone who <em>does the sums</em>.
          </>
        }
        lede="Ask a quick question or book a proper conversation. We reply to messages within one working day, and usually the same afternoon."
      />

      <section className="wrap grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Reveal className="sheet ticks">
          <div className="border-b border-line px-6 py-3.5 sm:px-8">
            <FigLabel>Send a message</FigLabel>
          </div>

          {sent ? (
            <div className="px-6 py-12 text-center sm:px-8" role="status">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-good text-white" style={{ animation: 'pop 0.5s var(--ease-spring) both' }}>
                <Check className="size-6" strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h2 className="h-card mt-6">Message received, {name.trim().split(' ')[0]}.</h2>
              <p className="mx-auto mt-3 max-w-[40ch] text-ink-2">
                In the real world an adviser would {reply === 'phone' ? 'call you' : 'email you'} within one working day. Your reference is
              </p>
              <p className="tnum mt-3 font-mono text-lg tracking-wider text-ink">{sent}</p>
              <p className="label mx-auto mt-6 max-w-[44ch] normal-case tracking-normal">
                This is a concept site, so nothing was sent anywhere. The message is saved in your own browser only.
              </p>
              <button type="button" onClick={reset} className="btn btn-outline btn-sm mt-8">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 px-6 py-7 sm:px-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" error={errors.name} placeholder="Ada Okoye" />
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" error={errors.email} placeholder="ada@example.com" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField label="What is it about?" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </SelectField>
                <TextField
                  label="Phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  optional={reply === 'email'}
                  error={errors.phone}
                  placeholder="07700 900123"
                />
              </div>
              <TextArea label="Your message" value={message} onChange={(e) => setMessage(e.target.value)} error={errors.message} rows={5} placeholder="We have found a flat we like and want to know what we could borrow…" />
              <div className="flex flex-wrap items-end justify-between gap-5">
                <div className="w-full sm:w-64">
                  <Segmented label="How should we reply?" options={replyOptions} value={reply} onChange={setReply} />
                </div>
                <button type="submit" disabled={sending} className="btn btn-solid w-full sm:w-auto">
                  {sending ? 'Sending…' : 'Send message'}
                  {!sending && <ArrowRight className="btn-arrow" aria-hidden="true" />}
                </button>
              </div>
            </form>
          )}
        </Reveal>

        <div className="space-y-8">
          <Reveal delay={100} className="sheet overflow-hidden">
            <div className="border-b border-line px-6 py-3.5">
              <FigLabel n="10" aside="Not to scale">
                Location plan
              </FigLabel>
            </div>
            <LocationPlan className="w-full" />
          </Reveal>

          <Reveal delay={160}>
            <ul className="border-t border-line-strong">
              <li className="flex gap-4 border-b border-line py-5">
                <Phone className="mt-1 size-4 flex-none text-blue" aria-hidden="true" />
                <div>
                  <p className="label">Call</p>
                  <a href={site.phoneHref} className="link mt-1 inline-block text-lg font-medium">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-b border-line py-5">
                <Mail className="mt-1 size-4 flex-none text-blue" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="label">Write</p>
                  <a href={`mailto:${site.email}`} className="link mt-1 inline-block text-lg font-medium break-all">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-b border-line py-5">
                <MapPin className="mt-1 size-4 flex-none text-blue" aria-hidden="true" />
                <div>
                  <p className="label">Visit</p>
                  <address className="mt-1 text-lg leading-snug not-italic">
                    {site.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>
              <li className="flex gap-4 border-b border-line py-5">
                <Clock className="mt-1 size-4 flex-none text-blue" aria-hidden="true" />
                <div className="flex-1">
                  <p className="label">Hours</p>
                  <dl className="mt-1.5 space-y-1">
                    {site.hours.map(([day, time]) => (
                      <div key={day} className="flex justify-between gap-4">
                        <dt className="text-ink-2">{day}</dt>
                        <dd className="tnum font-medium">{time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { ArrowRight } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AuthLayout, useAfterAuth } from '@/components/auth/AuthLayout'
import { PasswordField } from '@/components/auth/PasswordField'
import { TextField } from '@/components/ui/Field'
import { useToast } from '@/components/ui/Toast'
import { useMeta } from '@/hooks/useMeta'
import { useAuth } from '@/lib/auth'

type Errors = Partial<Record<'name' | 'email' | 'password', string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUp() {
  useMeta('Create an account', 'Create an account to save your agreement in principle and track your application.')
  const { user, signUp } = useAuth()
  const location = useLocation()
  const done = useAfterAuth()
  const toast = useToast()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (user && !submitted) return <Navigate to="/application" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const next: Errors = {}
    if (name.trim().length < 2) next.name = 'Enter your full name'
    if (!EMAIL.test(email.trim())) next.email = 'Enter an email address like name@example.com'
    if (password.length < 8) next.password = 'Use at least 8 characters'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setBusy(true)
    setSubmitted(true)
    const result = await signUp({ name, email, password })
    setBusy(false)
    if (!result.ok) {
      setSubmitted(false)
      return setErrors({ email: result.error })
    }
    toast(`Account created. Welcome, ${name.trim().split(' ')[0]}`)
    done()
  }

  return (
    <AuthLayout
      sheet="Sheet 05 · Create account"
      title={
        <>
          Start your <em>plan</em>.
        </>
      }
      lede="An account keeps your agreement in principle and your documents together."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" state={location.state} viewTransition className="link font-medium text-blue-ink">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" error={errors.name} placeholder="Ada Okoye" />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" error={errors.email} placeholder="ada@example.com" />
        <PasswordField label="Password" value={password} onChange={setPassword} autoComplete="new-password" error={errors.password} meter />
        <button type="submit" disabled={busy} className="btn btn-solid mt-1 w-full">
          {busy ? 'Creating your account…' : 'Create account'}
          {!busy && <ArrowRight className="btn-arrow" aria-hidden="true" />}
        </button>
      </form>
    </AuthLayout>
  )
}

import { ArrowRight, CircleAlert } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AuthLayout, useAfterAuth } from '@/components/auth/AuthLayout'
import { PasswordField } from '@/components/auth/PasswordField'
import { TextField } from '@/components/ui/Field'
import { useToast } from '@/components/ui/Toast'
import { useMeta } from '@/hooks/useMeta'
import { useAuth } from '@/lib/auth'

export default function SignIn() {
  useMeta('Sign in', 'Sign in to pick up your agreement in principle where you left off.')
  const { user, signIn } = useAuth()
  const location = useLocation()
  const done = useAfterAuth()
  const toast = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Already signed in when the page opened: nothing to do here.
  if (user && !submitted) return <Navigate to="/application" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password) return setError('Enter your email and password.')
    setBusy(true)
    setSubmitted(true)
    const result = await signIn({ email, password })
    setBusy(false)
    if (!result.ok) {
      setSubmitted(false)
      return setError(result.error)
    }
    toast('Welcome back')
    done()
  }

  return (
    <AuthLayout
      sheet="Sheet 05 · Sign in"
      title={
        <>
          Welcome <em>back</em>.
        </>
      }
      lede="Pick up your application where you left it."
      footer={
        <>
          New here?{' '}
          <Link to="/signup" state={location.state} viewTransition className="link font-medium text-blue-ink">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={submit} noValidate className="grid gap-5">
        {error && (
          <p role="alert" className="flex items-start gap-2.5 rounded-md border border-red/40 bg-red-wash px-4 py-3 text-[0.9375rem] text-ink" style={{ animation: 'fade-up 0.4s var(--ease-out-expo) both' }}>
            <CircleAlert className="mt-0.5 size-4 flex-none text-red-ink" aria-hidden="true" />
            {error}
          </p>
        )}
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="ada@example.com" />
        <PasswordField label="Password" value={password} onChange={setPassword} autoComplete="current-password" />
        <button type="submit" disabled={busy} className="btn btn-solid mt-1 w-full">
          {busy ? 'Signing in…' : 'Sign in'}
          {!busy && <ArrowRight className="btn-arrow" aria-hidden="true" />}
        </button>
      </form>
    </AuthLayout>
  )
}

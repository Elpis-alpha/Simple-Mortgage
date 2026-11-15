import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { createApplication, emptyApplication, loadApplication, saveApplication } from './application'
import { readJSON, remove, writeJSON } from './storage'

/**
 * Demo accounts. There is no server: accounts are stored in this browser's
 * localStorage, and only a salted SHA-256 hash of the password is kept.
 * That is plenty for a portfolio demo and nowhere near enough for real use.
 */

export interface Account {
  id: string
  name: string
  email: string
  createdAt: string
}

interface StoredAccount extends Account {
  salt: string
  hash: string
}

type Result = { ok: true } | { ok: false; error: string }

interface AuthValue {
  user: Account | null
  signUp: (input: { name: string; email: string; password: string }) => Promise<Result>
  signIn: (input: { email: string; password: string }) => Promise<Result>
  signInDemo: () => Promise<void>
  signOut: () => void
}

const DEMO_EMAIL = 'demo@masteryourmortgage.example'

const AuthContext = createContext<AuthValue | null>(null)

const normalise = (email: string) => email.trim().toLowerCase()
const publicAccount = ({ id, name, email, createdAt }: StoredAccount): Account => ({ id, name, email, createdAt })

async function hashPassword(password: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

const loadAccounts = () => readJSON<StoredAccount[]>('accounts', [])

function loadSession(): Account | null {
  const id = readJSON<string | null>('session', null)
  const account = id ? loadAccounts().find((a) => a.id === id) : undefined
  return account ? publicAccount(account) : null
}

async function createAccount(name: string, email: string, password: string): Promise<StoredAccount> {
  const salt = crypto.randomUUID()
  const account: StoredAccount = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalise(email),
    createdAt: new Date().toISOString(),
    salt,
    hash: await hashPassword(password, salt),
  }
  writeJSON('accounts', [...loadAccounts(), account])
  return account
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(loadSession)

  const start = useCallback((account: StoredAccount) => {
    writeJSON('session', account.id)
    setUser(publicAccount(account))
  }, [])

  const signUp = useCallback<AuthValue['signUp']>(
    async ({ name, email, password }) => {
      if (loadAccounts().some((a) => a.email === normalise(email))) {
        return { ok: false, error: 'An account with that email already exists on this device.' }
      }
      start(await createAccount(name, email, password))
      return { ok: true }
    },
    [start],
  )

  const signIn = useCallback<AuthValue['signIn']>(
    async ({ email, password }) => {
      const account = loadAccounts().find((a) => a.email === normalise(email))
      // Hash even when the account is missing so both failures look the same.
      const hash = await hashPassword(password, account?.salt ?? 'no-account')
      if (!account || hash !== account.hash) {
        return { ok: false, error: 'That email and password do not match an account on this device.' }
      }
      start(account)
      return { ok: true }
    },
    [start],
  )

  const signInDemo = useCallback(async () => {
    let account = loadAccounts().find((a) => a.email === DEMO_EMAIL)
    if (!account) account = await createAccount('Ada Okoye', DEMO_EMAIL, crypto.randomUUID())
    // Give the demo account a finished application so the dashboard has something to show.
    if (!loadApplication(account.id)) {
      const application = createApplication(account.id, {
        ...emptyApplication,
        firstName: 'Ada',
        lastName: 'Okoye',
        dateOfBirth: '1992-04-18',
        email: DEMO_EMAIL,
        phone: '07700 900123',
        applicants: 2,
        income: 54_000,
        partnerIncome: 38_000,
        monthlyCommitments: 320,
        propertyValue: 385_000,
        deposit: 58_000,
        termYears: 30,
        postcode: 'E14 5EU',
      })
      application.documents = {
        id: { name: 'passport.pdf', addedAt: application.createdAt },
        address: { name: 'council-tax-2026.pdf', addedAt: application.createdAt },
      }
      saveApplication(application)
    }
    start(account)
  }, [start])

  const signOut = useCallback(() => {
    remove('session')
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, signUp, signIn, signInDemo, signOut }), [user, signUp, signIn, signInDemo, signOut])

  return <AuthContext value={value}>{children}</AuthContext>
}

export function useAuth(): AuthValue {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth must be used inside <AuthProvider>')
  return value
}

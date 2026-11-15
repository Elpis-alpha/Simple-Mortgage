import { estimateBorrowing } from './affordability'
import { loanToValue, monthlyPayment } from './mortgage'
import { productFor, type Product, type ProductKind } from './products'
import { makeReference, readJSON, writeJSON } from './storage'

export type Purpose = 'first-home' | 'moving' | 'remortgage' | 'buy-to-let'
export type Employment = 'employed' | 'self-employed' | 'contractor' | 'retired'

export interface ApplicationData {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  applicants: 1 | 2
  employment: Employment
  income: number
  partnerIncome: number
  monthlyCommitments: number
  dependants: number
  purpose: Purpose
  propertyValue: number
  deposit: number
  termYears: number
  productKind: ProductKind
  postcode: string
}

export interface Decision {
  outcome: 'agreed' | 'refer'
  loan: number
  ltv: number
  /** The most we would expect a lender to offer on these figures. */
  maxLoan: number
  product: Product | null
  monthly: number
  /** Plain-English notes explaining the outcome. */
  notes: string[]
}

export interface DocumentSlot {
  name: string
  addedAt: string
}

export interface Application {
  reference: string
  accountId: string
  createdAt: string
  /** The agreement in principle is valid for 90 days. */
  expiresAt: string
  data: ApplicationData
  decision: Decision
  documents: Record<string, DocumentSlot | undefined>
}

export const purposes: Record<Purpose, string> = {
  'first-home': 'Buying my first home',
  moving: 'Moving home',
  remortgage: 'Remortgaging',
  'buy-to-let': 'Buy-to-let',
}

export const employments: Record<Employment, string> = {
  employed: 'Employed',
  'self-employed': 'Self-employed',
  contractor: 'Contractor',
  retired: 'Retired',
}

export const requiredDocuments = [
  { id: 'id', label: 'Photo ID', hint: 'Passport or driving licence' },
  { id: 'address', label: 'Proof of address', hint: 'Utility bill or council tax, last 3 months' },
  { id: 'income', label: 'Proof of income', hint: 'Last 3 payslips or 2 years of accounts' },
  { id: 'bank', label: 'Bank statements', hint: 'Last 3 months, every page' },
  { id: 'deposit', label: 'Proof of deposit', hint: 'Statement showing the funds, or a gifted deposit letter' },
] as const

export const emptyApplication: ApplicationData = {
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  applicants: 1,
  employment: 'employed',
  income: 62_000,
  partnerIncome: 0,
  monthlyCommitments: 250,
  dependants: 0,
  purpose: 'first-home',
  propertyValue: 300_000,
  deposit: 45_000,
  termYears: 30,
  productKind: 'fix5',
  postcode: '',
}

const MIN_LOAN = 25_000

/** Runs the same sums an adviser would do on the back of an envelope. */
export function assess(data: ApplicationData): Decision {
  const loan = Math.max(0, data.propertyValue - data.deposit)
  const ltv = loanToValue(loan, data.propertyValue)
  const product = productFor(data.productKind, ltv)
  const afford = estimateBorrowing({
    income: data.income,
    partnerIncome: data.applicants === 2 ? data.partnerIncome : 0,
    monthlyCommitments: data.monthlyCommitments,
    dependants: data.dependants,
    deposit: data.deposit,
  })
  const monthly = product ? monthlyPayment(loan, product.rate, data.termYears * 12) : 0

  const notes: string[] = []
  let outcome: Decision['outcome'] = 'agreed'

  if (!product) {
    outcome = 'refer'
    notes.push('The deposit is under 5% of the price, which is below what our lenders accept.')
  }
  if (loan < MIN_LOAN) {
    outcome = 'refer'
    notes.push('The loan is smaller than the £25,000 minimum most lenders set.')
  }
  if (loan > afford.stretch) {
    outcome = 'refer'
    notes.push('The loan is above five times the income we could assess, so an adviser needs to look at it.')
  } else if (loan > afford.typical) {
    notes.push('The loan is at the upper end for this income. Fewer lenders will consider it.')
  }
  if (data.employment === 'self-employed' || data.employment === 'contractor') {
    notes.push('We will ask for two years of accounts or contracts to confirm income.')
  }
  if (data.purpose === 'buy-to-let') {
    notes.push('Buy-to-let lending also depends on the expected rent, which we will check with you.')
  }
  if (outcome === 'agreed' && notes.length === 0) {
    notes.push('Everything sits comfortably inside standard lending criteria.')
  }

  return { outcome, loan, ltv, maxLoan: afford.stretch, product, monthly, notes }
}

const DAY = 24 * 60 * 60 * 1000

export function createApplication(accountId: string, data: ApplicationData, now = new Date()): Application {
  return {
    reference: makeReference(),
    accountId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 90 * DAY).toISOString(),
    data,
    decision: assess(data),
    documents: {},
  }
}

/* ---- Persistence, keyed by account -------------------------------- */

type Store = Record<string, Application | undefined>

export const loadApplication = (accountId: string) => readJSON<Store>('applications', {})[accountId] ?? null

export function saveApplication(app: Application): void {
  const store = readJSON<Store>('applications', {})
  store[app.accountId] = app
  writeJSON('applications', store)
}

export function deleteApplication(accountId: string): void {
  const store = readJSON<Store>('applications', {})
  delete store[accountId]
  writeJSON('applications', store)
}

export const loadDraft = (accountId: string) => readJSON<Partial<ApplicationData> | null>(`draft:${accountId}`, null)
export const saveDraft = (accountId: string, draft: Partial<ApplicationData>) => writeJSON(`draft:${accountId}`, draft)

/** A scenario handed over from the calculator to pre-fill the application. */
export interface Scenario {
  propertyValue: number
  deposit: number
  termYears: number
}
export const loadScenario = () => readJSON<Scenario | null>('scenario', null)
export const saveScenario = (s: Scenario) => writeJSON('scenario', s)

/**
 * Mortgage arithmetic. Everything here is pure, so it is unit tested and can
 * be reused by the calculators, the hero instrument and the application flow.
 */

export type RepaymentType = 'repayment' | 'interest-only'

export interface LoanInput {
  /** Amount borrowed, in pounds. */
  principal: number
  /** Annual interest rate as a percentage, e.g. 5.25. */
  annualRate: number
  termYears: number
  type?: RepaymentType
  /** Extra paid every month on top of the contractual payment. */
  monthlyOverpayment?: number
}

export interface YearRow {
  year: number
  principalPaid: number
  interestPaid: number
  /** Balance still owed at the end of the year. */
  balance: number
}

export interface Schedule {
  /** Contractual monthly payment, before any overpayment. */
  monthlyPayment: number
  /** Months until the balance reaches zero (shorter than the term when overpaying). */
  months: number
  totalInterest: number
  /** Everything paid to the lender, including any balance due at the end. */
  totalPaid: number
  /** Capital still owed when the term ends (interest-only loans). */
  balloon: number
  years: YearRow[]
  /** Balance at the end of each month. Index 0 is the opening balance. */
  balances: number[]
}

const EPSILON = 0.005

/** Standard annuity formula. Handles a zero rate without dividing by zero. */
export function monthlyPayment(principal: number, annualRate: number, termMonths: number): number {
  if (principal <= 0 || termMonths <= 0) return 0
  const r = annualRate / 100 / 12
  if (r === 0) return principal / termMonths
  return (principal * r) / (1 - Math.pow(1 + r, -termMonths))
}

export function buildSchedule(input: LoanInput): Schedule {
  const principal = Math.max(0, input.principal)
  const termMonths = Math.max(0, Math.round(input.termYears * 12))
  const r = Math.max(0, input.annualRate) / 100 / 12
  const overpay = Math.max(0, input.monthlyOverpayment ?? 0)
  const interestOnly = input.type === 'interest-only'

  const payment = interestOnly ? principal * r : monthlyPayment(principal, input.annualRate, termMonths)

  const balances = [principal]
  const years: YearRow[] = []
  let balance = principal
  let totalInterest = 0
  let totalPaid = 0
  let months = 0
  let yearPrincipal = 0
  let yearInterest = 0

  for (let m = 1; m <= termMonths && balance > EPSILON; m++) {
    const interest = balance * r
    // Never pay more capital than is owed: the final payment is usually smaller.
    const capital = Math.min(balance, (interestOnly ? 0 : payment - interest) + overpay)
    balance -= capital
    if (balance < EPSILON) balance = 0

    totalInterest += interest
    totalPaid += interest + capital
    yearInterest += interest
    yearPrincipal += capital
    months = m
    balances.push(balance)

    if (m % 12 === 0 || balance === 0 || m === termMonths) {
      years.push({
        year: Math.ceil(m / 12),
        principalPaid: yearPrincipal,
        interestPaid: yearInterest,
        balance,
      })
      yearPrincipal = 0
      yearInterest = 0
    }
  }

  const balloon = balance
  return {
    monthlyPayment: payment,
    months,
    totalInterest,
    totalPaid: totalPaid + balloon,
    balloon,
    years,
    balances,
  }
}

/** Loan-to-value as a percentage (0-100+). */
export function loanToValue(loan: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0
  return (loan / propertyValue) * 100
}

/**
 * Share of the home the borrower owns after `month` months, as a fraction
 * 0-1, assuming the property value does not change.
 */
export function equityShare(schedule: Schedule, propertyValue: number, month: number): number {
  if (propertyValue <= 0) return 0
  const last = schedule.balances.length - 1
  const i = Math.min(Math.max(0, Math.round(month)), last)
  const balance = schedule.balances[i] ?? 0
  return Math.min(1, Math.max(0, 1 - balance / propertyValue))
}

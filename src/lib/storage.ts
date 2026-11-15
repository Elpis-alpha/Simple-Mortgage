/**
 * Thin wrapper around localStorage. Everything the app remembers lives in
 * the visitor's own browser: there is no server.
 */
const PREFIX = 'mym:'

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* Private mode or a full quota: the app still works for this visit. */
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    /* nothing to remove */
  }
}

/** Short, readable reference such as "MYM-7K2Q9D". */
export function makeReference(): string {
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return 'MYM-' + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
}

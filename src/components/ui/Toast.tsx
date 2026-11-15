import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check } from 'lucide-react'

interface ToastItem {
  id: number
  message: string
}

const ToastContext = createContext<((message: string) => void) | null>(null)

/** Small confirmation messages that appear at the bottom of the screen and clear themselves. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const toast = useCallback((message: string) => {
    const id = nextId.current++
    setItems((list) => [...list.slice(-2), { id, message }])
    window.setTimeout(() => setItems((list) => list.filter((t) => t.id !== id)), 3200)
  }, [])

  const value = useMemo(() => toast, [toast])

  return (
    <ToastContext value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="no-print pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2.5 rounded-full bg-solid py-2.5 pr-5 pl-3 text-sm font-medium text-on-solid shadow-sheet"
            style={{ animation: 'fade-up 0.45s var(--ease-out-expo) both' }}
          >
            <span className="grid size-5 place-items-center rounded-full bg-good text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item.message}
          </div>
        ))}
      </div>
    </ToastContext>
  )
}

export function useToast() {
  const toast = useContext(ToastContext)
  if (!toast) throw new Error('useToast must be used inside <ToastProvider>')
  return toast
}

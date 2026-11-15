import { useEffect, useRef, useState } from 'react'

interface SpringOptions {
  stiffness?: number
  damping?: number
  /** Skip the animation and start at the target. */
  immediate?: boolean
}

const prefersReducedMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Animates a number towards `target` with a damped spring. Used for the
 * equity level in the house drawing and for figures that ease into place.
 */
export function useSpring(target: number, { stiffness = 170, damping = 22, immediate = false }: SpringOptions = {}) {
  const [value, setValue] = useState(target)
  const state = useRef({ value: target, velocity: 0, target, frame: 0, last: 0 })

  useEffect(() => {
    const s = state.current
    s.target = target

    if (immediate || prefersReducedMotion()) {
      cancelAnimationFrame(s.frame)
      s.frame = 0
      s.value = target
      s.velocity = 0
      setValue(target)
      return
    }
    if (s.frame || s.value === target) return

    s.last = performance.now()
    const step = (now: number) => {
      // Clamp the step so a background tab does not explode the integration.
      const dt = Math.min(0.032, (now - s.last) / 1000)
      s.last = now
      const force = stiffness * (s.target - s.value) - damping * s.velocity
      s.velocity += force * dt
      s.value += s.velocity * dt

      const scale = Math.max(1, Math.abs(s.target))
      if (Math.abs(s.target - s.value) < scale * 0.0005 && Math.abs(s.velocity) < scale * 0.0005) {
        s.value = s.target
        s.velocity = 0
        s.frame = 0
        setValue(s.value)
        return
      }
      setValue(s.value)
      s.frame = requestAnimationFrame(step)
    }
    s.frame = requestAnimationFrame(step)
  }, [target, stiffness, damping, immediate])

  useEffect(() => {
    const s = state.current
    return () => {
      // Zero the handle too: StrictMode re-runs effects, and a stale handle
      // would make the next change think a loop is still running.
      cancelAnimationFrame(s.frame)
      s.frame = 0
    }
  }, [])

  return value
}

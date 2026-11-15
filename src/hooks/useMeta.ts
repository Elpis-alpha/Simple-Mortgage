import { useEffect } from 'react'
import { site } from '@/lib/site'

/** Sets the document title and meta description for the current page. */
export function useMeta(title: string | null, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : `${site.name} — own more of your home, sooner`
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    }
  }, [title, description])
}

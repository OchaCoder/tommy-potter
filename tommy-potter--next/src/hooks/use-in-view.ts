import { useEffect, useState, useRef } from "react"

export const useInView = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

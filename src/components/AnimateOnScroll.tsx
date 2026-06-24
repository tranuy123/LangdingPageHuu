'use client'
import { useEffect, useRef, ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'zoom'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: Variant
}

const variantClass: Record<Variant, string> = {
  up: '',
  left: 'from-left',
  right: 'from-right',
  zoom: 'from-zoom',
}

export default function AnimateOnScroll({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('animate-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`animate-hidden ${variantClass[variant]} ${className}`}>
      {children}
    </div>
  )
}

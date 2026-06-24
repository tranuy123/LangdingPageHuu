'use client'
import { useState, useEffect } from 'react'

export default function Navbar({ siteName }: { siteName: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#hero', label: 'Trang Chủ' },
    { href: '#courses', label: 'Khóa Học' },
    { href: '#instructor', label: 'Giảng Viên' },
    { href: '#projects', label: 'Dự Án' },
    { href: '#contact', label: 'Tư Vấn Miễn Phí' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md border-b border-white/8 py-3' : 'py-5'
      }`}
      style={scrolled ? { background: 'rgba(var(--bg-rgb), 0.95)' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="font-bold text-base tracking-tight">
          <span className="text-gradient">{siteName}</span>
        </a>

        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200 tracking-wider uppercase"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden backdrop-blur-md border-t border-white/8 px-6 py-5" style={{ background: 'rgba(var(--bg-rgb), 0.98)' }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 text-sm text-gray-400 hover:text-gold-400 transition-colors tracking-wide border-b border-white/5 last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

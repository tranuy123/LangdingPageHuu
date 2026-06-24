import type { ContactInfo, Course } from '@prisma/client'

type Props = {
  siteName: string
  contact: ContactInfo | null
  courses: Course[]
}

export default function Footer({ siteName, contact, courses }: Props) {
  return (
    <footer className="border-t border-white/5" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="text-gradient font-black text-lg mb-3">{siteName}</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Crafted with passion · Designed for storytellers
            </p>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm">Liên Kết Nhanh</p>
            <ul className="space-y-2">
              {[
                { href: '#hero', label: 'Trang Chủ' },
                { href: '#courses', label: 'Khóa Học' },
                { href: '#instructor', label: 'Giảng Viên' },
                { href: '#projects', label: 'Dự Án' },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-gray-500 text-sm hover:text-gold-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white font-semibold mb-4 text-sm">Khóa Học</p>
            <ul className="space-y-2">
              {courses.map((c) => (
                <li key={c.id}>
                  <a href="#courses" className="text-gray-500 text-sm hover:text-gold-400 transition-colors">
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
            {contact && (
              <div className="mt-6 space-y-1">
                <p className="text-gray-500 text-sm">{contact.phone}</p>
                <p className="text-gray-500 text-sm">{contact.email}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

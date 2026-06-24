import type { Course } from '@prisma/client'
import AnimateOnScroll from './AnimateOnScroll'

function Modules({ course, pro }: { course: Course; pro?: boolean }) {
  const mods = JSON.parse(course.modules) as string[]
  return (
    <ul className="space-y-3">
      {mods.map((m, i) => (
        <li key={i} className={`flex items-center gap-3 text-sm ${pro ? 'text-gray-300' : 'text-gray-400'}`}>
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
              pro
                ? 'bg-gold-400/15 border border-gold-400/30 text-gold-400'
                : 'border border-white/15 text-gray-500'
            }`}
          >
            {i + 1}
          </span>
          {m}
        </li>
      ))}
    </ul>
  )
}

export default function CoursesSection({ courses }: { courses: Course[] }) {
  const free = courses.filter((c) => c.type === 'free')
  const pro = courses.filter((c) => c.type === 'pro')

  return (
    <section id="courses" className="py-24 relative" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(var(--primary-rgb), 0.04) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Lộ Trình</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tightest text-white">Khóa Học</h2>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Free column */}
          <AnimateOnScroll variant="left" delay={100}>
            <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-8 glow-hover hover:border-white/20 space-y-8">
              <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/70 text-[11px] font-semibold tracking-widest uppercase">
                Miễn Phí — 0Đ
              </div>
              {free.map((c) => (
                <div key={c.id} className="pt-2 first:pt-0 border-t border-white/5 first:border-0">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3">{c.name}</h3>
                  {c.description && <p className="text-gray-500 text-sm mb-6 leading-relaxed">{c.description}</p>}
                  <Modules course={c} />
                </div>
              ))}
              <a
                href="#contact"
                className="block text-center py-3 px-6 rounded-full border border-white/15 text-white/70 text-sm font-medium hover:border-gold-400/40 hover:text-gold-400 hover:bg-gold-400/[0.04] transition-all duration-300"
              >
                Đăng Ký Miễn Phí
              </a>
            </div>
          </AnimateOnScroll>

          {/* Pro column */}
          <AnimateOnScroll variant="right" delay={200}>
            <div className="h-full rounded-2xl border border-gold-400/25 bg-gradient-to-b from-gold-400/5 to-transparent p-8 glow glow-hover hover:border-gold-400/50 space-y-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-400 text-on-primary text-[11px] font-semibold tracking-widest uppercase">
                <span>✦</span> Pro — Chuyên Sâu
              </div>
              {pro.map((c) => (
                <div key={c.id} className="pt-2 first:pt-0 border-t border-gold-400/10 first:border-0">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-3">{c.name}</h3>
                  {c.description && <p className="text-gray-500 text-sm mb-6 leading-relaxed">{c.description}</p>}
                  <Modules course={c} pro />
                </div>
              ))}
              <a
                href="#contact"
                className="btn-shine block text-center py-3 px-6 rounded-full bg-gold-400 text-on-primary font-semibold text-sm hover:bg-gold-500 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.35)]"
              >
                Đăng Ký PRO
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

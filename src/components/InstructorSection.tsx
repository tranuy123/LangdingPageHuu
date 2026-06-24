import type { Instructor } from '@prisma/client'
import AvatarImage from './AvatarImage'
import AnimateOnScroll from './AnimateOnScroll'

export default function InstructorSection({ instructor }: { instructor: Instructor }) {
  return (
    <section id="instructor" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(var(--primary-rgb), 0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Giảng Viên</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tightest text-white">Người Đồng Hành</h2>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col md:flex-row items-center gap-14 max-w-4xl mx-auto">
          <AnimateOnScroll variant="left" delay={100}>
            <div className="relative w-52 h-52 md:w-72 md:h-72 flex-shrink-0 group">
              <div className="absolute -inset-4 rounded-full blur-2xl animate-glow-pulse" style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.25), transparent 70%)' }} />
              <div className="absolute -inset-px rounded-full animate-spin-slow" style={{ background: 'conic-gradient(from 0deg, rgba(var(--primary-rgb), 0.5), transparent 40%, rgba(var(--primary-rgb), 0.3) 70%, transparent)' }} />
              <div className="relative w-full h-full rounded-full overflow-hidden border border-gold-400/20 transition-transform duration-500 group-hover:scale-[1.03]" style={{ background: 'var(--bg-card)' }}>
                {/* Fallback initials - shown only when no image */}
                <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-gold-400/60">
                  {instructor.name.charAt(0)}
                </div>
                <AvatarImage src={instructor.avatarUrl} name={instructor.name} />
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll variant="right" delay={200} className="flex-1">
            <div>
              <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-3 font-medium">Người Kiến Tạo Khoảnh Khắc</p>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">{instructor.name}</h3>
              <p className="text-gray-400 font-medium mb-5">{instructor.title}</p>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{instructor.bio}</p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

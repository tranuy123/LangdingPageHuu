import type { Project } from '@prisma/client'
import Image from 'next/image'
import AnimateOnScroll from './AnimateOnScroll'

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 relative" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 30% at 50% 0%, rgba(var(--primary-rgb), 0.03) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Thành Quả</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tightest text-white">Dự Án Nổi Bật</h2>
            <p className="text-gray-500 mt-4 text-sm">Bài tốt nghiệp từ học viên</p>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <AnimateOnScroll key={p.id} delay={i * 70}>
              <a
                href={p.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden border border-white/8 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60"
                style={{ '--tw-shadow-color': 'rgba(var(--primary-rgb), 0.08)' } as React.CSSProperties}
              >
                <div className="relative aspect-video" style={{ background: 'var(--bg-card)' }}>
                  <Image
                    src={p.thumbnailUrl}
                    alt={p.studentName}
                    fill
                    unoptimized={p.thumbnailUrl.startsWith('/uploads/')}
                    className="object-cover opacity-55 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-13 h-13 rounded-full backdrop-blur-sm flex items-center justify-center group-hover:scale-115 transition-all duration-300"
                      style={{
                        width: '52px',
                        height: '52px',
                        background: 'rgba(var(--primary-rgb), 0.2)',
                        border: '2px solid rgba(var(--primary-rgb), 0.7)',
                        boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)',
                      }}
                    >
                      <svg
                        className="w-5 h-5 ml-0.5 transition-colors duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: 'rgb(var(--primary-rgb))' }}
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ background: 'var(--bg-card)' }}>
                  <p className="font-semibold text-white text-sm leading-snug">{p.studentName}</p>
                  <p className="text-xs mt-1 tracking-wide" style={{ color: 'rgb(var(--primary-rgb))' }}>{p.tool}</p>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Instructor } from '@prisma/client'
import AnimateOnScroll from './AnimateOnScroll'

export default function StatsSection({ instructor }: { instructor: Instructor }) {
  const stats = [
    { value: instructor.experience, label: 'Năm Kinh Nghiệm' },
    { value: instructor.projectsDone, label: 'Dự Án Thực Hiện' },
    { value: instructor.studentsCount, label: 'Học Viên Đào Tạo' },
    { value: instructor.satisfactionRate, label: 'Học Viên Hài Lòng' },
  ]

  return (
    <section className="py-16 border-y border-white/5" style={{ background: 'var(--bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimateOnScroll key={s.label} delay={i * 80}>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold tracking-tightest mb-2 animate-shimmer">{s.value}</div>
                <div className="text-gray-500 text-xs tracking-widest uppercase">{s.label}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

import type { Feature } from '@prisma/client'
import AnimateOnScroll from './AnimateOnScroll'

export default function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <section className="py-24 relative" style={{ background: 'var(--bg-alt)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(var(--primary-rgb), 0.03) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Vì Sao Chọn Chúng Tôi</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tightest text-white">Cam Kết Của Chúng Tôi</h2>
          </div>
        </AnimateOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <AnimateOnScroll key={f.id} variant="zoom" delay={i * 90}>
              <div className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-7 glow-hover hover:-translate-y-1.5 hover:border-gold-400/30 hover:bg-gold-400/[0.04] group">
                <div className="text-3xl mb-5 inline-block transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6">{f.icon}</div>
                <h3 className="font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300 tracking-tight">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

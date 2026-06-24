type Props = {
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
}

export default function HeroSection({ title, subtitle, ctaPrimary, ctaSecondary }: Props) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 noise-overlay">
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(var(--primary-rgb), 0.10) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(var(--primary-rgb), 0.05) 0%, transparent 60%)' }} />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[36rem] h-[36rem] rounded-full blur-3xl animate-float-slow animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.10), transparent 70%)', top: '-10%', left: '-8%' }}
        />
        <div
          className="absolute w-[28rem] h-[28rem] rounded-full blur-3xl animate-float"
          style={{ background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.08), transparent 70%)', bottom: '-12%', right: '-6%' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: '12%', top: '28%', d: '0s', dur: '12s' },
          { left: '82%', top: '22%', d: '1.5s', dur: '15s' },
          { left: '68%', top: '70%', d: '3s', dur: '13s' },
          { left: '25%', top: '75%', d: '2s', dur: '17s' },
          { left: '45%', top: '18%', d: '4s', dur: '14s' },
          { left: '90%', top: '55%', d: '0.5s', dur: '16s' },
        ].map((p, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full animate-float"
            style={{
              left: p.left,
              top: p.top,
              background: 'rgb(var(--primary-rgb))',
              opacity: 0.4,
              boxShadow: '0 0 8px rgba(var(--primary-rgb), 0.8)',
              animationDelay: p.d,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      {/* Horizontal light lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(var(--primary-rgb), 0.14), transparent)', top: '35%' }} />
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ top: '65%' }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="hero-badge inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-gold-400/25 bg-gold-400/5 backdrop-blur-sm glow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          <span className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase">Học Viện Hậu Kỳ Cinematic</span>
        </div>

        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tightest mb-6">
          <span className="text-gradient-animated">{title}</span>
        </h1>

        <p className="hero-subtitle text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {subtitle}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#courses"
            className="btn-shine group relative px-8 py-4 bg-gold-400 text-on-primary font-semibold rounded-full hover:bg-gold-500 transition-all duration-300 hover:scale-105 glow-sm hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)] text-sm tracking-wide"
          >
            <span className="relative z-10">{ctaPrimary}</span>
          </a>
          <a
            href="#projects"
            className="px-8 py-4 border border-white/15 text-white/80 font-medium rounded-full hover:border-gold-400/50 hover:text-gold-400 hover:bg-gold-400/[0.04] transition-all duration-300 text-sm tracking-wide backdrop-blur-sm"
          >
            {ctaSecondary}
          </a>
        </div>

        {/* Quote */}
        <p className="hero-subtitle mt-14 text-white/20 text-sm italic tracking-widest">
          &ldquo;Mỗi khung hình là một câu chuyện.&rdquo;
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Cuộn xuống</span>
        <div className="relative w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <span className="w-1 h-1 rounded-full bg-gold-400 animate-scroll-dot" />
        </div>
      </div>
    </section>
  )
}

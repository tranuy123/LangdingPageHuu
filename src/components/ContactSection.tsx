import type { ContactInfo } from '@prisma/client'
import ContactForm from './ContactForm'
import AnimateOnScroll from './AnimateOnScroll'

export default function ContactSection({ contact }: { contact: ContactInfo }) {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(var(--primary-rgb), 0.04) 0%, transparent 60%)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <AnimateOnScroll>
          <div className="text-center mb-16">
            <p className="text-gold-400 text-xs tracking-[0.25em] uppercase mb-3 font-medium">Bắt Đầu Hành Trình</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tightest text-white mb-4">Tư Vấn Miễn Phí</h2>
            <p className="text-gray-500 text-sm">Để lại thông tin — chúng tôi sẽ liên hệ trong vòng 24 giờ</p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <AnimateOnScroll delay={100}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <h3 className="font-semibold text-white mb-6 tracking-tight">Đăng Ký Tư Vấn</h3>
              <ContactForm />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="space-y-4">
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-gold-400/25 hover:bg-gold-400/[0.02] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0 group-hover:border-gold-400/30 transition-colors">
                  📞
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 mb-0.5 uppercase tracking-widest">Điện Thoại / Zalo</p>
                  <p className="font-semibold text-white group-hover:text-gold-400 transition-colors text-sm">{contact.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-gold-400/25 hover:bg-gold-400/[0.02] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0 group-hover:border-gold-400/30 transition-colors">
                  ✉️
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 mb-0.5 uppercase tracking-widest">Email</p>
                  <p className="font-semibold text-white group-hover:text-gold-400 transition-colors text-sm">{contact.email}</p>
                </div>
              </a>

              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-gold-400/25 hover:bg-gold-400/[0.02] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0 group-hover:border-gold-400/30 transition-colors">
                  💬
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 mb-0.5 uppercase tracking-widest">Facebook / Messenger</p>
                  <p className="font-semibold text-white group-hover:text-gold-400 transition-colors text-sm">Nhắn tin ngay</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <p className="text-[11px] text-gray-600 mb-0.5 uppercase tracking-widest">Địa Chỉ</p>
                  <p className="text-gray-400 text-sm">{contact.address}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}

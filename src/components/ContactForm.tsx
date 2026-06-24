'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setStatus('success')
      setForm({ name: '', phone: '', message: '' })
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="px-6 py-10 rounded-2xl border border-green-500/20 bg-green-500/5 text-center">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-bold text-white text-lg mb-1">Đã nhận thông tin!</p>
        <p className="text-gray-400 text-sm">Chúng tôi sẽ liên hệ bạn trong vòng 24 giờ.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-xs text-gray-500 hover:text-gold-400 transition-colors underline"
        >
          Gửi thêm
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Họ tên *</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nguyễn Văn A"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 placeholder:text-gray-600"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Số điện thoại *</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="0912 345 678"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 placeholder:text-gray-600"
        />
      </div>
      <div>
        <label className="block text-xs text-gray-400 mb-1.5">Ghi chú (tuỳ chọn)</label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Bạn quan tâm đến khóa học nào?"
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-400/50 placeholder:text-gray-600 resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Có lỗi xảy ra, vui lòng thử lại.</p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-gold-400 text-on-primary font-bold rounded-full text-sm hover:bg-gold-500 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
      >
        {status === 'loading' ? 'Đang gửi...' : 'Gửi Thông Tin Tư Vấn'}
      </button>
    </form>
  )
}

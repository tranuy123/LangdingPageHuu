'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(res.status === 500 ? 'Lỗi server — kiểm tra biến môi trường' : 'Sai mật khẩu')
        setLoading(false)
      }
    } catch {
      setError('Không thể kết nối server')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm px-6">
        <h1 className="text-2xl font-black mb-1" style={{ background: 'linear-gradient(135deg,#f5c842,#ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Admin Panel
        </h1>
        <p className="text-gray-500 text-sm mb-8">Đăng nhập để quản lý nội dung</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm">
            {error}
          </div>
        )}

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400/50 mb-4"
          required
          autoFocus
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
        </button>
      </form>
    </div>
  )
}

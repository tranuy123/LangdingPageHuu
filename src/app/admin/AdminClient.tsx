'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Course, Instructor, ContactInfo, Feature, Project, Lead } from '@prisma/client'

type Tab = 'hero' | 'instructor' | 'courses' | 'projects' | 'features' | 'contact' | 'leads' | 'appearance'

type Props = {
  initialConfigs: Record<string, string>
  initialInstructor: Instructor | null
  initialCourses: Course[]
  initialProjects: Project[]
  initialFeatures: Feature[]
  initialContact: ContactInfo | null
  initialLeads: Lead[]
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const cls = 'w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50'
  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {multiline
        ? <textarea className={cls} rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  )
}

function FileUploadField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (res.ok && data.url) {
      onChange(data.url)
    } else {
      setError(data.error ?? 'Upload thất bại')
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL hoặc upload ảnh bên phải →"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 text-xs whitespace-nowrap disabled:opacity-50 transition-colors"
        >
          {uploading ? 'Đang tải...' : '↑ Upload'}
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {value && (
        <div className="mt-2">
          <img src={value} alt="" className="h-20 rounded-lg object-cover border border-white/10 bg-[#111]" />
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="hidden" onChange={handleFile} />
    </div>
  )
}

function VideoUploadField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    setProgress(`Đang tải lên ${(file.size / 1024 / 1024).toFixed(1)}MB...`)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        onChange(data.url)
        setProgress('')
      } else {
        setError(data.error ?? 'Upload thất bại')
        setProgress('')
      }
    } catch {
      setError('Lỗi kết nối')
      setProgress('')
    }
    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const isUploadedFile = value.startsWith('/uploads/')
  const isYouTube = value.includes('youtube.com') || value.includes('youtu.be')

  return (
    <div className="mb-4">
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL YouTube / Vimeo hoặc upload file video →"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-yellow-400 hover:border-yellow-400/30 text-xs whitespace-nowrap disabled:opacity-50 transition-colors"
        >
          {uploading ? '...' : '↑ Video'}
        </button>
      </div>
      {progress && <p className="text-yellow-400 text-xs mt-1">{progress}</p>}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      {value && isUploadedFile && (
        <div className="mt-2">
          <video
            src={value}
            controls
            className="w-full max-h-32 rounded-lg border border-white/10 bg-[#111]"
          />
        </div>
      )}
      {value && isYouTube && (
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span>🎬</span>
          <span className="truncate">{value}</span>
        </div>
      )}
      {value && !isUploadedFile && !isYouTube && (
        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span>🔗</span>
          <span className="truncate">{value}</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/avi"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  )
}

export default function AdminClient({ initialConfigs, initialInstructor, initialCourses, initialProjects, initialFeatures, initialContact, initialLeads }: Props) {
  const [tab, setTab] = useState<Tab>('hero')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const [configs, setConfigs] = useState(initialConfigs)
  const [instructor, setInstructor] = useState(initialInstructor)
  const [courses, setCourses] = useState(initialCourses)
  const [projects, setProjects] = useState(initialProjects)
  const [features, setFeatures] = useState(initialFeatures)
  const [contact, setContact] = useState(initialContact)
  const leads = initialLeads

  // Temp negative id for newly-added rows (server treats id <= 0 as "create")
  const tempId = () => -Math.floor(Date.now() + Math.random() * 1000)

  function addCourse(type: 'free' | 'pro') {
    setCourses([
      ...courses,
      { id: tempId(), type, name: 'Khóa học mới', description: '', modules: JSON.stringify([]), order: courses.length } as Course,
    ])
  }
  function addProject() {
    setProjects([
      ...projects,
      { id: tempId(), studentName: 'Học viên mới', tool: 'After Effects', thumbnailUrl: '', videoUrl: '#', order: projects.length } as Project,
    ])
  }
  function addFeature() {
    setFeatures([
      ...features,
      { id: tempId(), icon: '⭐', title: 'Điểm mạnh mới', description: '', order: features.length } as Feature,
    ])
  }

  async function save(data: unknown, endpoint: string, reload = false) {
    setSaving(true)
    setMsg('')
    try {
      const res = await fetch(`/api/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok && reload) {
        // Reload so newly-created rows get their real DB ids (avoids duplicate creation on next save)
        window.location.reload()
        return
      }
      setMsg(res.ok ? 'Đã lưu thành công!' : 'Lỗi khi lưu')
    } catch {
      setMsg('Lỗi kết nối')
    } finally {
      setSaving(false)
      setTimeout(() => setMsg(''), 3000)
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero' },
    { id: 'instructor', label: 'Giảng Viên' },
    { id: 'courses', label: 'Khóa Học' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'features', label: 'Điểm Mạnh' },
    { id: 'contact', label: 'Liên Hệ' },
    { id: 'leads', label: `Leads (${leads.length})` },
    { id: 'appearance', label: '🎨 Giao Diện' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-xl" style={{ background: 'linear-gradient(135deg,#f5c842,#ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Admin Panel
          </h1>
          <p className="text-gray-500 text-xs mt-0.5">Quản lý nội dung landing page</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-xs text-gray-400 hover:text-yellow-400 transition-colors">
            Xem trang web →
          </a>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition-colors">
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="flex border-b border-white/10 px-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              tab === t.id ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        {msg && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${msg.includes('thành công') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {msg}
          </div>
        )}

        {tab === 'hero' && (
          <form onSubmit={(e) => { e.preventDefault(); save({ configs }, 'hero') }}>
            <h2 className="text-lg font-bold mb-6">Hero Section</h2>
            <Field label="Tiêu đề chính" value={configs.hero_title ?? ''} onChange={(v) => setConfigs({ ...configs, hero_title: v })} />
            <Field label="Mô tả" value={configs.hero_subtitle ?? ''} onChange={(v) => setConfigs({ ...configs, hero_subtitle: v })} multiline />
            <Field label="Nút chính (CTA)" value={configs.hero_cta_primary ?? ''} onChange={(v) => setConfigs({ ...configs, hero_cta_primary: v })} />
            <Field label="Nút phụ" value={configs.hero_cta_secondary ?? ''} onChange={(v) => setConfigs({ ...configs, hero_cta_secondary: v })} />
            <Field label="Tên website" value={configs.site_name ?? ''} onChange={(v) => setConfigs({ ...configs, site_name: v })} />
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </form>
        )}

        {tab === 'instructor' && instructor && (
          <form onSubmit={(e) => { e.preventDefault(); save({ instructor }, 'instructor') }}>
            <h2 className="text-lg font-bold mb-6">Thông Tin Giảng Viên</h2>
            <Field label="Tên" value={instructor.name} onChange={(v) => setInstructor({ ...instructor, name: v })} />
            <Field label="Chức danh" value={instructor.title} onChange={(v) => setInstructor({ ...instructor, title: v })} />
            <Field label="Giới thiệu" value={instructor.bio} onChange={(v) => setInstructor({ ...instructor, bio: v })} multiline />
            <FileUploadField label="Ảnh đại diện" value={instructor.avatarUrl} onChange={(v) => setInstructor({ ...instructor, avatarUrl: v })} />
            <Field label="Số năm kinh nghiệm" value={instructor.experience} onChange={(v) => setInstructor({ ...instructor, experience: v })} />
            <Field label="Số dự án" value={instructor.projectsDone} onChange={(v) => setInstructor({ ...instructor, projectsDone: v })} />
            <Field label="Số học viên" value={instructor.studentsCount} onChange={(v) => setInstructor({ ...instructor, studentsCount: v })} />
            <Field label="Tỉ lệ hài lòng" value={instructor.satisfactionRate} onChange={(v) => setInstructor({ ...instructor, satisfactionRate: v })} />
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </form>
        )}

        {tab === 'courses' && (
          <div>
            <h2 className="text-lg font-bold mb-1">Khóa Học</h2>
            <p className="text-gray-500 text-sm mb-6">Hai cột Miễn Phí / Pro — thêm hoặc xóa khóa học tùy ý.</p>
            {(['free', 'pro'] as const).map((type) => (
              <div key={type} className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded text-xs font-bold ${type === 'free' ? 'bg-white/10 text-white' : 'bg-yellow-400 text-black'}`}>
                    {type === 'free' ? 'MIỄN PHÍ' : 'PRO'}
                  </span>
                  <button
                    type="button"
                    onClick={() => addCourse(type)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                  >
                    + Thêm khóa {type === 'free' ? 'miễn phí' : 'Pro'}
                  </button>
                </div>
                {courses.filter((c) => c.type === type).length === 0 && (
                  <p className="text-gray-600 text-xs italic mb-3">Chưa có khóa học nào.</p>
                )}
                {courses.filter((c) => c.type === type).map((c) => (
                  <div key={c.id} className="mb-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex justify-end mb-2">
                      <button
                        type="button"
                        onClick={() => setCourses(courses.filter((x) => x.id !== c.id))}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                      >
                        🗑 Xóa
                      </button>
                    </div>
                    <Field label="Tên khóa học" value={c.name} onChange={(v) => setCourses(courses.map((x) => x.id === c.id ? { ...x, name: v } : x))} />
                    <Field label="Mô tả" value={c.description} onChange={(v) => setCourses(courses.map((x) => x.id === c.id ? { ...x, description: v } : x))} multiline />
                    <div className="mb-1">
                      <label className="block text-xs text-gray-400 mb-1">Danh sách modules (mỗi dòng 1 module)</label>
                      <textarea
                        className="w-full bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50"
                        rows={4}
                        value={(JSON.parse(c.modules) as string[]).join('\n')}
                        onChange={(e) => {
                          const mods = JSON.stringify(e.target.value.split('\n').filter(Boolean))
                          setCourses(courses.map((x) => x.id === c.id ? { ...x, modules: mods } : x))
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => save({ courses }, 'courses', true)} disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        )}

        {tab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Dự Án Nổi Bật</h2>
              <button
                type="button"
                onClick={addProject}
                className="text-xs px-3 py-1.5 rounded-lg border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 transition-colors"
              >
                + Thêm dự án
              </button>
            </div>
            {projects.length === 0 && <p className="text-gray-600 text-sm italic mb-4">Chưa có dự án nào.</p>}
            {projects.map((p, i) => (
              <div key={p.id} className="mb-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500">Dự án #{i + 1}</p>
                  <button
                    type="button"
                    onClick={() => setProjects(projects.filter((x) => x.id !== p.id))}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                  >
                    🗑 Xóa
                  </button>
                </div>
                <Field label="Tên học viên" value={p.studentName} onChange={(v) => setProjects(projects.map((x) => x.id === p.id ? { ...x, studentName: v } : x))} />
                <Field label="Công cụ (After Effects / Premiere)" value={p.tool} onChange={(v) => setProjects(projects.map((x) => x.id === p.id ? { ...x, tool: v } : x))} />
                <FileUploadField label="Thumbnail (ảnh đại diện)" value={p.thumbnailUrl} onChange={(v) => setProjects(projects.map((x) => x.id === p.id ? { ...x, thumbnailUrl: v } : x))} />
                <VideoUploadField label="Video (upload file hoặc dán URL YouTube/Vimeo)" value={p.videoUrl} onChange={(v) => setProjects(projects.map((x) => x.id === p.id ? { ...x, videoUrl: v } : x))} />
              </div>
            ))}
            <button onClick={() => save({ projects }, 'projects', true)} disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        )}

        {tab === 'features' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Điểm Mạnh</h2>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs px-3 py-1.5 rounded-lg border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 transition-colors"
              >
                + Thêm điểm mạnh
              </button>
            </div>
            {features.length === 0 && <p className="text-gray-600 text-sm italic mb-4">Chưa có điểm mạnh nào.</p>}
            {features.map((f, i) => (
              <div key={f.id} className="mb-4 p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-gray-500">Điểm mạnh #{i + 1}</p>
                  <button
                    type="button"
                    onClick={() => setFeatures(features.filter((x) => x.id !== f.id))}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                  >
                    🗑 Xóa
                  </button>
                </div>
                <Field label="Icon (emoji)" value={f.icon} onChange={(v) => setFeatures(features.map((x) => x.id === f.id ? { ...x, icon: v } : x))} />
                <Field label="Tiêu đề" value={f.title} onChange={(v) => setFeatures(features.map((x) => x.id === f.id ? { ...x, title: v } : x))} />
                <Field label="Mô tả" value={f.description} onChange={(v) => setFeatures(features.map((x) => x.id === f.id ? { ...x, description: v } : x))} multiline />
              </div>
            ))}
            <button onClick={() => save({ features }, 'features', true)} disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </div>
        )}

        {tab === 'contact' && contact && (
          <form onSubmit={(e) => { e.preventDefault(); save({ contact }, 'contact') }}>
            <h2 className="text-lg font-bold mb-6">Thông Tin Liên Hệ</h2>
            <Field label="Số điện thoại / Zalo" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
            <Field label="Email" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
            <Field label="Facebook URL" value={contact.facebook} onChange={(v) => setContact({ ...contact, facebook: v })} />
            <Field label="Địa chỉ" value={contact.address} onChange={(v) => setContact({ ...contact, address: v })} multiline />
            <button type="submit" disabled={saving} className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50">
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </form>
        )}

        {tab === 'leads' && (
          <div>
            <h2 className="text-lg font-bold mb-2">Danh Sách Leads</h2>
            <p className="text-gray-500 text-sm mb-6">Thông tin đăng ký tư vấn từ landing page</p>
            {leads.length === 0 ? (
              <div className="text-center py-16 text-gray-600">
                <p className="text-4xl mb-3">📭</p>
                <p>Chưa có lead nào</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{lead.name}</p>
                        <a href={`tel:${lead.phone}`} className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors">
                          {lead.phone}
                        </a>
                        {lead.message && (
                          <p className="text-gray-400 text-sm mt-2">{lead.message}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 'appearance' && (
          <div>
            <h2 className="text-lg font-bold mb-6">Giao Diện</h2>
            <div className="mb-6">
              <label className="block text-xs text-gray-400 mb-3">Tông Màu Chính</label>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="color"
                  value={configs.primary_color ?? '#f5c842'}
                  onChange={(e) => setConfigs({ ...configs, primary_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                />
                <input
                  className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50 font-mono"
                  value={configs.primary_color ?? '#f5c842'}
                  onChange={(e) => {
                    const v = e.target.value
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setConfigs({ ...configs, primary_color: v })
                  }}
                  maxLength={7}
                  placeholder="#f5c842"
                />
              </div>
              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-2">Màu gợi ý:</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    ['#f5c842', 'Gold (mặc định)'],
                    ['#f97316', 'Cam'],
                    ['#ef4444', 'Đỏ'],
                    ['#ec4899', 'Hồng'],
                    ['#a855f7', 'Tím'],
                    ['#3b82f6', 'Xanh dương'],
                    ['#22c55e', 'Xanh lá'],
                    ['#e5e5e5', 'Trắng bạc'],
                  ] as [string, string][]).map(([color, label]) => (
                    <button
                      key={color}
                      type="button"
                      title={label}
                      onClick={() => setConfigs({ ...configs, primary_color: color })}
                      className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor: configs.primary_color === color ? '#ffffff' : 'transparent',
                        outline: configs.primary_color === color ? '2px solid rgba(255,255,255,0.3)' : 'none',
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-[#0f0f0f]">
                <p className="text-xs text-gray-500 mb-3">Xem trước:</p>
                <div
                  className="text-2xl font-bold mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${configs.primary_color ?? '#f5c842'}, ${configs.primary_color ?? '#f5c842'}99)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Học Viện Hậu Kỳ Cinematic
                </div>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    className="px-5 py-2 rounded-full text-black text-sm font-bold"
                    style={{ backgroundColor: configs.primary_color ?? '#f5c842' }}
                  >
                    Khám Phá Khóa Học
                  </button>
                  <span
                    className="text-sm font-medium"
                    style={{ color: configs.primary_color ?? '#f5c842' }}
                  >
                    Xem thêm →
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs text-gray-400 mb-3">Màu Nền (Background)</label>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="color"
                  value={configs.bg_color ?? '#0a0a0a'}
                  onChange={(e) => setConfigs({ ...configs, bg_color: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer bg-transparent"
                />
                <input
                  className="flex-1 bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400/50 font-mono"
                  value={configs.bg_color ?? '#0a0a0a'}
                  onChange={(e) => {
                    const v = e.target.value
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setConfigs({ ...configs, bg_color: v })
                  }}
                  maxLength={7}
                  placeholder="#0a0a0a"
                />
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Màu nền gợi ý (tối):</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    ['#0a0a0a', 'Đen (mặc định)'],
                    ['#0d0d0d', 'Đen nhẹ'],
                    ['#0a0a14', 'Đen xanh'],
                    ['#0d0a0a', 'Đen đỏ nâu'],
                    ['#0a0d0a', 'Đen xanh lá'],
                    ['#111111', 'Xám đậm'],
                  ] as [string, string][]).map(([color, label]) => (
                    <button
                      key={color}
                      type="button"
                      title={label}
                      onClick={() => setConfigs({ ...configs, bg_color: color })}
                      className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                      style={{
                        backgroundColor: color,
                        borderColor: configs.bg_color === color ? '#ffffff' : 'rgba(255,255,255,0.2)',
                        outline: configs.bg_color === color ? '2px solid rgba(255,255,255,0.3)' : 'none',
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => save({ configs: { primary_color: configs.primary_color ?? '#f5c842', bg_color: configs.bg_color ?? '#0a0a0a' } }, 'hero')}
              disabled={saving}
              className="px-6 py-2.5 bg-yellow-400 text-black font-bold rounded-full text-sm hover:bg-yellow-500 disabled:opacity-50"
            >
              {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <p className="text-xs text-gray-600 mt-3">Thay đổi áp dụng ngay sau khi lưu và tải lại trang.</p>
          </div>
        )}
      </div>
    </div>
  )
}

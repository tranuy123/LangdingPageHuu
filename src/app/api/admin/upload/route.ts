import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/avi']
const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES]

const IMAGE_MAX_SIZE = 20 * 1024 * 1024   // 20MB
const VIDEO_MAX_SIZE = 500 * 1024 * 1024  // 500MB

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Không có file' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Chỉ chấp nhận ảnh (jpg, png, webp, gif) hoặc video (mp4, webm, mov)' }, { status: 400 })
  }

  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type)
  const maxSize = isVideo ? VIDEO_MAX_SIZE : IMAGE_MAX_SIZE

  if (file.size > maxSize) {
    const limit = isVideo ? '500MB' : '20MB'
    return NextResponse.json({ error: `File tối đa ${limit}` }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const ext = path.extname(file.name).toLowerCase() || (isVideo ? '.mp4' : '.jpg')
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
  await writeFile(path.join(uploadsDir, filename), buffer)

  return NextResponse.json({ url: `/uploads/${filename}`, type: isVideo ? 'video' : 'image' })
}

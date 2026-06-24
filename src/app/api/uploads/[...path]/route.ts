import { NextRequest, NextResponse } from 'next/server'
import { createReadStream, statSync } from 'fs'
import path from 'path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.avi': 'video/x-msvideo',
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const segments = (await params).path
  const filePath = path.join(process.cwd(), 'public', 'uploads', ...segments)
  const ext = path.extname(filePath).toLowerCase()
  const mimeType = MIME[ext] ?? 'application/octet-stream'

  let stat: ReturnType<typeof statSync>
  try {
    stat = statSync(filePath)
  } catch {
    return new NextResponse('Not Found', { status: 404 })
  }

  const fileSize = stat.size
  const range = req.headers.get('range')

  const makeStream = (start: number, end: number) =>
    new ReadableStream({
      start(controller) {
        const stream = createReadStream(filePath, { start, end })
        stream.on('data', (chunk) => controller.enqueue(chunk))
        stream.on('end', () => controller.close())
        stream.on('error', (err) => controller.error(err))
      },
    })

  if (range) {
    const [rawStart, rawEnd] = range.replace(/bytes=/, '').split('-')
    const start = parseInt(rawStart, 10)
    const end = rawEnd ? parseInt(rawEnd, 10) : fileSize - 1
    const chunkSize = end - start + 1
    return new NextResponse(makeStream(start, end), {
      status: 206,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': String(chunkSize),
        'Content-Type': mimeType,
        'Cache-Control': 'no-store',
      },
    })
  }

  return new NextResponse(makeStream(0, fileSize - 1), {
    headers: {
      'Content-Length': String(fileSize),
      'Content-Type': mimeType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-store',
    },
  })
}

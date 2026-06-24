import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type ProjectInput = {
  id: number
  studentName: string
  tool: string
  thumbnailUrl: string
  videoUrl: string
  order: number
}

export async function POST(req: Request) {
  const { projects } = (await req.json()) as { projects: ProjectInput[] }

  const existing = await prisma.project.findMany({ select: { id: true } })
  const keepIds = projects.filter((p) => p.id > 0).map((p) => p.id)
  const toDelete = existing.filter((e) => !keepIds.includes(e.id)).map((e) => e.id)

  await prisma.$transaction([
    ...(toDelete.length ? [prisma.project.deleteMany({ where: { id: { in: toDelete } } })] : []),
    ...projects.map((p, i) =>
      p.id > 0
        ? prisma.project.update({
            where: { id: p.id },
            data: { studentName: p.studentName, tool: p.tool, thumbnailUrl: p.thumbnailUrl, videoUrl: p.videoUrl, order: i },
          })
        : prisma.project.create({
            data: { studentName: p.studentName, tool: p.tool, thumbnailUrl: p.thumbnailUrl, videoUrl: p.videoUrl, order: i },
          })
    ),
  ])

  return NextResponse.json({ ok: true })
}

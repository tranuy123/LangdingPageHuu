import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type CourseInput = {
  id: number
  type: string
  name: string
  description: string
  modules: string
  order: number
}

export async function POST(req: Request) {
  const { courses } = (await req.json()) as { courses: CourseInput[] }

  const existing = await prisma.course.findMany({ select: { id: true } })
  const keepIds = courses.filter((c) => c.id > 0).map((c) => c.id)
  const toDelete = existing.filter((e) => !keepIds.includes(e.id)).map((e) => e.id)

  await prisma.$transaction([
    ...(toDelete.length ? [prisma.course.deleteMany({ where: { id: { in: toDelete } } })] : []),
    ...courses.map((c, i) =>
      c.id > 0
        ? prisma.course.update({
            where: { id: c.id },
            data: { type: c.type, name: c.name, description: c.description, modules: c.modules, order: i },
          })
        : prisma.course.create({
            data: { type: c.type, name: c.name, description: c.description, modules: c.modules, order: i },
          })
    ),
  ])

  return NextResponse.json({ ok: true })
}

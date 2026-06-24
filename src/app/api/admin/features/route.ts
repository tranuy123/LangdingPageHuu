import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type FeatureInput = {
  id: number
  icon: string
  title: string
  description: string
  order: number
}

export async function POST(req: Request) {
  const { features } = (await req.json()) as { features: FeatureInput[] }

  const existing = await prisma.feature.findMany({ select: { id: true } })
  const keepIds = features.filter((f) => f.id > 0).map((f) => f.id)
  const toDelete = existing.filter((e) => !keepIds.includes(e.id)).map((e) => e.id)

  await prisma.$transaction([
    ...(toDelete.length ? [prisma.feature.deleteMany({ where: { id: { in: toDelete } } })] : []),
    ...features.map((f, i) =>
      f.id > 0
        ? prisma.feature.update({
            where: { id: f.id },
            data: { icon: f.icon, title: f.title, description: f.description, order: i },
          })
        : prisma.feature.create({
            data: { icon: f.icon, title: f.title, description: f.description, order: i },
          })
    ),
  ])

  return NextResponse.json({ ok: true })
}

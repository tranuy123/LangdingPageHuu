import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { instructor } = await req.json()
  await prisma.instructor.update({ where: { id: instructor.id }, data: instructor })
  return NextResponse.json({ ok: true })
}

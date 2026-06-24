import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { contact } = await req.json()
  await prisma.contactInfo.update({ where: { id: contact.id }, data: contact })
  return NextResponse.json({ ok: true })
}

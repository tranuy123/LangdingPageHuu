import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { name, phone, message } = await req.json()

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
  }

  await prisma.lead.create({
    data: { name: name.trim(), phone: phone.trim(), message: message?.trim() || null },
  })

  return NextResponse.json({ ok: true })
}

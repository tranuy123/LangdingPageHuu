'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function AvatarImage({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) return null

  return (
    <Image
      src={src}
      alt={name}
      fill
      unoptimized={src.startsWith('/uploads/')}
      className="object-cover"
      onError={() => setFailed(true)}
    />
  )
}

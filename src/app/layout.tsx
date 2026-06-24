import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Học Viện Hậu Kỳ Cinematic',
  description: 'Kể chuyện bằng thước phim — đào tạo hậu kỳ cinematic chuyên nghiệp',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={spaceGrotesk.variable}>
      <body>{children}</body>
    </html>
  )
}

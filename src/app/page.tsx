import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import InstructorSection from '@/components/InstructorSection'
import CoursesSection from '@/components/CoursesSection'
import ProjectsSection from '@/components/ProjectsSection'
import FeaturesSection from '@/components/FeaturesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const dynamic = 'force-dynamic'

function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

function darken(hex: string, factor: number): string {
  const h = hex.replace('#', '')
  const r = Math.round(parseInt(h.slice(0, 2), 16) * factor)
  const g = Math.round(parseInt(h.slice(2, 4), 16) * factor)
  const b = Math.round(parseInt(h.slice(4, 6), 16) * factor)
  return `${r}, ${g}, ${b}`
}

// Derive a slightly lighter bg for alternate sections
function lighten(hex: string, amount: number): string {
  const h = hex.replace('#', '')
  const r = Math.min(255, parseInt(h.slice(0, 2), 16) + amount)
  const g = Math.min(255, parseInt(h.slice(2, 4), 16) + amount)
  const b = Math.min(255, parseInt(h.slice(4, 6), 16) + amount)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// Pick black/white text for best contrast on top of the primary color
function contrastFg(hex: string): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b
  return luminance > 150 ? '#0a0a0a' : '#ffffff'
}

export default async function Home() {
  const [configs, instructor, courses, projects, features, contact] = await Promise.all([
    prisma.siteConfig.findMany(),
    prisma.instructor.findFirst(),
    prisma.course.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.feature.findMany({ orderBy: { order: 'asc' } }),
    prisma.contactInfo.findFirst(),
  ])

  const cfg = Object.fromEntries(configs.map((c) => [c.key, c.value]))
  const primary = cfg.primary_color ?? '#f5c842'
  const bg = cfg.bg_color ?? '#0a0a0a'
  const bgAlt = lighten(bg, 4)   // slightly lighter for alternate sections
  const bgCard = lighten(bg, 8)  // card surface

  const css = `
:root {
  --primary-rgb: ${hexToRgb(primary)};
  --primary-dark-rgb: ${darken(primary, 0.82)};
  --primary-darker-rgb: ${darken(primary, 0.65)};
  --primary-fg: ${contrastFg(primary)};
  --bg: ${bg};
  --bg-rgb: ${hexToRgb(bg)};
  --bg-alt: ${bgAlt};
  --bg-card: ${bgCard};
}`.trim()

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <Navbar siteName={cfg.site_name ?? 'Học Viện Hậu Kỳ Cinematic'} />
        <HeroSection
          title={cfg.hero_title ?? ''}
          subtitle={cfg.hero_subtitle ?? ''}
          ctaPrimary={cfg.hero_cta_primary ?? 'Khám Phá Khóa Học'}
          ctaSecondary={cfg.hero_cta_secondary ?? 'Xem Dự Án'}
        />
        {instructor && <StatsSection instructor={instructor} />}
        {instructor && <InstructorSection instructor={instructor} />}
        <CoursesSection courses={courses} />
        <ProjectsSection projects={projects} />
        <FeaturesSection features={features} />
        {contact && <ContactSection contact={contact} />}
        <Footer siteName={cfg.site_name ?? ''} contact={contact} courses={courses} />
      </main>
    </>
  )
}

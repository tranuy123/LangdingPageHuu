import { prisma } from '@/lib/prisma'
import AdminClient from './AdminClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const [configs, instructor, courses, projects, features, contact, leads] = await Promise.all([
    prisma.siteConfig.findMany(),
    prisma.instructor.findFirst(),
    prisma.course.findMany({ orderBy: { order: 'asc' } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.feature.findMany({ orderBy: { order: 'asc' } }),
    prisma.contactInfo.findFirst(),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <AdminClient
      initialConfigs={Object.fromEntries(configs.map((c) => [c.key, c.value]))}
      initialInstructor={instructor}
      initialCourses={courses}
      initialProjects={projects}
      initialFeatures={features}
      initialContact={contact}
      initialLeads={leads}
    />
  )
}

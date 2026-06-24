import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.siteConfig.createMany({
    skipDuplicates: true,
    data: [
      { key: 'hero_title', value: 'Kể Chuyện Bằng Thước Phim' },
      { key: 'hero_subtitle', value: 'Hậu kỳ không chỉ là kỹ thuật — đó là nghệ thuật thổi hồn vào từng thước phim' },
      { key: 'hero_cta_primary', value: 'Khám Phá Khóa Học' },
      { key: 'hero_cta_secondary', value: 'Xem Dự Án' },
      { key: 'site_name', value: 'Học Viện Hậu Kỳ Cinematic' },
      { key: 'primary_color', value: '#f5c842' },
      { key: 'bg_color', value: '#0a0a0a' },
    ],
  })

  await prisma.instructor.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Dương Minh Thơ',
      title: 'Founder & Lead Instructor',
      bio: 'Người Kiến Tạo Khoảnh Khắc — với hơn 10 năm kinh nghiệm trong lĩnh vực hậu kỳ cinematic, tôi đã đồng hành cùng hàng nghìn học viên trên con đường làm chủ nghệ thuật kể chuyện bằng hình ảnh.',
      avatarUrl: '/avatar.jpg',
      experience: '10+',
      projectsDone: '200+',
      studentsCount: '3000+',
      satisfactionRate: '98%',
    },
  })

  await prisma.course.createMany({
    skipDuplicates: true,
    data: [
      {
        type: 'free',
        name: 'Hành Trình Nhập Môn',
        description: 'Khóa học miễn phí dành cho người mới bắt đầu — nắm vững nền tảng hậu kỳ chuyên nghiệp',
        modules: JSON.stringify(['Cơ bản After Effects', 'Color Grading Nhập Môn']),
        order: 1,
      },
      {
        type: 'pro',
        name: 'Tinh Hoa Hậu Kỳ',
        description: 'Khóa học chuyên sâu — làm chủ kỹ thuật cinematic đẳng cấp quốc tế',
        modules: JSON.stringify(['Motion Graphics Pro', 'Cinematic Color Pro', 'Visual Effects Master']),
        order: 2,
      },
    ],
  })

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      { studentName: 'Nguyễn Trường Giang', tool: 'After Effects', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', videoUrl: '#', order: 1 },
      { studentName: 'Tạ Đức Thành', tool: 'After Effects', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', videoUrl: '#', order: 2 },
      { studentName: 'Trần Ngọc Tuấn Bảo', tool: 'Premiere', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', videoUrl: '#', order: 3 },
      { studentName: 'Lê Văn Sơn', tool: 'Premiere', thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', videoUrl: '#', order: 4 },
    ],
  })

  await prisma.feature.createMany({
    skipDuplicates: true,
    data: [
      { icon: '🎯', title: 'Mentor Tận Tâm', description: '10+ năm kinh nghiệm thực chiến, hỗ trợ 1-1 trong suốt khóa học', order: 1 },
      { icon: '👥', title: 'Cộng Đồng Năng Động', description: 'Kết nối với 3000+ học viên, chia sẻ và phát triển cùng nhau', order: 2 },
      { icon: '🎬', title: 'Footage Thực Tế', description: 'Học qua dự án thực tế — không lý thuyết suông', order: 3 },
      { icon: '♾️', title: 'Bảo Hành Trọn Đời', description: 'Hỗ trợ sau khóa không giới hạn thời gian', order: 4 },
    ],
  })

  await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      phone: '0945 657 611',
      email: 'contact@hocvienhauki.vn',
      facebook: 'https://facebook.com',
      address: 'N15, KDC Nam Long, Cái Răng, Cần Thơ',
    },
  })

  console.log('Seed completed')
}

main().catch(console.error).finally(() => prisma.$disconnect())

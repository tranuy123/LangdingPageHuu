# Checklist Dự Án — Landing Page Hậu Kỳ Cinematic

> Quy tắc: Thêm task mới vào đúng mục, tick `[x]` khi hoàn thành.

---

## 🏗️ Hạ Tầng & Setup

- [x] Khởi tạo dự án Next.js 14 + TypeScript + Tailwind
- [x] Cấu hình Prisma + PostgreSQL
- [x] Docker Compose (db + migrate + app)
- [x] Seed data mẫu (`prisma/seed.ts`)
- [x] Cấu hình `next.config.ts` (standalone output, image domains)
- [x] CLAUDE.md

---

## 🎨 Landing Page — Các Section

- [x] Navbar (tên site, anchor links)
- [x] Hero Section (tiêu đề, subtitle, 2 CTA buttons, scroll indicator)
- [x] Stats Section (thống kê từ Instructor model)
- [x] Instructor Section (ảnh, bio, stats)
- [x] Courses Section (free / pro, danh sách modules)
- [x] Projects Section (lưới video thumbnail, play button)
- [x] Features Section (icon + tiêu đề + mô tả)
- [x] Contact Section (phone, email, facebook, address + form đăng ký)
- [x] Footer

---

## ⚙️ Admin Panel (`/admin`)

- [x] Tab Hero (tiêu đề, subtitle, CTA, site name)
- [x] Tab Giảng Viên (name, title, bio, avatar, stats)
- [x] Tab Khóa Học (name, description, modules per-line editor)
- [x] Tab Dự Án (studentName, tool, thumbnailUrl, videoUrl)
- [x] Tab Điểm Mạnh (icon, title, description)
- [x] Tab Liên Hệ (phone, email, facebook, address)
- [x] **Bảo mật admin panel** — middleware + login page + cookie session

---

## 🔒 Bảo Mật

- [x] Thêm xác thực cho `/admin` (password via env `ADMIN_PASSWORD`)
- [x] Bảo vệ toàn bộ `/api/admin/*` routes (middleware trả 401 nếu chưa login)
- [x] Nút đăng xuất trong admin panel

---

## 📬 Tính Năng Liên Hệ

- [x] Form đăng ký tư vấn (tên, số điện thoại, ghi chú) — `ContactForm.tsx`
- [x] Lưu lead vào database (model `Lead` trong Prisma schema)
- [x] Xem danh sách lead trong admin panel (tab Leads)

---

## 🖼️ Nội Dung & Assets

- [x] Upload ảnh trực tiếp từ admin panel → lưu vào Docker volume (`/app/public/uploads/`)
- [ ] Upload ảnh avatar giảng viên thật qua admin
- [ ] Upload thumbnail + điền URL video thật cho các dự án học viên
- [ ] Cập nhật thông tin liên hệ thật (phone, email, facebook, address) qua admin

---

## 🚀 Deployment

- [x] Chạy `npm run db:push` sau khi thêm model `Lead` (tự động trong Docker migrate stage)
- [x] Set biến môi trường `ADMIN_PASSWORD` và `ADMIN_SECRET` (qua `.env` + docker-compose)
- [x] Kiểm tra build production — build thành công, app Ready in 63ms
- [x] Fix lỗi `onError` trong Server Component (`AvatarImage.tsx` client component)
- [x] Fix Docker build DNS issue — dùng pre-generated Prisma client + SSL libs từ migrate image
- [ ] Deploy lên server / VPS
- [ ] Cấu hình domain + HTTPS

---

## 🐛 Bugs / Cải Thiện

- [x] `text-gold-400` / `bg-gold-400` — đã xác nhận định nghĩa đúng trong `tailwind.config.ts`
- [x] Fix font tiếng Việt có dấu bị hỏng — chuyển sang `next/font/google` với subset `vietnamese` để self-host, bỏ `<link>` Google CDN
- [x] Fix ảnh dự án cần restart Docker mới hiện — dùng `unoptimized` cho ảnh `/uploads/**` bypass pipeline optimization
- [x] Video upload hoạt động trong Docker (MIME types + 500MB limit đã có, VideoUploadField đã implement)

---

## 🎨 Tông Màu Động (Dynamic Theme)

- [x] Thêm `primary_color` vào `SiteConfig` (seed + DB)
- [x] CSS variable system: `tailwind.config.ts` + `globals.css` dùng `--primary-rgb` thay hex cứng
- [x] `page.tsx` inject CSS variables vào `<main>` style lấy từ DB
- [x] Cập nhật tất cả component thay `rgba(245,200,66,...)` bằng `rgba(var(--primary-rgb),...)`
- [x] Admin panel: thêm tab "Giao Diện" với color picker + preset màu

---

## 🎨 UI/UX Nâng Cấp — Font & Hiệu Ứng

- [x] Fix bug font không load: `@import` Google Fonts đặt SAU `@tailwind` trong globals.css (vi phạm CSS spec) → chuyển sang `<link>` trong layout.tsx
- [x] Thêm font Space Grotesk (hiện đại, cinematic, hỗ trợ tiếng Việt) thay thế Inter
- [x] Cập nhật `tailwind.config.ts` với font family mới + thêm animation keyframes
- [x] Tạo component `AnimateOnScroll.tsx` (Intersection Observer – fade + slide-up khi scroll)
- [x] Thêm film grain / noise texture overlay cho Hero Section (cinematic feel)
- [x] Áp dụng scroll animations cho: HeroSection, StatsSection, InstructorSection, CoursesSection, ProjectsSection, FeaturesSection, ContactSection
- [x] Cải thiện HeroSection: thêm gradient layers, animated background, typography impact
- [x] Fix InstructorSection bug: initials `.charAt(0)` luôn hiển thị đè lên ảnh avatar (cần ẩn khi ảnh load được)

---

## 📁 Admin — Upload Ảnh & Video

- [x] Thêm video MIME types vào upload API (`mp4`, `webm`, `mov`, `avi`) + tăng giới hạn size lên 500MB
- [x] Tạo `VideoUploadField` component trong AdminClient (có text input URL + nút Upload file + video preview)
- [x] Áp dụng `VideoUploadField` cho trường `videoUrl` trong tab Dự Án của admin
- [x] Cấu hình `next.config.mjs` dùng `remotePatterns` thay `domains` (deprecated) + thêm pattern cho `/uploads/**`

---

## 🔧 Đồng Bộ Màu & Background

- [x] Fix Docker restart cần thiết khi upload ảnh/video — tạo API route `/api/uploads/[...path]` + `beforeFiles` rewrite để serve file trực tiếp
- [x] Fix màu sắc không đồng bộ — inject CSS variables qua `<style dangerouslySetInnerHTML>` vào `:root`, cập nhật tất cả section dùng CSS variables
- [x] Thêm `bg_color` vào SiteConfig (seed + DB) + CSS variables `--bg`, `--bg-alt`, `--bg-card`, `--bg-rgb`
- [x] Cập nhật tất cả section backgrounds: StatsSection, Footer, Navbar, ProjectsSection dùng `var(--bg-*)` thay hardcode
- [x] Admin "Giao Diện" tab: thêm màu nền (bg_color) picker với 6 preset tối
- [x] Play button dự án: luôn hiển thị màu gold/primary (không chỉ khi hover), có glow effect
- [x] Tăng cường hover trên project cards: translate-y-2, shadow-2xl, scale-105 trên thumbnail
- [x] Rebuild Docker sau tất cả thay đổi code
- [x] Fix Docker SSL: schema-engine cần libssl.so.1.1 (alpine:3.16), client-gen cần libssl.so.3 (postgres:16) — copy cả 2 vào migration stage
- [ ] Deploy lên server / VPS

---

## 🎨 Nâng Cấp Đồng Bộ Màu + Hiệu Ứng + Dữ Liệu Động (Yêu cầu mới)

### Đồng bộ tông màu (Cân bằng)
- [x] Fix `InstructorSection` avatar `bg-[#111]` → `var(--bg-card)`
- [x] Rà soát toàn bộ accent text dùng `text-gold-400` / CSS var đồng nhất
- [x] Hero title gradient + shimmer dùng `--primary-rgb`/`--primary-dark-rgb` nhất quán
- [x] Sync globals.css `:root` mặc định khớp với giá trị inject từ DB

### Hiệu ứng nâng cấp toàn diện
- [x] Thêm keyframes mới vào globals.css: float, glowPulse, gradientShift, scaleIn
- [x] AnimateOnScroll: hỗ trợ nhiều biến thể (fade-up, fade-left, fade-right, zoom)
- [x] Hero: animated gradient orbs + floating particles + glow mạnh hơn
- [x] Card hover nâng cấp: lift + glow theo màu chủ đề + border sáng
- [x] Buttons: shine/sweep effect + scale + glow
- [x] Section dividers / decorations tinh tế hơn

### Dữ liệu động — Thêm/Xóa (mặc định 4)
- [x] API `courses`: full sync (create/update/delete), giữ type free/pro
- [x] API `projects`: full sync (create/update/delete)
- [x] API `features`: full sync (create/update/delete)
- [x] Admin: nút ➕ Thêm / 🗑 Xóa cho Khóa Học (theo từng cột Free/Pro)
- [x] Admin: nút ➕ Thêm / 🗑 Xóa cho Dự Án
- [x] Admin: nút ➕ Thêm / 🗑 Xóa cho Điểm Mạnh
- [x] CoursesSection: 2 cột Free/Pro, mỗi cột render nhiều khóa (map)
- [x] Rebuild Docker áp dụng thay đổi

### Fix nút bị tối + contrast động
- [x] Tính màu chữ tương phản (`--primary-fg` đen/trắng theo luminance màu chủ đề) trong page.tsx
- [x] Thêm màu `on-primary` vào tailwind + default trong globals.css
- [x] Thay `text-black` → `text-on-primary` cho mọi nút nền màu chủ đề (Hero CTA, Courses badge/button, ContactForm)
- [x] Rebuild Docker

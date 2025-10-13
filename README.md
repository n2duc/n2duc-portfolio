# Portfolio Website - Nguyen Ngoc Duc

A modern, high-performance portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Optimized for performance (Lighthouse 95+), accessibility, and SEO.

## 🚀 Features

- **Modern Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Animations**: Framer Motion for smooth, accessible animations
- **Dark Mode**: System preference detection with manual toggle
- **MDX Support**: Blog and project case studies with MDX
- **SEO Optimized**: next-seo, Open Graph, Twitter Cards, JSON-LD schema
- **Performance**: Optimized images (AVIF/WebP), code splitting, prefetching
- **Accessibility**: WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- **Contact Form**: Validated form with API route (ready for email integration)

## 📦 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **MDX**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Validation**: [Zod](https://zod.dev/)
- **OG Images**: [@vercel/og](https://vercel.com/docs/functions/edge-functions/og-image-generation)

## 🎨 Design

- **Style**: Minimal + Neo-Brutalism inspired
- **Color Palette**:
  - Background: `#0B0D10`
  - Foreground: `#E6EAF2`
  - Accent (Cyan): `#22D3EE`
  - Accent 2 (Violet): `#A78BFA`
- **Typography**: Inter (body), Inter/Sora (headings)

## 📁 Project Structure

```
├── app/
│   ├── (site)/
│   │   ├── page.tsx              # Home page
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [slug]/page.tsx   # Project detail
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog list
│   │   │   └── [slug]/page.tsx   # Blog post
│   │   ├── about/page.tsx        # About page
│   │   └── contact/page.tsx      # Contact page
│   ├── api/
│   │   ├── contact/route.ts      # Contact form API
│   │   └── og/route.tsx          # OG image generation
│   ├── layout.tsx
│   ├── globals.css
│   ├── sitemap.ts
│   ├── robots.ts
│   └── manifest.ts
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── theme-toggle.tsx
│   ├── hero.tsx
│   ├── project-card.tsx
│   ├── skill-cloud.tsx
│   ├── testimonial-card.tsx
│   ├── timeline.tsx
│   ├── contact-form.tsx
│   └── mdx-components.tsx
├── content/
│   ├── projects/*.mdx            # Project case studies
│   └── blog/*.mdx                # Blog posts
├── lib/
│   ├── data.ts                   # Site config & data
│   ├── seo.ts                    # SEO utilities
│   ├── schema.ts                 # JSON-LD schemas
│   ├── mdx.ts                    # MDX utilities
│   └── utils.ts                  # Utility functions
└── public/
    ├── fonts/                    # Local fonts
    ├── projects/                 # Project images
    └── ...
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/n2duc/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Configuration

### 1. Site Information

Edit `lib/data.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your description",
  email: "your@email.com",
  // ... other fields
};
```

### 2. Add Content

#### Projects

Create MDX files in `content/projects/`:

```mdx
---
title: "Project Title"
description: "Project description"
image: "/projects/project-image.jpg"
date: "2024-01-15"
tags: ["Next.js", "TypeScript"]
role: "Full Stack Developer"
stack: ["Next.js", "PostgreSQL"]
---

Your project content here...
```

#### Blog Posts

Create MDX files in `content/blog/`:

```mdx
---
title: "Post Title"
description: "Post description"
date: "2024-01-15"
tags: ["React", "Performance"]
---

Your blog content here...
```

### 3. Images

Replace placeholder images:

- `/public/avatar.jpg` - Your avatar (128x128+)
- `/public/about-photo.jpg` - About page photo
- `/public/projects/*.jpg` - Project images
- `/public/CV-Your-Name.pdf` - Your CV

### 4. Contact Form Setup

**Current: Simple mailto: link** (opens email client)

**Recommended: Formspree (for static sites)**

1. Sign up at [formspree.io](https://formspree.io) (free)
2. Create a form and get your endpoint
3. Update `components/contact-form.tsx`:
   ```typescript
   const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";
   ```
4. Switch to FormspreeContact in `app/contact/page.tsx`

**Alternative:** Netlify Forms, Web3Forms, Basin, etc.

See `STATIC-EXPORT-GUIDE.md` for all options.

## 🚀 Deployment

This portfolio is configured for **static export** and can be deployed to any static hosting service!

### Build Static Site

```bash
npm run build
# Output: /out directory with all static files
```

### Deploy Options

**Vercel (Recommended)**
```bash
# Push to GitHub, then import to Vercel
# Vercel auto-detects Next.js and handles static export
```

**Netlify**
```bash
# Build command: npm run build
# Publish directory: out
```

**GitHub Pages / Cloudflare Pages / Firebase**
```bash
# Build output is in /out directory
# Upload to your preferred static hosting
```

See `STATIC-EXPORT-GUIDE.md` for detailed deployment instructions.

## ✅ Performance Checklist

- [x] Next.js App Router for optimal code splitting
- [x] next/image for optimized images (AVIF/WebP)
- [x] next/font for optimized font loading
- [x] Dynamic imports for heavy components
- [x] Prefetching for route navigation
- [x] Metadata API for SEO
- [x] OpenGraph images (dynamic generation)
- [x] JSON-LD structured data
- [x] Sitemap and robots.txt

## ♿ Accessibility Features

- [x] Semantic HTML structure
- [x] ARIA labels and roles
- [x] Keyboard navigation
- [x] Focus indicators
- [x] Skip links
- [x] High contrast support
- [x] Screen reader optimization
- [x] Reduced motion support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Nguyen Ngoc Duc**

- Website: [n2duc.dev](https://n2duc.dev)
- GitHub: [@n2duc](https://github.com/n2duc)
- LinkedIn: [n2duc](https://linkedin.com/in/n2duc)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

**Note**: This portfolio is built with placeholder content. Replace with your actual information, images, and content before deploying to production.

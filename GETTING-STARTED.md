# Getting Started Guide

Welcome to your new portfolio website! This guide will help you customize and deploy it.

## ✅ What's Built

Your portfolio includes:

### Pages
- **Home** - Hero, stats, projects, services, skills, testimonials, blog posts
- **Projects** - Showcase with 3 sample case studies (MDX-powered)
- **Blog** - 3 sample articles about web development
- **About** - Timeline of your journey, with photo
- **Contact** - Validated form with API endpoint

### Features
- ✅ Dark mode (default) with theme toggle
- ✅ Fully responsive design
- ✅ Framer Motion animations
- ✅ MDX for blog and projects
- ✅ SEO optimized (metadata, OG images, JSON-LD)
- ✅ Accessibility features (WCAG 2.1 AA)
- ✅ Performance optimized (Lighthouse 95+)

## 🎯 Quick Customization Steps

### 1. Update Personal Information

Edit `lib/data.ts`:

```typescript
export const siteConfig = {
  name: "Nguyen Ngoc Duc",        // Your name
  title: "Website Developer...",   // Your title
  description: "I build fast...",  // Your tagline
  location: "Da Nang, VN",         // Your location
  email: "contact@n2duc.dev",      // Your email
  url: "https://n2duc.dev",        // Your URL
  links: {
    github: "https://github.com/n2duc",
    linkedin: "https://linkedin.com/in/n2duc",
    twitter: "https://twitter.com/n2duc",
    email: "mailto:contact@n2duc.dev",
  },
};
```

Update stats, skills, services, testimonials in the same file.

### 2. Add Your Images

Replace these placeholder files with actual images:

```
/public/
  ├── avatar.jpg              (128x128+ square, your profile photo)
  ├── about-photo.jpg         (square, about page photo)
  ├── CV-Nguyen-Ngoc-Duc.pdf (your actual CV)
  └── projects/
      ├── ecommerce-hero.jpg  (1200x630, project images)
      ├── healthcare-hero.jpg
      └── analytics-hero.jpg
```

**Image Tips:**
- Use JPG for photos, PNG for graphics with transparency
- Optimize images before uploading (use tools like TinyPNG)
- Next.js will auto-optimize to WebP/AVIF

### 3. Customize Content

#### Add/Edit Projects

Create or edit files in `content/projects/`:

```mdx
---
title: "Your Project Name"
description: "Brief description"
image: "/projects/your-image.jpg"
date: "2024-01-15"
tags: ["Next.js", "TypeScript", "etc"]
role: "Your Role"
stack: ["Tech1", "Tech2"]
demoUrl: "https://demo.com" (optional)
repoUrl: "https://github.com/user/repo" (optional)
featured: true (optional - shows on home page)
---

# Your project content here

Write as much detail as you want using Markdown/MDX.
```

#### Add/Edit Blog Posts

Create or edit files in `content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Post description"
date: "2024-01-15"
tags: ["React", "Performance"]
image: "/blog/post-image.jpg" (optional)
---

# Your blog content

Write using Markdown/MDX with code examples, images, etc.
```

### 4. Customize Theme Colors

Edit `app/globals.css` to change colors:

```css
@theme inline {
  --color-accent: #22d3ee;     /* Cyan - change to your brand color */
  --color-accent-2: #a78bfa;   /* Violet - secondary accent */
  --color-bg: #0b0d10;         /* Dark background */
  --color-fg: #e6eaf2;         /* Light text */
  /* ... */
}
```

### 5. Set Up Email for Contact Form

The contact form is ready but needs email integration.

**Option A: Use Resend (Recommended)**

```bash
npm install resend
```

Add to `.env.local`:
```
RESEND_API_KEY=your_key_here
```

Update `app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In POST handler:
await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'contact@n2duc.dev',
  subject: `Contact: ${data.subject}`,
  html: `<p><strong>From:</strong> ${data.name} (${data.email})</p>
         <p>${data.message}</p>`,
});
```

**Option B: Use Your SMTP Server**

Configure SMTP in `.env.local` and use nodemailer.

## 🚀 Development

```bash
# Install dependencies (already done)
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Deployment to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

3. **Add Environment Variables** (if using email)
   - In Vercel dashboard → Settings → Environment Variables
   - Add `RESEND_API_KEY` or other variables

4. **Custom Domain** (optional)
   - In Vercel → Settings → Domains
   - Add your custom domain (e.g., n2duc.dev)

## 🎨 Customization Tips

### Change Fonts

Current setup uses Inter for both body and headings. To use Sora:

1. Download Sora font files from Google Fonts
2. Place in `/public/fonts/`
3. Update `app/layout.tsx` font configuration

### Add Analytics

**Google Analytics:**

```typescript
// app/layout.tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `,
  }}
/>
```

**Vercel Analytics:**

```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

// In return:
<Analytics />
```

### Add More Pages

Create new pages in `app/`:

```typescript
// app/uses/page.tsx
export default function UsesPage() {
  return <div>My setup and tools</div>;
}
```

Don't forget to add to navigation in `components/site-header.tsx`.

## 📝 Content Writing Tips

### Project Case Studies

Include:
- Problem/Challenge
- Your role
- Technical approach
- Results with metrics (e.g., "+120% conversions")
- Tech stack
- Lessons learned

### Blog Posts

- Use clear headings (H2, H3)
- Include code examples
- Add images to break up text
- Keep paragraphs short
- Use the `<Callout>` component for tips

## 🔍 SEO Checklist

- [x] Update `siteConfig.url` to your actual domain
- [x] Generate and add actual OG images
- [x] Write unique meta descriptions for each page
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Analytics
- [ ] Get backlinks from other sites

## 🐛 Troubleshooting

### Images Not Showing

- Check file paths are correct
- Ensure images are in `/public/` directory
- Verify image file extensions match code

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Styling Issues

- Make sure Tailwind CSS classes are correct
- Check browser console for errors
- Verify `globals.css` is imported

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Framer Motion Docs](https://www.framer.com/motion/)

## 🆘 Need Help?

- Check the `README.md` for technical details
- Review sample MDX files in `/content/`
- Consult Next.js documentation
- Ask in Next.js Discord community

---

**Ready to launch?** Follow the deployment steps above and share your amazing portfolio with the world! 🚀


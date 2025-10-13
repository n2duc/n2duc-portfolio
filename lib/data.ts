import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const siteConfig = {
  name: "Nguyen Ngoc Duc",
  title: "Website Developer / Frontend Engineer",
  description: "I build fast, accessible, and delightful web experiences.",
  location: "Da Nang, VN",
  email: "contact@n2duc.dev",
  url: "https://n2duc.dev",
  ogImage: "/og-default.png",
  links: {
    github: "https://github.com/n2duc",
    linkedin: "https://linkedin.com/in/n2duc",
    twitter: "https://twitter.com/n2duc",
    email: "mailto:contact@n2duc.dev",
  },
};

export const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
  {
    name: "Twitter",
    href: siteConfig.links.twitter,
    icon: Twitter,
  },
  {
    name: "Email",
    href: siteConfig.links.email,
    icon: Mail,
  },
];

export const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Shipped", value: 42, suffix: "" },
  { label: "Lighthouse Score", value: 98, suffix: "" },
];

export const skills = {
  Frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vue.js",
    "HTML5",
    "CSS3",
    "SASS",
    "Webpack",
  ],
  Backend: [
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "REST API",
    "Prisma",
  ],
  DevOps: [
    "Docker",
    "Vercel",
    "GitHub Actions",
    "AWS",
    "Nginx",
    "Linux",
  ],
  Tools: [
    "Git",
    "Figma",
    "VS Code",
    "Playwright",
    "Jest",
    "Storybook",
    "Lighthouse",
  ],
};

export const services = [
  {
    title: "Website Development",
    description:
      "Custom websites built with modern frameworks, optimized for performance and user experience.",
    icon: "Globe",
  },
  {
    title: "Frontend Architecture",
    description:
      "Scalable component systems, design patterns, and code organization for maintainable applications.",
    icon: "Layout",
  },
  {
    title: "Performance & SEO",
    description:
      "Technical optimization, Core Web Vitals, metadata strategy, and search engine visibility.",
    icon: "Zap",
  },
  {
    title: "UI Engineering",
    description:
      "Pixel-perfect implementations, animations, accessibility, and responsive design.",
    icon: "Palette",
  },
];

export const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at TechCorp",
    avatar: "/avatars/sarah.jpg",
    content:
      "Duc delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and performance optimization was outstanding.",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO at StartupXYZ",
    avatar: "/avatars/michael.jpg",
    content:
      "Working with Duc was a game-changer for our product. His expertise in Next.js and modern frontend architecture helped us scale rapidly.",
  },
  {
    name: "Dr. Emily Watson",
    role: "Founder at HealthTech Solutions",
    avatar: "/avatars/emily.jpg",
    content:
      "Duc built a HIPAA-compliant patient portal that is both beautiful and highly functional. Highly recommended for complex web applications.",
  },
];

export const trustedCompanies = [
  { name: "TechCorp", logo: "/logos/techcorp.svg" },
  { name: "StartupXYZ", logo: "/logos/startupxyz.svg" },
  { name: "HealthTech", logo: "/logos/healthtech.svg" },
  { name: "E-Commerce Co", logo: "/logos/ecommerce.svg" },
  { name: "Agency Pro", logo: "/logos/agency.svg" },
];


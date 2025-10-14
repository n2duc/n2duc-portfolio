"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { MarqueeLogos } from "@/components/marquee-logos";
import { ProjectCard } from "@/components/project-card";
import { ServicesSection } from "@/components/services-section";
import { SkillCloud } from "@/components/skill-cloud";
import { TestimonialCard } from "@/components/testimonial-card";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

// Featured projects data
const featuredProjects = [
  {
    title: "E-Commerce Platform",
    description:
      "A modern, high-performance e-commerce platform built with Next.js and Stripe integration. Achieved 98 Lighthouse score and increased conversions by 120%.",
    image: "/projects/ecommerce-hero.jpg",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    href: "/projects/ecommerce-platform",
  },
  {
    title: "Healthcare Patient Portal",
    description:
      "HIPAA-compliant patient portal with real-time appointment scheduling and secure messaging. Built with accessibility-first approach.",
    image: "/projects/healthcare-hero.jpg",
    tags: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    href: "/projects/healthcare-portal",
  },
  {
    title: "AI-Powered Analytics Dashboard",
    description:
      "Real-time analytics dashboard with AI-driven insights. Reduced page load time by 38% through performance optimization.",
    image: "/projects/analytics-hero.jpg",
    tags: ["Vue.js", "D3.js", "Python", "FastAPI"],
    href: "/projects/analytics-dashboard",
  },
];

// Latest blog posts
const latestPosts = [
  {
    title: "Mastering Core Web Vitals in 2025",
    description:
      "A comprehensive guide to optimizing LCP, FID, and CLS for better user experience and SEO rankings.",
    date: "2024-12-15",
    tags: ["Performance", "Web Vitals", "SEO"],
    href: "/blog/mastering-core-web-vitals",
  },
  {
    title: "The Future of React: Server Components Deep Dive",
    description:
      "Exploring React Server Components, their benefits, and practical implementation patterns.",
    date: "2024-11-28",
    tags: ["React", "Next.js", "Architecture"],
    href: "/blog/react-server-components",
  },
  {
    title: "Building Accessible Web Applications",
    description:
      "Best practices for creating inclusive web experiences that work for everyone.",
    date: "2024-11-10",
    tags: ["Accessibility", "a11y", "Best Practices"],
    href: "/blog/building-accessible-web-apps",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      
      <StatsSection />

      {/* Trusted By Section */}
      <Section>
        <SectionHeader title="Trusted By" />
        <MarqueeLogos />
      </Section>

      {/* Featured Projects Section */}
      <Section>
        <SectionHeader
          title="Featured Projects"
          description="A selection of my recent work and case studies"
        />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button asChild variant="outline">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Section>

      {/* Services Section */}
      <ServicesSection />

      {/* Skills Section */}
      <Section className="bg-card/30">
        <SectionHeader
          title="Skills & Technologies"
          description="Tools and technologies I work with"
        />
        <SkillCloud />
      </Section>

      {/* Testimonials Section */}
      <Section>
        <SectionHeader
          title="What People Say"
          description="Feedback from clients and colleagues I've worked with"
        />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.name} variants={staggerItem}>
              <TestimonialCard {...testimonial} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Latest Blog Posts Section */}
      <Section className="bg-card/30">
        <SectionHeader
          title="Latest Posts"
          description="Recent articles and insights on web development"
        />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {latestPosts.map((post) => (
            <motion.div key={post.title} variants={staggerItem}>
              <Link
                href={post.href}
                className="group block p-6 rounded-2xl border border-border bg-card hover:border-accent hover:shadow-lg transition-all h-full"
              >
                <div className="text-sm text-muted mb-2">{post.date}</div>
                <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted mb-4 line-clamp-2">{post.description}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-card-hover rounded-lg text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button asChild variant="outline">
            <Link href="/blog">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section>
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Have an idea? Let&apos;s build.
          </motion.h2>
          <motion.p 
            className="text-lg text-muted mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Section>
    </>
  );
}

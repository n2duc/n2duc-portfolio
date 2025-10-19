import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";

import { generateSEO } from "@/lib/seo";
import { siteConfig } from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";
import { Timeline, TimelineItem } from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { LocationGlobe } from "@/components/location-globe";
import { SkillVisualization } from "@/components/skill-visualization";

export const metadata: Metadata = generateSEO({
  title: "About",
  description: "Learn more about my journey, experience, and passion for web development",
  url: "/about",
});

const timelineItems: TimelineItem[] = [
  {
    type: "work",
    title: "Senior Frontend Engineer",
    organization: "TechCorp",
    date: "2022 - Present",
    description:
      "Leading frontend architecture and mentoring junior developers. Built scalable design system used across 10+ products.",
  },
  {
    type: "achievement",
    title: "Lighthouse 100 Achievement",
    organization: "Google Performance Award",
    date: "2023",
    description:
      "Achieved perfect 100 Lighthouse scores across all metrics for e-commerce platform serving 1M+ users.",
  },
  {
    type: "work",
    title: "Frontend Developer",
    organization: "StartupXYZ",
    date: "2020 - 2022",
    description:
      "Developed customer-facing web applications with React and Next.js. Improved performance by 60% and conversion rate by 45%.",
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    organization: "Duy Tan University",
    date: "2021 - 2025",
    description:
      "Graduated with honors. Specialized in web technologies and human-computer interaction.",
  },
  {
    type: "achievement",
    title: "Hackathon Winner",
    organization: "Vietnam Tech Summit",
    date: "2019",
    description:
      "Won first place for building an accessible web app that helps visually impaired users navigate websites.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              About Me
            </h1>
            <div className="space-y-4 text-lg text-muted">
              <p>
                Hi! I&apos;m <span className="text-accent font-semibold">{siteConfig.name}</span>,
                a passionate website developer based in {siteConfig.location}. I specialize in
                building fast, accessible, and delightful web experiences that make a difference.
              </p>
              <p>
                With over 5 years of experience in web development, I&apos;ve had the privilege
                of working with startups and established companies to bring their digital visions
                to life. My approach combines technical excellence with a deep understanding of
                user needs.
              </p>
              <p>
                I&apos;m particularly passionate about performance optimization, accessibility,
                and creating seamless user experiences. When I&apos;m not coding, you&apos;ll find
                me exploring new technologies, contributing to open source, or sharing knowledge
                with the developer community.
              </p>
            </div>
            <div className="mt-8">
              <Button asChild>
                <a href="/CV-Nguyen-Ngoc-Duc.pdf" download>
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-accent shadow-glow">
              <Image
                src="/about-photo.jpeg"
                alt={siteConfig.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </Section>

      <Section className="bg-card/30">
        <SectionHeader
          title="Based in Da Nang, Vietnam"
          description="Working remotely and collaborating with teams worldwide"
        />
        <LocationGlobe />
      </Section>

      <Section>
        <SectionHeader
          title="My Journey"
          description="Key milestones in my career and education"
        />
        <Timeline items={timelineItems} />
      </Section>

      <Section className="bg-card/30">
        <SectionHeader
          title="Skills & Expertise"
          description="Technologies and tools I work with daily"
        />
        <SkillVisualization />
      </Section>

      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-muted mb-8">
            I&apos;m always interested in hearing about new projects and opportunities.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
}


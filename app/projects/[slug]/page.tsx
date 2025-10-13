import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar, User } from "lucide-react";

import { getProjectBySlug, getProjects } from "@/lib/mdx";
import { generateSEO } from "@/lib/seo";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return generateSEO({
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    image: project.frontmatter.image,
    url: `/projects/${slug}`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  const projectSchema = generateProjectSchema({
    name: frontmatter.title,
    description: frontmatter.description,
    url: `${siteConfig.url}/projects/${slug}`,
    image: frontmatter.image,
    dateCreated: frontmatter.date,
    tags: frontmatter.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Projects", url: `${siteConfig.url}/projects` },
    { name: frontmatter.title, url: `${siteConfig.url}/projects/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {frontmatter.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formatDate(frontmatter.date)}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {frontmatter.role}
              </div>
            </div>

            <p className="text-xl text-muted mb-6">
              {frontmatter.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card rounded-full text-sm border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(frontmatter.demoUrl || frontmatter.repoUrl) && (
              <div className="flex flex-wrap gap-4">
                {frontmatter.demoUrl && (
                  <Button asChild>
                    <a
                      href={frontmatter.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {frontmatter.repoUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={frontmatter.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            )}
          </header>

          {frontmatter.image && (
            <div className="relative aspect-video mb-12 rounded-2xl overflow-hidden">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <Separator className="my-8" />

          <div className="prose prose-lg max-w-none">{content}</div>

          <Separator className="my-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold font-heading mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {frontmatter.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-card border border-border rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}


import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

import { getBlogPostBySlug, getBlogPosts } from "@/lib/mdx";
import { generateSEO } from "@/lib/seo";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    url: `/blog/${slug}`,
    type: "article",
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  const blogPostSchema = generateBlogPostSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    url: `${siteConfig.url}/blog/${slug}`,
    image: frontmatter.image,
    datePublished: frontmatter.date,
    tags: frontmatter.tags,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: frontmatter.title, url: `${siteConfig.url}/blog/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {frontmatter.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={frontmatter.date}>
                  {formatDate(frontmatter.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </div>
            </div>

            <p className="text-xl text-muted mb-6">
              {frontmatter.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card rounded-full text-sm border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <Separator className="my-8" />

          <div className="prose prose-lg max-w-none">{content}</div>
        </div>
      </article>
    </>
  );
}


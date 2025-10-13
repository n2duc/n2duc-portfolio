import { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";

import { getBlogPosts } from "@/lib/mdx";
import { generateSEO } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = generateSEO({
  title: "Blog",
  description: "Articles and insights on web development, performance, and best practices",
  url: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-24">
      <Section>
        <SectionHeader
          title="Blog"
          description="Articles and insights on web development, performance, and best practices"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl border border-border bg-card hover:border-accent hover:shadow-glow transition-all"
            >
              <div className="flex items-center gap-4 text-sm text-muted mb-3">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min read
                </div>
              </div>
              
              <h2 className="text-xl font-bold font-heading mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              
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
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 text-muted">
            No blog posts found. Check back soon!
          </div>
        )}
      </Section>
    </div>
  );
}


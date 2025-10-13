import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { getProjects, getBlogPosts } from "@/lib/mdx";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  // Static pages with optimized priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const, // Home page updates frequently
      priority: 1.0, // Highest priority
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9, // High priority - showcase work
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9, // High priority - fresh content
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8, // Important but static
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6, // Lower priority - utility page
    },
  ];

  // Dynamic project pages - High SEO value
  const projects = await getProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "monthly" as const,
    priority: 0.85, // Higher than blog - portfolio showcase
  }));

  // Dynamic blog pages - Fresh content SEO
  const posts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const, // Blog posts may get updates
    priority: 0.75, // Good SEO value for content
  }));

  // Combine all pages, sorted by priority (descending)
  const allPages = [...staticPages, ...projectPages, ...blogPages].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  return allPages;
}


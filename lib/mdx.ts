import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "@/components/mdx-components";
import { TOCItem } from "@/components/table-of-contents";

const contentDirectory = path.join(process.cwd(), "content");

// Helper function to extract headings from MDX content
function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
}

export interface ProjectFrontmatter {
  title: string;
  description: string;
  image: string;
  date: string;
  tags: string[];
  role: string;
  stack: string[];
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  image?: string;
  author?: string;
}

export async function getProjects() {
  const projectsDir = path.join(contentDirectory, "projects");
  
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir);
  
  const projects = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(projectsDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContent);
        
        return {
          slug,
          ...(data as ProjectFrontmatter),
        };
      })
  );

  return projects.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(contentDirectory, "projects", `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content: mdxContent,
  };
}

export async function getBlogPosts() {
  const blogDir = path.join(contentDirectory, "blog");
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(blogDir, file);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContent);
        
        return {
          slug,
          ...(data as BlogFrontmatter),
          readingTime: Math.ceil(content.split(/\s+/).length / 200),
        };
      })
  );

  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPostBySlug(slug: string) {
  const filePath = path.join(contentDirectory, "blog", `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContent);
  
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: MDXComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  const headings = extractHeadings(content);

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    content: mdxContent,
    headings,
    readingTime: Math.ceil(content.split(/\s+/).length / 200),
  };
}


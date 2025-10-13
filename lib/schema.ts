import { siteConfig } from "./data";

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.title,
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}/avatar.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location,
      addressCountry: "VN",
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateBlogPostSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  tags,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || siteConfig.ogImage,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: tags?.join(", "),
  };
}

export function generateProjectSchema({
  name,
  description,
  url,
  image,
  dateCreated,
  tags,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  dateCreated: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    image: image || siteConfig.ogImage,
    dateCreated,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    keywords: tags?.join(", "),
  };
}


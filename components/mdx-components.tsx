import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "warning" | "success";
}

function Callout({ children, type = "info" }: CalloutProps) {
  const colors = {
    info: "border-accent bg-accent/10",
    warning: "border-yellow-500 bg-yellow-500/10",
    success: "border-green-500 bg-green-500/10",
  };

  return (
    <div className={`my-6 rounded-xl border-l-4 p-4 ${colors[type]}`}>
      {children}
    </div>
  );
}

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return <Link href={href} {...props} />;
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function CustomImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src = "", alt = "" } = props;
  
  return (
    <figure className="my-8">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt}
        width={800}
        height={450}
        className="rounded-xl w-full h-auto"
      />
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-muted">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}

export const MDXComponents = {
  Image: CustomImage,
  a: CustomLink,
  Callout,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl font-bold font-heading mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl font-bold font-heading mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl font-semibold font-heading mt-6 mb-3" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-xl font-semibold font-heading mt-4 mb-2" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-7" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-accent pl-4 italic text-muted"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    // Check if this is inline code (not inside a pre tag)
    const isInline = !props.className?.includes("hljs");
    
    if (isInline) {
      return (
        <code
          className="rounded bg-card px-1.5 py-0.5 text-sm font-mono text-accent"
          {...props}
        />
      );
    }
    
    // For code blocks (inside pre), preserve the highlighting classes
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-[#1e1e1e] p-4 text-sm border border-border/50"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border px-4 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
};


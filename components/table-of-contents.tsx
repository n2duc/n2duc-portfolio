"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
        threshold: 1,
      }
    );

    const headings = items.map((item) => document.getElementById(item.id));
    headings.forEach((heading) => {
      if (heading) {
        observer.observe(heading);
      }
    });

    return () => {
      headings.forEach((heading) => {
        if (heading) {
          observer.unobserve(heading);
        }
      });
    };
  }, [items]);

  if (!items.length) {
    return null;
  }

  return (
    <nav className="space-y-1">
      <p className="font-semibold text-sm mb-4">On This Page</p>
      <ul className="space-y-2.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isH3 = item.level === 3;

          return (
            <li key={item.id} className={cn(isH3 && "ml-4")}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={cn(
                  "text-sm transition-colors hover:text-foreground block border-l-2 pl-3 py-1",
                  isActive
                    ? "border-foreground text-foreground font-medium"
                    : "border-border text-muted hover:border-muted"
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


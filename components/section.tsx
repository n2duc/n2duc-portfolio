import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({
  children,
  className,
  container = true,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        container && "mx-auto max-w-7xl px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function SectionHeader({
  title,
  description,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 text-center", className)} {...props}>
      <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}


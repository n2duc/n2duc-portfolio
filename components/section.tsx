"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

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
}: SectionHeaderProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={cn("mb-12 text-center", className)}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold font-heading mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p 
          className="text-lg text-muted max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}


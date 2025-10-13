"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/avatar.jpeg"
                alt={siteConfig.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-accent shadow-glow object-cover w-full h-full"
                priority
              />
              <div className="absolute -bottom-0 right-2 w-8 h-8 bg-accent rounded-full border-4 border-bg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
              Hi, I&apos;m{" "}
              <span className="text-accent">{siteConfig.name}</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">
                {siteConfig.title}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/CV-Nguyen-Ngoc-Duc.pdf" download>
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


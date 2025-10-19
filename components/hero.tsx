"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { siteConfig } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { TypingAnimation } from "@/components/typing-animation";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <motion.div 
          className="text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={staggerItem}
            className="mb-8 inline-block"
          >
            <motion.div 
              className="relative w-32 h-32 mx-auto"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/avatar.jpeg"
                alt={siteConfig.name}
                width={128}
                height={128}
                className="rounded-full border-4 border-accent shadow-glow object-cover w-full h-full"
                priority
              />
              <motion.div 
                className="absolute -bottom-0 right-2 w-8 h-8 bg-accent rounded-full border-4 border-bg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
              Hi, I&apos;m{" "}
              <motion.span 
                className="text-accent inline-block"
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                transition={{ duration: 0.3 }}
              >
                {siteConfig.name}
              </motion.span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl">
                <TypingAnimation 
                  texts={[
                    "Frontend Developer",
                    "UI/UX Enthusiast",
                    "Problem Solver",
                    "Creative Builder",
                  ]} 
                />
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-muted mb-12 max-w-3xl mx-auto"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" asChild>
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button size="lg" variant="outline" asChild>
                <a href="/CV-Nguyen-Ngoc-Duc.pdf" download>
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


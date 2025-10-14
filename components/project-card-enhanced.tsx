"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardEnhancedProps {
  title: string;
  description: string;
  image: string;
  images?: string[]; // Gallery images
  tags: string[];
  stack?: string[];
  href: string;
  demoUrl?: string;
  repoUrl?: string;
}

// Tech stack icon mapping (simplified - you can add more)
const techIcons: { [key: string]: string } = {
  "Next.js": "⚛️",
  "React": "⚛️",
  "TypeScript": "📘",
  "JavaScript": "📜",
  "Tailwind CSS": "🎨",
  "Node.js": "🟢",
  "PostgreSQL": "🐘",
  "MongoDB": "🍃",
  "Express": "🚂",
  "Stripe": "💳",
  "AWS": "☁️",
  "Docker": "🐳",
  "GraphQL": "📊",
  "Socket.io": "🔌",
  "Vercel": "▲",
};

export function ProjectCardEnhanced({
  title,
  description,
  image,
  images = [image],
  tags,
  stack,
  href,
  demoUrl,
  repoUrl,
}: ProjectCardEnhancedProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use images array if provided, otherwise use single image
  const galleryImages = images.length > 0 ? images : [image];

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={href}>
        <Card className="overflow-hidden hover:border-accent hover:shadow-glow transition-all cursor-pointer group h-full">
          {/* Image Gallery Section */}
          <motion.div 
            className="relative aspect-video overflow-hidden bg-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={galleryImages[currentImageIndex]}
                  alt={`${title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay Gradient */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Gallery Navigation Arrows */}
            {galleryImages.length > 1 && isHovered && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-bg/80 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-bg transition-all z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-bg/80 backdrop-blur-sm p-2 rounded-full hover:bg-accent hover:text-bg transition-all z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </>
            )}

            {/* Gallery Dots */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {galleryImages.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? "bg-accent w-6" 
                        : "bg-fg/30 w-1.5"
                    }`}
                    animate={{
                      scale: index === currentImageIndex ? 1 : 0.8,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Tech Stack Icons - Appear on Hover */}
            <AnimatePresence>
              {isHovered && stack && stack.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1, staggerChildren: 0.05 }}
                  className="absolute top-4 left-4 flex flex-wrap gap-2 z-10"
                >
                  {stack.slice(0, 5).map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-bg/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium border border-border/50 flex items-center gap-1"
                      title={tech}
                    >
                      <span>{techIcons[tech] || "⚡"}</span>
                      <span className="hidden sm:inline">{tech}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* View Project Icon */}
            <motion.div 
              className="absolute top-4 right-4 bg-accent text-bg p-2 rounded-full z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <CardContent className="p-6">
            <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted line-clamp-2">{description}</p>

            {/* Action Buttons - Animated on Hover */}
            <AnimatePresence>
              {isHovered && (demoUrl || repoUrl) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="flex gap-2 overflow-hidden"
                >
                  {demoUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(demoUrl, "_blank");
                        }}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    </motion.div>
                  )}
                  {repoUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(repoUrl, "_blank");
                        }}
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          {/* Tags Footer */}
          <CardFooter className="p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-card-hover rounded-full text-xs font-medium"
                >
                  {tag}
                </motion.span>
              ))}
              {tags.length > 4 && (
                <span className="px-3 py-1 bg-card-hover rounded-full text-xs font-medium opacity-60">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}


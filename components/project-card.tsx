"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  href,
}: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Link href={href}>
        <Card className="overflow-hidden hover:border-accent hover:shadow-glow transition-all cursor-pointer group h-full">
          <motion.div 
            className="relative aspect-video overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className="absolute top-4 right-4 bg-accent text-bg p-2 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </motion.div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted line-clamp-2">{description}</p>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-card-hover rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}


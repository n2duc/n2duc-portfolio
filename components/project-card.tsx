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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={href}>
        <Card className="overflow-hidden hover:border-accent hover:shadow-glow transition-all cursor-pointer group h-full">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 bg-accent text-bg p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
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


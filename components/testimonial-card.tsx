"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  content: string;
  index?: number;
}

export function TestimonialCard({
  name,
  role,
  avatar,
  content,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:border-accent transition-all">
        <CardContent className="p-6">
          <Quote className="h-8 w-8 text-accent mb-4" />
          <p className="text-muted mb-6 italic">&quot;{content}&quot;</p>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-card-hover">
              <Image
                src={avatar}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold">{name}</div>
              <div className="text-sm text-muted">{role}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}


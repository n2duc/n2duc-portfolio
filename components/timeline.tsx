"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export interface TimelineItem {
  type: "work" | "education" | "achievement";
  title: string;
  organization: string;
  date: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />

      <div className="space-y-12">
        {items.map((item, index) => {
          const Icon = iconMap[item.type];
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${isEven ? "md:pr-12" : "md:pl-12"} pl-12 md:pl-0`}>
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold font-heading mb-1">
                        {item.title}
                      </h3>
                      <div className="text-accent font-medium mb-2">
                        {item.organization}
                      </div>
                      <div className="text-sm text-muted mb-3">{item.date}</div>
                      <p className="text-muted">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg transform -translate-x-[calc(50%-1px)]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}


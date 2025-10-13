"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export function SkillCloud() {
  return (
    <div className="space-y-8">
      {Object.entries(skills).map(([category, items], categoryIndex) => (
        <div key={category}>
          <h3 className="text-lg font-semibold font-heading mb-4 text-accent">
            {category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {items.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{
                  duration: 0.3,
                  delay: categoryIndex * 0.1 + index * 0.05,
                }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-card hover:bg-card-hover border border-border rounded-xl text-sm font-medium transition-all cursor-default hover:border-accent hover:shadow-md"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


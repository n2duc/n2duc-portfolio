"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";
import { AnimatedCounter } from "@/components/animated-counter";
import { Section } from "@/components/section";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function StatsSection() {
  return (
    <Section className="border-y border-border bg-card/30">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-center p-6 rounded-xl bg-card/50 hover:bg-card border border-transparent hover:border-accent/30 transition-colors"
          >
            <motion.div 
              className="text-4xl md:text-5xl font-bold font-heading text-accent mb-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </motion.div>
            <div className="text-sm md:text-base text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}


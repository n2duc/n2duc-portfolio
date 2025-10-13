"use client";

import { motion } from "framer-motion";
import { Globe, Layout, Zap, Palette } from "lucide-react";

import { services } from "@/lib/data";
import { Section, SectionHeader } from "@/components/section";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const iconMap = {
  Globe,
  Layout,
  Zap,
  Palette,
};

export function ServicesSection() {
  return (
    <Section>
      <SectionHeader
        title="What I Do"
        description="Specialized services to bring your web projects to life"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = iconMap[service.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:border-accent hover:shadow-glow transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}


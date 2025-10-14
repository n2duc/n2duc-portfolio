"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { skills } from "@/lib/data";

// Skill proficiency levels (you can customize these in data.ts later)
const skillLevels: { [key: string]: number } = {
  // Frontend
  "React": 95,
  "Next.js": 92,
  "TypeScript": 90,
  "Tailwind CSS": 88,
  "Framer Motion": 85,
  "Vue.js": 80,
  "HTML5": 95,
  "CSS3": 92,
  "SASS": 85,
  "Webpack": 75,
  
  // Backend
  "Node.js": 88,
  "Express": 85,
  "PostgreSQL": 82,
  "MongoDB": 80,
  "GraphQL": 78,
  "REST API": 90,
  "Prisma": 80,
  
  // DevOps
  "Docker": 75,
  "Vercel": 90,
  "GitHub Actions": 80,
  "AWS": 70,
  "Nginx": 75,
  "Linux": 82,
  
  // Tools
  "Git": 92,
  "Figma": 85,
  "VS Code": 95,
  "Playwright": 78,
  "Jest": 82,
  "Storybook": 80,
  "Lighthouse": 88,
};

// Tech icons
const techIcons: { [key: string]: string } = {
  "React": "⚛️",
  "Next.js": "▲",
  "TypeScript": "📘",
  "Tailwind CSS": "🎨",
  "Framer Motion": "✨",
  "Vue.js": "💚",
  "HTML5": "🌐",
  "CSS3": "🎨",
  "SASS": "💅",
  "Webpack": "📦",
  "Node.js": "🟢",
  "Express": "🚂",
  "PostgreSQL": "🐘",
  "MongoDB": "🍃",
  "GraphQL": "📊",
  "REST API": "🔌",
  "Prisma": "⚡",
  "Docker": "🐳",
  "Vercel": "▲",
  "GitHub Actions": "🔄",
  "AWS": "☁️",
  "Nginx": "🌐",
  "Linux": "🐧",
  "Git": "📚",
  "Figma": "🎨",
  "VS Code": "💻",
  "Playwright": "🎭",
  "Jest": "🃏",
  "Storybook": "📖",
  "Lighthouse": "🔆",
};

type ViewMode = "bars" | "circular" | "cards";

interface SkillBarProps {
  skill: string;
  level: number;
  icon: string;
  delay: number;
}

function SkillBar({ skill, level, icon, delay }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="font-medium">{skill}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className="text-sm text-accent font-semibold"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2 bg-card rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
        />
      </div>
    </motion.div>
  );
}

interface CircularSkillProps {
  skill: string;
  level: number;
  icon: string;
  delay: number;
}

function CircularSkill({ skill, level, icon, delay }: CircularSkillProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-card hover:bg-card-hover transition-colors border border-border/50 hover:border-accent/50"
    >
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-card-hover"
          />
          {/* Progress circle */}
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeInOut" }}
            className="text-accent"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl">{icon}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.8 }}
            className="text-xs font-bold text-accent"
          >
            {level}%
          </motion.span>
        </div>
      </div>
      <span className="text-sm font-medium text-center">{skill}</span>
    </motion.div>
  );
}

interface FlipCardSkillProps {
  skill: string;
  level: number;
  icon: string;
  delay: number;
}

function FlipCardSkill({ skill, level, icon, delay }: FlipCardSkillProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="perspective-1000 h-32"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden bg-card border border-border/50 rounded-xl flex flex-col items-center justify-center gap-2 p-4">
          <span className="text-4xl">{icon}</span>
          <span className="text-sm font-medium text-center">{skill}</span>
        </div>
        
        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden bg-accent text-bg border border-accent rounded-xl flex flex-col items-center justify-center gap-2 p-4 rotate-y-180">
          <div className="text-3xl font-bold">{level}%</div>
          <div className="text-xs opacity-90">Proficiency</div>
          <div className="w-full h-2 bg-bg/20 rounded-full mt-2">
            <div
              className="h-full bg-bg/80 rounded-full"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SkillVisualization() {
  const [viewMode, setViewMode] = useState<ViewMode>("bars");

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("bars")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === "bars"
              ? "bg-accent text-bg"
              : "bg-card text-fg hover:bg-card-hover"
          }`}
        >
          📊 Bars
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("circular")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === "circular"
              ? "bg-accent text-bg"
              : "bg-card text-fg hover:bg-card-hover"
          }`}
        >
          ⭕ Circular
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setViewMode("cards")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === "cards"
              ? "bg-accent text-bg"
              : "bg-card text-fg hover:bg-card-hover"
          }`}
        >
          🃏 Cards
        </motion.button>
      </div>

      {/* Skills Display */}
      <div className="space-y-8">
        {Object.entries(skills).map(([category, items], categoryIndex) => (
          <div key={category}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-lg font-semibold font-heading mb-4 text-accent"
            >
              {category}
            </motion.h3>

            {/* Bar View */}
            {viewMode === "bars" && (
              <div className="space-y-4">
                {items.map((skill, index) => (
                  <SkillBar
                    key={skill}
                    skill={skill}
                    level={skillLevels[skill] || 75}
                    icon={techIcons[skill] || "⚡"}
                    delay={categoryIndex * 0.1 + index * 0.05}
                  />
                ))}
              </div>
            )}

            {/* Circular View */}
            {viewMode === "circular" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((skill, index) => (
                  <CircularSkill
                    key={skill}
                    skill={skill}
                    level={skillLevels[skill] || 75}
                    icon={techIcons[skill] || "⚡"}
                    delay={categoryIndex * 0.1 + index * 0.05}
                  />
                ))}
              </div>
            )}

            {/* Flip Cards View */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((skill, index) => (
                  <FlipCardSkill
                    key={skill}
                    skill={skill}
                    level={skillLevels[skill] || 75}
                    icon={techIcons[skill] || "⚡"}
                    delay={categoryIndex * 0.1 + index * 0.05}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


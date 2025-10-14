"use client";

import { motion } from "framer-motion";
import { useState, MouseEvent } from "react";

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function RippleEffect({ children, className = "" }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-accent/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0 }}
          animate={{ width: 300, height: 300, x: -150, y: -150 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
    </div>
  );
}


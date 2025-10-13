"use client";

import { useState } from "react";
import { trustedCompanies } from "@/lib/data";

export function MarqueeLogos() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative overflow-hidden py-8">
      <div
        className="flex gap-12 animate-marquee"
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...trustedCompanies, ...trustedCompanies].map((company, index) => (
          <div
            key={`${company.name}-${index}`}
            className="flex items-center justify-center min-w-[120px] opacity-50 hover:opacity-100 transition-opacity"
          >
            <div className="text-lg font-semibold text-muted">
              {company.name}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}


"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Command } from "lucide-react";

import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isMac, setIsMac] = React.useState(false);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  
  // Prevent hydration mismatch by only using theme after mount
  React.useEffect(() => {
    setMounted(true);
    setIsMac(navigator?.platform?.includes("Mac") || false);
  }, []);

  const headerBackgroundLight = useTransform(
    scrollY,
    [0, 140],
    [
      "rgba(255,255,255,0)", // Light bg, transparent
      "rgba(255,255,255,0.6)" // Light bg, opaque
    ]
  );
  
  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 140],
    [
      "rgba(11,13,16,0)",  // Dark bg, transparent
      "rgba(11,13,16,0.8)" // Dark bg, opaque
    ]
  );

  const headerShadow = useTransform(
    scrollY,
    [0, 140],
    ["0 0 0 0 rgba(0, 0, 0, 0)", "0 4px 6px -1px rgba(0, 0, 0, 0.1)"]
  );

  // Use current theme only after mounted to avoid hydration mismatch
  const currentBackground = mounted && theme === "dark" 
    ? headerBackgroundDark 
    : headerBackgroundLight;

  return (
    <motion.header
      style={{
        background: currentBackground,
        boxShadow: headerShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
    >
      <nav className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold font-heading hover:text-accent transition-colors"
          >
            {siteConfig.shortName}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  pathname === item.href ? "text-accent" : "text-fg"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2 h-9 px-3 text-sm text-muted hover:text-fg hover:border-accent transition-colors"
              onClick={() => {
                // Trigger Cmd/Ctrl + K event
                window.dispatchEvent(
                  new KeyboardEvent("keydown", {
                    key: "k",
                    metaKey: true,
                    ctrlKey: true,
                  })
                );
              }}
            >
              <Command className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
              </kbd>
            </Button>
            
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-2 pb-4"
          >
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-card",
                  pathname === item.href ? "text-accent bg-card border" : "text-fg"
                )}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}


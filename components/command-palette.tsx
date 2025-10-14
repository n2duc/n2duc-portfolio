"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Command, 
  Home, 
  User, 
  Briefcase, 
  FileText, 
  Mail, 
  Moon,
  Sparkles,
  Rocket
} from "lucide-react";
import { fireConfetti } from "@/lib/confetti";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: <Home className="w-4 h-4" />,
      action: () => router.push("/"),
      keywords: ["home", "main"],
    },
    {
      id: "about",
      label: "Go to About",
      icon: <User className="w-4 h-4" />,
      action: () => router.push("/about"),
      keywords: ["about", "bio"],
    },
    {
      id: "projects",
      label: "Go to Projects",
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push("/projects"),
      keywords: ["projects", "work", "portfolio"],
    },
    {
      id: "blog",
      label: "Go to Blog",
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push("/blog"),
      keywords: ["blog", "articles", "posts"],
    },
    {
      id: "contact",
      label: "Go to Contact",
      icon: <Mail className="w-4 h-4" />,
      action: () => router.push("/contact"),
      keywords: ["contact", "email", "message"],
    },
    {
      id: "theme-toggle",
      label: "Toggle Theme",
      icon: <Moon className="w-4 h-4" />,
      action: () => {
        const theme = document.documentElement.getAttribute("data-theme");
        document.documentElement.setAttribute("data-theme", theme === "dark" ? "light" : "dark");
      },
      keywords: ["theme", "dark", "light", "mode"],
    },
    {
      id: "party",
      label: "🎉 Party Mode",
      icon: <Sparkles className="w-4 h-4" />,
      action: () => {
        fireConfetti();
        setTimeout(() => setIsOpen(false), 100);
      },
      keywords: ["party", "confetti", "celebrate", "fun", "easter egg"],
    },
    {
      id: "rocket",
      label: "🚀 Launch Rocket",
      icon: <Rocket className="w-4 h-4" />,
      action: () => {
        const emoji = document.createElement("div");
        emoji.innerHTML = "🚀";
        emoji.style.cssText = "position: fixed; font-size: 48px; bottom: -60px; left: 50%; transform: translateX(-50%); z-index: 9999; pointer-events: none; transition: none;";
        document.body.appendChild(emoji);
        
        let pos = -60;
        const interval = setInterval(() => {
          pos += 15; // Increase to move UP
          emoji.style.bottom = pos + "px";
          if (pos > window.innerHeight + 60) {
            clearInterval(interval);
            document.body.removeChild(emoji);
          }
        }, 16);
        
        setTimeout(() => setIsOpen(false), 100);
      },
      keywords: ["rocket", "launch", "space", "easter egg"],
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchLower = search.toLowerCase();
    return (
      cmd.label.toLowerCase().includes(searchLower) ||
      cmd.keywords?.some((k) => k.includes(searchLower))
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Command className="w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent outline-none text-fg placeholder:text-muted"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-card-hover rounded border border-border">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, index) => (
                    <motion.button
                      key={cmd.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => {
                        cmd.action();
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-card-hover transition-colors text-left group"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-bg transition-colors">
                        {cmd.icon}
                      </div>
                      <span className="flex-1 text-fg">{cmd.label}</span>
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-muted">
                    No commands found
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted">
                <span>Navigate with arrow keys</span>
                <span className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-card-hover rounded border border-border">
                    {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"}
                  </kbd>
                  <kbd className="px-2 py-1 bg-card-hover rounded border border-border">
                    K
                  </kbd>
                  to toggle
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


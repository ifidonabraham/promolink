"use client";

import { useTheme } from "@/components/ThemeProvider";
import { MoonIcon, SunIcon } from "@/components/icons";
import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-brand-dark opacity-80 ${className}`}
        aria-hidden="true"
      >
        <span className="h-4 w-4 rounded-full bg-brand-border animate-pulse" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
        isDark
          ? "border-amber-400/30 bg-slate-800 text-amber-300 hover:border-amber-400 hover:bg-slate-700 hover:shadow-[0_0_12px_rgba(251,191,36,0.35)]"
          : "border-brand-border bg-white text-brand-dark hover:border-brand hover:text-brand hover:shadow-card"
      } ${className}`}
    >
      <div className="relative h-5 w-5">
        <SunIcon
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        <MoonIcon
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100 text-slate-700 group-hover:text-brand"
          }`}
        />
      </div>
    </button>
  );
}

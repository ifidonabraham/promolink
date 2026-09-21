"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ServiceItem } from "@/lib/catalog";

/**
 * Modern product card rail with interactive smooth scrolling,
 * progress tracking, dynamic edge fade masks, and tactile controls.
 */
export function Carousel({
  title,
  eyebrow,
  href,
  items,
  id,
}: {
  title: string;
  eyebrow?: string;
  href: string;
  items: ServiceItem[];
  id?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLUListElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const progress = Math.min(100, Math.max(0, (rail.scrollLeft / maxScroll) * 100));
    setScrollProgress(progress);
    setCanScrollLeft(rail.scrollLeft > 10);
    setCanScrollRight(rail.scrollLeft < maxScroll - 10);
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    updateScrollState();
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || isPaused || !isVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      if (document.hidden) return;

      const maxScroll = rail.scrollWidth - rail.clientWidth;
      if (maxScroll <= 0) return;

      const step = Math.max(rail.clientWidth * 0.75, 280);
      const nextPosition = rail.scrollLeft + step;
      rail.scrollTo({
        left: nextPosition >= maxScroll - 10 ? 0 : nextPosition,
        behavior: "smooth",
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isPaused, isVisible, items.length]);

  function nudge(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    const step = Math.max(rail.clientWidth * 0.75, 280);
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <section
      ref={sectionRef}
      className="pm-section relative transition-colors duration-300"
      aria-labelledby={id ?? `${href}-heading`}
    >
      <div className="pm-container">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="pm-eyebrow mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {eyebrow}
              </p>
            ) : null}
            <h2
              id={id ?? `${href}-heading`}
              className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.85rem] dark:text-white"
            >
              {title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={href}
              className="group/more inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-all hover:text-brand-strong"
            >
              <span>See more</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/more:translate-x-1" />
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={!canScrollLeft}
                aria-label={`Scroll ${title} left`}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${
                  canScrollLeft
                    ? "border-brand-border bg-white text-slate-800 shadow-sm hover:scale-105 hover:border-brand hover:text-brand hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand"
                    : "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
                }`}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={!canScrollRight}
                aria-label={`Scroll ${title} right`}
                className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-200 ${
                  canScrollRight
                    ? "border-brand-border bg-white text-slate-800 shadow-sm hover:scale-105 hover:border-brand hover:text-brand hover:shadow-md active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand"
                    : "border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
                }`}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Product Rail with smooth side gradient masks */}
      <div className="relative">
        <div className="pm-container">
          <ul
            ref={railRef}
            className="pm-rail list-none p-0 scroll-smooth"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
            onPointerCancel={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            {items.map((item, index) => (
              <li
                key={item.slug}
                className="py-2 transition-transform duration-300"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <ProductCard item={item} />
              </li>
            ))}
          </ul>

          {/* Scroll progress track */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200/80 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-rose-500 transition-all duration-200 ease-out"
                style={{ width: `${Math.max(12, scrollProgress)}%` }}
              />
            </div>

            <div className="flex items-center gap-1.5 sm:hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Swipe
              </span>
              <ArrowRightIcon className="h-3 w-3 text-slate-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

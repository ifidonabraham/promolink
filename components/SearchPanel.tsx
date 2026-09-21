"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { allItems, categories } from "@/lib/catalog";

/** Search overlay wired to the header's search icon, like the reference site. */
export function SearchPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
    setQuery("");
    return undefined;
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allItems
      .filter((item) => {
        const category = categories.find((c) => c.slug === item.category);
        return (
          item.name.toLowerCase().includes(q) ||
          item.descriptor.toLowerCase().includes(q) ||
          (category?.name.toLowerCase().includes(q) ?? false)
        );
      })
      .slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex justify-center bg-brand-dark/45 px-4 pt-20 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 h-full w-full cursor-default"
        onClick={onClose}
      />

      <div className="pm-card relative z-10 w-full max-w-2xl self-start overflow-hidden">
        <div className="flex items-center gap-3 border-b border-brand-border px-4 py-3">
          <SearchIcon className="h-5 w-5 shrink-0 text-brand-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search services — business card, banner, t-shirt…"
            className="w-full bg-transparent text-base outline-none placeholder:text-brand-muted/70"
            aria-label="Search services"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-brand-muted transition hover:bg-brand-light hover:text-brand-dark"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim().length < 2 ? (
            <>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted">
                Browse categories
              </p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/category/${category.slug}`}
                      onClick={onClose}
                      className="block rounded-xl border border-brand-border px-3 py-2.5 text-sm font-medium transition hover:border-brand hover:bg-brand-light"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : results.length === 0 ? (
            <p className="px-1 py-6 text-center text-sm text-brand-muted">
              Nothing matched “{query}”. Try another word, or{" "}
              <Link
                href="/get-a-quote"
                onClick={onClose}
                className="font-semibold text-brand underline"
              >
                ask us for a quote
              </Link>
              .
            </p>
          ) : (
            <ul className="grid gap-1">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    onClick={onClose}
                    className="flex flex-col rounded-xl px-3 py-2.5 transition hover:bg-brand-light"
                  >
                    <span className="text-sm font-semibold">{item.name}</span>
                    <span className="line-clamp-1 text-xs text-brand-muted">
                      {item.descriptor}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
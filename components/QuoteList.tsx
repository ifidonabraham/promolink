"use client";

import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CartIcon } from "@/components/icons";

/**
 * PromoLink v1 has no e-commerce (see brief section 6), so the header's cart
 * slot is used for a "quote list" — the same browse-and-collect behaviour, but
 * it ends in a quote request instead of a checkout.
 */
type QuoteListValue = {
  slugs: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "promolink.quoteList.v1";

const QuoteListContext = createContext<QuoteListValue | null>(null);

export function QuoteListProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSlugs(parsed.filter((s): s is string => typeof s === "string"));
        }
      }
    } catch {
      // Ignore unavailable storage (private mode, etc.)
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      // Ignore write failures.
    }
  }, [slugs, ready]);

  const add = useCallback((slug: string) => {
    setSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const remove = useCallback((slug: string) => {
    setSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  const toggle = useCallback((slug: string) => {
    setSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo<QuoteListValue>(
    () => ({
      slugs,
      ready,
      has: (slug: string) => slugs.includes(slug),
      add,
      remove,
      toggle,
      clear,
    }),
    [slugs, ready, add, remove, toggle, clear]
  );

  return (
    <QuoteListContext.Provider value={value}>{children}</QuoteListContext.Provider>
  );
}

export function useQuoteList(): QuoteListValue {
  const ctx = useContext(QuoteListContext);
  if (!ctx) {
    // Safe fallback so components can render outside the provider (e.g. tests).
    return {
      slugs: [],
      ready: false,
      has: () => false,
      add: () => {},
      remove: () => {},
      toggle: () => {},
      clear: () => {},
    };
  }
  return ctx;
}

export function QuoteListButton({ slug }: { slug: string }) {
  const { has, toggle, ready } = useQuoteList();
  const inList = has(slug);

  return (
    <button
      type="button"
      onClick={() => toggle(slug)}
      aria-pressed={inList}
      className={`pm-btn ${inList ? "pm-btn-primary" : "pm-btn-outline"}`}
    >
      <CartIcon className="h-4 w-4" />
      {inList ? "Added to quote list" : "Add to quote list"}
    </button>
  );
}

export function QuoteListLink() {
  const { slugs, ready } = useQuoteList();
  const count = ready ? slugs.length : 0;

  return (
    <Link
      href="/get-a-quote"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-dark transition hover:border-brand hover:text-brand"
      aria-label={
        count > 0 ? `Quote list, ${count} item(s)` : "Quote list"
      }
    >
      <CartIcon className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-secondary px-1 text-[10px] font-bold text-brand-dark">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
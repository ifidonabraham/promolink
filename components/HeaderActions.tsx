"use client";

import Link from "next/link";
import { QuoteListLink } from "@/components/QuoteList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MenuIcon, SearchIcon } from "@/components/icons";

/** Icon cluster on the right of the sticky nav. */
export function HeaderActions({
  onOpenSearch,
  onOpenMenu,
}: {
  onOpenSearch: () => void;
  onOpenMenu: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onOpenSearch}
        aria-label="Search"
        className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-brand-dark transition-all duration-200 hover:border-brand hover:text-brand hover:shadow-card dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      <ThemeToggle />

      <QuoteListLink />

      <Link
        href="/get-a-quote"
        className="pm-btn pm-btn-primary pm-btn-sm hidden sm:inline-flex lg:hidden"
      >
        Get a Quote
      </Link>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
        className="grid h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-dark transition hover:border-brand hover:text-brand lg:hidden"
      >
        <MenuIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
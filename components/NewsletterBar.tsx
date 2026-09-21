"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

/**
 * Newsletter subscribe bar (same placement as the reference site: full-width
 * strip directly above the footer).
 *
 * TODO: no backend list exists yet — this posts to /api/subscribe, which logs
 * the address until a provider (or Supabase table) is wired up.
 */
export function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setState("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(response.ok ? "done" : "error");
      if (response.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="bg-brand-secondary text-brand-dark transition-colors duration-300 dark:bg-brand-dark dark:text-white">
      <div className="pm-container flex flex-col items-start justify-between gap-6 py-10 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl text-brand-dark dark:text-white sm:text-2xl">
            Subscribe to our newsletter
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-brand-muted dark:text-white/70">
            Promotions, new services and seasonal print offers — straight to your
            inbox.
          </p>
        </div>

        {state === "done" ? (
          <p className="flex items-center gap-2 rounded-full bg-white/70 px-5 py-3 text-sm font-semibold dark:bg-white/10">
            <CheckIcon className="h-4 w-4 text-brand-secondary" />
            You are on the list. Thank you!
          </p>
        ) : (
          <form onSubmit={onSubmit} className="w-full max-w-md">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-full border border-brand-border bg-white px-5 py-3 text-sm text-brand-dark outline-none placeholder:text-brand-muted/70 focus:border-brand dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder:text-white/50 dark:focus:border-brand-secondary"
              />
              <button
                type="submit"
                disabled={state === "sending"}
                className="pm-btn pm-btn-secondary shrink-0 disabled:opacity-60"
              >
                {state === "sending" ? "Subscribing…" : "Subscribe"}
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
            {state === "error" ? (
              <p className="mt-2 text-xs text-brand-secondary">
                That did not go through. Please try again, or email us at
                promolinkmedia2010@gmail.com.
              </p>
            ) : null}
          </form>
        )}
      </div>
    </section>
  );
}

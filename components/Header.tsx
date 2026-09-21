"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderActions } from "@/components/HeaderActions";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { SearchPanel } from "@/components/SearchPanel";
import { TopBar } from "@/components/TopBar";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { primaryNav, site, telLink, whatsappLink } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-all duration-300 dark:bg-slate-950/90 ${
          scrolled
            ? "border-brand-border shadow-card dark:border-slate-800"
            : "border-transparent"
        }`}
      >
        <div className="pm-container flex items-center justify-between gap-4 py-3">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((entry) => {
                const active = isActive(entry.href);
                const hasChildren = Boolean(entry.children?.length);

                return (
                  <li
                    key={entry.href}
                    className="relative"
                    onMouseEnter={() => hasChildren && setOpenDropdown(entry.href)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                  >
                    <Link
                      href={entry.href}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                        active
                          ? "bg-brand/10 text-brand font-bold dark:bg-brand/20 dark:text-rose-400"
                          : "text-slate-700 hover:bg-slate-100 hover:text-brand dark:text-slate-200 dark:hover:bg-slate-800/80 dark:hover:text-white"
                      }`}
                      aria-expanded={
                        hasChildren ? openDropdown === entry.href : undefined
                      }
                    >
                      {entry.label}
                      {hasChildren ? (
                        <ChevronDownIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                      ) : null}
                    </Link>

                    {hasChildren && openDropdown === entry.href ? (
                      <div className="absolute left-0 top-full z-50 pt-2 animate-fadeIn">
                        <ul className="pm-card min-w-48 overflow-hidden p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                          {entry.children?.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand/10 hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <HeaderActions
              onOpenSearch={() => setSearchOpen(true)}
              onOpenMenu={() => setMenuOpen(true)}
            />

            {/* Desktop-only quick actions */}
            <a
              href={telLink(site.phones[0])}
              aria-label={`Call ${site.phones[0]}`}
              className="hidden h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-dark transition-all duration-200 hover:border-brand hover:text-brand hover:shadow-sm dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand lg:grid"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>

            {/* Desktop WhatsApp Action - Signature WhatsApp GREEN */}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] transition-all duration-200 hover:scale-105 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white hover:shadow-[0_0_15px_rgba(37,211,102,0.45)] active:scale-95 lg:grid"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>

            <Link
              href="/get-a-quote"
              className="pm-btn pm-btn-primary pm-btn-sm hidden shadow-[0_4px_14px_rgba(227,38,46,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] lg:inline-flex"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
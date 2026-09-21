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
        className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "border-brand-border shadow-card" : "border-transparent"
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
                      className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                        active
                          ? "bg-brand-light text-brand"
                          : "text-brand-dark hover:bg-brand-light hover:text-brand"
                      }`}
                      aria-expanded={
                        hasChildren ? openDropdown === entry.href : undefined
                      }
                    >
                      {entry.label}
                      {hasChildren ? (
                        <ChevronDownIcon className="h-3.5 w-3.5" />
                      ) : null}
                    </Link>

                    {hasChildren && openDropdown === entry.href ? (
                      <div className="absolute left-0 top-full z-50 pt-2">
                        <ul className="pm-card min-w-44 overflow-hidden p-1.5">
                          {entry.children?.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-dark transition hover:bg-brand-light hover:text-brand"
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

          <div className="flex items-center gap-2">
            <HeaderActions
              onOpenSearch={() => setSearchOpen(true)}
              onOpenMenu={() => setMenuOpen(true)}
            />

            {/* Desktop-only quick actions; on mobile these live in the drawer. */}
            <a
              href={telLink(site.phones[0])}
              aria-label={`Call ${site.phones[0]}`}
              className="hidden h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-dark transition hover:border-brand hover:text-brand lg:grid"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full border border-brand-border text-brand-dark transition hover:border-brand hover:text-brand lg:grid"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link
              href="/get-a-quote"
              className="pm-btn pm-btn-primary pm-btn-sm hidden lg:inline-flex"
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
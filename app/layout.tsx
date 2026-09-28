import type { Metadata } from "next";
import { Cormorant_Garamond, Caveat, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Header } from "@/components/Header";
import { NewsletterBar } from "@/components/NewsletterBar";
import { QuoteListProvider } from "@/components/QuoteList";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — printing, branding & corporate promotion in Lagos`,
    template: `%s | ${site.shortName} Print Concepts`,
  },
  description: site.description,
  keywords: [
    "printing company Lagos",
    "large format printing Nigeria",
    "corporate branding Lagos",
    "signage Nigeria",
    "promotional items Lagos",
    "screen printing Mushin",
  ],
  openGraph: {
    title: `${site.legalName} — Printing, Branding & Corporate Promotion`,
    description: site.description,
    url: site.url,
    siteName: site.legalName,
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${site.legalName} — Printing, Corporate Branding & Large-Format Solutions in Lagos`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — Printing, Branding & Corporate Promotion`,
    description: site.description,
    images: ["/brand/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NG"
      className={`${manrope.variable} ${cormorant.variable} ${caveat.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <QuoteListProvider>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <NewsletterBar />
            <Footer />
            <FloatingWhatsApp />
          </QuoteListProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
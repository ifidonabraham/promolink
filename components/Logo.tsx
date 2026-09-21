import Link from "next/link";
import Image from "next/image";

/**
 * PromoLink's official logo mark and logotype extracted from the company profile.
 */
export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden ${className}`}>
      <Image
        src="/brand/promolink-logo-clean.png"
        alt="PromoLink logo mark"
        width={120}
        height={40}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Logo({
  className = "",
  tone = "dark",
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  href?: string | null;
}) {
  const logoSrc =
    tone === "light"
      ? "/brand/promolink-logo-dark.png"
      : "/brand/promolink-logo-clean.png";

  const inner = (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="PromoLink Print Concepts Limited"
        width={280}
        height={56}
        className="h-8 sm:h-9 md:h-10 w-auto object-contain"
        priority
      />
    </span>
  );

  if (!href) return inner;

  return (
    <Link
      href={href}
      className="inline-flex items-center transition opacity-95 hover:opacity-100"
      aria-label="PromoLink Print Concepts — home"
    >
      {inner}
    </Link>
  );
}
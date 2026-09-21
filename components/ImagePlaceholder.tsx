/**
 * Branded stand-in artwork for services, clients and people who do not yet have
 * a photo. Replace by setting the `image` field on the data object — this
 * component is only ever rendered when that field is null.
 *
 * TODO: swap placeholder image — see the `image: null` notes in
 * lib/catalog.ts, lib/clients.ts, lib/team.ts and lib/testimonials.ts.
 */
export function ImagePlaceholder({
  label,
  className = "",
  variant = "service",
}: {
  label: string;
  className?: string;
  variant?: "service" | "client" | "person" | "photo";
}) {
  const initials = label
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  if (variant === "person" || variant === "client") {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{
          background:
            variant === "person"
              ? "linear-gradient(135deg, var(--brand-light), #ffffff)"
              : "var(--brand-light)",
        }}
        role="img"
        aria-label={`${label} placeholder`}
      >
        <span
          className="font-display text-lg font-bold tracking-wide text-brand-muted"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #eef1f6 0%, #fdfefe 55%, #e7ecf3 100%)",
      }}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <svg
        viewBox="0 0 200 140"
        className="h-full w-full opacity-70"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`pm-dots-${initials}`}
            width="14"
            height="14"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.6" fill="var(--brand-primary)" opacity="0.12" />
          </pattern>
        </defs>
        <rect width="200" height="140" fill={`url(#pm-dots-${initials})`} />
        <rect
          x="34"
          y="30"
          width="132"
          height="80"
          rx="10"
          fill="#ffffff"
          stroke="var(--brand-primary)"
          strokeOpacity="0.18"
        />
        <rect x="46" y="44" width="60" height="7" rx="3.5" fill="var(--brand-primary)" opacity="0.35" />
        <rect x="46" y="60" width="96" height="5" rx="2.5" fill="var(--brand-muted)" opacity="0.3" />
        <rect x="46" y="72" width="78" height="5" rx="2.5" fill="var(--brand-muted)" opacity="0.3" />
        <circle cx="146" cy="88" r="13" fill="var(--brand-secondary)" opacity="0.55" />
      </svg>
    </div>
  );
}


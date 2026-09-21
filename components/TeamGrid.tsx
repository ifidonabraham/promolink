import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { team, type TeamMember } from "@/lib/team";

/** Leadership grid with hover image zoom, card lift, and dark mode support. */
export function TeamGrid({
  members = team,
  compact = false,
}: {
  members?: TeamMember[];
  compact?: boolean;
}) {
  return (
    <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <li
          key={member.slug}
          className="pm-card group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-brand/40 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-500/40"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={500}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            ) : (
              <ImagePlaceholder
                variant="person"
                label={member.name}
                className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-105"
              />
            )}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="text-base font-bold text-slate-900 transition-colors group-hover:text-brand dark:text-white">
              {member.name}
            </h3>
            <p className="mt-0.5 text-xs font-bold uppercase tracking-wider text-brand">
              {member.role}
            </p>
            {!compact && member.note ? (
              <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {member.note}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
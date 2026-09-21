import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { team, type TeamMember } from "@/lib/team";

/** Leadership grid — see lib/team.ts for the source of the names and titles. */
export function TeamGrid({
  members = team,
  compact = false,
}: {
  members?: TeamMember[];
  compact?: boolean;
}) {
  return (
    <ul className="grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <li key={member.slug} className="pm-card overflow-hidden">
          {member.image ? (
            <Image
              src={member.image}
              alt={member.name}
              width={400}
              height={500}
              className="aspect-[4/5] w-full object-cover"
            />
          ) : (
            /* TODO: swap placeholder image — headshot from the company profile. */
            <ImagePlaceholder
              variant="person"
              label={member.name}
              className="aspect-[4/5] w-full"
            />
          )}
          <div className="p-4">
            <h3 className="text-base">{member.name}</h3>
            <p className="mt-0.5 text-sm font-semibold text-brand">
              {member.role}
            </p>
            {!compact ? (
              <p className="mt-2 text-sm text-brand-muted">{member.note}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
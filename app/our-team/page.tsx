import type { Metadata } from "next";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHeader } from "@/components/PageHeader";
import { TrustCtaBanner } from "@/components/TrustCtaBanner";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the PromoLink Print Concepts leadership — design, operations, business development and finance — as listed in the company profile.",
};

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        intro="Our team includes designers, print consultants, online ordering specialists, offset and digital print managers, packaging and labelling experts, signage and point-of-sale manufacturers, installers, and a finishing and logistics team."
        crumbs={[{ label: "About us", href: "/about" }, { label: "Our team" }]}
      />

      <section className="pm-section">
        <div className="pm-container grid gap-8">
          {team.map((member) => (
            <article
              key={member.slug}
              className="pm-card grid gap-6 p-6 sm:grid-cols-[12rem_1fr] sm:p-8"
            >
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  width={384}
                  height={480}
                  className="h-48 w-48 rounded-2xl object-cover"
                />
              ) : (
                /* TODO: swap placeholder image — headshot from the company profile. */
                <ImagePlaceholder
                  variant="person"
                  label={member.name}
                  className="h-48 w-48 rounded-2xl"
                />
              )}

              <div>
                <h2 className="text-xl">{member.name}</h2>
                <p className="mt-1 text-sm font-semibold text-brand">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-brand-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <TrustCtaBanner />
    </>
  );
}
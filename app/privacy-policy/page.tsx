import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How PromoLink Print Concepts Limited collects, uses and protects the information you send us through this website.",
  robots: { index: false, follow: true },
};

/**
 * TODO(legal): this is a good-faith, Nigeria-NDPA-aligned draft written for the
 * v1 site. Have it reviewed by PromoLink's legal adviser before launch.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        intro="This policy explains what we collect when you use this website, why we collect it, and the choices you have."
        crumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="pm-section">
        <div className="pm-container max-w-3xl">
          <div className="pm-card grid gap-6 p-6 sm:p-8">
            <p className="text-sm text-brand-muted">
              {/* TODO(legal): confirm effective date before publishing. */}
              Draft — last reviewed on publication of this site.
            </p>

            <Block title="Who we are">
              <p>
                {site.legalName} (“PromoLink”, “we”, “us”) is a printing,
                corporate branding and promotional services company registered in
                Nigeria, with its office at {site.address.full}. You can reach us
                at{" "}
                <a href={`mailto:${site.email}`} className="text-brand underline">
                  {site.email}
                </a>
                .
              </p>
            </Block>

            <Block title="What we collect">
              <ul className="grid list-none gap-2 p-0">
                <li>
                  <strong className="text-brand-dark">Quote requests:</strong> your
                  name, organisation, email address, phone number, the services you
                  select and any details you type into the notes field.
                </li>
                <li>
                  <strong className="text-brand-dark">Newsletter:</strong> the email
                  address you subscribe with.
                </li>
                <li>
                  <strong className="text-brand-dark">Quote list:</strong> the
                  services you tick are stored in your own browser (localStorage).
                  They are not sent to us until you submit the quote form.
                </li>
                <li>
                  <strong className="text-brand-dark">Technical data:</strong> basic
                  request logs from our hosting provider, used to keep the site
                  running and secure.
                </li>
              </ul>
            </Block>

            <Block title="Why we use it">
              <p>
                To prepare and send you a quotation, answer your enquiry, arrange
                production and delivery, keep records of the work we do for you, and
                — only if you subscribed — send occasional promotional updates.
              </p>
            </Block>

            <Block title="Who we share it with">
              <p>
                We do not sell your information. We share it only with service
                providers who help us operate (for example our hosting and database
                providers) and where we are required to do so by law.
              </p>
            </Block>

            <Block title="How long we keep it">
              <p>
                Quote requests are kept for as long as needed to serve you and to
                meet our accounting obligations. Newsletter subscriptions are kept
                until you unsubscribe.
              </p>
            </Block>

            <Block title="Your choices">
              <p>
                You can ask us to show you what we hold about you, correct it, or
                delete it, and you can unsubscribe from marketing at any time. Write
                to{" "}
                <a href={`mailto:${site.email}`} className="text-brand underline">
                  {site.email}
                </a>{" "}
                and we will action the request.
              </p>
            </Block>

            <Block title="Cookies">
              <p>
                This website does not use advertising cookies. If analytics are
                added later, this section will be updated before they go live.
              </p>
            </Block>

            <Block title="Changes">
              <p>
                If this policy changes, the updated version will be posted on this
                page.
              </p>
            </Block>
          </div>
        </div>
      </section>
    </>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg">{title}</h2>
      <div className="mt-2 grid gap-2 text-sm text-brand-muted">{children}</div>
    </section>
  );
}
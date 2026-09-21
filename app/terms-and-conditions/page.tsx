import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you order printing, branding, signage or promotional services from PromoLink Print Concepts Limited.",
  robots: { index: false, follow: true },
};

/**
 * TODO(legal): draft terms written for the v1 site (no online checkout, quotes
 * and WhatsApp/phone orders). Have them reviewed by PromoLink's legal adviser
 * before launch — especially the payment and reprint clauses.
 */
export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        intro="These terms apply to quotations, orders and deliveries from PromoLink Print Concepts Limited."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      <section className="pm-section">
        <div className="pm-container max-w-3xl">
          <div className="pm-card grid gap-6 p-6 sm:p-8">
            <p className="text-sm text-brand-muted">
              {/* TODO(legal): confirm effective date before publishing. */}
              Draft — last reviewed on publication of this site.
            </p>

            <Block title="1. Quotations">
              <p>
                Prices on a quotation are valid for 14 days unless stated
                otherwise, and are based on the specification, quantity and
                materials agreed at that time. This website does not display prices
                for every service and does not process payments online — orders are
                confirmed by phone, email or WhatsApp.
              </p>
            </Block>

            <Block title="2. Orders and artwork">
              <p>
                Production begins once we receive written approval of the artwork
                and confirmation of the order. You are responsible for checking
                proofs for spelling, layout, colour, size and content. Changes
                requested after approval may affect cost and delivery time.
              </p>
            </Block>

            <Block title="3. Files and rights">
              <p>
                By sending artwork you confirm you have the right to use it and that
                it does not infringe anyone else&apos;s rights. We may decline work
                that is unlawful, offensive or infringing. Where we design for you,
                the finished artwork is handed over on full payment of the design
                element.
              </p>
            </Block>

            <Block title="4. Colour and finishing">
              <p>
                Print colour can vary slightly between machines, paper stocks and
                finishing processes, and screen colours are indicative only. Minor
                variation within normal trade tolerance is not a defect.
              </p>
            </Block>

            <Block title="5. Turnaround and delivery">
              <p>
                Turnaround runs from artwork approval, not from the date of
                enquiry. Delivery dates are given in good faith; delays caused by
                events outside our control (power, transport, supplier or force
                majeure) are not our responsibility, though we will always tell you
                what is happening.
              </p>
            </Block>

            <Block title="6. Payment">
              <p>
                We accept bank transfer to our corporate account or payment in{" "}
                {site.shortName}&apos;s office. Large projects may be split into a
                deposit and balance; this is agreed in writing at order stage.
              </p>
            </Block>

            <Block title="7. Reprints and liability">
              <p>
                If a job is not produced to the approved specification, tell us
                within 7 days of delivery and we will reprint or correct it. Our
                liability is limited to the value of the affected order.
              </p>
            </Block>

            <Block title="8. Cancellation">
              <p>
                Orders cancelled after production has started may be charged for
                materials and work already completed.
              </p>
            </Block>

            <Block title="9. Governing law">
              <p>
                These terms are governed by the laws of the Federal Republic of
                Nigeria. Questions about them can be sent to{" "}
                <a href={`mailto:${site.email}`} className="text-brand underline">
                  {site.email}
                </a>
                .
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
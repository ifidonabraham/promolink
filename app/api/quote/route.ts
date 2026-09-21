import { NextResponse } from "next/server";
import { asText, isEmail, saveLead } from "@/lib/leads";
import { allItems } from "@/lib/catalog";
import { site } from "@/lib/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const data = (body ?? {}) as Record<string, unknown>;

  const name = asText(data.name, 120);
  const email = asText(data.email, 160);
  const phone = asText(data.phone, 40);

  if (!name || !isEmail(email) || !phone) {
    return NextResponse.json(
      { ok: false, error: "missing_fields", required: ["name", "email", "phone"] },
      { status: 422 }
    );
  }

  const services = Array.isArray(data.services)
    ? data.services
        .filter((slug): slug is string => typeof slug === "string")
        .map((slug) => allItems.find((item) => item.slug === slug)?.name ?? slug)
        .slice(0, 40)
    : [];

  const result = await saveLead("quote_requests", {
    name,
    organisation: asText(data.organisation, 160),
    email,
    phone,
    services,
    quantity: asText(data.quantity, 80),
    deadline: asText(data.deadline, 80),
    details: asText(data.details, 4000),
    source: site.url,
  });

  return NextResponse.json({ ok: true, persisted: result.persisted });
}
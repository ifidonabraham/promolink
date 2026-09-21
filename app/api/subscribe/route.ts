import { NextResponse } from "next/server";
import { asText, isEmail, saveLead } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = asText((body as Record<string, unknown>)?.email, 160);

  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }

  const result = await saveLead("newsletter_subscribers", {
    email: email.toLowerCase(),
  });

  return NextResponse.json({ ok: true, persisted: result.persisted });
}
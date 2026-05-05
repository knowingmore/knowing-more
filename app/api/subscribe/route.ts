import { NextResponse } from "next/server";

/**
 * POST /api/subscribe
 *
 * Body: { email: string, source?: string, attributes?: Record<string, string> }
 *
 * Adds the email to a Brevo (Sendinblue) contact list. The list ID is chosen
 * based on `source` (e.g. "discount", "newsletter", "product-performance"),
 * falling back to BREVO_LIST_ID_DEFAULT.
 *
 * Source code is server-side only — API key is read from env vars and never
 * exposed to the browser.
 */

type Source =
  | "discount"
  | "newsletter"
  | "product-performance"
  | "product-balance"
  | "product-gut-health"
  | "bundle"
  | "default";

function listIdForSource(source: Source | undefined): number | null {
  const map: Record<Source, string | undefined> = {
    discount: process.env.BREVO_LIST_ID_DISCOUNT,
    newsletter: process.env.BREVO_LIST_ID_NEWSLETTER,
    "product-performance": process.env.BREVO_LIST_ID_PRODUCT_PERFORMANCE,
    "product-balance": process.env.BREVO_LIST_ID_PRODUCT_BALANCE,
    "product-gut-health": process.env.BREVO_LIST_ID_PRODUCT_GUT_HEALTH,
    bundle: process.env.BREVO_LIST_ID_BUNDLE,
    default: process.env.BREVO_LIST_ID_DEFAULT,
  };

  const raw = (source && map[source]) || process.env.BREVO_LIST_ID_DEFAULT;
  if (!raw) return null;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email: string | undefined = body?.email;
    const source: Source | undefined = body?.source;
    const attributes: Record<string, string> = body?.attributes ?? {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "invalid_email" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("[subscribe] BREVO_API_KEY missing");
      return NextResponse.json(
        { error: "config_missing" },
        { status: 500 }
      );
    }

    const listId = listIdForSource(source);
    if (!listId) {
      console.error("[subscribe] No list ID configured for source", source);
      return NextResponse.json(
        { error: "list_not_configured" },
        { status: 500 }
      );
    }

    // Brevo /v3/contacts: creates contact (if new) and adds to list.
    // If contact already exists, we PUT to update with the new list.
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[subscribe] Brevo error", res.status, text);
      return NextResponse.json(
        { error: "brevo_error", status: res.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] unexpected", err);
    return NextResponse.json(
      { error: "unexpected" },
      { status: 500 }
    );
  }
}

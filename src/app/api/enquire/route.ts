import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

type EnquiryBody = {
  type?: string;
  location?: string;
  date?: string;
  guests?: string;
  budget?: string;
  vision?: string;
  name?: string;
  email?: string;
  phone?: string;
  mode?: string;
  company?: string; // honeypot
};

const rateMap = new Map<string, { count: number; reset: number }>();

function clean(value: unknown, max = 500) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function clientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(key: string) {
  const now = Date.now();
  const windowMs = 60_000;
  const max = 8;
  const entry = rateMap.get(key);
  if (!entry || now > entry.reset) {
    rateMap.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  let body: EnquiryBody;
  try {
    body = (await request.json()) as EnquiryBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill hidden fields; accept silently
  if (clean(body.company, 80)) {
    return NextResponse.json({ ok: true, emailed: false, brief: "" });
  }

  const payload = {
    type: clean(body.type, 80),
    location: clean(body.location, 120),
    date: clean(body.date, 40),
    guests: clean(body.guests, 40),
    budget: clean(body.budget, 40),
    vision: clean(body.vision, 2000),
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    mode: clean(body.mode, 20),
  };

  if (!payload.name || !payload.email || !payload.phone || !payload.vision) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!payload.guests && !payload.budget) {
    return NextResponse.json(
      { ok: false, error: "Please select guests or budget" },
      { status: 400 }
    );
  }

  const lines = [
    `New Marit enquiry from ${payload.name}`,
    `Type: ${payload.type}`,
    `Location: ${payload.location}`,
    `Date: ${payload.date}`,
    `Guests: ${payload.guests}`,
    `Budget: ${payload.budget}`,
    `Vision: ${payload.vision}`,
    `Email: ${payload.email}`,
    `Phone/WhatsApp: ${payload.phone}`,
    `Preferred handoff: ${payload.mode || "whatsapp"}`,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  let emailed = false;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const from =
        process.env.RESEND_FROM_EMAIL || "Marit Events <onboarding@resend.dev>";
      const to = process.env.ENQUIRE_TO_EMAIL || siteConfig.email;

      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: payload.email,
        subject: `Marit enquiry — ${payload.type || "Event"} — ${payload.name}`,
        text: lines,
      });

      if (error) {
        console.error("[enquire] Resend error", error);
        return NextResponse.json(
          { ok: false, error: "Email delivery failed", emailed: false },
          { status: 502 }
        );
      }
      emailed = true;
    } catch (err) {
      console.error("[enquire] Resend exception", err);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed", emailed: false },
        { status: 502 }
      );
    }
  } else {
    console.info("[enquire] lead (no RESEND_API_KEY)", {
      type: payload.type,
      name: payload.name,
      email: payload.email,
    });
  }

  return NextResponse.json({ ok: true, emailed, brief: lines });
}

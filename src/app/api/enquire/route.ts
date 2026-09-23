import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import {
  enquireAutoReplyHtml,
  enquireAutoReplyText,
  enquireBriefText,
  enquireNotifyHtml,
  type EnquirePayload,
} from "@/lib/enquire-email";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);

type EnquiryFields = {
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
  company?: string;
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

async function parseBody(request: Request): Promise<{
  fields: EnquiryFields;
  attachment?: { filename: string; content: Buffer; contentType: string };
  error?: string;
}> {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await request.formData();
    const fields: EnquiryFields = {
      type: String(form.get("type") ?? ""),
      location: String(form.get("location") ?? ""),
      date: String(form.get("date") ?? ""),
      guests: String(form.get("guests") ?? ""),
      budget: String(form.get("budget") ?? ""),
      vision: String(form.get("vision") ?? ""),
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      mode: String(form.get("mode") ?? ""),
      company: String(form.get("company") ?? ""),
    };

    const file = form.get("attachment");
    if (file && typeof file !== "string" && file.size > 0) {
      if (file.size > MAX_ATTACHMENT_BYTES) {
        return { fields, error: "Attachment must be under 8MB." };
      }
      const type = file.type || "application/octet-stream";
      if (!ALLOWED_TYPES.has(type)) {
        return {
          fields,
          error: "Attach a PDF or image (JPG, PNG, WebP).",
        };
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      return {
        fields,
        attachment: {
          filename: file.name || "attachment",
          content: buffer,
          contentType: type,
        },
      };
    }

    return { fields };
  }

  try {
    const json = (await request.json()) as EnquiryFields;
    return { fields: json };
  } catch {
    return { fields: {}, error: "Invalid request body" };
  }
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  const parsed = await parseBody(request);
  if (parsed.error && !parsed.fields.name) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }
  if (parsed.error) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const body = parsed.fields;

  // Honeypot — bots fill hidden fields; accept silently
  if (clean(body.company, 80)) {
    return NextResponse.json({ ok: true, emailed: false, brief: "" });
  }

  const payload: EnquirePayload = {
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

  if (
    !payload.name ||
    !payload.email ||
    !payload.phone ||
    !payload.vision ||
    !payload.location
  ) {
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

  const lines =
    enquireBriefText(payload) +
    (parsed.attachment
      ? `\nAttachment: ${parsed.attachment.filename}`
      : "");
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
        html: enquireNotifyHtml(payload),
        attachments: parsed.attachment
          ? [
              {
                filename: parsed.attachment.filename,
                content: parsed.attachment.content,
                contentType: parsed.attachment.contentType,
              },
            ]
          : undefined,
      });

      if (error) {
        console.error("[enquire] Resend error", error);
        return NextResponse.json({
          ok: true,
          emailed: false,
          brief: lines,
        });
      }
      emailed = true;

      try {
        const auto = await resend.emails.send({
          from,
          to: [payload.email],
          replyTo: siteConfig.email,
          subject: "We've received your Marit Events enquiry",
          text: enquireAutoReplyText(payload),
          html: enquireAutoReplyHtml(payload),
        });
        if (auto.error) {
          console.error("[enquire] auto-reply error", auto.error);
        }
      } catch (autoErr) {
        console.error("[enquire] auto-reply exception", autoErr);
      }
    } catch (err) {
      console.error("[enquire] Resend exception", err);
      return NextResponse.json({
        ok: true,
        emailed: false,
        brief: lines,
      });
    }
  } else {
    console.info("[enquire] lead (no RESEND_API_KEY)", {
      type: payload.type,
      name: payload.name,
      email: payload.email,
      hasAttachment: Boolean(parsed.attachment),
    });
  }

  return NextResponse.json({ ok: true, emailed, brief: lines });
}

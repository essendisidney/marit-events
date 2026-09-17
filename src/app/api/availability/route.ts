import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Kenya is UTC+3 year-round (no DST), so a fixed offset is safe here.
const NAIROBI_OFFSET = "+03:00";

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!email || !rawKey) return null;

  // Vercel's env var editor sometimes stores literal "\n" instead of real
  // newlines depending on how the key was pasted — normalize either way.
  const key = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

  return new google.auth.JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !DATE_RE.test(date)) {
    return NextResponse.json(
      { ok: false, error: "Provide a date as YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const auth = getAuth();

  // Not configured yet — don't block the enquiry form, just say we can't
  // check availability automatically right now.
  if (!auth || !calendarId) {
    return NextResponse.json({ ok: true, status: "unknown", date });
  }

  try {
    const calendar = google.calendar({ version: "v3", auth });
    const { data } = await calendar.freebusy.query({
      requestBody: {
        timeMin: `${date}T00:00:00${NAIROBI_OFFSET}`,
        timeMax: `${date}T23:59:59${NAIROBI_OFFSET}`,
        timeZone: "Africa/Nairobi",
        items: [{ id: calendarId }],
      },
    });

    const busy = data.calendars?.[calendarId]?.busy ?? [];
    return NextResponse.json({
      ok: true,
      date,
      status: busy.length > 0 ? "busy" : "available",
    });
  } catch (err) {
    console.error("[availability] Google Calendar error", err);
    return NextResponse.json({ ok: true, status: "unknown", date });
  }
}

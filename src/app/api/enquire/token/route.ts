import { NextResponse } from "next/server";
import { issueFormToken } from "@/lib/form-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Hands the enquiry form a fresh signed token. Never cached. */
export async function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

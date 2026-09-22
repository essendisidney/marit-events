import { siteConfig, whatsappUrl } from "@/lib/site";

export type EnquirePayload = {
  type: string;
  location: string;
  date: string;
  guests: string;
  budget: string;
  vision: string;
  name: string;
  email: string;
  phone: string;
  mode: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function enquireBriefText(payload: EnquirePayload) {
  return [
    `New Marit enquiry from ${payload.name}`,
    `Type: ${payload.type}`,
    `Location: ${payload.location}`,
    `Date: ${payload.date || "—"}`,
    `Guests: ${payload.guests || "—"}`,
    `Budget: ${payload.budget || "—"}`,
    `Vision: ${payload.vision}`,
    `Email: ${payload.email}`,
    `Phone/WhatsApp: ${payload.phone}`,
    `Preferred handoff: ${payload.mode || "whatsapp"}`,
  ].join("\n");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #ece6dc;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7f70;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:10px 0;border-bottom:1px solid #ece6dc;font-size:15px;color:#1a1714;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function shell(title: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;background:#f4efe6;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdf9;border:1px solid #e6dfd2;">
          <tr>
            <td style="padding:28px 32px 12px;border-bottom:1px solid #e6dfd2;">
              <p style="margin:0;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;font-family:Arial,Helvetica,sans-serif;">Marit Events</p>
              <h1 style="margin:12px 0 0;font-size:28px;line-height:1.2;font-weight:400;color:#1a1714;">${title}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #e6dfd2;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8a7f70;">
              ${escapeHtml(siteConfig.location)} · <a href="${siteConfig.url}" style="color:#c9a96e;text-decoration:none;">maritevents.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Internal notification for Rose */
export function enquireNotifyHtml(payload: EnquirePayload) {
  const body = `
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#4a433c;font-family:Arial,Helvetica,sans-serif;">
      New enquiry from <strong style="color:#1a1714;">${escapeHtml(payload.name)}</strong>. Reply to this email to reach them directly.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Type", payload.type)}
      ${row("Location", payload.location)}
      ${row("Date", payload.date)}
      ${row("Guests", payload.guests)}
      ${row("Budget", payload.budget)}
      ${row("Email", payload.email)}
      ${row("WhatsApp", payload.phone)}
      ${row("Handoff", payload.mode || "whatsapp")}
    </table>
    <p style="margin:24px 0 8px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#8a7f70;font-family:Arial,Helvetica,sans-serif;">Vision</p>
    <p style="margin:0;font-size:15px;line-height:1.65;color:#1a1714;white-space:pre-wrap;">${escapeHtml(payload.vision)}</p>
  `;
  return shell("New enquiry", body);
}

/** Confirmation the client receives */
export function enquireAutoReplyHtml(payload: EnquirePayload) {
  const wa = whatsappUrl(
    `Hi Marit — following up on my ${payload.type || "event"} enquiry (${payload.location}).`
  );
  const body = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1a1714;">
      Dear ${escapeHtml(payload.name.split(" ")[0] || payload.name)},
    </p>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:#4a433c;font-family:Arial,Helvetica,sans-serif;">
      Thank you for writing to Marit Events. We've received your ${escapeHtml(payload.type || "celebration")} enquiry${payload.location ? ` for ${escapeHtml(payload.location)}` : ""} and will reply within 2–3 hours with a clear next step.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#4a433c;font-family:Arial,Helvetica,sans-serif;">
      If anything is urgent, WhatsApp us anytime — we're happy to help.
    </p>
    <p style="margin:0 0 28px;">
      <a href="${wa}" style="display:inline-block;background:#c9a96e;color:#0b0b0b;text-decoration:none;padding:12px 22px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Message on WhatsApp</a>
    </p>
    <p style="margin:0;font-size:14px;line-height:1.6;color:#8a7f70;font-family:Arial,Helvetica,sans-serif;">
      With care,<br />
      <span style="color:#1a1714;">Rose &amp; the Marit Events team</span><br />
      <a href="mailto:${siteConfig.email}" style="color:#c9a96e;text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
      · ${escapeHtml(siteConfig.phone)}
    </p>
  `;
  return shell("We've received your enquiry", body);
}

export function enquireAutoReplyText(payload: EnquirePayload) {
  const first = payload.name.split(" ")[0] || payload.name;
  return [
    `Dear ${first},`,
    "",
    `Thank you for writing to Marit Events. We've received your ${payload.type || "celebration"} enquiry${payload.location ? ` for ${payload.location}` : ""} and will reply within 2–3 hours with a clear next step.`,
    "",
    `If anything is urgent, WhatsApp us: ${siteConfig.phone}`,
    `Or email: ${siteConfig.email}`,
    "",
    "With care,",
    "Rose & the Marit Events team",
    siteConfig.url,
  ].join("\n");
}

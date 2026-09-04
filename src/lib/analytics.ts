import { track } from "@vercel/analytics";

export function trackEnquireSubmit(props: {
  mode: string;
  type: string;
  emailed?: boolean;
}) {
  track("enquire_submit", props);
}

export function trackWhatsAppClick(props: { path: string }) {
  track("whatsapp_click", props);
}

export function trackEnquireOpen(props?: { type?: string; location?: string }) {
  track("enquire_open", props ?? {});
}

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

export function trackCtaClick(props: {
  path: string;
  href: string;
  source: string;
}) {
  track("cta_click", props);
}

export function trackGalleryOpen(props: { title: string }) {
  track("gallery_open", props);
}

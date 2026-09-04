import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Marit Events — Exceptional moments. Impeccably orchestrated.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0B",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #C9A96E, transparent)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#C9A96E",
            }}
          >
            MARIT EVENTS
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              color: "#F6F1E8",
              maxWidth: 900,
            }}
          >
            {siteConfig.tagline}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#B8AEA0",
              fontStyle: "italic",
            }}
          >
            {siteConfig.slogan}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#B8AEA0",
            fontSize: 22,
            letterSpacing: "0.08em",
          }}
        >
          <span>{siteConfig.location}</span>
          <span style={{ color: "#C9A96E" }}>maritevents.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

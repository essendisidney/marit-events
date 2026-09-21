import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt =
  "Marit Events — Exceptional moments. Impeccably orchestrated.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(
    join(process.cwd(), "public/events/reception-rustic-chic.jpg")
  );
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#0B0B0B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(105deg, rgba(11,11,11,0.88) 0%, rgba(11,11,11,0.72) 48%, rgba(11,11,11,0.35) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            fontFamily: "Georgia, serif",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 160,
              height: 2,
              background: "#C9A96E",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                fontSize: 22,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#C9A96E",
              }}
            >
              MARIT EVENTS
            </div>
            <div
              style={{
                fontSize: 58,
                lineHeight: 1.08,
                color: "#F6F1E8",
                maxWidth: 720,
              }}
            >
              {siteConfig.tagline}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "#B8AEA0",
                fontStyle: "italic",
                maxWidth: 640,
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
              fontSize: 20,
              letterSpacing: "0.08em",
            }}
          >
            <span>{siteConfig.location}</span>
            <span style={{ color: "#C9A96E" }}>maritevents.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

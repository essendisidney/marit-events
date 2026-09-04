import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { portfolio } from "@/lib/portfolio";
import { journalPosts } from "@/lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/experiences",
    "/weddings",
    "/corporate",
    "/destination",
    "/story",
    "/journal",
    "/enquire",
    "/portfolio",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/enquire" ? 0.9 : 0.7,
  }));

  const portfolioRoutes = portfolio.map((item) => ({
    url: `${base}/portfolio/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = journalPosts.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...journalRoutes];
}

/** Public downloadable documents — place files in /public/downloads/ */

export type DownloadItem = {
  id: string;
  title: string;
  description: string;
  /** Path under /public, e.g. /downloads/marit-events-company-profile.pdf */
  href: string;
  /** Suggested download filename */
  filename: string;
  /** Relative path from public/ for existence checks */
  publicPath: string;
};

export const downloadCatalog: DownloadItem[] = [
  {
    id: "company-profile",
    title: "Company profile",
    description:
      "Marit Events capability overview — positioning, approach and what we orchestrate.",
    href: "/downloads/marit-events-company-profile.pdf",
    filename: "Marit-Events-Company-Profile.pdf",
    publicPath: "downloads/marit-events-company-profile.pdf",
  },
];

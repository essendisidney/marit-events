import { siteConfig } from "@/lib/site";

export function JsonLd() {
  const base = siteConfig.url.replace(/\/$/, "");
  const logoUrl = `${base}${siteConfig.logo}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#business` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        image: logoUrl,
        logo: logoUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        areaServed: [
          { "@type": "Country", name: "Kenya" },
          { "@type": "Place", name: "East Africa" },
        ],
        slogan: siteConfig.slogan,
        priceRange: "$$$",
        sameAs: [siteConfig.instagram],
        founder: {
          "@type": "Person",
          name: "Rose Kimonge",
          jobTitle: "Founder, Event & Operations Consultant",
          url: `${base}/story`,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: siteConfig.phone,
            email: siteConfig.email,
            availableLanguage: ["English"],
            areaServed: "Worldwide",
          },
        ],
        knowsAbout: [
          "Wedding planning",
          "Destination weddings in Kenya",
          "Corporate event management",
          "Traditional Kenyan ceremonies",
          "Private celebrations",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Event services",
          itemListElement: [
            ["Wedding planning & orchestration", "/weddings"],
            ["Destination celebrations in Kenya", "/destination"],
            ["Corporate events", "/corporate"],
            ["Private celebrations", "/experiences"],
            ["Event consultation", "/consultation"],
          ].map(([name, path]) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name, url: `${base}${path}` },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

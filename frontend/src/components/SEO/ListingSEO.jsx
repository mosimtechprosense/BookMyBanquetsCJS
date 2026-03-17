import { useEffect, useState } from "react";
import { seoMetaData } from "../../utils/seoMetaData";
import { Helmet } from "react-helmet-async"

// Helper to convert any string to kebab-case
function toKebabCase(str) {
  return str ? str.trim().toLowerCase().replace(/\s+/g, "-") : "";
}

export default function ListingSEO({ filters, serviceFromRoute }) {
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    canonical: "",
    ogImage: ""
  });

  useEffect(() => {
    if (!filters || !serviceFromRoute) return;

    const city = toKebabCase(filters.city || "delhi");
    const serviceSlug = toKebabCase(serviceFromRoute);
    const localitySlug = toKebabCase(filters.locality);

    const pathname = localitySlug
      ? `/${serviceSlug}-in-${city}/${localitySlug}`
      : `/${serviceSlug}-in-${city}`;

    const canonicalUrl = `https://www.bookmybanquets.in${pathname}`;

    const matched = seoMetaData.find(
      (item) => item.url.toLowerCase() === pathname.toLowerCase()
    );

    if (matched) {
      setSeo({
        title: matched.title,
        description: matched.description,
        canonical: canonicalUrl,
        ogImage: matched.ogImage || ""
      });
    } else {
      setSeo({
        title: `${serviceFromRoute} in ${filters.locality || "All Locations"} - BookMyBanquets`,
        description: `Explore ${filters.locality || "all areas"} ${serviceFromRoute} available.`,
        canonical: canonicalUrl,
        ogImage: "https://www.bookmybanquets.in/default-og.jpg"
      });
    }
  }, [filters, serviceFromRoute]);

  return (
    <Helmet>
      <meta name="robots" content="index, follow" />
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.canonical && <link rel="canonical" href={seo.canonical} />}

      {/* Open Graph Tags */}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.canonical && <meta property="og:url" content={seo.canonical} />}
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Bookmybanquets" />
    </Helmet>
  );
}
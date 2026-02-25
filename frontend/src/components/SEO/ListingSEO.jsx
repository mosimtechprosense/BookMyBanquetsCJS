import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { seoMetaData } from "../../utils/seoMetaData";

// Helper to convert any string to kebab-case
function toKebabCase(str) {
  return str
    ? str.trim().toLowerCase().replace(/\s+/g, "-")
    : "";
}

export default function ListingSEO({ filters, serviceFromRoute }) {
  const [seo, setSeo] = useState({ title: "", description: "" });

  useEffect(() => {
   if (!filters || !serviceFromRoute) {
  return;
}

    const city = "delhi"; // make sure this matches your seoMetaData
    const serviceSlug = toKebabCase(serviceFromRoute);
    const localitySlug = toKebabCase(filters.locality);

    // Build the pathname dynamically like your seoMetaData URLs
    const pathname = localitySlug
      ? `/${serviceSlug}-in-${city}/${localitySlug}`
      : `/${serviceSlug}-in-${city}`;

    // Match SEO metadata
    const matched = seoMetaData.find(item => pathname === item.url.toLowerCase());

    // Update SEO state
    if (matched) {
      setSeo({ title: matched.title, description: matched.description });
    } else {
      setSeo({
        title: `${serviceFromRoute} in ${filters.locality || "All Locations"} - BookMyBanquets`,
        description: `Explore ${filters.locality || "all areas"} ${serviceFromRoute || "services"} available`,
      });
    }
  }, [filters, serviceFromRoute]);

  return (
    <Helmet>
      {seo.title && <title>{seo.title}</title>}
      {seo.description && <meta name="description" content={seo.description} />}
    </Helmet>
  );
}
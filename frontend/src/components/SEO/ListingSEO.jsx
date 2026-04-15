import { useEffect, useState } from "react";
import { seoMetaData } from "../../utils/seoMetaData";
import { Helmet } from "react-helmet-async"

// Helper to convert any string to kebab-case
function toKebabCase(str) {
  return str ? str.trim().toLowerCase().replace(/\s+/g, "-") : "";
}



function toTitleCaseFromSlug(str) {
if (!str) return "";
return str
  .replace(/-/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase());
}



export default function ListingSEO({ filters, serviceFromRoute }) {
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    canonical: "",
    ogImage: ""
  });

  useEffect(() => {
  if (!serviceFromRoute) return;

  const serviceSlug = toKebabCase(serviceFromRoute);
  const city = toKebabCase(filters?.city || "");
  const localitySlug = toKebabCase(filters?.locality || "");

  let pathname = "";

  //  Case 1: Only service ( /banquet-hall )
  if (!city && !localitySlug) {
    pathname = `/${serviceSlug}`;
  }
  //  Case 2: City level
  else if (city && !localitySlug) {
    pathname = `/${serviceSlug}-in-${city}`;
  }
  //  Case 3: Locality level
  else if (city && localitySlug) {
    pathname = `/${serviceSlug}-in-${city}/${localitySlug}`;
  }

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
  const formattedService = toTitleCaseFromSlug(serviceFromRoute);
  const location = filters?.locality
  ? `${filters.locality}${filters?.city ? `, ${filters.city}` : ""}`
  : filters?.city || "India";

setSeo((prev) => {
  const newSeo = {
    title: `Best ${formattedService} in ${location} | BookMyBanquets`,
    description: `Discover top-rated ${formattedService} in ${location} with pricing, photos, reviews & availability. Book the perfect venue for weddings, parties & events on BookMyBanquets.`,
    canonical: canonicalUrl,
    ogImage: "https://www.bookmybanquets.in/dialog.avif"
  };

  return JSON.stringify(prev) === JSON.stringify(newSeo) ? prev : newSeo;
});
}
}, [filters, serviceFromRoute]);


const isDelhiPage =
  seo.canonical === "https://www.bookmybanquets.in/banquet-hall-in-delhi";

const breadcrumbSchema = isDelhiPage
  ? {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "BookMyBanquets",
          item: "https://www.bookmybanquets.in/"
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Banquet Hall",
          item: "https://www.bookmybanquets.in/banquet-hall"
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Banquet Hall in Delhi",
          item: "https://www.bookmybanquets.in/banquet-hall-in-delhi"
        }
      ]
    }
  : null;
 


  return (
    <Helmet>

{breadcrumbSchema && (
  <script type="application/ld+json">
    {JSON.stringify(breadcrumbSchema)}
  </script>
)}
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
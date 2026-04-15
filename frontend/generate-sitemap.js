// FILE: generateSitemap.js

import fs from "fs";
import axios from "axios";

const BASE_URL = "https://www.bookmybanquets.in";
const API_URL = "http://localhost:3000"

// 🔥 Slug helper (VERY IMPORTANT)
function slugify(text) {
  return text
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// 🔥 URL creator with SEO tags
function createUrl(loc, priority = "0.90") {
  return `
  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemap() {
  try {
    let urls = [];

    // =========================
    // ✅ 1. STATIC PAGES
    // =========================
    const staticRoutes = [
      { path: "", priority: "1.0" },
      { path: "/about", priority: "0.90" },
      { path: "/contact", priority: "0.90" },
      { path: "/services", priority: "0.90" },
      { path: "/why-us", priority: "0.90" },
      { path: "/blogs", priority: "0.90" }
    ];

    staticRoutes.forEach(r => {
      urls.push(createUrl(`${BASE_URL}${r.path}`, r.priority));
    });

    // =========================
    // ✅ 2. CATEGORY → SLUG MAP
    // =========================
      const categoryToSlug = [
    { label: "BMB Assured", id: 26 },
    { label: "BMB Verified", id: 27 },
    { label: "Banquet Halls", id: 6 },
    { label: "Marriage Halls", id: 8 },
    { label: "Wedding Farmhouse", id: 13 },
    { label: "Party Halls", id: 7 },
    { label: "5 Star Wedding Hotels", id: 11 },
    { label: "Destination Weddings", id: 12 },
  ];

    const services = Object.values(categoryToSlug);

    // =========================
    // ✅ 3. SERVICE PAGES
    // =========================
    services.forEach(service => {
      urls.push(createUrl(`${BASE_URL}/${service}`, "0.90"));
    });

    // =========================
    // ✅ 4. LOCATIONS (CITY + LOCALITY)
    // =========================
    const locationsRes = await axios.get(`${API_URL}/api/locations`);
    const locations = locationsRes.data.data || [];

    const citySet = new Set();

    locations.forEach(loc => {
      if (!loc?.name || !loc?.city_name) return;

      const citySlug = slugify(loc.city_name);
      const localitySlug = slugify(loc.name);

      citySet.add(citySlug);

      // 🔥 Locality pages
      services.forEach(service => {
        urls.push(
          createUrl(
            `${BASE_URL}/${service}-in-${citySlug}/${localitySlug}`,
            "0.90"
          )
        );
      });
    });

    // =========================
    // ✅ 5. CITY PAGES (BONUS SEO)
    // =========================
    citySet.forEach(citySlug => {
      services.forEach(service => {
        urls.push(
          createUrl(`${BASE_URL}/${service}-in-${citySlug}`, "0.90")
        );
      });
    });

    // =========================
    // ✅ 6. LISTINGS (DETAIL PAGES)
    // =========================
    const listingsRes = await axios.get(`${API_URL}/api/listings`);
    const listings = listingsRes.data.data || [];

    listings.forEach(item => {
      if (!item?.id || !item?.locality) return;

      const localitySlug = slugify(item.locality);

      const serviceSlug =
        categoryToSlug[item.category_id] || "banquet-hall";

      urls.push(
        createUrl(
          `${BASE_URL}/${serviceSlug}-in/${localitySlug}/${item.id}`,
          "0.90"
        )
      );
    });

    // =========================
    // ✅ 7. REMOVE DUPLICATES
    // =========================
    const uniqueUrls = Array.from(new Set(urls));

    // =========================
    // ✅ 8. GENERATE XML
    // =========================
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="https://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${uniqueUrls.join("")}
</urlset>`;

    fs.writeFileSync("./public/sitemap.xml", xml);

    console.log(`✅ Sitemap generated with ${uniqueUrls.length} URLs`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

generateSitemap();
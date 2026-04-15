import { Helmet } from "react-helmet-async";

export default function ListingDetailsSEO({ listing }) {
  if (!listing) return null;

  const title = listing.title?.trim() || "Venue";

  const city = listing.city?.trim();
  const locality = listing.locality?.trim();

  let location = "Delhi";

  if (locality && city) {
    location = `${locality}, ${city}`;
  } else if (city) {
    location = city;
  } else if (locality) {
    location = locality;
  }

  const seoTitle = `${title} in ${location} | BookMyBanquets`;

  const seoDescription = `Book ${title} in ${location}. View photos, pricing, capacity, reviews & availability. Perfect venue for weddings, parties & events.`;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
    </Helmet>
  );
}
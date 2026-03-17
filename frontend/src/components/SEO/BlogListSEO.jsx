import { Helmet } from "react-helmet-async"

const BlogListSEO = ({ page }) => {

  const baseTitle =
    "BookMyBanquets – Find Best Banquet Halls & Wedding Venue for Every Events"

  const title =
    page && page > 1 ? `${baseTitle} | Page ${page}` : baseTitle

  const canonical =
    page && page > 1
      ? `https://www.bookmybanquets.in/blogs?page=${page}`
      : "https://www.bookmybanquets.in/blogs"

  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content="Find best banquet halls and wedding venues for every event on BookMyBanquets. Compare prices, locations, and facilities to book the perfect venue easily."
      />

      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Find best banquet halls and wedding venues for every event on BookMyBanquets."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="BookMyBanquets" />
    </Helmet>
  )
}

export default BlogListSEO
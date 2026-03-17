import { Helmet } from "react-helmet-async"

const BlogSEO = ({ post }) => {
  if (!post || !post.yoast_head_json) return null

  const seo = post.yoast_head_json

  const title = seo.title
  const description = seo.description
  const canonical = seo.canonical

  const ogTitle = seo.og_title || title
  const ogDescription = seo.og_description || description
  const ogUrl = seo.og_url || canonical

  const ogImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null

  return (
    <Helmet>
      {title && <title>{title}</title>}

      {description && (
        <meta name="description" content={description} />
      )}

      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && (
        <meta property="og:description" content={ogDescription} />
      )}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Book My Banquet" />

      {/* Robots */}
      {seo.robots?.index && (
        <meta name="robots" content={`${seo.robots.index}, ${seo.robots.follow}`} />
      )}
    </Helmet>
  )
}

export default BlogSEO
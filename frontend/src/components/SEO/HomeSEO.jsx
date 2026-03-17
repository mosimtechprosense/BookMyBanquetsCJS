import { Helmet } from "react-helmet-async"


export default function HomeSEO() {
  return (
    <Helmet>

{/* for google analytics  */}
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-4GHYTNKR8P"
></script>

<script>
{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-4GHYTNKR8P');
`}
</script>

 {/* Google tag (gtag.js) */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-G2RSB1WL8W"></script>
<script>
  {
  `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-G2RSB1WL8W');
  `}
</script>


       {/* Robots */}
      <meta name="robots" content="index, follow" />

       {/* Title */}
      <title>
        Banquet Halls | Luxury and Budget Wedding Venues - Book My Banquets
      </title>

       {/* Description */}
      <meta
        name="description"
        content="Find top banquet halls and budget wedding venues with Book My Banquets. Explore venues online for weddings, parties, and events at great prices."
      />
      

       {/* Open Graph Meta Tags */}
      <meta property="og:image" content="https://www.bookmybanquets.in/assets/footer_logo-DUfRYcNs.png" />
      <meta property="og:title" content="Banquet Halls | Luxury and Budget Wedding Venues - Book My Banquets" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.bookmybanquets.in/" />
      <meta property="og:description" content="Find top banquet halls and budget wedding venues with Book My Banquets. Explore venues online for weddings, parties, and events at great prices." />
      <meta property="og:site_name" content="BookMyBanquets" />


       {/* Website Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org/",
          "@type": "WebSite",
          "name": "BookMyBanquets",
          "url": "https://www.bookmybanquets.in/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.bookmybanquets.in/{search_term_string}Event Service",
            "query-input": "required name=search_term_string"
          }
        }
        `}
      </script>

      

       {/* Organization Schema */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BookMyBanquets",
          "url": "https://www.bookmybanquets.in/",
          "logo": "https://www.bookmybanquets.in/logo.png",
          "sameAs": [
            "https://www.facebook.com/bookmybanquets06/",
            "https://www.instagram.com/book_my_banquets/",
            "https://www.youtube.com/@Bookmybanquets",
            "https://www.linkedin.com/in/bookmy-banquet-210784336/",
            "https://in.pinterest.com/banquetshalls/"
          ]
        }
        `}
      </script>
    </Helmet>
  );
}
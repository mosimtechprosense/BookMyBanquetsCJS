import { Helmet } from "react-helmet-async"


export default function HomeSEO() {
  return (
    <Helmet>




       {/* Robots */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.bookmybanquets.in" />
      <meta name="google-site-verification" content="AabghH2zKh8BpIWk1klWNDc0PN05fF4Hv4iZrm2BNzo" />
      
      

       {/* Title */}
      <title>
        Banquet Halls Near Me & Top Wedding Venues | BookMyBanquets
      </title>

       {/* Description */}
      <meta
        name="description"
        content="Find the best banquet halls near me/you with BookMyBanquets. Explore top wedding venues, compare prices, locations & reviews, and book easily today."
      />
      

       {/* Open Graph Meta Tags */}
      <meta property="og:image" content="https://www.bookmybanquets.in/assets/footer_logo-DUfRYcNs.png" />
      <meta property="og:title" content="Banquet Halls Near Me & Top Wedding Venues | BookMyBanquets" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.bookmybanquets.in/" />
      <meta property="og:description" content="Find the best banquet halls near me/you with BookMyBanquets. Explore top wedding venues, compare prices, locations & reviews, and book easily today." />
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
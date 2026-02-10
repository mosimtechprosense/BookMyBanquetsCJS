import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchLocalityDescription } from "../../api/listingsApi";
import "../../style/LocalityDescription.css"

const FALLBACK_CONTENT = {
delhi: {
  heading: "Explore Premium & Budget-Friendly Banquet Halls In Delhi With BookMyBanquets",
  description: `
    <section>
      <p>
        When you are planning a memorable event, choosing the best banquet hall in Delhi can make all the difference.
        Whether you want a venue for a wedding, reception, birthday, anniversary, a corporate event, or a social gathering,
        Delhi offers a wide variety of venues. These banquet halls range from luxury banquet halls with modern decor
        to budget-friendly banquet halls that suit every celebration.
      </p>

      <p>
        BookMyBanquets helps you search a large number of banquet halls and wedding venues in Delhi in one place,
        without visiting multiple locations. You can explore luxury venues as well as budget-friendly,
        low-rated banquet halls in Delhi, all curated to make your event joyful, stress-free, and memorable.
      </p>
    </section>

    <section>
      <h2>Which Type Of Wedding Venues In Delhi Are The Best?</h2>
      <p>
        Choosing the best banquet hall in Delhi is now easier than ever.
        With modern technology and professional assistance, you can explore luxury to budget-friendly venues
        with just one click by filtering banquet type, price range, and menu options.
      </p>

      <p>
        The right wedding venue depends on budget, guest capacity, wedding style, and event date.
      </p>

      <ul>
        <li>Budget-friendly banquet halls for stress-free celebrations</li>
        <li>Luxury and elegant halls for dream weddings</li>
        <li>Farmhouses for grand traditional weddings</li>
        <li>Resorts for destination weddings</li>
        <li>Boutique venues for small and stylish weddings</li>
      </ul>
    </section>

    <section>
      <h2>Why Is Delhi a Perfect Location for Celebrations?</h2>
      <ul>
        <li><strong>Prime Areas:</strong> Uttam Nagar, Kirti Nagar, and South Delhi with easy accessibility</li>
        <li><strong>Wide Variety:</strong> Luxurious to elegant halls across different price ranges</li>
        <li><strong>Professional Services:</strong> In-house catering, decor, and event managers</li>
        <li><strong>Flexible Budgets:</strong> Options available for every type of celebration</li>
      </ul>
    </section>

    <section>
      <h2>Features of the Best Banquet Halls in Delhi</h2>
      <ol>
        <li>Convenient locations for easy guest access</li>
        <li>Stylish spaces for small to grand celebrations</li>
        <li>Flexible menu options with multiple cuisines</li>
        <li>Facilities like lighting, DJ setup, parking, and trained staff</li>
        <li>Excellent value for money across all budgets</li>
      </ol>
    </section>

    <section>
      <h2>How to Find Banquet Halls in Delhi for Every Budget?</h2>
      <p><strong>Luxury Doesn’t Always Mean Expensive:</strong> Premium venues often offer discounts during weekdays or off-peak seasons.</p>
      <p><strong>Transparent Pricing:</strong> Clear per-plate rates, capacity, and amenities help compare venues easily.</p>
      <p><strong>Suitable for Every Celebration:</strong> Family functions or corporate gatherings without compromising comfort.</p>
    </section>

    <section>
      <h2>Why Choose Budget-Friendly, Low-Rated Banquet Halls in Delhi?</h2>
      <ul>
        <li>Ideal for community gatherings and family events</li>
        <li>Simple yet classy setup with essential services</li>
        <li>Perfect starter venues for first-time celebrations</li>
      </ul>
    </section>

    <section>
      <h2>How to Choose a Banquet Hall Under Rs. 500 Per Plate in Delhi?</h2>
      <ul>
        <li>Affordable pricing with quality food options</li>
        <li>Large guest capacity without extra cost</li>
        <li>Customizable decor, menu, and music packages</li>
      </ul>
    </section>

    <section>
      <h2>Best Banquet Halls in Delhi for Every Event</h2>

      <h3>1. Royal Castle, Tilak Nagar</h3>
      <ul>
        <li>Flexible menu options</li>
        <li>Experienced staff</li>
        <li>Good lighting and decor</li>
        <li>Ample parking</li>
        <li>Easy accessibility</li>
      </ul>

      <h3>2. Orabella Banquets, Peeragarhi</h3>
      <ul>
        <li>Guest capacity up to 600</li>
        <li>Basic sound and stage setup included</li>
        <li>Per plate pricing: Rs.1200 – Rs.1500</li>
        <li>Professional and attentive staff</li>
      </ul>

      <h3>3. Invitee Banquet, Kirti Nagar</h3>
      <ul>
        <li>Per plate pricing: Rs.1300 – Rs.1500</li>
        <li>Multiple indoor halls</li>
        <li>Convenient metro connectivity</li>
        <li>Spacious parking area</li>
      </ul>
    </section>

    <section>
      <h2>Wedding Venues and Banquet Halls in Delhi</h2>
      <ul>
        <li>Outdoor lawns for open-air celebrations</li>
        <li>Indoor banquet halls for elegant weddings</li>
        <li>Professional coordination for smooth experiences</li>
      </ul>
    </section>

    <section>
      <h2>What to Consider When Booking a Delhi Venue?</h2>
      <ul>
        <li>Seating capacity and arrangements</li>
        <li>Catering options and per-plate pricing</li>
        <li>Availability during peak seasons</li>
        <li>Facilities like parking, DJ, lighting, and decor</li>
        <li>Booking and cancellation policies</li>
      </ul>
    </section>

    <section>
      <h2>Tips to Book the Best Banquet Hall</h2>
      <ul>
        <li>Plan 2–3 months in advance</li>
        <li>Visit the venue personally</li>
        <li>Read reviews and check real photos</li>
        <li>Compare multiple banquet halls</li>
        <li>Clarify all costs in advance</li>
      </ul>
    </section>

    <section>
      <h2>Conclusion</h2>
      <p>
        Delhi offers banquet halls for every style and budget.
        With BookMyBanquets, booking the perfect venue is simple, reliable, and stress-free.
        Start exploring today and make your celebration unforgettable.
      </p>
    </section>

    <section>
      <h2>Frequently Asked Questions</h2>

      <p><strong>Q1.</strong> What should I check before booking a banquet hall?<br/>
      Location, seating, catering, parking, and reviews.</p>

      <p><strong>Q2.</strong> Are banquet halls under Rs.500 per plate available in Delhi?<br/>
      Yes, several venues offer affordable packages.</p>

      <p><strong>Q3.</strong> Should I book in advance?<br/>
      Yes, early booking ensures better pricing and availability.</p>

      <p><strong>Q4.</strong> Are low-rated banquet halls suitable for events?<br/>
      Yes, they are perfect for small and budget-friendly gatherings.</p>

      <p><strong>Q5.</strong> Is online booking available?<br/>
      Yes, BookMyBanquets offers easy online booking with filters.</p>
    </section>
  `
},
  gurgaon: {
  heading: "Best Banquet Halls in Gurgaon for Weddings & Events",
  description: `
    <section>
      <p>
        Honestly, every celebration can’t be hosted at home. Special occasions like weddings, receptions,
        engagements, birthdays, anniversaries, and corporate events deserve a venue that offers elegance,
        comfort, and professional services. This is where banquet halls in Gurgaon come into the picture,
        transforming ordinary gatherings into unforgettable moments.
      </p>

      <p>
        Gurgaon has emerged as one of the most popular destinations for celebrations in Delhi/NCR.
        With luxury hotels, modern infrastructure, excellent connectivity, and diverse venue options,
        the city offers everything from premium banquet halls to budget-friendly venues.
      </p>

      <p>
        With BookMyBanquets, finding and booking your dream venue is easier than ever.
        Search, compare, and shortlist banquet halls online from the comfort of your home.
      </p>
    </section>

    <section>
      <h2>Which Are the Best Banquet Halls in Gurgaon?</h2>
      <p>
        Our platform allows you to compare banquet halls by location, pricing, photos, and reviews.
        Whether you are planning a pre-wedding function, wedding, or reception, you can find a venue
        that perfectly suits your budget, theme, and guest capacity.
      </p>

      <ul>
        <li>Luxury banquet halls</li>
        <li>Five-star hotel venues</li>
        <li>Wedding lawns and farmhouses</li>
        <li>Budget-friendly banquet halls</li>
        <li>Boutique and designer event spaces</li>
      </ul>
    </section>

    <section>
      <h2>How to Find Banquet Halls in Gurgaon for Every Budget?</h2>
      <p>
        Budget planning plays a major role in any event.
        Gurgaon offers banquet halls for every budget without compromising on quality.
        From luxury venues to affordable halls, you can choose customizable packages that fit your needs.
      </p>

      <ul>
        <li>In-house catering</li>
        <li>Basic decor</li>
        <li>Power backup</li>
        <li>Comfortable seating</li>
        <li>Event coordination</li>
      </ul>
    </section>

    <section>
      <h2>Why Are Budget-Friendly, Low-Rated Banquet Halls in Gurgaon Important?</h2>
      <ul>
        <li>Affordable options for families, startups, and small organizers</li>
        <li>Ideal for birthdays, engagements, meetings, and roka ceremonies</li>
        <li>Essential facilities like seating, decor, catering, and parking</li>
        <li>Cost-effective solutions without unnecessary luxury expenses</li>
        <li>Flexible food and decor arrangements</li>
        <li>Easy connectivity and accessible locations</li>
      </ul>
    </section>

    <section>
      <h2>How to Find Banquet Halls in Gurgaon for ₹500 Per Plate?</h2>
      <p>
        Budget-conscious hosts can find banquet halls in Gurgaon under ₹500 per plate
        by choosing venues with basic decor, limited menus, and off-peak booking dates.
        Weekday bookings and flexible guest counts help reduce overall costs.
      </p>
    </section>

    <section>
      <h2>Top 5 Best Banquet Halls in Gurgaon</h2>

      <h3>1. Royal Swan Banquet, Sohna Road</h3>
      <p>A blend of banquet hall, resort, and green lawns with elegant decor.</p>

      <h3>2. Cuisineo Banquet, Sector 66</h3>
      <p>Spacious lawn ideal for large and intimate gatherings with delicious catering.</p>

      <h3>3. GNH Convention, Sector 48</h3>
      <p>Luxurious venue with lawns and banquet halls for large guest lists.</p>

      <h3>4. Star Banquet, Sector 9</h3>
      <p>Perfect for outdoor events and intimate celebrations up to 150 guests.</p>

      <h3>5. The Grand Taj Convention</h3>
      <p>Modern, elegant venue suitable for intimate to grand celebrations.</p>
    </section>

<section class="price-table-section">
  <h2 class="price-table-heading">
    Top 10 Banquet Halls in Gurgaon With Price Per Plate
  </h2>

  <div class="table-wrapper">
    <table class="price-table">
      <thead>
        <tr>
          <th>Banquet Hall</th>
          <th>Area</th>
          <th>Starting Price/Plate</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>The Club House</td><td>Sector 04</td><td>Starting ₹1000</td></tr>
        <tr><td>The Grand Taj Convention</td><td>Sohna Road</td><td>Under ₹1800</td></tr>
        <tr><td>Amstoria Club & Resorts</td><td>Sector 102</td><td>Under ₹1500</td></tr>
        <tr><td>Yidam</td><td>Sector 02</td><td>Under ₹2000</td></tr>
        <tr><td>The Acura BMK</td><td>Sector 14</td><td>Under ₹1000</td></tr>
        <tr><td>Prakash</td><td>Sector 13</td><td>Under ₹1000</td></tr>
        <tr><td>The Archer</td><td>Sector 52</td><td>Under ₹1000</td></tr>
        <tr><td>Fortune Park Orange</td><td>Sidhrawali</td><td>Starting ₹1000</td></tr>
        <tr><td>Green House</td><td>Sector 49</td><td>Starting ₹1000</td></tr>
        <tr><td>Unitech Nirvana Patio</td><td>Sector 50</td><td>Under ₹1000</td></tr>
      </tbody>
    </table>
  </div>
</section>


    <section>
      <h2>How to Book the Right Banquet Hall in Gurgaon?</h2>
      <ul>
        <li>Plan 4–6 months in advance</li>
        <li>Visit the venue personally or virtually</li>
        <li>Understand payment and cancellation policies</li>
        <li>Review menu and tasting options</li>
        <li>Read contracts carefully</li>
      </ul>
    </section>

    <section>
      <h2>How BookMyBanquets Helps You</h2>
      <ul>
        <li>Verified venue listings</li>
        <li>Easy comparison of prices and facilities</li>
        <li>Real customer reviews</li>
        <li>Fast booking support</li>
      </ul>
    </section>

    <section>
      <h2>Conclusion</h2>
      <p>
        From banquet halls under ₹500 per plate to luxury venues,
        Gurgaon offers something for every celebration.
        BookMyBanquets makes venue discovery easy, fast, and stress-free.
      </p>
    </section>

    <section>
      <h2>Frequently Asked Questions</h2>

      <p><strong>Q1.</strong> How to find the best banquet hall in Gurgaon?<br/>
      Understand your budget, guest list, and event type, then compare venues online.</p>

      <p><strong>Q2.</strong> Are banquet halls under ₹500 per plate available?<br/>
      Yes, many venues offer basic packages for budget weddings.</p>

      <p><strong>Q3.</strong> What does budget-friendly, low-rated mean?<br/>
      Affordable venues with essential facilities and flexible services.</p>

      <p><strong>Q4.</strong> Can I find banquet halls for every budget?<br/>
      Yes, Gurgaon offers venues from low-cost to luxury options.</p>

      <p><strong>Q5.</strong> Is BookMyBanquets reliable?<br/>
      Yes, it offers verified venues, real reviews, and expert support.</p>
    </section>
  `
}
};


const truncateHTML = (html, maxLength) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  let text = div.textContent || div.innerText || "";
  if (text.length <= maxLength) return html;

  text = text.slice(0, maxLength);
  return text + "...";
};


const LocalityDescription = () => {
  const location = useLocation();
  const [localityContent, setLocalityContent] = useState(null); 
  const [expanded, setExpanded] = useState(false);

  const localitySlug = location.pathname.split("/")[2];

useEffect(() => {
  if (!localitySlug) return;

  fetchLocalityDescription(localitySlug)
    .then(res => {
      setLocalityContent(res.data);
    })
    .catch(() => {
      // API failed → fallback based on slug
      if (FALLBACK_CONTENT[localitySlug]) {
        setLocalityContent(FALLBACK_CONTENT[localitySlug]);
      } else {
        setLocalityContent(null);
      }
    });
}, [localitySlug]);

if (!localityContent || !localityContent.description) {
  return null;
}



const fullHTML = localityContent.description;
const previewText = truncateHTML(fullHTML, 600);
const isLong = fullHTML.length > 600;


  return (
    <section className="mt-8 md:mt-16 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
        {localityContent.heading || `Wedding Venues in ${localityContent.name}`}
      </h2>

<div className="prose prose-sm md:prose-base max-w-full text-gray-700">
  {expanded ? (
    <div dangerouslySetInnerHTML={{ __html: fullHTML }} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: previewText }} />
  )}
</div>


      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 md:mt-4 text-red-600 font-semibold hover:underline cursor-pointer"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  );
};

export default LocalityDescription;
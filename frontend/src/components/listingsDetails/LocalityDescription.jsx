import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchLocalityDescription } from "../../api/listingsApi";
import { categoryMeta } from "../../utils/categoryMeta.js";
import "../../style/LocalityDescription.css"

const FALLBACK_CONTENT = {
delhi: {
  heading: "Discover Premium and Affordable Banquet Halls in Delhi through BookMyBanquets",
  description: `
The planner of an event to be remembered should start with the selection of the venue. The ideal banquet hall will put your celebration in focus, be it a wedding, reception, birthday party, anniversary, or corporate or social affair. Delhi has a large diversity in the variety of banquet halls available, including luxurious and modern halls as well as halls of a considerably lower price.<br><br>

<a href="https://www.bookmybanquets.in/" target="_blank" style="color: #1a73e8; text-decoration: underline;">BookMyBanquets</a> offers the opportunity to view a wide variety of banquet halls and wedding venues in Delhi from the same place. One does not need to travel to various places physically. Whether it is high-end luxury halls or affordable and simple halls, it is all planned to make your event carefree, happy, and memorable.

<h2>Why Banquet Hall In Delhi The Best Place To Have A Banquet Party</h2>

The city of Delhi is also the favorite city for hosting weddings and other big events due to its variety and connectivity. The city has modern banquet halls, which have beautiful interiors, lighting, DJ systems, and professional planners. West Delhi, South Delhi, and Central Delhi are some of the areas that are favored to hold a wedding because of the ease in transportation and the metro.<br><br>

The other huge benefit of hiring banquet halls in Delhi is price flexibility. Whatever be the scale of the event you are about to organize or whatever be the budget you are keeping to organize a banquet hall in Delhi, you will get the venues that suit your budget without interfering with your comfort. Most of the venues have packages that are customizable, including catering services, decor, and entertainment services which make it easier to plan the events.

<h2>Knowing Budget Banquet Halls in Delhi</h2>

Not all events need the five-star environment. A lot of families are willing to go to a <a href="https://www.bookmybanquets.in/blogs/best-budget-banquet-halls-in-delhi" target="_blank" style="color: #1a73e8; text-decoration: underline;"><strong>budget banquet hall in Delhi</strong></a> to host community events, engagement, birthday parties, and small wedding ceremonies. These facilities offer the much-needed amenities like seating, catering services, setting up stages, as well as basic decor at favorable per-plate costs.<br><br>

There is no need to lose the quality by opting for low-cost banquet halls. Most cheap places in fact, are clean, well-lit, and staffed by qualified personnel to make the experience simple. To the people looking on the internet to find a banquet hall near me, a search on budget arrangements may save them a lot of money on the overall cost of the event yet achieve a great party.

<h2>Banquet Hall Below 500 on a Per Plate Basis</h2>

The second question that many people consider when seeking banquet halls in Delhi is that of the availability of affordable alternatives that cost less than 500 per plate. The yes will be yes, particularly in the off-season months or weekday bookings. A lot of locations offer reduced rates on reservations or low-season weddings.<br><br>

One of the major issues to consider when settling on a budget banquet hall in Delhi is to ascertain what the package entails. There are also those that have simple decor, catering, and music systems included in the cost, and others might be individually charged. Comparison of various banquet halls and visiting the same would help to get an idea of the real value being represented.

<h2>Types of Banquet Halls</h2>

Depending on the needs of the events, <a href="https://www.bookmybanquets.in/banquet-hall" target="_blank" style="color: #1a73e8; text-decoration: underline;">Banquet Halls</a> &gt;&gt; can be generally divided into various types:<br><br>

<strong>1. Wedding Banquet Halls</strong><br>
These are spacious spaces that are specifically aimed at wedding rituals, wedding receptions, and other functions that accompany the main ritual, such as mehendi and sangeet. They also have large eating sections, bridal suites, ornamental stages and attached lawns in case of outdoor marriages.<br><br>

<strong>2. Corporate Banquet Halls</strong><br>
Banquet halls of companies are utilized in conferences, seminars, product launches, award ceremonies, and business meetings. These halls generally offer projector screens, sound, presentation setups, and formal seating.<br><br>

<strong>3. Budget Banquet Halls</strong><br>
Budget banquet halls are concerned with cost and are able to offer the necessary services. They are perfect for birthday events, anniversaries, engagement ceremonies and community events. Most of them have customizable food packages and simple decorations at affordable per-plate prices.<br><br>

<strong>4. Luxury Banquet Halls</strong><br>
Luxury banquet halls are meant to be used in grand parties. They have luxurious interiors, high-end lighting, professional event planning, designer decor themes, and high-end catering services. These locations are frequented by weddings of high-profile individuals and high society.<br><br>

<strong>5. Banquet and Outdoor Areas</strong><br>
Other banquet halls offer indoor facilities that have an air-conditioning effect so that they can hold an event during the summer or winter seasons. Others are the outdoor lawns or terrace area where the outdoor functions can be conducted, the evening receptions, or the traditional functions. Most of the contemporary facilities have the two-in-one property to provide additional flexibility.

<h2>Important Banquet Hall Characteristics</h2>

A complete banquet hall usually has:<br>
- Large seats depending on the number of guests.<br>
- Catering services that are customizable in terms of menus.<br>
- Themes, decoration and setting up.<br>
- DJ and sound systems<br>
- Parking facilities<br>
- Power backup<br>
- Bridal or VIP rooms<br>
- Event coordination support<br><br>

These are the features that make banquet halls a more convenient and time-saving choice than having an event on open ground or in a residential area.

<h2>The Reasons Why Banquet Halls are Significant in Events</h2>

Banquet halls make the process of organizing an event easy as they are a one-stop shop. As opposed to hiring catering and seating services, the decor and sound system, hosts could have a package that covers most of the services. This minimizes stress and it allows professional management of the function.<br><br>

They also offer a regulated space, and given the weather conditions in the urban areas, this is of great significance because weather can dictate outdoor events. It is achieved through air-conditioning, good ventilation, lighting systems, and seating arrangements that make the guests have a relaxing stay.<br><br>

Besides, banquet halls abide by safety standards, crowd regulation laws, and working standards, which are fundamental in large events.

<h2>When to Select the Right Banquet Hall</h2>

The choice of the banquet hall is based on a number of factors:<br>
- Number of guests: Make sure that the setting will be spacious enough to accommodate the number of guests you will expect.<br>
- Budget: Compare price per plate and package inclusions.<br>
- Location: Select a place that can be well-reached by the guests.<br>
- Services were checked: Is the package catering, decoration, and music?<br>
- Availability: The majority of halls are usually booked in advance, as it is the season of weddings.<br><br>

All these aspects will help hosts by allowing them to pick a banquet hall that fits their style of celebrating and their budget.

<h3>Best Banquet Halls in DelhI</h3>

Delhi has several famous places that serve various budgets and types of events. Indicatively, the Royal Castle in Tilak Nagar is praised due to its menu, exquisite decor, and convenient location. Orabella Banquets, located in Peeragarhi, is reputed to be the venue that hosts huge crowds and provides professional assistance in arrangements. Other popular invitations include the Invitee Banquet Kirti Nagar where there are also large indoor halls that are accessible using the metro.<br><br>

These examples denote the variety of the banquet halls in Delhi, which can range between middle-priced prices and luxurious packages. You can be planning a wedding party, or you can be planning a corporate event, multiple venues will guarantee you the best fit.

<h3>Banquet Outdoors And Indoor</h3>

The other asset of hosting events in Delhi is the presence of indoor and outdoor venues. Most banquet halls have beautifully furnished indoor settings that are air-conditioned and hence can be used during a summer wedding. Simultaneously, the outside lawns also offer outside locations where the traditional ceremonies and evening parties can be held.<br><br>

When individuals are seeking a banquet hall near me, they usually think of which one they would like to use and whether to have an open lawn or an enclosed banquet area. Both of them are highly distributed all over the city, and hosts have flexibility when planning their dream event.

<h3>Significant Things to Note Before Booking</h3>

Seating capacity, catering services, parking, and <a href="https://www.bookmybanquets.in/services" target="_blank" style="color: #1a73e8; text-decoration: underline;"><strong>decoration services</strong></a> are some of the aspects that should be considered before finalizing any of the banquet halls in Delhi. Availability should also be checked during the peak wedding seasons since popular venues would be booked long before. Last-minute problems can be avoided through reading reviews, paying a visit to the venue, and having knowledge of booking and cancellation policies.<br><br>

The selection of the appropriate budget banquet hall in Delhi or a luxury venue involves making comparisons and booking it early. Most event professionals suggest a booking period of at least two to three months in advance in order to have a better price and dates.

<h2>Frequently Asked Questions</h2>

<h4>Q1. What is to be checked before booking a banquet hall?</h4>
The things that you should look at include location, seating, catering, parking, facilities, and customer reviews.

<h4>Q2. Banquet halls of less than 500 per plate in Delhi?</h4>
Yes, some of the locations have low-price packages, particularly in the off-season or for weekday reservations.

<h4>Q3. Is it possible to reserve a banquet hall?</h4>
Yes, early booking is better in terms of better prices and availability, particularly in high seasons of weddings.

<h4>Q4. Can the low-rated banquet halls be appropriate to hold events?</h4>
Yes, they can be used in small, simple, and low-cost events.

<h4>Q5. Is online booking available?</h4>
Sure, BookMyBanquets offers convenient online reservations with powerful filters to assist you in the search of the optimal venue.

<h4>Q6. What is the average cost of a banquet hall in Delhi?</h4>
Average prices of banquet halls in Delhi range between ₹800 to ₹3000 per plate, depending on location, facilities, decoration, and services included in the package.

<h4>Q7. Which is the best area in Delhi for banquet halls?</h4>
Popular areas like Dwarka, Janakpuri, Karol Bagh, Tilak Nagar, Kirti Nagar, Mayapuri, Moti Nagar, and Chattarpur are preferred due to good connectivity, wide venue options, and affordable pricing.

<h4>Q8. How many guests can a banquet hall accommodate in Delhi?</h4>
Banquet halls in Delhi can accommodate around 50 to 1000 guests, depending on the size and type of venue, including small, mid-size, and luxury halls.

<h4>Q9. Are there budget banquet halls in Delhi under ₹1000 per plate?</h4>
Yes, many budget banquet halls in Delhi offer packages under ₹1000 per plate, especially in areas like Uttam Nagar, Nangloi, and Rohini, suitable for affordable events.

<h4>Q10. Do banquet halls in Delhi provide decoration and catering services?</h4>
Most banquet halls in Delhi provide in-house catering and decoration services, allowing customization of themes, menus, and setups according to budget and preferences.

<h4>Q11. Is outside catering allowed in banquet halls in Delhi?</h4>
Some banquet halls allow outside catering, but many prefer in-house services. It is important to confirm policies and additional charges with the venue beforehand.

<h4>Q12. How early should I book a banquet hall in Delhi for a wedding?</h4>
It is recommended to book a banquet hall at least 6 to 12 months in advance, especially during peak wedding seasons, to ensure availability and better pricing.

<h4>Q13. What facilities are included in banquet hall packages in Delhi?</h4>
Banquet hall packages usually include catering, decoration, seating arrangements, air conditioning, lighting, parking, and sometimes DJ or entertainment services.

<h4>Q14. Are banquet halls in Delhi suitable for small functions and birthdays?</h4>
Yes, many banquet halls offer small spaces ideal for birthdays, anniversaries, and small functions, with customized packages based on guest count and event requirements.

<h4>Q15. Can I get discounts or deals on banquet hall bookings in Delhi?</h4>
Many banquet halls offer seasonal discounts, weekday deals, and early booking offers. Comparing venues online helps in finding the best deals within budget.

<h4>Q16. Is parking available in banquet halls in Delhi?</h4>
Most banquet halls in Delhi provide parking facilities, including valet services in premium venues, but availability and capacity may vary depending on the venue.
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



const LocalityDescription = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("category");
  const [localityContent, setLocalityContent] = useState(null); 
  const [expanded, setExpanded] = useState(false);

const pathParts = location.pathname.split("/");

const citySlug = pathParts[1]?.replace("banquet-hall-in-", "");
const localitySlug = pathParts[2] || null;



useEffect(() => {

  // 🔵 LOCALITY PAGE (HIGHEST PRIORITY)
  if (localitySlug) {
    fetchLocalityDescription(localitySlug)
      .then(res => {
        setLocalityContent(res.data);
      })
      .catch(() => {
        setLocalityContent(null);
      });
    return;
  }

  //  CATEGORY PAGE
  if (categoryId && categoryMeta[categoryId]) {
    setLocalityContent({
      heading: categoryMeta[categoryId].heading,
      description: categoryMeta[categoryId].description
    });
    return;
  }
  
  // CITY PAGE
  if (FALLBACK_CONTENT[citySlug]) {
    setLocalityContent(FALLBACK_CONTENT[citySlug]);
  } else {
    setLocalityContent(null);
  }

}, [citySlug, localitySlug, categoryId]);

if (!localityContent || !localityContent.description) {
  return null;
}


const cleanHTML = (html) => {
  return html
    .replace(/data-start="[^"]*"/g, "")
    .replace(/data-end="[^"]*"/g, "")
    .replace(/font-family:[^;"]+;?/gi, "") // remove only font-family
    .replace(/<p>\s*<\/p>/g, ""); // remove empty paragraphs

};


const fullHTML = cleanHTML(localityContent.description);




  return (
    <section className="mt-8 md:mt-16 bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">
        {localityContent.heading || `Wedding Venues in ${localityContent.name}`}
      </h2>

<div
  className={`prose prose-lg max-w-none text-gray-700 ${
    !expanded ? "description-preview" : ""
  }`}
  dangerouslySetInnerHTML={{ __html: fullHTML }}
/>


      {fullHTML.length > 600 && (
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
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    question: "1. How can I book a banquet hall online in Delhi?",
    answer: "You can book a banquet hall online by visiting valid websites, comparing different venues, viewing photos, prices, and availability, and making an inquiry or booking them online through the same site with the details of your event.",
  },
  {
    question: "2. Can I book a banquet hall for same-day or last-minute events?",
    answer: "Yes, there are numerous banquet halls where it is possible to make last-minute reservations based on availability. One is advised to make a call or look online to ensure that rooms are available in real-time and get a fast booking.",
  },
  {
    question: "3. What is the average cost of a banquet hall in Delhi/NCR?",
    answer: "Its average price is 800-3500/plate, which varies according to geographical location, facilities and facilities. Expensive banquet venues can be placed at a higher cost, whereas low-cost banquet venues have lower packages.",
  },
  {
    question: "4. What is included in banquet hall packages?",
    answer: "The banquet packages are often based on the venue rental, basic decoration, layout of seating, lighting, air conditioning, and in some cases catering, DJ and staff services.",
  },
  {
    question: "5. Do banquet halls provide catering services?",
    answer: "Yes, the majority of banquet halls have their own catering services available with various types of customizable menus with vegetarian and non-vegetarian choices that guarantee the quality of food and organization of the event to the guests.",
  },
  {
    question: "6. Can I bring my own caterer to the venue?",
    answer: "Certain banquet halls do permit outside catering, though most of them will opt to use in-house services. It is based upon the policy of the venue and you can pay extra fees in case you have an external caterer.",
  },
  {
    question: "7. How do I choose the right banquet hall size?",
    answer: "Select a banquet hall depending on the number of guests, set up, and the nature of event. Make sure there is sufficient area to move around, eat and stage without wasting space.",
  },
  {
    question: "8. What is the maximum capacity of banquet halls?",
    answer: "The size of banquet hall differs in size and ranges between 50 and 100 people to 500 and 1000 people or more depending on the size of the property and the event type.",
  },
  {
    question: "9. What facilities are provided in banquet halls?",
    answer: "The amenities are usually air conditioning, power backup, seating layout, washrooms, valet parking, lighting, stage setup and occasionally bridal rooms, Wi-Fi and audiovisual equipment.",
  },
  {
    question: "10. Do banquet halls provide decoration and DJ services?",
    answer: "Yes, there are a lot of banquet halls that provide a package with decoration and DJ services. Themes and music arrangements can also be customized depending on your preferences of the event.",
  },
  {
    question: "11. Do banquet halls offer parking facilities for guests?",
    answer: "The majority of banquet halls offer their visitors special parking places or valet services. The parking spaces and their capacity, however, might depend on the venue.",
  },
  {
    question: "12. Is parking available at banquet halls?",
    answer: "Yes, banquet halls normally have parking. Others have free parking, and others might have to pay separately or have taxis carrying them as an added convenience.",
  },
  {
    question: "13. How can I find banquet halls near me?",
    answer: "Normally, you can use the keywords such as banquet halls near me or you can use booking platforms or you can use Google Maps to locate the venues near you with reviews and ratings and contact details.",
  },
  {
    question: "14. What is the cancellation policy for banquet halls?",
    answer: "The cancellation policy depends on the venue. Others provide partial refunds on cancelation in advance, and others might impose cancellation fees or forego booking fees on a time basis.",
  },
  {
    question: "15. Is outside decoration allowed in banquet halls?",
    answer: "Numerous banquet halls permit external decorators, whereas others prefer an in-house presentation of the decoration. Always make sure with the venue and make sure to ask about other fees or limitations.",
  },
  {
    question: "16. Which are the best budget banquet halls in Delhi?",
    answer: "There are also budget banquet halls in such regions as Uttam Nagar, Janakpuri, and Dwarka with cheap packages with basic facilities that can accommodate a small to medium-scale event.",
  },
  {
    question: "17. How to get discounts on banquet hall booking?",
    answer: "It is possible to receive a discount, book early, compare venues, select off-season dates, negotiate, or use the online platform which suggests deals and seasonal promotions.",
  },
  {
    question: "18. What are the best banquet halls for weddings in Delhi NCR?",
    answer: "The leading wedding banquet halls are in places such as Dwarka, West Delhi and Gurgaon areas, which have high quality services, huge spaces, exquisite decorations and full wedding packages.",
  },
  {
    question: "19. What does a wedding planner do?",
    answer: "A wedding planner will organized the process of the event, arrange the vendors, budget, decorations, and performance so that the wedding process is stress free and organize everything professionally.",
  },
  {
    question: "20. Do you really need a wedding planner?",
    answer: "Wedding planners are useful in big or complicated weddings. They are time-saving, less stressful, and provide a smooth flow of activities, but in small-scale events, you can organize on your own.",
  },
  {
    question: "21. What does a makeup artist do?",
    answer: "A makeup artist makes you look good in special events by applying professional products and methods to give you a perfect makeup that matches your attire, theme and the photography requirements.",
  },
  {
    question: "22. How do I choose the best makeup artist?",
    answer: "Check portfolio, review, experience and quality of products. Do a trial session with the artist so that he knows your taste and gives the required appearance.",
  },
  {
    question: "23. How do I book a mehendi artist online?",
    answer: "Using event platforms, social media, or websites, you can check designs, prices, reviews, and availability before confirming your reservation with an artist.",
  },
  {
    question: "24. How do I choose the best wedding photographer?",
    answer: "Examine portfolios, style, experience, and customer commentaries. Make sure that they know your vision, good packages and utilize high quality equipments to capture memorable moments in the wedding.",
  },
];


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a banquet hall online in Delhi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a banquet hall online by visiting valid websites, comparing different venues, viewing photos, prices, and availability, and making an inquiry or booking them online through the same site with the details of your event."
      }
    },
    {
      "@type": "Question",
      name: "Can I book a banquet hall for same-day or last-minute events?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, there are numerous banquet halls where it is possible to make last-minute reservations based on availability. One is advised to make a call or look online to ensure that rooms are available in real-time and get a fast booking."
      }
    },
    {
      "@type": "Question",
      name: "What is the average cost of a banquet hall in Delhi/NCR?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Its average price is 800-3500/plate, which varies according to geographical location, facilities and facilities. Expensive banquet venues can be placed at a higher cost, whereas low-cost banquet venues have lower packages."
      }
    },
    {
      "@type": "Question",
      name: "What is included in banquet hall packages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The banquet packages are often based on the venue rental, basic decoration, layout of seating, lighting, air conditioning, and in some cases catering, DJ, and staff services."
      }
    },
    {
      "@type": "Question",
      name: "Do banquet halls provide catering services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the majority of banquet halls have their own catering services available with various types of customizable menus with vegetarian and non-vegetarian choices that guarantee the quality of food and organization of the event to the guests."
      }
    },
    {
      "@type": "Question",
      name: "Can I bring my own caterer to the venue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Certain banquet halls do permit outside catering, though most of them will opt to use in-house services. It is based upon the policy of the venue and you can pay extra fees in case you have an external caterer."
      }
    },
    {
      "@type": "Question",
      name: "How do I choose the right banquet hall size?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Select a banquet hall depending on the number of guests, set up, and the nature of event. Make sure there is sufficient area to move around, eat and stage without wasting space."
      }
    },
    {
      "@type": "Question",
      name: "What is the maximum capacity of banquet halls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The size of banquet hall differs in size and ranges between 50 and 100 people to 500 and 1000 people or more depending on the size of the property and the event type."
      }
    },
    {
      "@type": "Question",
      name: "What facilities are provided in banquet halls?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The amenities are usually air conditioning, power backup, seating layout, washrooms, valet parking, lighting, stage setup, and occasionally bridal rooms, Wi-Fi, and audiovisual equipment."
      }
    },
    {
      "@type": "Question",
      name: "Do banquet halls provide decoration and DJ services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, there are a lot of banquet halls that provide a package with decoration and DJ services. Themes and music arrangements can also be customized depending on your preferences of the event."
      }
    },
    {
      "@type": "Question",
      name: "Do banquet halls offer parking facilities for guests?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The majority of banquet halls offer their visitors special parking places or valet services. The parking spaces and their capacity, however, might depend on the venue."
      }
    },
    {
      "@type": "Question",
      name: "",
      acceptedAnswer: {
        "@type": "Answer",
        text: ""
      }
    }
  ]
};




export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to from-gray-50 to-gray-100 py-12 px-6 sm:px-8 md:px-12 lg:px-24">

      <Helmet>
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://www.bookmybanquets.in/faq" />

  <title>
    Book Wedding Venues & Banquet Halls Online- BookMyBanquets
  </title>

  <meta
    name="description"
    content="BookMyBanquets helps you find and book wedding venues and banquet halls online. Compare prices and choose the perfect venue quickly."
  />
  
  <script type="application/ld+json">
    {JSON.stringify(faqSchema)}
  </script>
</Helmet>

      {/* Breadcrumb */}
      <div className="flex items-center gap-x-2 mb-8 text-base">
        <h3
          className="text-red-600 font-medium cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-600 font-normal">FAQ's</span>
      </div>

      {/* 🔥 Increased Width */}
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">FAQ's</h1>
          <p className="text-gray-500 mt-3 text-base">
            Everything you need to know before booking your perfect venue
          </p>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "shadow-lg border-gray-200" 
                    : "border-gray-100 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
                >
                  {/* 🔥 Bigger Question */}
                  <span className="font-semibold text-lg text-gray-800 select-text">
                    {faq.question}
                  </span>

                  <FiChevronDown
                    size={22}
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* 🔥 Bigger Answer */}
                    <p className="px-6 pb-6 text-gray-700 text-base leading-relaxed">
                      <span className="font-semibold text-black">Ans.</span> {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

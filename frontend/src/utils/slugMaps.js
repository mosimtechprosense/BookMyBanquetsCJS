// utils/slugMaps.js

export const categoryToSlug = {
  6: "banquet-hall",
  7: "party-hall",
  8: "marriage-hall",
  11: "5-star-wedding-hotel",
  12: "destination-wedding",
  13: "wedding-farmhouse",
  26: "bmb-assured",
  27: "bmb-verified"
};

export const slugToServiceName = {
  "banquet-hall": "Banquet Halls",
  "party-hall": "Party Halls",
  "marriage-hall": "Marriage Halls",
  "5-star-wedding-hotel": "5 Star Wedding Hotel",
  "destination-wedding": "Destination Wedding",
  "wedding-farmhouse": "Wedding Farmhouse",
  "bmb-assured": "BMB Assured",
  "bmb-verified": "BMB Verified"
}

export const categoryToVenuePath = {
  6: { path: "/banquet-hall", label: "Banquet Halls" },
  7: { path: "/party-hall", label: "Party Halls" },
  8: { path: "/marriage-hall", label: "Marriage Halls" },
  11: { path: "/5-star-wedding-hotel", label: "5 Star Wedding Hotels" },
  12: { path: "/destination-wedding", label: "Destination Weddings" },
  13: { path: "/wedding-farmhouse", label: "Wedding Farmhouse" },
  26: { path: "/bmb-assured", label: "BMB Assured" },
  21: { path: "/bmb-verified", label: "BMB Verified" }
}

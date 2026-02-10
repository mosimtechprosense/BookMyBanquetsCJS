import { categoryToSlug } from "./categoryMap"

export const categoryMeta = {
  6: { label: "Banquet Halls" },
  7: { label: "Party Halls" },
  8: { label: "Marriage Halls" },
  9: { label: "Banquet with Hotel Room" },
  10: { label: "Party Lawn" },
  11: { label: "5 Star Wedding Hotels" },
  12: { label: "Destination Weddings" },
  13: { label: "Wedding Farmhouse" },
  14: { label: "Small Function Halls" },
  15: { label: "Corporate Events" },
  16: { label: "Engagement Venue" },
  17: { label: "Ring Ceremony" },
  18: { label: "Baby Shower" },
  19: { label: "Retirement Party" },
  20: { label: "Sikh Wedding" },
  21: { label: "Mehendi Ceremony" }
}

export const slugToCategory = Object.fromEntries(
  Object.entries(categoryToSlug).map(([id, slug]) => [slug, Number(id)])
)

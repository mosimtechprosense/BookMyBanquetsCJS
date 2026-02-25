const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const locations = [
  { location: "Moti Nagar", city: "Delhi", lat: 28.6630, lng: 77.1420 },
  { location: "Kirti Nagar", city: "Delhi", lat: 28.6518, lng: 77.1419 },
  { location: "Uttam Nagar", city: "Delhi", lat: 28.6210, lng: 77.0644 },
  { location: "Punjabi Bagh", city: "Delhi", lat: 28.6683, lng: 77.1250 },
  { location: "Hari Nagar", city: "Delhi", lat: 28.6316, lng: 77.1095 },
  { location: "Ramesh Nagar", city: "Delhi", lat: 28.6534, lng: 77.1317 },
  { location: "Loha Mandi", city: "Delhi", lat: 28.6645, lng: 77.1560 },
  { location: "Malviya Nagar", city: "Delhi", lat: 28.5355, lng: 77.2100 },
  { location: "Mahipalpur", city: "Delhi", lat: 28.5445, lng: 77.1220 },
  { location: "Mayapuri", city: "Delhi", lat: 28.6373, lng: 77.1306 },
  { location: "Janakpuri", city: "Delhi", lat: 28.6219, lng: 77.0878 },
  { location: "Dabri", city: "Delhi", lat: 28.6100, lng: 77.0847 },
  { location: "Udyog Nagar", city: "Delhi", lat: 28.6803, lng: 77.0734 },
  { location: "Paschim Vihar", city: "Delhi", lat: 28.6692, lng: 77.1003 },
  { location: "Pitampura", city: "Delhi", lat: 28.6990, lng: 77.1310 },
  { location: "Britannia Chowk", city: "Delhi", lat: 28.6917, lng: 77.1500 },
  { location: "Karol Bagh", city: "Delhi", lat: 28.6519, lng: 77.1909 },
  { location: "East Of Kailash", city: "Delhi", lat: 28.5606, lng: 77.2456 },
  { location: "Peeragarhi", city: "Delhi", lat: 28.6780, lng: 77.0924 },
  { location: "Subhash Nagar", city: "Delhi", lat: 28.6404, lng: 77.1148 },
  { location: "Tilak Nagar", city: "Delhi", lat: 28.6395, lng: 77.0944 },
  { location: "Najafgarh", city: "Delhi", lat: 28.6135, lng: 76.9820 },
  { location: "Bijwasan", city: "Delhi", lat: 28.5408, lng: 77.0400 },
  { location: "Lawrence Road", city: "Delhi", lat: 28.6905, lng: 77.1673 },
  { location: "Mehrauli", city: "Delhi", lat: 28.5211, lng: 77.1820 },
  { location: "Gk 1", city: "Delhi", lat: 28.5494, lng: 77.2350 },
  { location: "Saket", city: "Delhi", lat: 28.5244, lng: 77.2066 },
  { location: "Wazirpur", city: "Delhi", lat: 28.6959, lng: 77.1603 },
  { location: "Dwarka", city: "Delhi", lat: 28.5921, lng: 77.0460 },
  { location: "Rajouri Garden", city: "Delhi", lat: 28.6415, lng: 77.1214 },
  { location: "Vikaspuri", city: "Delhi", lat: 28.6377, lng: 77.0743 },
  { location: "Naraina", city: "Delhi", lat: 28.6292, lng: 77.1366 },
  { location: "Patel Nagar", city: "Delhi", lat: 28.6512, lng: 77.1583 },
  { location: "Rajendra Nagar", city: "Delhi", lat: 28.6380, lng: 77.1790 },
  { location: "Chhatarpur", city: "Delhi", lat: 28.5086, lng: 77.1750 },
  { location: "Gt Karnal Road", city: "Delhi", lat: 28.7366, lng: 77.1540 },
  { location: "Sector 14", city: "Gurgaon", lat: 28.4729, lng: 77.0460 },
  { location: "Sohna Road", city: "Gurgaon", lat: 28.3974, lng: 77.0400 },
  { location: "Sector 24", city: "Gurgaon", lat: 28.5037, lng: 77.0960 },
  { location: "Manesar", city: "Gurgaon", lat: 28.3500, lng: 76.9420 },
  { location: "Najafgarh Road Industrial Area", city: "Delhi", lat: 28.6510, lng: 77.1150 },
  { location: "West Delhi", city: "Delhi", lat: 28.6667, lng: 77.1000 },
];


async function main() {
  for (const loc of locations) {
    const city = await prisma.city.upsert({
      where: { name: loc.city },
      update: {},
      create: { name: loc.city },
    })

await prisma.location.upsert({
  where: {
    name_cityId: {
      name: loc.location,
      cityId: city.id,
    },
  },
  update: {
    lat: loc.lat,
    lng: loc.lng,
  },
  create: {
    name: loc.location,
    cityId: city.id,
    lat: loc.lat,
    lng: loc.lng,
  },
})
  }

  console.log("Locations seeded successfully!")
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

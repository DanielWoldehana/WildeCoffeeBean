import mongoose from "mongoose";
import dotenv from "dotenv";
import { Product, MenuItem, Location } from "./models/index.js";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

const products = [
  {
    name: "Ethiopia Yirgacheffe",
    description:
      "Floral, citrus, and tea-like with bright acidity. A classic Ethiopian coffee with delicate notes.",
    price: 16.5,
    currency: "USD",
    roastLevel: "Light",
    origin: "Ethiopia",
    flavorNotes: ["Bergamot", "Jasmine", "Lemon", "Tea-like"],
    inStock: true,
    inventory: 40,
    images: ["/images/products/single-origin/ethiopia-yirgacheffe.jpeg"],
    categories: ["single-origin", "light-roast"],
    active: true,
  },
  {
    name: "Ethiopia Sedamo",
    description:
      "Rich and full-bodied with wine-like acidity and fruity notes. A distinctive Ethiopian coffee.",
    price: 17.0,
    currency: "USD",
    roastLevel: "Medium",
    origin: "Ethiopia",
    flavorNotes: ["Wine", "Berry", "Citrus", "Floral"],
    inStock: true,
    inventory: 35,
    images: ["/images/products/single-origin/ethiopia-sedamo.jpeg"],
    categories: ["single-origin", "medium-roast"],
    active: true,
  },
];

const menuItems = [
  {
    name: "Iced Latte",
    description: "Double shot espresso over ice with milk.",
    price: 5.25,
    currency: "USD",
    section: "Espresso",
    tags: ["iced", "espresso"],
    available: true,
    active: true,
  },
  {
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam.",
    price: 4.75,
    currency: "USD",
    section: "Espresso",
    tags: ["hot", "espresso"],
    available: true,
    active: true,
  },
  {
    name: "Avocado Toast",
    description: "Sourdough, smashed avocado, chili flakes, olive oil.",
    price: 8.5,
    currency: "USD",
    section: "Food",
    tags: ["vegetarian"],
    available: true,
    active: true,
  },
  {
    name: "Vanilla Ice Cream Cone",
    description: "Classic vanilla scoop in a waffle cone.",
    price: 4.0,
    currency: "USD",
    section: "Desserts",
    tags: ["ice-cream", "cone", "cold"],
    available: true,
    active: true,
  },
  {
    name: "Chocolate Ice Cream Cone",
    description: "Rich chocolate scoop in a waffle cone.",
    price: 4.25,
    currency: "USD",
    section: "Desserts",
    tags: ["ice-cream", "cone", "cold"],
    available: true,
    active: true,
  },
  {
    name: "Strawberry Parfait Cup",
    description: "Strawberry ice cream with fruit compote in a cup.",
    price: 4.75,
    currency: "USD",
    section: "Desserts",
    tags: ["ice-cream", "cup", "cold"],
    available: true,
    active: true,
  },
  {
    name: "Overnight Oats (Chilled)",
    description:
      "Pre-packaged oats with berries and almond milk, refrigerated.",
    price: 6.0,
    currency: "USD",
    section: "Breakfast (Grab & Go)",
    tags: ["cold", "packaged", "vegetarian"],
    available: true,
    active: true,
  },
  {
    name: "Turkey & Egg White Sandwich (Chilled)",
    description: "Pre-packaged sandwich, keep refrigerated; heat if desired.",
    price: 7.5,
    currency: "USD",
    section: "Breakfast (Grab & Go)",
    tags: ["cold", "packaged", "protein"],
    available: true,
    active: true,
  },
];

const locations = [
  {
    name: "Wild Bean Coffee",
    address1: "123 Bean St",
    city: "Seattle",
    state: "WA",
    postalCode: "98101",
    country: "US",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    phone: "555-555-1234",
    email: "hello@wildbeancoffee.com",
    mapsUrl: "",
    hours: [
      { day: "Monday", opens: "07:00", closes: "18:00" },
      { day: "Tuesday", opens: "07:00", closes: "18:00" },
      { day: "Wednesday", opens: "07:00", closes: "18:00" },
      { day: "Thursday", opens: "07:00", closes: "18:00" },
      { day: "Friday", opens: "07:00", closes: "20:00" },
      { day: "Saturday", opens: "08:00", closes: "20:00" },
      { day: "Sunday", opens: "08:00", closes: "16:00" },
    ],
    active: true,
  },
];

async function seed() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI not set");
  }

  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB for seeding");

  await Product.deleteMany({});
  await MenuItem.deleteMany({});
  await Location.deleteMany({});

  const createdProducts = await Product.insertMany(products);
  const createdMenuItems = await MenuItem.insertMany(menuItems);
  const createdLocations = await Location.insertMany(locations);

  console.log(`Seeded ${createdProducts.length} products`);
  console.log(`Seeded ${createdMenuItems.length} menu items`);
  console.log(`Seeded ${createdLocations.length} locations`);

  await mongoose.connection.close();
  console.log("Seeding complete. Connection closed.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

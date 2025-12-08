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
  // Coffee & Espresso
  {
    name: "Regular Coffee",
    description: "Freshly Brewed Arabica Blend",
    price: 3.89,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["hot", "coffee"],
    allergens: [],
    image: "/images/menu/Coffee/RegularCoffee.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Latte",
    description: "Espresso With Steamed Milk and Foam",
    price: 4.89,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["hot", "espresso", "milk"],
    allergens: ["Lactose"],
    image: "/images/menu/Coffee/Latte.jpg",
    available: true,
    active: true,
  },
  {
    name: "Cappuccino",
    description: "Espresso, Foamed Milk, Light and Airy",
    price: 4.99,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["hot", "espresso", "foam"],
    allergens: ["Lactose"],
    image: "/images/menu/Coffee/Cappuccino.jpg",
    available: true,
    active: true,
  },
  {
    name: "Mocha",
    description: "Espresso, Chocolate and Steamed Milk",
    price: 5.25,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["hot", "espresso", "chocolate"],
    allergens: ["Lactose"],
    image: "/images/menu/Coffee/Mocha.png",
    available: true,
    active: true,
  },
  {
    name: "Iced Coffee",
    description: "Chilled Coffee Served Over Ice",
    price: 4.25,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["iced", "coffee", "cold"],
    allergens: [],
    image: "/images/menu/Coffee/IcedCoffee.jpg",
    available: true,
    active: true,
  },
  {
    name: "Frappuccino",
    description: "Blended Espresso, Milk, And Ice",
    price: 5.75,
    currency: "USD",
    section: "Coffee & Espresso",
    tags: ["blended", "espresso", "cold"],
    allergens: ["Lactose"],
    image: "/images/menu/Coffee/Frappuccino.jpg",
    available: true,
    active: true,
  },
  // Other Favorites
  {
    name: "Hot Chocolate",
    description: "Creamy Cocoa topped with whipped cream",
    price: 5.99,
    currency: "USD",
    section: "Other Favorites",
    tags: ["hot", "chocolate"],
    allergens: ["Lactose"],
    image: "/images/menu/Favorites/HotChocolate.jpg",
    available: true,
    active: true,
  },
  {
    name: "Chai Latte",
    description: "Spiced Black tea with steamed milk",
    price: 5.99,
    currency: "USD",
    section: "Other Favorites",
    tags: ["hot", "tea", "spiced"],
    allergens: ["Lactose"],
    image: "/images/menu/Favorites/ChaiLatte.jpg",
    available: true,
    active: true,
  },
  {
    name: "Iced Tea",
    description: "Freshly Brewed and chilled",
    price: 5.99,
    currency: "USD",
    section: "Other Favorites",
    tags: ["iced", "tea", "cold"],
    allergens: [],
    image: "/images/menu/Favorites/IcedTea.jpg",
    available: true,
    active: true,
  },
  {
    name: "Fresh Juice",
    description: "Orange. Apple, or Mixed Fruit",
    price: 5.99,
    currency: "USD",
    section: "Other Favorites",
    tags: ["juice", "fresh", "cold"],
    allergens: [],
    image: "/images/menu/Favorites/FreshJuice.jpg",
    available: true,
    active: true,
  },
  // Bakery & Pastries
  {
    name: "Croissant",
    description: "Flaky, Buttery, and Banked Fresh Daily",
    price: 5.5,
    currency: "USD",
    section: "Bakery & Pastries",
    tags: ["bakery", "pastry", "fresh"],
    allergens: ["Gluten", "Eggs", "Lactose"],
    image: "/images/menu/Bakery/Croissant.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Muffin",
    description: "Choice of blueberry, Banana nut, or Chocolate chip",
    price: 5.5,
    currency: "USD",
    section: "Bakery & Pastries",
    tags: ["bakery", "muffin"],
    allergens: ["Gluten", "Eggs", "Lactose", "Nuts"],
    image: "/images/menu/Bakery/Muffin.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Danish",
    description: "Assorted fruit or cream cheese filling",
    price: 5.5,
    currency: "USD",
    section: "Bakery & Pastries",
    tags: ["bakery", "pastry", "danish"],
    allergens: ["Gluten", "Eggs", "Lactose"],
    image: "/images/menu/Bakery/Danish.jpg",
    available: true,
    active: true,
  },
  {
    name: "Bagel with Cream Cheese",
    description: "Plain, everything, or Cinnamon raisin",
    price: 4.5,
    currency: "USD",
    section: "Bakery & Pastries",
    tags: ["bakery", "bagel", "cream-cheese"],
    allergens: ["Gluten", "Lactose"],
    image: "/images/menu/Bakery/BagelWCreamCheese.jpeg",
    available: true,
    active: true,
  },
  // Smoothies (Organic & Fresh)
  {
    name: "Tropical Bliss",
    description: "Mango, Pineapple, Banana, Orange Juice",
    price: 9.89,
    currency: "USD",
    section: "Smoothies (Organic & Fresh)",
    tags: ["smoothie", "organic", "fresh", "tropical"],
    allergens: [],
    image: "/images/menu/Smoothies/TropicalBliss.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Berry Boost",
    description: "Strawberry, Blueberry, Raspberry, Yogurt",
    price: 9.89,
    currency: "USD",
    section: "Smoothies (Organic & Fresh)",
    tags: ["smoothie", "organic", "fresh", "berry"],
    allergens: ["Lactose"],
    image: "/images/menu/Smoothies/BerryBoost.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Green Glow",
    description: "Spinach, Kale, Apple, Banana, Coconut Water",
    price: 9.89,
    currency: "USD",
    section: "Smoothies (Organic & Fresh)",
    tags: ["smoothie", "organic", "fresh", "green"],
    allergens: [],
    image: "/images/menu/Smoothies/GreenGlow.jpeg",
    available: true,
    active: true,
  },
  {
    name: "Signature",
    description: "Avocado, Spinach & Banana",
    price: 9.89,
    currency: "USD",
    section: "Smoothies (Organic & Fresh)",
    tags: ["smoothie", "organic", "fresh", "signature"],
    allergens: [],
    image: "/images/menu/Smoothies/Signature.jpeg",
    available: true,
    active: true,
  },
];

const locations = [
  {
    name: "Wild Bean Coffee",
    address1: "1532 Rockville Pike",
    city: "Rockville",
    state: "MD",
    postalCode: "20852",
    country: "US",
    coordinates: { lat: 39.0834, lng: -77.1533 },
    phone: "555-555-1234",
    email: "hello@wildbeancoffee.com",
    mapsUrl: "",
    hours: [
      { day: "Monday", opens: "07:00", closes: "20:00" },
      { day: "Tuesday", opens: "07:00", closes: "20:00" },
      { day: "Wednesday", opens: "07:00", closes: "20:00" },
      { day: "Thursday", opens: "07:00", closes: "20:00" },
      { day: "Friday", opens: "07:00", closes: "20:00" },
      { day: "Saturday", opens: "07:00", closes: "20:00" },
      { day: "Sunday", opens: "07:00", closes: "20:00" },
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

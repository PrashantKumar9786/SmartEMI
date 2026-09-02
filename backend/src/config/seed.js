/**
 * Seed script — wipes the products collection and inserts sample data.
 * Run with: npm run seed
 *
 * EMI generation logic (mirrors the reference Snapmint page):
 *  - Short tenures (3/6/12/24 months): 0% interest, plan amount = price / tenure
 *  - Long tenures (36/48/60 months): flat interest rate applied, since real EMI
 *    lenders usually charge interest beyond a "0% window" period.
 *  - Cashback: a flat incentive amount, same across all tenures for a given variant.
 */
require("dotenv").config();
const connectDB = require("./db");
const Product = require("../models/Product");

function generateEmiPlans(price) {
  const zeroInterestTenures = [3, 6, 12, 24];
  const interestTenures = [36, 48, 60];
  const interestRate = 10.5; // percent, flat rate applied on principal for the tenure
  const cashback = Math.round((price * 0.03) / 100) * 100; // ~3% of price, rounded to nearest 100

  const plans = [];

  zeroInterestTenures.forEach((tenureMonths) => {
    plans.push({
      tenureMonths,
      monthlyAmount: Math.round(price / tenureMonths),
      interestRate: 0,
      cashback,
    });
  });

  interestTenures.forEach((tenureMonths) => {
    const totalPayable =
      price * (1 + (interestRate / 100) * (tenureMonths / 12));
    plans.push({
      tenureMonths,
      monthlyAmount: Math.round(totalPayable / tenureMonths),
      interestRate,
      cashback,
    });
  });

  return plans;
}

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    brand: "Apple",
    category: "smartphone",
    description:
      "Apple's flagship Pro phone with a titanium frame, A19 Pro chip, and a pro-grade camera system.",
    variants: [
      {
        variantId: "256gb-silver",
        storage: "256GB",
        color: "Silver",
        image:
          "https://placehold.co/600x600/e8e8e8/1a1a1a?text=iPhone+17+Pro+Silver",
        mrp: 134900,
        price: 127400,
      },
      {
        variantId: "256gb-orange",
        storage: "256GB",
        color: "Orange",
        image:
          "https://placehold.co/600x600/d9622b/1a1a1a?text=iPhone+17+Pro+Orange",
        mrp: 134900,
        price: 127400,
      },
      {
        variantId: "512gb-blue",
        storage: "512GB",
        color: "Deep Blue",
        image:
          "https://placehold.co/600x600/1f3a5f/ffffff?text=iPhone+17+Pro+Blue",
        mrp: 154900,
        price: 146900,
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    brand: "Samsung",
    category: "smartphone",
    description:
      "Samsung's top-tier Ultra model with S Pen support, a 200MP camera, and a titanium build.",
    variants: [
      {
        variantId: "256gb-titanium-black",
        storage: "256GB",
        color: "Titanium Black",
        image:
          "https://placehold.co/600x600/1a1a1a/ffffff?text=Galaxy+S24+Ultra+Black",
        mrp: 129999,
        price: 119999,
      },
      {
        variantId: "512gb-titanium-gray",
        storage: "512GB",
        color: "Titanium Gray",
        image:
          "https://placehold.co/600x600/6b6b6b/ffffff?text=Galaxy+S24+Ultra+Gray",
        mrp: 144999,
        price: 134999,
      },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "pixel-9-pro",
    brand: "Google",
    category: "smartphone",
    description:
      "Google's AI-first flagship with the Tensor G4 chip and a pro camera system tuned by Google's imaging team.",
    variants: [
      {
        variantId: "128gb-obsidian",
        storage: "128GB",
        color: "Obsidian",
        image:
          "https://placehold.co/600x600/2b2b2b/ffffff?text=Pixel+9+Pro+Obsidian",
        mrp: 109999,
        price: 99999,
      },
      {
        variantId: "256gb-porcelain",
        storage: "256GB",
        color: "Porcelain",
        image:
          "https://placehold.co/600x600/f0e9e0/1a1a1a?text=Pixel+9+Pro+Porcelain",
        mrp: 119999,
        price: 108999,
      },
    ],
  },
];

async function seed() {
  await connectDB();

  await Product.deleteMany({});
  console.log("Cleared existing products.");

  const withPlans = products.map((p) => ({
    ...p,
    variants: p.variants.map((v) => ({
      ...v,
      emiPlans: generateEmiPlans(v.price),
    })),
  }));

  await Product.insertMany(withPlans);
  console.log(`Seeded ${withPlans.length} products successfully.`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

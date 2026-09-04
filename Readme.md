# 1Fi SDE1 Assignment — Product & EMI Plans App

A full-stack web app that displays smartphones with multiple EMI plans backed by mutual funds.
Product data (details, pricing, images, EMI plans) is stored in MongoDB and served through a
REST API. There is no hardcoded data in the frontend.

## Tech Stack

| Layer      | Technology                                                 |
| ---------- | ---------------------------------------------------------- |
| Frontend   | React (Vite), React Router, Tailwind CSS, Axios            |
| Backend    | Node.js, Express                                           |
| Database   | MongoDB (Mongoose ODM)                                     |
| Deployment | Frontend on Vercel, Backend on Render, DB on MongoDB Atlas |

## Project Structure

```
1fi-assignment/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js        # MongoDB connection
│   │   │   └── seed.js      # Seed script (3 products, 2-3 variants each)
│   │   ├── models/
│   │   │   └── Product.js   # Mongoose schema
│   │   ├── routes/
│   │   │   └── products.js  # /api/products routes
│   │   └── server.js        # Express app entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/client.js       # Axios wrapper for backend calls
    │   ├── components/         # ProductCard, VariantSelector, EmiPlanList, etc.
    │   ├── pages/               # ProductList, ProductDetail
    │   ├── App.jsx               # Routes: "/" and "/products/:slug"
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

## Database Schema

**Product** (one document per product, variants embedded — chosen because a variant and its
EMI plans have no meaning outside their parent product, so embedding avoids unnecessary joins):

```js
Product {
  name: String,          // "iPhone 17 Pro"
  slug: String,          // "iphone-17-pro" — used in the URL, unique
  brand: String,          // "Apple"
  category: String,
  description: String,
  variants: [
    {
      variantId: String,  // "256gb-silver"
      storage: String,    // "256GB"
      color: String,      // "Silver"
      image: String,      // image URL
      mrp: Number,
      price: Number,
      emiPlans: [
        {
          tenureMonths: Number,   // 3, 6, 12, 24, 36, 48, 60
          monthlyAmount: Number,
          interestRate: Number,   // 0 or 10.5
          cashback: Number        // 0 if none
        }
      ]
    }
  ],
  createdAt, updatedAt
}
```

## API Endpoints

### `GET /api/products`

Returns a lightweight list of all products (for the catalog page).

**Example response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "6683f1...",
      "name": "iPhone 17 Pro",
      "slug": "iphone-17-pro",
      "brand": "Apple",
      "category": "smartphone",
      "image": "https://.../iphone-17-pro.png",
      "price": 127400,
      "mrp": 134900,
      "variantCount": 3
    }
  ]
}
```

### `GET /api/products/:slug`

Returns full product detail, including all variants and their EMI plans.

**Example:** `GET /api/products/iphone-17-pro`

```json
{
  "success": true,
  "data": {
    "_id": "6683f1...",
    "name": "iPhone 17 Pro",
    "slug": "iphone-17-pro",
    "brand": "Apple",
    "variants": [
      {
        "variantId": "256gb-silver",
        "storage": "256GB",
        "color": "Silver",
        "image": "https://.../silver.png",
        "mrp": 134900,
        "price": 127400,
        "emiPlans": [
          {
            "tenureMonths": 3,
            "monthlyAmount": 42467,
            "interestRate": 0,
            "cashback": 3800
          },
          {
            "tenureMonths": 12,
            "monthlyAmount": 10617,
            "interestRate": 0,
            "cashback": 3800
          },
          {
            "tenureMonths": 36,
            "monthlyAmount": 3979,
            "interestRate": 10.5,
            "cashback": 3800
          }
        ]
      }
    ]
  }
}
```

### `GET /api/health`

Simple health check — returns `{ "success": true, "message": "API is running" }`.

## Setup & Run Instructions (Local)

### Prerequisites

- Node.js 18+
- A MongoDB connection string (free tier from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), or a local `mongod`)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env and paste your MongoDB connection string into MONGODB_URI
npm run seed     # populates the database with 3 products
npm run dev       # starts the API on http://localhost:5000
```

Verify it's working: open `http://localhost:5000/api/health` — you should see `{"success":true,...}`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_BASE_URL should point at your backend, e.g. http://localhost:5000/api
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Notes on Design Decisions

- **MongoDB over PostgreSQL**: product → variant → EMI plan is a strict containment
  hierarchy with no cross-product relationships, so embedding in one collection avoids
  three-table joins for zero real benefit at this scale.
- **EMI plan generation**: seed data uses 0% interest for short tenures (3/6/12/24 months)
  and a flat 10.5% rate for longer tenures (36/48/60 months), matching the pattern in the
  reference design. Cashback is a flat percentage of price.
- **Unique product URLs**: implemented via React Router (`/products/:slug`), with `slug`
  as a unique indexed field in MongoDB — not the Mongo `_id`, so URLs stay readable.

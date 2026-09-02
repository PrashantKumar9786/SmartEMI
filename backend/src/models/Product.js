const mongoose = require("mongoose");

/**
 * EMI Plan sub-schema.
 * Embedded inside each Variant because a plan has no meaning outside
 * the context of the variant's price. No separate collection needed.
 */
const emiPlanSchema = new mongoose.Schema(
  {
    tenureMonths: { type: Number, required: true }, // e.g. 3, 6, 12, 24, 36, 48, 60
    monthlyAmount: { type: Number, required: true }, // e.g. 44967
    interestRate: { type: Number, required: true }, // e.g. 0 or 10.5 (percent)
    cashback: { type: Number, default: 0 }, // e.g. 7500 (0 = none)
  },
  { _id: false },
);

/**
 * Variant sub-schema.
 * A variant is a specific sellable configuration of a product
 * (e.g. "256GB / Silver"). Each variant has its own price and
 * its own EMI plans, because price drives the EMI math.
 */
const variantSchema = new mongoose.Schema({
  variantId: { type: String, required: true }, // e.g. "256gb-silver" - unique within product
  storage: { type: String }, // e.g. "256GB"
  color: { type: String }, // e.g. "Silver"
  image: { type: String, required: true },
  mrp: { type: Number, required: true },
  price: { type: Number, required: true },
  emiPlans: { type: [emiPlanSchema], default: [] },
});

/**
 * Product schema (top-level document).
 */
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g. "iPhone 17 Pro"
    slug: { type: String, required: true, unique: true, index: true }, // e.g. "iphone-17-pro"
    brand: { type: String, required: true },
    category: { type: String, default: "smartphone" },
    description: { type: String, default: "" },
    variants: { type: [variantSchema], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);

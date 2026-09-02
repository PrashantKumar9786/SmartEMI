const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/**
 * GET /api/products
 * Returns a lightweight list of all products for the catalog/listing page.
 * Only the first variant's price/image is included, to keep the payload small.
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).lean();

    const summary = products.map((p) => {
      const firstVariant = p.variants[0] || {};
      return {
        id: p._id,
        name: p.name,
        slug: p.slug,
        brand: p.brand,
        category: p.category,
        image: firstVariant.image,
        price: firstVariant.price,
        mrp: firstVariant.mrp,
        variantCount: p.variants.length,
      };
    });

    res.json({ success: true, count: summary.length, data: summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/products/:slug
 * Returns full product detail: all variants, each with full EMI plan list.
 */
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).lean();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

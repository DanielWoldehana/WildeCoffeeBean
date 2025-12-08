import express from "express";
import mongoose from "mongoose";
import { Product } from "../models/index.js";
import { errorResponse, validateQueryBoolean } from "../utils/validation.js";

const router = express.Router();

// GET /api/products
// Supports filters: search (name/description), category, inStock, active
router.get("/", async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const inStock = validateQueryBoolean(req.query.inStock);
    const active = validateQueryBoolean(req.query.active);
    const query = {};

    query.active = active === undefined ? true : active;
    if (inStock !== undefined) {
      query.inStock = inStock;
    }

    if (category) {
      query.categories = { $in: category.split(",").map((c) => c.trim()) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    res.json({ data: products });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, "Invalid product id");
    }
    const product = await Product.findById(id).lean();
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    res.json({ data: product });
  } catch (err) {
    next(err);
  }
});

export default router;


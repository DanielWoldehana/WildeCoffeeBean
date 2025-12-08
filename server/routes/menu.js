import express from "express";
import mongoose from "mongoose";
import { MenuItem } from "../models/index.js";

const router = express.Router();

// GET /api/menu
// Filters: section, tags (comma-separated), available, active, search
router.get("/", async (req, res, next) => {
  try {
    const { section, tags, available, active, search } = req.query;
    const query = {};

    if (active !== undefined) {
      query.active = active === "true";
    } else {
      query.active = true;
    }

    if (available !== undefined) {
      query.available = available === "true";
    }

    if (section) {
      query.section = section;
    }

    if (tags) {
      query.tags = { $in: tags.split(",").map((t) => t.trim()) };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const items = await MenuItem.find(query).sort({ section: 1, name: 1 }).lean();
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

// GET /api/menu/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid menu item id" });
    }
    const item = await MenuItem.findById(id).lean();
    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

export default router;


import express from "express";
import { Location } from "../models/index.js";
import { errorResponse } from "../utils/validation.js";

const router = express.Router();

// GET /api/location
// Returns the first active location (or all active if you later extend)
router.get("/", async (_req, res, next) => {
  try {
    const location = await Location.findOne({ active: true }).lean();
    if (!location) {
      return errorResponse(res, 404, "No active location found");
    }
    res.json({ data: location });
  } catch (err) {
    next(err);
  }
});

export default router;


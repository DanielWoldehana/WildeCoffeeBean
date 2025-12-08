import mongoose from "mongoose";

export const isObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export function validateQueryBoolean(value) {
  if (value === undefined) return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function errorResponse(res, status, message, details) {
  return res.status(status).json({ error: message, details });
}

export function safeParseNumber(value) {
  if (value === undefined) return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}


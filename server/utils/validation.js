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

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validate password strength
 * Simple validation: min 8 characters, at least one letter and one number
 * @param {string} password - Password to validate
 * @returns {{ valid: boolean, message?: string }} Validation result
 */
export function validatePassword(password) {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required" };
  }
  
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  
  // At least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one letter" };
  }
  
  // At least one number
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  
  return { valid: true };
}


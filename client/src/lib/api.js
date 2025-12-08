/**
 * Centralized API client for Wild Bean Coffee
 * Handles all API communication with consistent error handling
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Base fetch function with error handling
 */
async function fetchJson(url, options = {}) {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
  
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Products API
 */
export const productsApi = {
  /**
   * Get all products with optional filters
   * @param {Object} filters - Optional filters (category, inStock, search, sortBy)
   * @returns {Promise<Array>} Array of products
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.inStock !== undefined) params.append("inStock", filters.inStock);
    if (filters.search) params.append("search", filters.search);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);

    const queryString = params.toString();
    const url = `/api/products${queryString ? `?${queryString}` : ""}`;
    const result = await fetchJson(url);
    return result.data || [];
  },

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise<Object>} Product object
   */
  getById: async (id) => {
    const result = await fetchJson(`/api/products/${id}`);
    return result.data;
  },
};

/**
 * Menu API
 */
export const menuApi = {
  /**
   * Get all menu items with optional filters
   * @param {Object} filters - Optional filters (section, available, search)
   * @returns {Promise<Array>} Array of menu items
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.section) params.append("section", filters.section);
    if (filters.available !== undefined) params.append("available", filters.available);
    if (filters.search) params.append("search", filters.search);

    const queryString = params.toString();
    const url = `/api/menu${queryString ? `?${queryString}` : ""}`;
    const result = await fetchJson(url);
    return result.data || [];
  },

  /**
   * Get a single menu item by ID
   * @param {string} id - Menu item ID
   * @returns {Promise<Object>} Menu item object
   */
  getById: async (id) => {
    const result = await fetchJson(`/api/menu/${id}`);
    return result.data;
  },
};

/**
 * Location API
 */
export const locationApi = {
  /**
   * Get store location information
   * @returns {Promise<Object>} Location object with address, hours, coordinates
   */
  getLocation: async () => {
    const result = await fetchJson("/api/location");
    return result.data;
  },

  /**
   * Calculate distance from user coordinates to store
   * @param {Object} coords - User coordinates { lat, lng }
   * @returns {Promise<Object>} Distance object with miles and km
   */
  calculateDistance: async (coords) => {
    const result = await fetchJson("/api/location/distance", {
      method: "POST",
      body: JSON.stringify(coords),
    });
    return result.data.distance;
  },
};

/**
 * Orders API
 */
export const ordersApi = {
  /**
   * Create a new order
   * @param {Object} orderData - Order data (customer, items, pickupTime, etc.)
   * @returns {Promise<Object>} Created order object
   */
  create: async (orderData) => {
    const result = await fetchJson("/api/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    return result.data;
  },

  /**
   * Get an order by ID
   * @param {string} id - Order ID
   * @returns {Promise<Object>} Order object
   */
  getById: async (id) => {
    const result = await fetchJson(`/api/orders/${id}`);
    return result.data;
  },

  /**
   * Update order status
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated order object
   */
  updateStatus: async (id, status) => {
    const result = await fetchJson(`/api/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return result.data;
  },
};


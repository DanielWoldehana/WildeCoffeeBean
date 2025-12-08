"use client";

import { useState, useEffect } from "react";
import { productsApi } from "@/lib/api";

/**
 * Custom hook for fetching and managing products
 * @param {Object} filters - Optional filters (category, inStock, search, sortBy)
 * @returns {Object} { products, loading, error, refetch }
 */
export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productsApi.getAll(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}


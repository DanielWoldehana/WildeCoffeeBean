"use client";

import { useState, useEffect } from "react";
import { menuApi } from "@/lib/api";

/**
 * Custom hook for fetching and managing menu items
 * @param {Object} filters - Optional filters (section, available, search)
 * @returns {Object} { menuItems, loading, error, refetch }
 */
export function useMenu(filters = {}) {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await menuApi.getAll(filters);
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return {
    menuItems,
    loading,
    error,
    refetch: fetchMenu,
  };
}


"use client";

import { useState, useEffect } from "react";
import { locationApi } from "@/lib/api";

/**
 * Custom hook for fetching store location information
 * @returns {Object} { location, loading, error, refetch }
 */
export function useLocation() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await locationApi.getLocation();
      setLocation(data);
    } catch (err) {
      setError(err.message);
      setLocation(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return {
    location,
    loading,
    error,
    refetch: fetchLocation,
  };
}


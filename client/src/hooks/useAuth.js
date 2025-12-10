"use client";

import { useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api";

/**
 * Custom hook for authentication
 * Manages user state, sign in, sign up, and sign out
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage and verify with server
  const loadUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check localStorage first
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (storedUser && token) {
          try {
            // Verify token with server
            const userData = await authApi.getMe();
            setUser(userData);
            // Update localStorage with fresh data
            localStorage.setItem("user", JSON.stringify(userData));
          } catch (err) {
            // Token invalid, clear storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    } catch (err) {
      console.error("Error loading user:", err);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Listen for auth state changes from other components
  useEffect(() => {
    const handleAuthChange = () => {
      loadUser();
    };

    window.addEventListener("auth-state-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthChange);
    };
  }, [loadUser]);

  // Sign up
  const signUp = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authApi.signUp(userData);
      
      // Store token and user
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      
      setUser(result.user);
      // Dispatch event to notify other components
      window.dispatchEvent(new Event("auth-state-changed"));
      return result;
    } catch (err) {
      const errorMessage = err.message || "Failed to sign up";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign in
  const signIn = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authApi.signIn(email, password);
      
      // Store token and user
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      
      setUser(result.user);
      // Dispatch event to notify other components
      window.dispatchEvent(new Event("auth-state-changed"));
      return result;
    } catch (err) {
      const errorMessage = err.message || "Failed to sign in";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await authApi.signOut();
      setUser(null);
      // Dispatch event to notify other components
      window.dispatchEvent(new Event("auth-state-changed"));
    } catch (err) {
      console.error("Sign out error:", err);
      // Clear local storage even if API call fails
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      setUser(null);
      // Dispatch event to notify other components
      window.dispatchEvent(new Event("auth-state-changed"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch user data
  const refetch = useCallback(async () => {
    await loadUser();
  }, [loadUser]);

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    refetch,
    isAuthenticated: !!user,
  };
}


"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

export default function SignUpForm({ onSuccess, onError, switchToSignIn }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [signUpAnimation, setSignUpAnimation] = useState(null);

  // Load SignUp animation
  useEffect(() => {
    fetch("/animations/SignUp.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setSignUpAnimation(data);
        } catch (parseError) {
          console.error("Failed to parse SignUp Lottie JSON:", parseError);
        }
      })
      .catch((err) => console.error("Failed to load SignUp Lottie animation:", err));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Password must contain at least one letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Pass error details to onError handler
        const errorInfo = {
          message: data.error || "Sign up failed",
          status: response.status,
          email: formData.email,
        };
        throw errorInfo;
      }

      // Store token if provided
      if (data.data?.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      onSuccess?.(data.data);
    } catch (error) {
      console.error("Sign up error:", error);
      // Pass error object with status for custom error handling
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto"
    >
      {/* SignUp Animation */}
      <div className="mb-6 flex justify-center">
        {signUpAnimation ? (
          <div className="h-32 w-32">
            <Lottie
              animationData={signUpAnimation}
              loop={true}
              autoplay={true}
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="h-32 w-32 flex items-center justify-center text-6xl">📝</div>
        )}
      </div>

      <h2 className="mb-6 text-3xl font-bold text-center text-[var(--coffee-brown)]">
        Create Account
      </h2>

      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          First Name *
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.firstName
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          Last Name *
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.lastName
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          Password *
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Must be at least 8 characters with one letter and one number
        </p>
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          Confirm Password *
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Phone */}
      <div className="mb-6">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-[var(--coffee-brown)]">
          Phone Number *
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            errors.phone
              ? "border-red-500 focus:ring-red-500"
              : "border-[var(--coffee-brown-light)] focus:border-[var(--lime-green)] focus:ring-[var(--lime-green)]"
          }`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[var(--lime-green)] px-6 py-3 text-white font-semibold transition-all hover:bg-[var(--lime-green-dark)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      {/* Switch to Sign In */}
      <p className="mt-4 text-center text-sm text-[var(--coffee-brown)]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={switchToSignIn}
          className="font-semibold text-[var(--lime-green)] hover:text-[var(--lime-green-dark)] transition-colors"
        >
          Sign In
        </button>
      </p>
    </motion.form>
  );
}


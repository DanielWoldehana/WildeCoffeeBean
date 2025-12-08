"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/menu");
        if (!response.ok) throw new Error("Failed to fetch menu");
        const result = await response.json();
        setMenuItems(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Get unique sections
  const sections = [...new Set(menuItems.map((item) => item.section))].filter(
    Boolean
  );

  // Filter menu items by section
  const filteredItems = selectedSection
    ? menuItems.filter((item) => item.section === selectedSection)
    : menuItems;

  // Group items by section
  const groupedItems = filteredItems.reduce((acc, item) => {
    const section = item.section || "Other";
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});

  const formatPrice = (price, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--lime-green)] border-r-transparent"></div>
          <p className="text-[var(--coffee-brown)]">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-4 text-lg text-red-600">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-full bg-[var(--lime-green)] px-6 py-2 text-white hover:bg-[var(--lime-green-dark)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-[var(--coffee-brown)] sm:text-5xl">
            Menu
          </h1>
          <p className="text-lg text-gray-600">
            Explore our selection of beverages, pastries, and smoothies
          </p>
        </div>

        {/* Section Filter */}
        {sections.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedSection("")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                selectedSection === ""
                  ? "bg-[var(--lime-green)] text-white"
                  : "bg-white text-[var(--coffee-brown)] hover:bg-gray-100"
              }`}
            >
              All Items
            </button>
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setSelectedSection(section)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedSection === section
                    ? "bg-[var(--lime-green)] text-white"
                    : "bg-white text-[var(--coffee-brown)] hover:bg-gray-100"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items by Section */}
        <div className="space-y-12">
          {Object.entries(groupedItems).map(([section, items]) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h2 className="mb-6 border-b-2 border-[var(--lime-green)] pb-2 text-2xl font-bold text-[var(--coffee-brown)]">
                {section}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <motion.div
                    key={item._id}
                    whileHover={{ y: -4 }}
                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:border-[var(--lime-green)] hover:shadow-lg"
                  >
                    {/* Image Section */}
                    {item.image && (
                      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                          unoptimized
                        />
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-1 text-lg font-semibold text-[var(--lime-green)]">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-xl font-bold text-[var(--coffee-brown)]">
                            {formatPrice(item.price, item.currency)}
                          </p>
                        </div>
                      </div>
                      
                      {item.allergens && item.allergens.length > 0 && (
                        <div className="mb-2 border-t border-gray-100 pt-2">
                          <p className="mb-1 text-xs font-semibold text-amber-700">
                            Contains:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.allergens.map((allergen, idx) => (
                              <span
                                key={idx}
                                className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200"
                              >
                                {allergen}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {!item.available && (
                        <p className="mt-2 text-xs text-red-600">
                          Currently Unavailable
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="rounded-lg bg-white p-12 text-center shadow-md">
            <p className="text-lg text-gray-600">No menu items found.</p>
            <p className="mt-2 text-sm text-gray-500">
              Try selecting a different section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

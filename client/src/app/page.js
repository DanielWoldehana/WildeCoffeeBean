"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerChildren = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--coffee-brown-dark)] via-[var(--coffee-brown)] to-[var(--coffee-brown-light)] px-4 py-20 sm:px-6 lg:px-8"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[var(--lime-green)] blur-3xl"></div>
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[var(--lime-green-light)] blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {isVisible && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerChildren}
            >
              <motion.h1
                variants={fadeInUp}
                className="mb-6 text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Wild Bean Coffee
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mb-8 text-xl text-white/90 sm:text-2xl md:text-3xl"
              >
                Fresh Roasted Coffee & Handcrafted Beverages
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mx-auto mb-12 max-w-2xl text-lg text-white/80 sm:text-xl"
              >
                Experience the perfect blend of quality beans and artisanal
                craftsmanship. Order online for pickup or visit us in store.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Link
                  href="/shop"
                  className="group relative overflow-hidden rounded-full bg-[var(--lime-green)] px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[var(--lime-green-dark)] hover:scale-105 hover:shadow-lg"
                >
                  <span className="relative z-10">Shop Coffee Beans</span>
                  <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0"></div>
                </Link>
                <Link
                  href="/order"
                  className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--coffee-brown)] hover:scale-105"
                >
                  Order Online
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-8"
          >
            <svg
              className="h-8 w-8 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-[var(--coffee-brown)] sm:text-5xl">
              Why Choose Wild Bean Coffee?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              We're passionate about bringing you the finest coffee experience
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: "☕",
                title: "Fresh Roasted",
                description:
                  "Our beans are roasted in-house daily to ensure maximum flavor and freshness.",
              },
              {
                icon: "🌱",
                title: "Sustainably Sourced",
                description:
                  "We partner with ethical farms committed to sustainable practices.",
              },
              {
                icon: "👨‍🍳",
                title: "Handcrafted",
                description:
                  "Every beverage is carefully prepared by our skilled baristas.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="mb-4 text-5xl">{feature.icon}</div>
                <h3 className="mb-3 text-2xl font-semibold text-[var(--coffee-brown)]">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[var(--lime-green)] to-[var(--lime-green-light)] py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
              Ready to Experience Great Coffee?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Browse our selection of premium beans or order your favorite
              beverage online.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/shop"
                className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-[var(--coffee-brown)] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/menu"
                className="rounded-full border-2 border-white bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[var(--lime-green)] hover:scale-105"
              >
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

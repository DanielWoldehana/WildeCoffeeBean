"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const linkClass = (path) => {
    const baseClass =
      "text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all";
    if (isActive(path)) {
      return `${baseClass} text-[var(--lime-green)] after:w-full after:bg-[var(--lime-green)]`;
    }
    return `${baseClass} text-[var(--coffee-brown)] hover:text-[var(--lime-green)] after:w-0 after:bg-[var(--lime-green)] hover:after:w-full`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between overflow-visible">
          <Link href="/" className="flex items-center gap-2 overflow-visible">
            <Image
              src="/images/logo/logoWtext.png"
              alt="Wild Bean Coffee"
              width={400}
              height={128}
              className="h-32 w-auto"
              priority
              unoptimized
            />
          </Link>
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/shop" className={linkClass("/shop")}>
              Shop
            </Link>
            <Link href="/menu" className={linkClass("/menu")}>
              Menu
            </Link>
            <Link href="/location" className={linkClass("/location")}>
              Location
            </Link>
            <Link
              href="/order"
              className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${
                isActive("/order")
                  ? "bg-[var(--lime-green-dark)]"
                  : "bg-[var(--lime-green)] hover:bg-[var(--lime-green-dark)]"
              }`}
            >
              Order Online
            </Link>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6 text-[var(--coffee-brown)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[var(--coffee-brown)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive("/")
                    ? "text-[var(--lime-green)]"
                    : "text-[var(--coffee-brown)] hover:text-[var(--lime-green)]"
                }`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive("/shop")
                    ? "text-[var(--lime-green)]"
                    : "text-[var(--coffee-brown)] hover:text-[var(--lime-green)]"
                }`}
              >
                Shop
              </Link>
              <Link
                href="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive("/menu")
                    ? "text-[var(--lime-green)]"
                    : "text-[var(--coffee-brown)] hover:text-[var(--lime-green)]"
                }`}
              >
                Menu
              </Link>
              <Link
                href="/location"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive("/location")
                    ? "text-[var(--lime-green)]"
                    : "text-[var(--coffee-brown)] hover:text-[var(--lime-green)]"
                }`}
              >
                Location
              </Link>
              <Link
                href="/order"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`mt-2 rounded-full px-4 py-2 text-center text-base font-semibold text-white transition-colors ${
                  isActive("/order")
                    ? "bg-[var(--lime-green-dark)]"
                    : "bg-[var(--lime-green)] hover:bg-[var(--lime-green-dark)]"
                }`}
              >
                Order Online
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

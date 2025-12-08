import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Wild Coffee Bean"
              width={120}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </Link>
          <div className="hidden md:flex md:items-center md:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-[var(--coffee-brown)] transition-colors hover:text-[var(--lime-green)]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-sm font-medium text-[var(--coffee-brown)] transition-colors hover:text-[var(--lime-green)]"
            >
              Shop
            </Link>
            <Link
              href="/menu"
              className="text-sm font-medium text-[var(--coffee-brown)] transition-colors hover:text-[var(--lime-green)]"
            >
              Menu
            </Link>
            <Link
              href="/location"
              className="text-sm font-medium text-[var(--coffee-brown)] transition-colors hover:text-[var(--lime-green)]"
            >
              Location
            </Link>
            <Link
              href="/order"
              className="rounded-full bg-[var(--lime-green)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--lime-green-dark)]"
            >
              Order Online
            </Link>
          </div>
          {/* Mobile menu button - simplified for now */}
          <button
            className="md:hidden"
            aria-label="Menu"
            onClick={() => {
              // Mobile menu toggle will be added later
              console.log("Mobile menu toggle");
            }}
          >
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
          </button>
        </div>
      </div>
    </nav>
  );
}


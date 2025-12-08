import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--coffee-brown-dark)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Wild Bean Coffee</h3>
            <p className="text-sm text-gray-300">
              Fresh roasted coffee beans and handcrafted beverages. Visit us in
              store or order online for pickup.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/shop"
                  className="text-gray-300 transition-colors hover:text-[var(--lime-green)]"
                >
                  Shop Coffee Beans
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-300 transition-colors hover:text-[var(--lime-green)]"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-gray-300 transition-colors hover:text-[var(--lime-green)]"
                >
                  Location & Hours
                </Link>
              </li>
              <li>
                <Link
                  href="/order"
                  className="text-gray-300 transition-colors hover:text-[var(--lime-green)]"
                >
                  Order Online
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <p className="text-sm text-gray-300">
              Visit our location page for address, hours, and contact
              information.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Wild Bean Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


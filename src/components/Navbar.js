"use client";

import Link from "next/link";
import SearchButton from "./SearchButton";

export default function Navbar() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-teal-700">
          MyShop
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6">
          <Link
            href="/"
            className="text-gray-700 hover:text-teal-700 transition"
          >
            Home
          </Link>
          <Link
            href="/catalogue"
            className="text-gray-700 hover:text-teal-700 transition"
          >
            Catalogue
          </Link>
          <Link
            href="/cart"
            className="text-gray-700 hover:text-teal-700 transition"
          >
            Cart
          </Link>
          <SearchButton/>
        </div>
      </nav>
    </header>
  );
}

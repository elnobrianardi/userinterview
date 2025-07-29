"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [recent, setRecent] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${query}`
      );
      setResults(response.data.products);
      setRecent((prev) => {
        const updated = [query, ...prev.filter((q) => q !== query)];
        return updated.slice(0, 5);
      });

      setQuery("");
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <button
          className="absolute top-4 right-4 text-gray-500"
          onClick={onClose}
        >
          ✖️
        </button>
        <h2 className="text-xl font-bold mb-4">Search Products</h2>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="border px-4 py-2 flex-1 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded"
          >
            Search
          </button>
        </form>

        {recent.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Recent Searches:</h3>
            <ul className="list-disc list-inside text-sm">
              {recent.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Results:</h3>
            <ul className="space-y-1 text-sm">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    className="text-teal-700 hover:underline"
                    onClick={onClose} // Optional: close modal after click
                  >
                    {product.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

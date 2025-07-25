"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition flex flex-col">
      <Link href={`/product/${product.id}`} className="block mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded mb-2"
        />
        <h2 className="text-lg font-bold">{product.title}</h2>
        <p className="text-gray-700">${product.price}</p>
      </Link>

      <button className="mt-auto bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
        Add to Cart
      </button>
    </div>
  );
}

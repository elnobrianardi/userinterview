"use client";

import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="relative h-96 w-80 rounded overflow-hidden shadow transition-transform duration-300 hover:scale-105 group">
      <Link href={`/product/${product.id}`} className="block h-full w-full">
        <div className="absolute inset-0">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end p-4 pointer-events-none">
          <div className="bg-white/80 p-4 rounded transition-all duration-300 group-hover:pb-12 pointer-events-auto">
            <h2 className="font-bold truncate">{product.title}</h2>
            <p className="text-gray-600 text-sm">
              {product.rating} ⭐{" "}
              <span className="text-gray-400">
                ({product.reviews.length} reviews)
              </span>
            </p>
            <p className="text-lg font-bold">${product.price}</p>
          </div>
        </div>
      </Link>

      <div className="absolute bottom-4 left-0 w-full px-4 z-20">
        <button
          className="w-full bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-all duration-300 group-hover:opacity-100 opacity-0"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

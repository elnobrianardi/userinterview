"use client";

import { useEffect, useState } from "react";
import { getProductById } from "../../../services/product";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getProductById(id);
      setProduct(data);
      setSelectedImage(data.thumbnail); 
    }

    fetchData();
  }, [id]);

  if (!product) return <p className="p-8">Loading...</p>;

  const starDistribution = [0, 0, 0, 0, 0];
  product.reviews?.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      starDistribution[r.rating - 1]++;
    }
  });

  const totalReviews = product.reviews?.length || 0;

  return (
    <main className="container mx-auto p-8">
      <p className="text-gray-500 mb-4 capitalize">Category: {product.category}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative w-86 h-96 mb-4 rounded overflow-hidden">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="flex gap-2">
            {[product.thumbnail, ...product.images]?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded border cursor-pointer transition-transform hover:scale-105 ${
                  selectedImage === img ? "ring-2 ring-teal-600" : ""
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl font-semibold mb-2 text-teal-700">${product.price}</p>
          <p className="mb-2">Rating: ⭐ {product.rating} / 5</p>
          <p className="mb-2">Stock: {product.stock}</p>
          <p className="mb-2">Brand: {product.brand}</p>
          <p className="mb-2">SKU: {product.sku}</p>
          <p className="mb-2">Weight: {product.weight}g</p>
          <p className="mb-2">
            Dimensions: {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
          </p>
          <p className="mb-2">Availability: {product.availabilityStatus}</p>
          <p className="mb-2 text-sm text-gray-700">Warranty: {product.warrantyInformation}</p>
          <p className="mb-2 text-sm text-gray-700">Shipping: {product.shippingInformation}</p>
          <p className="mb-4 text-sm text-gray-700">Return Policy: {product.returnPolicy}</p>

          <button className="bg-teal-600 text-white px-6 py-3 rounded hover:bg-teal-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

          {product.reviews?.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="p-4 rounded bg-gray-50 shadow-sm">
                  <p className="font-bold mb-1">⭐ {review.rating} / 5</p>
                  <p className="italic mb-1">"{review.comment}"</p>
                  <p className="text-sm text-gray-500">
                    By {review.reviewerName} on{" "}
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>

        {totalReviews > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Rating Summary</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = starDistribution[star - 1];
                const percent = totalReviews ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="w-12 text-sm">{star} star</span>
                    <div className="flex-1 bg-gray-200 h-3 rounded">
                      <div
                        className="bg-yellow-400 h-3 rounded"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-6 text-sm text-gray-600">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

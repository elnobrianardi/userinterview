import { getProductById } from "../../../services/product";

export default async function ProductPage({ params }) {
  const { id } = params;
  const product = await getProductById(id);

  return (
    <main className="container mx-auto p-8">
      {/* Title & Category */}
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-500 mb-4 capitalize">Category: {product.category}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded border mb-4"
          />

          <div className="flex gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.title} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
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

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {product.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="border p-4 rounded shadow-sm">
                <p className="font-bold">⭐ {review.rating} / 5</p>
                <p className="italic mb-2">"{review.comment}"</p>
                <p className="text-sm text-gray-500">
                  By {review.reviewerName} on {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </main>
  );
}

'use client'

import { useEffect, useState } from "react";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data); 
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="my-4">
      <select
        id="category"
        className="p-2 border rounded"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

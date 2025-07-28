// components/CategoryFilter.jsx
'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryFilter() {
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories", {
        cache: "no-store", // 💡 penting
      });
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={selectedCategory || ""}
      onChange={handleChange}
      className="border rounded p-2 text-sm"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
}

"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortBy = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";

  const handleSort = (sortByValue, orderValue) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortByValue);
    params.set("order", orderValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  const isActive = (type, dir) => sortBy === type && order === dir;

  const baseButton =
    "inline-flex items-center justify-center border border-gray-300 px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200";
  const activeButton = "bg-teal-600 text-white border-teal-600";
  const hoverButton = "hover:bg-teal-100";

  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2">
        <span className="font-semibold">Title</span>
        <button
          onClick={() => handleSort("title", "asc")}
          className={`${baseButton} ${isActive("title", "asc") ? activeButton : hoverButton}`}
          title="Title Ascending"
        >
          ▲
        </button>
        <button
          onClick={() => handleSort("title", "desc")}
          className={`${baseButton} ${isActive("title", "desc") ? activeButton : hoverButton}`}
          title="Title Descending"
        >
          ▼
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="font-semibold">Price</span>
        <button
          onClick={() => handleSort("price", "asc")}
          className={`${baseButton} ${isActive("price", "asc") ? activeButton : hoverButton}`}
          title="Price Low → High"
        >
          ▲
        </button>
        <button
          onClick={() => handleSort("price", "desc")}
          className={`${baseButton} ${isActive("price", "desc") ? activeButton : hoverButton}`}
          title="Price High → Low"
        >
          ▼
        </button>
      </div>
    </div>
  );
}

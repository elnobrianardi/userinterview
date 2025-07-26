"use client";

import { useState } from "react";
import SearchModal from "./SearchModal";
import { Search} from "lucide-react";

export default function SearchButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200"
      >
        <Search />
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

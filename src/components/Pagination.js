import Link from "next/link";

export default function Pagination({ currentPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8">
      {/* Previous button */}
      {prevPage >= 1 && (
        <Link
          href={prevPage === 1 ? `/` : `/page/${prevPage}`}
          className="px-4 py-2 border rounded"
        >
          &larr; Previous
        </Link>
      )}

      {/* Page numbers */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={page === 1 ? `/` : `/page/${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage ? "bg-teal-600 text-white" : ""
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next button */}
      {nextPage <= totalPages && (
        <Link
          href={`/page/${nextPage}`}
          className="px-4 py-2 border rounded"
        >
          Next &rarr;
        </Link>
      )}
    </div>
  );
}

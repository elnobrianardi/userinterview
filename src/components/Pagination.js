import Link from "next/link";

export default function Pagination({ currentPage, total, limit }) {
  const pageNumber = Number(currentPage);
  const totalPages = Math.ceil(total / limit);

  const prevPage = pageNumber - 1;
  const nextPage = pageNumber + 1;

  return (
    <div className="flex flex-wrap justify-between items-center gap-2 mt-8">
      {/* Previous button */}
      {prevPage >= 1 && (
        <Link
          href={prevPage === 1 ? `/` : `/page/${prevPage}`}
          className="px-4 py-2 border rounded"
        >
          &larr; Previous
        </Link>
      )}

      <div className="flex gap-2">
        {/* Show only 5 pages at a time */}
        {(() => {
          const pageGroupSize = 5;
          const half = Math.floor(pageGroupSize / 2);

          let startPage = Math.max(1, pageNumber - half);
          let endPage = startPage + pageGroupSize - 1;

          if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageGroupSize + 1);
          }

          return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <Link
              key={page}
              href={page === 1 ? `/` : `/page/${page}`}
              className={`px-4 py-2 border rounded ${
                page === pageNumber ? "bg-teal-600 text-white" : ""
              }`}
            >
              {page}
            </Link>
          ));
        })()}
      </div>

      {/* Next button */}
      {nextPage <= totalPages && (
        <Link href={`/page/${nextPage}`} className="px-4 py-2 border rounded">
          Next &rarr;
        </Link>
      )}
    </div>
  );
}

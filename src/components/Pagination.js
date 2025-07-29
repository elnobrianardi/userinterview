'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function Pagination({ currentPage, total, limit }) {
  const pageNumber = Number(currentPage)
  const totalPages = Math.ceil(total / limit)
  const prevPage = pageNumber - 1
  const nextPage = pageNumber + 1

  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams)

  const createPageLink = (page) => {
    const params = new URLSearchParams(currentParams.toString())
    return `/page/${page}?${params.toString()}`
  }

  const visiblePages = 5
  let startPage = Math.max(1, pageNumber - Math.floor(visiblePages / 2))
  let endPage = startPage + visiblePages - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - visiblePages + 1)
  }

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8">
      {prevPage >= 1 && (
        <Link href={createPageLink(prevPage)} className="px-4 py-2 bg-gray-200 rounded">
          Prev
        </Link>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={createPageLink(page)}
          className={`px-4 py-2 rounded ${page === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {page}
        </Link>
      ))}

      {nextPage <= totalPages && (
        <Link href={createPageLink(nextPage)} className="px-4 py-2 bg-gray-200 rounded">
          Next
        </Link>
      )}
    </div>
  )
}

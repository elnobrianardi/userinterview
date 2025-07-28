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
    params.set('page', page)
    return `?${params.toString()}`
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-8">
      {prevPage >= 1 && (
        <Link href={createPageLink(prevPage)} className="px-4 py-2 bg-gray-200 rounded">
          Prev
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={createPageLink(i + 1)}
          className={`px-4 py-2 rounded ${i + 1 === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {i + 1}
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

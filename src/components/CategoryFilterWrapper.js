'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import CategoryFilter from './CategoryFilter'

export default function CategoryFilterWrapper() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const selectedCategory = searchParams.get('category') || ''

  const handleCategoryChange = (newCategory) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newCategory) {
      params.set('category', newCategory)
      params.set('page', 1)
    } else {
      params.delete('category')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <CategoryFilter
      selectedCategory={selectedCategory}
      onCategoryChange={handleCategoryChange}
    />
  )
}

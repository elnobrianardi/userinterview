import Catalogue from '../../../components/Catalogue'
import Pagination from '../../../components/Pagination'
import SortControls from '../../../components/SortControls'
import CategoryFilter from '../../../components/CategoryFilter'
import CategoryFilterWrapper from '@/components/CategoryFilterWrapper'
import { getProducts, getSortedProducts } from '../../../services/product'

export default async function ProductsPage({ params, searchParams }) {
  const pageParam = params?.page
  const page = parseInt(pageParam, 10) || 1
  const limit = 15
  const skip = (page - 1) * limit

  const sortBy = searchParams?.sort || null
  const order = searchParams?.order || 'asc'
  const category = searchParams?.category || null

  let productsData = { products: [], total: 0 }

  if (category) {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`)
    const data = await res.json()

    if (data && Array.isArray(data.products)) {
      const sliced = data.products.slice(skip, skip + limit)
      productsData = {
        products: sliced,
        total: data.products.length
      }
    }
  } else {
    productsData = sortBy
      ? await getSortedProducts({ sortBy, order, page, limit })
      : await getProducts(page, limit)
  }

  const { products, total } = productsData

  return (
    <main className="container mx-auto p-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-4 mx-auto gap-4">
        <h1 className="text-3xl font-bold mb-2 lg:mb-0">Product Catalogue</h1>
        <div className="flex flex-wrap gap-3 items-center">
          <CategoryFilterWrapper />
          <SortControls />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <Catalogue products={products} />
        <Pagination
          currentPage={page}
          total={total}
          limit={limit}
          searchParams={searchParams}
        />
      </div>
    </main>
  )
}

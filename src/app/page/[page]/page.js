import SearchButton from "@/components/SearchButton";
import Catalogue from "../../../components/Catalogue";
import Pagination from "../../../components/Pagination";
import { getProducts, getSortedProducts } from "../../../services/product";
import SortControls from "@/components/SortControls";

// Server component for paginated page
export default async function Page({ params, searchParams }) {
  const page = parseInt(params.page, 15) || 1;
  const limit = 15;

  const sortBy = searchParams?.sort || null;
  const order = searchParams?.order || "asc";

  const { products, total } = sortBy
    ? await getSortedProducts({ sortBy, order, page, limit })
    : await getProducts(page, limit);

  return (
    <main className="container mx-auto p-8 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Catalogue - Page {page}</h1>
        <SortControls />
      </div>

      <Catalogue products={products} />
      <Pagination currentPage={page} total={total} limit={limit} />
    </main>
  );
}


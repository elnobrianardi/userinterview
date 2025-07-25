import Catalogue from "../components/Catalogue";
import Pagination from "../components/Pagination";
import SortControls from "../components/SortControls";
import { getProducts, getSortedProducts } from "../services/product";

export default async function Home({ searchParams }) {
  const page = 1;
  const limit = 15;

  const sortBy = searchParams?.sort || null;
  const order = searchParams?.order || "asc";

  const { products, total } = sortBy
    ? await getSortedProducts({ sortBy, order, page, limit })
    : await getProducts(page, limit);

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Catalogue</h1>
        <SortControls />
      </div>

      <Catalogue products={products} />
      <Pagination currentPage={page} total={total} limit={limit} />
    </main>
  );
}

export async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();
  return data; // should be [{ slug, name, url }, ...]
}

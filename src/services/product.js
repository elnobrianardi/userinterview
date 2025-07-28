import axios from "axios";

export async function getProducts(page = 1, limit = 15) {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  return response.data;
}

export async function getSortedProducts({
  sortBy = "title",
  order = "asc",
  page = 1,
  limit = 15,
}) {
  const skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`
  );
  return response.data;
}

export const getProductById = async (id) => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};
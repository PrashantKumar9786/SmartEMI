import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const apiClient = axios.create({ baseURL });

export async function fetchProducts() {
  const res = await apiClient.get("/products");
  return res.data.data;
}

export async function fetchProductBySlug(slug) {
  const res = await apiClient.get(`/products/${slug}`);
  return res.data.data;
}

export default apiClient;

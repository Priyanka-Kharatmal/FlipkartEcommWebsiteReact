import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Fetch all products
export const getProducts = () => api.get("/products");

// You can add more API calls here if needed in future
// export const getProductById = (id) => api.get(/products/${id});
// export const addProduct = (data) => api.post("/products", data);

export default api;
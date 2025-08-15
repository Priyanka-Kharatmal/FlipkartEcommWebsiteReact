import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    info: "",
    image: { url: "" }
  });

  useEffect(() => {
    api.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setProduct((prev) => ({
        ...prev,
        image: { url: value }
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/products/${id}`, product)
      .then(() => {
        alert("Product updated successfully!");
        navigate("/manageproducts");
      })
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "400px",
          marginTop: "20px"
        }}
      >
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock"
          required
        />
        <input
          type="text"
          name="info"
          value={product.info}
          onChange={handleChange}
          placeholder="Additional Info"
        />
        <input
          type="text"
          name="image"
          value={product.image?.url || ""}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import api from "../api";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts(); // refresh list
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Handle Edit (navigate to edit page)
  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Image</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: "1px solid #ccc" }}>
                <td style={tdStyle}>
                  <img
                    src={product.image || "https://via.placeholder.com/50"}
                    alt={product.name}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>₹{product.price}</td>
                <td style={tdStyle}>{product.category}</td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleEdit(product.id)}
                    style={btnEdit}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    style={btnDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Inline styles
const thStyle = {
  borderBottom: "2px solid #000",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  padding: "8px",
};

const btnEdit = {
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "6px 12px",
  marginRight: "5px",
  cursor: "pointer",
};

const btnDelete = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "6px 12px",
  cursor: "pointer",
};

export default ManageProducts;

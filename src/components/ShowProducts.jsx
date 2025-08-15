import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api";
import { useCart } from "./CartContext";


const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((res) => {
        const found = res.data.find((p) => p.id === id);
        setProduct(found);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
      <img
        src={product.image?.url || "https://via.placeholder.com/300"}
        alt={product.name}
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
      <div>
        <h1>{product.name}</h1>
        <h2 style={{ color: "green" }}>₹{product.price}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Stock:</strong> {product.stock}
        </p>
        <p>
          <strong>Info:</strong> {product.info}
        </p>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 20px",
            backgroundColor: "orange",
            border: "none",
            color: "white",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShowProduct;

import React, { useEffect, useState } from "react";
import TailwindCarousel from "../components/Carousel";
import { getProducts } from "../api";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const renderCategory = (categoryName, title) => {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === categoryName.toLowerCase()
    );

    return (
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ margin: "20px 0" }}>{title}</h2>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto" }}>
          {filtered.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              style={{
                minWidth: "200px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "#fff",
                }}
              >
                {/* <img
                  src={item.image?.url || "https://via.placeholder.com/150"}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                  }}
                /> */}

                {/* <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                /> */}

                <img
                  src={item.image || "https://via.placeholder.com/300"}
                  alt={item.name}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />

                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <TailwindCarousel />
      <main style={{ padding: "20px" }}>
        {renderCategory("electronics", "Best of Electronics")}
        {renderCategory("home", "Best of Home Appliances")}
        {renderCategory("toys", "Best of Toys")}
        {renderCategory("books", "Best of Books")}
        {renderCategory("fashion", "Best of Fashion")}
      </main>
    </div>
  );
};

export default Home;

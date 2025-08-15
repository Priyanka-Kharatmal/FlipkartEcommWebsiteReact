import React from "react";
import { useCart } from "../components/CartContext";


const Cart = () => {
  const { cartItems } = useCart();

  return (
    <div style={{ padding: "20px" }}>
      {/* <h3>Cart Page</h3> */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "20px",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
            }}
          >
            <img
              src={item.image?.url || "https://via.placeholder.com/100"}
              alt={item.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div>
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;

import React from "react";
import { useCart } from "../components/CartContext";

const getImageSrc = (image) => {
  if (!image) return "https://via.placeholder.com/100";
  // supports both {url: ""} and plain string
  if (typeof image === "string") return image;
  if (typeof image === "object" && image.url) return image.url;
  return "https://via.placeholder.com/100";
};

const Cart = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  return (
    <div style={{ padding: "20px", maxWidth: 900, margin: "0 auto" }}>
      <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderBottom: "1px solid #e5e7eb",
                padding: "12px 0",
              }}
            >
              <img
                src={getImageSrc(item.image)}
                alt={item.name}
                style={{
                  width: 96,
                  height: 96,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ color: "#2563eb", fontWeight: 700 }}>
                  ₹{Number(item.price) || 0}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 8,
                  }}
                >
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={btn}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span style={{ minWidth: 24, textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(item, 1)}
                    style={btn}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{ ...btnDanger, whiteSpace: "nowrap" }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              paddingTop: 12,
              borderTop: "2px solid #e5e7eb",
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              Total: ₹{totalPrice}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={clearCart} style={btnGray}>
                Clear Cart
              </button>
              <button
                style={btnSuccess}
                onClick={() => alert("Proceeding to checkout…")}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const btn = {
  border: "1px solid #d1d5db",
  background: "white",
  padding: "4px 10px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnDanger = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnGray = {
  background: "#6b7280",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnSuccess = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

export default Cart;

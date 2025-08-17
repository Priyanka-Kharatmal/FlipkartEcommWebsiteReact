import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // persist
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add or increase quantity
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const id = product.id;
      const priceNum = Number(product.price) || 0;

      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      // Normalize the item we store in cart
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: priceNum,          // ensure number
          image: product.image || null,
          quantity: qty,
        },
      ];
    });
  };

  // Decrease quantity (remove item if reaches 0)
  const decreaseQuantity = (id, qty = 1) => {
    setCartItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - qty } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  // Remove entire line item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  // Clear all
  const clearCart = () => setCartItems([]);

  // Derived values
  const totalQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cartItems.reduce(
    (s, i) => s + (Number(i.price) || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

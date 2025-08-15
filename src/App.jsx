import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Cart from "./pages/Cart";
import ShowProduct from "./components/ShowProducts";
import { CartProvider } from "./components/CartContext";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProducts";
// ✅ Import cart context

const App = () => {
  return (
    <CartProvider>
      {" "}
      {/* ✅ Wrap the entire app so cart state is shared */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ShowProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/manageproducts" element={<ManageProducts />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;

import React from "react";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <div>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
     <Footer/>
    </div>
  );
};

export default App;

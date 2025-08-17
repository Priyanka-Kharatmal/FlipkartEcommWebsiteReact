import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <nav className="bg-gray-100 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Navbar
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-500 hover:text-gray-900 px-2">
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-500 hover:text-gray-900 px-2"
            >
              Products
            </Link>
            <Link
              to="/addproducts"
              className="text-gray-500 hover:text-gray-900 px-2"
            >
              AddProducts
            </Link>
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 px-2">
              Cart{" "}
              {cartItems.length > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              to="/manageproducts"
              className="text-gray-500 hover:text-gray-900 px-2"
            >
              ManageProducts
            </Link>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            to="/products"
            className="block text-gray-700 hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/addproducts"
            className="block text-gray-700 hover:text-blue-600"
          >
            Add Products
          </Link>
          <Link to="/cart" className="block text-gray-700 hover:text-blue-600">
            Cart{" "}
            {/* {cartItems.length > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-sm">
                {cartItems.length}
              </span>
            )} */}
            {totalQuantity > 0 && (
              <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-sm">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link
            to="/manageproducts"
            className="text-gray-500 hover:text-gray-900 px-2"
          >
            ManageProducts
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

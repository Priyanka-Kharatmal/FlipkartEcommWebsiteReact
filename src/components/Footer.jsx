import React from 'react'
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <footer className="py-6 my-4">
        {/* Navigation Links */}
        <ul
          className="flex justify-center border-b border-gray-300 pb-4 mb-4 flex-wrap gap-4"
          aria-label="Footer navigation"
        >
          <li>
            <Link to="/" className="text-gray-500 hover:text-gray-900 px-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="text-gray-500 hover:text-gray-900 px-2">
              Products
            </Link>
          </li>
          <li>
            <Link to="/addproducts" className="text-gray-500 hover:text-gray-900 px-2">
              Add Products
            </Link>
          </li>
          <li>
            <Link to="/cart" className="text-gray-500 hover:text-gray-900 px-2">
              Cart
            </Link>
          </li>
          {/* Uncomment below if About route is available */}
          {/* 
          <li>
            <Link to="/about" className="text-gray-500 hover:text-gray-900 px-2">
              About
            </Link>
          </li> 
          */}
        </ul>

        {/* Copyright */}
        <p className="text-center text-gray-500">© 2025 Company, Inc</p>
      </footer>
    </div>
  )
}

export default Footer

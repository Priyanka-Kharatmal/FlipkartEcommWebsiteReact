import React, { useEffect, useState } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");
  const location = useLocation();

  useEffect(() => {
    getProducts();

    if (location.state?.toast) {
      setToast(location.state.toast);
      setTimeout(() => {
        setToast("");
        window.history.replaceState({}, document.title); // remove state
      }, 3000);
    }
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  // const getImageSrc = (image) => {
  //   if (typeof image === "string") {
  //     console.log("got image in products");
  //     return image; // URL from API
  //   } else if (image instanceof Blob) {
  //      console.log("got image in products 3");
  //     return URL.createObjectURL(image); // File or Blob
  //   }
  //   console.log("got no image in products");
  //   return ""; // No image
  // };


  

  const getImageSrc = (image) => {
  if (typeof image === "string" && image.trim() !== "") {
    return image; // now base64 or URL
  }
  return "";
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {toast && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded mb-6 text-center">
          {toast}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageSrc = getImageSrc(product.image);

            return (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
              >
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}

                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="text-sm text-gray-500 mt-2">Category: {product.category}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-blue-600 font-bold text-lg mt-2">₹{product.price}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;



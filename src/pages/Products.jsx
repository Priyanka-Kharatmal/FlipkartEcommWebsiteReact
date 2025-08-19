import React, { useEffect, useState } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const categories = [
  { name: "Minutes", icon: "https://img.icons8.com/color/96/scooter.png" },
  {
    name: "Top Offers",
    icon: "https://img.icons8.com/color/96/percentage.png",
  },
  {
    name: "Mobiles & Tablets",
    icon: "https://img.icons8.com/color/96/smartphone-tablet.png",
  },
  { name: "TVs & Appliances", icon: "https://img.icons8.com/color/96/tv.png" },
  { name: "Electronics", icon: "https://img.icons8.com/color/96/laptop.png" },
  { name: "Fashion", icon: "https://img.icons8.com/color/96/clothes.png" },
  {
    name: "Home & Kitchen",
    icon: "https://img.icons8.com/color/96/kitchen.png",
  },
  {
    name: "Beauty & Toys",
    icon: "https://cdn3d.iconscout.com/3d/premium/thumb/beauty-salon-building-3d-icon-download-in-png-blend-fbx-gltf-file-formats--dryer-haircut-cosmetic-inside-parlor-architecture-pack-buildings-icons-8726753.png?f=webp",
  },
  { name: "Furniture", icon: "https://img.icons8.com/color/96/armchair.png" },
  {
    name: "Flight Bookings",
    icon: "https://img.icons8.com/color/96/airplane-take-off.png",
  },
  { name: "Grocery", icon: "https://img.icons8.com/color/96/grocery-bag.png" },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // search input
  const [selectedCategory, setSelectedCategory] = useState(""); // selected category
  const location = useLocation();

  useEffect(() => {
    getProducts();

    if (location.state?.toast) {
      setToast(location.state.toast);
      setTimeout(() => {
        setToast("");
        window.history.replaceState({}, document.title);
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
  //   if (typeof image === "string" && image.trim() !== "") {
  //     return image;
  //   }
  //   return "";
  // };

  const getImageSrc = (image) => {
  if (typeof image === "string" && image.trim() !== "") {
    return image; // works for both Base64 and URL
  }
  return "https://via.placeholder.com/150";
};


  // Filter products by search + category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory
      ? product.category?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesSearch && matchesCategory;
  });

  // Group filtered products by category
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const category = product.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className=" mx-auto px-4 py-8">
      {/* Toast message */}
      {toast && (
        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-2 rounded mb-6 text-center">
          {toast}
        </div>
      )}

      {/* Search bar */}
      {/* <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" border px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-400"
        />
      </div> */}

      {/* Search bar */}
      <div className="mb-6 w-full sm:w-1/2 mx-auto">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full shadow focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Category Section */}
      <div className="flex overflow-x-auto gap-6 bg-gray-50 p-4 rounded-lg shadow mb-10">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === cat.name ? "" : cat.name // toggle selection
              )
            }
            className={`flex flex-col items-center min-w-[80px] cursor-pointer transition ${
              selectedCategory === cat.name
                ? "scale-110 border-b-4 border-blue-500"
                : "hover:scale-105"
            }`}
          >
            <img
              src={cat.icon}
              alt={cat.name}
              className="w-16 h-16 rounded-xl"
            />
            <p className="text-sm mt-2 text-gray-700 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* Product Sections */}
      {Object.keys(groupedProducts).length > 0 ? (
        Object.keys(groupedProducts).map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-xl font-bold mb-4">{`Best of ${category}`}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {groupedProducts[category].map((product) => {
                const imageSrc = getImageSrc(product.image);
                return (
                  <div
                    key={product.id}
                    className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition"
                  >
                    {imageSrc && (
                      <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {product.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {product.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </p>
                    <p className="text-blue-600 font-bold text-lg mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No products found.</p>
      )}
    </div>
  );
};

export default Products;

// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";
// import { TextField, Button} from "@mui/material";

// const AddProducts = () => {
//     const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     info: '',
//     image: null
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setProduct({ ...product, image: files[0] });
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const generateNextId = (products) => {
//     const prodIds = products
//       .map((p) => p.id)
//       .filter((id) => /^prod\d{3}$/.test(id));

//     if (prodIds.length === 0) return "prod001";

//     prodIds.sort(); // e.g., [std001, std002, std005]
//     const lastId = prodIds[prodIds.length - 1]; // get std005
//     const nextNum = parseInt(lastId.slice(3)) + 1; // 6

//     return `prod${nextNum.toString().padStart(3, "0")}`; // std006
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     try {
//           const res = await api.get("/products"); // ✅ fetch all
//           const newId = generateNextId(res.data); // ✅ generate ID

//           const newStudent = { ...form, id: newId };

//           await api.post("/products", newProducts); // ✅ add to DB

//           navigate("/", {
//             state: { toast: "Product added successfully!" },
//           });
//         } catch (err) {
//           console.error("Error adding product:", err);
//           alert("Failed to add product.");
//         }
//   };

//   return (
//     <div>
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Product Image Upload */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Product Image</label>
//           <input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//           />
//         </div>

//         {/* Product Name */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             placeholder="Enter product name"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             placeholder="Write short product description..."
//             rows="3"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Price & Stock */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-2">Price (₹)</label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               placeholder="Enter price"
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="flex-1">
//             <label className="block text-gray-700 font-medium mb-2">Stock Quantity</label>
//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={handleChange}
//               placeholder="Enter stock"
//               className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         {/* Category */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Category</label>
//           <select
//             name="category"
//             value={product.category}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           >
//             <option value="">Select category</option>
//             <option value="electronics">Electronics</option>
//             <option value="fashion">Fashion</option>
//             <option value="books">Books</option>
//             <option value="home">Home Appliances</option>
//             <option value="toys">Toys</option>
//           </select>
//         </div>

//         {/* Additional Info */}
//         <div>
//           <label className="block text-gray-700 font-medium mb-2">Additional Info</label>
//           <textarea
//             name="info"
//             value={product.info}
//             onChange={handleChange}
//             placeholder="Any other details..."
//             rows="2"
//             className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
//           >
//             Add Product
//           </button>
//         </div>
//       </form>
//     </div>

//     </div>
//   )
// }

// export default AddProducts

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Make sure this is your Axios instance

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    info: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const generateNextId = (products) => {
    const prodIds = products
      .map((p) => p.id)
      .filter((id) => /^prod\d{3}$/.test(id));

    if (prodIds.length === 0) return "prod001";

    prodIds.sort(); // e.g., [prod001, prod002]
    const lastId = prodIds[prodIds.length - 1];
    const nextNum = parseInt(lastId.slice(4)) + 1;

    return `prod${nextNum.toString().padStart(3, "0")}`;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("perform prevent default");
  //   try {
  //     const res = await api.get("/products"); // or /students if that's your actual collection
  //     console.log("got response");
  //     const newId = generateNextId(res.data);

  //     const newProduct = { ...product, id: newId };

  //     await api.post("/products", newProduct); // Make sure your backend accepts this

  //     navigate("/products", {
  //       state: { toast: "Product added successfully!" },
  //     });
  //   } catch (err) {
  //     console.error("Error adding product:", err);
  //     alert("Failed to add product.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.get("/products");
      const newId = generateNextId(res.data);

      let imageBase64 = "";
      if (product.image) {
        imageBase64 = await toBase64(product.image); // convert File → base64
      }

      const newProduct = {
        ...product,
        id: newId,
        image: imageBase64, // store as string
      };

      await api.post("/products", newProduct);

      navigate("/products", {
        state: { toast: "Product added successfully!" },
      });
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  // helper
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            
            className="block w-full text-sm text-gray-500 
             file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             cursor-pointer"
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        >
          <option value="">Select category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
          <option value="home">Home Appliances</option>
          <option value="toys">Toys</option>
        </select>
        <textarea
          name="info"
          placeholder="Additional Info"
          value={product.info}
          onChange={handleChange}
          className="w-full border px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;

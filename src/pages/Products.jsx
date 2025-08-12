// import React, { useEffect, useState, useRef } from 'react';
// import api from "../api";
// import { Link, useLocation } from "react-router-dom";
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

// const Products = () => {
//      const [students, setStudents] = useState([]);
//      const [searchTerm, setSearchTerm] = useState("");
//      const [viewStudent, setViewStudent] = useState(null);
//      const toastRef = useRef(null);
//      const location = useLocation();

//     const fetchStudents = async () => {
//     const res = await api.get("/students");
//     setStudents(res.data);
//   };

//     const showToast = (message, isError = false) => {
//     if (toastRef.current) {
//       const toastEl = toastRef.current;
//       toastEl.querySelector(".toast-body").textContent = message;

//       // Reset class
//       toastEl.classList.remove("text-bg-success", "text-bg-danger");
//       toastEl.classList.add(isError ? "text-bg-danger" : "text-bg-success");

//       const toast = new window.bootstrap.Toast(toastEl);
//       toast.show();
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//     if (location.state?.toast) {
//       showToast(location.state.toast);
//       // Clear the toast state from URL history
//       window.history.replaceState({}, document.title);
//     }
//   }, []);

//   const filteredStudents = students.filter(
//     (s) =>
//       s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       s.course.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container mt-4">
//       {/* Toast Container */}
//       <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
//         <div
//           className="toast align-items-center text-bg-success border-0"
//           role="alert"
//           aria-live="assertive"
//           aria-atomic="true"
//           ref={toastRef}
//         >
//           <div className="d-flex">
//             <div className="toast-body">Success!</div>
//             <Button
//               type="button"
//               className="btn-close btn-close-white me-2 m-auto"
//               data-bs-dismiss="toast"
//               aria-label="Close"
//             ></Button>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2>Student List</h2>
//         <Link to="/add" className="btn btn-primary">
//           ➕ Add Student
//         </Link>
//       </div>

//       {/* Bootstrap Search Bar */}
//       <div className="mb-3">
//         <TextField
//           label="Search by name, email or course..."
//           type="text"
//           className="form-control"
//           placeholder="Search by name, email or course..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <Table className="table table-bordered table-striped">
//         <TableHead className="table-light">
//           <TableRow>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Course</th>
//             <th>Actions</th>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredStudents.map((stu) => (
//             <TableRow key={stu.id}>
//               <TableCell>{stu.name}</TableCell>
//               <TableCell>{stu.email}</TableCell>
//               <TableCell>{stu.course}</TableCell>
//               <TableCell>
//                 <Button
//                   onClick={() => setViewStudent(stu)}
//                   className="btn btn-warning btn-sm me-2"
//                 >
//                   View
//                 </Button>
//                 <Link
//                   to={`/edit/${stu.id}`}
//                   className="btn btn-info btn-sm me-2"
//                 >
//                   Edit
//                 </Link>
//                 <Button
//                   onClick={() => handleDelete(stu.id)}
//                   className="btn btn-danger btn-sm"
//                 >
//                   Delete
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Bootstrap Modal for View */}
//       {viewStudent && (
//         <div className="modal show d-block" tabIndex="-1" role="dialog">
//           <div className="modal-dialog" role="document">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Student Details</h5>
//                 <Button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setViewStudent(null)}
//                 ></Button>
//               </div>
//               <div className="modal-body">
//                 <p>
//                   <strong>Name:</strong> {viewStudent.name}
//                 </p>
//                 <p>
//                   <strong>Email:</strong> {viewStudent.email}
//                 </p>
//                 <p>
//                   <strong>Course:</strong> {viewStudent.course}
//                 </p>
//               </div>
//               <div className="modal-footer">
//                 <Button
//                   onClick={() => setViewStudent(null)}
//                   className="btn btn-secondary"
//                 >
//                   Close
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Products

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



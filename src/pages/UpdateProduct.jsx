// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./UpdateProduct.css";

// export default function UpdateProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({ productname: "", price: "", address: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     axios.get(`https://django8-zvkr.onrender.com/api/products/${id}/`)
//       .then(res => setProduct(res.data))
//       .catch(err => setError("Failed to fetch product"));
//   }, [id]);

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`https://django8-zvkr.onrender.com/api/products/${id}/`, product);
//       setSuccess("Product updated successfully!");
//     } catch (err) {
//       setError("Update failed");
//     }
//   };

//   return (
//     <div className="update-product-container">
//       <h1>Update Product</h1>
//       <input
//         placeholder="Product Name"
//         value={product.productname}
//         onChange={(e) => setProduct({ ...product, productname: e.target.value })}
//       />
//       <input
//         placeholder="Price"
//         type="number"
//         value={product.price}
//         onChange={(e) => setProduct({ ...product, price: e.target.value })}
//       />
//       <input
//         placeholder="Address"
//         value={product.address}
//         onChange={(e) => setProduct({ ...product, address: e.target.value })}
//       />
//       <button onClick={handleUpdate}>Update</button>
//       <button className="cancel-button" onClick={() => navigate("/dashboard")}>Cancel</button>

//       {error && <p className="error">{error}</p>}
//       {success && <p className="success">{success}</p>}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/api/auth";  // ✅
import "./UpdateProduct.css";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ productname: "", price: "", address: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    axiosInstance.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(() => setError("Failed to fetch product"));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`products/${id}/`, product);
      setSuccess("Product updated successfully!");
    } catch (err) {
      setError("Update failed");
    }
  };

  return (
    <div className="update-product-container">
      {/* unchanged form */}
    </div>
  );
}

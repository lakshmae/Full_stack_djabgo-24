// // src/pages/Dashboard.jsx
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import AdminLayout from "../components/AdminLayout";
// import { SearchContext } from "../components/SearchContext";

// export default function Dashboard() {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({
//     productname: "",
//     price: "",
//     address: "",
//   });
//   const { searchTerm } = useContext(SearchContext);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("https://django8-zvkr.onrender.com/api/products/");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addProduct = async () => {
//     if (!newProduct.productname || !newProduct.price || !newProduct.address) {
//       alert("Please fill all fields");
//       return;
//     }
//     try {
//       await axios.post("https://django8-zvkr.onrender.com/api/products/", newProduct);
//       setNewProduct({ productname: "", price: "", address: "" });
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`https://django8-zvkr.onrender.com/api/products/${id}/`);
//       fetchProducts();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Filter products based on search term from context
//   const filteredProducts = products.filter((p) =>
//     p.productname.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <AdminLayout>
//       <h1>Add Product</h1>
//       <div className="add-product-form">
//         <input
//           placeholder="Product Name"
//           value={newProduct.productname}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, productname: e.target.value })
//           }
//         />
//         <input
//           placeholder="Price"
//           type="number"
//           value={newProduct.price}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, price: e.target.value })
//           }
//         />
//         <input
//           placeholder="Address"
//           value={newProduct.address}
//           onChange={(e) =>
//             setNewProduct({ ...newProduct, address: e.target.value })
//           }
//         />
//         <button onClick={addProduct}>Add Product</button>
//       </div>

//       <h2>Products</h2>
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Address</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredProducts.length === 0 ? (
//             <tr>
//               <td colSpan="4" style={{ textAlign: "center" }}>
//                 No products found
//               </td>
//             </tr>
//           ) : (
//             filteredProducts.map((p) => (
//               <tr key={p.id}>
//                 <td>{p.productname}</td>
//                 <td>{p.price}</td>
//                 <td>{p.address}</td>
//                 <td>
//                   <button className="update-btn">Update</button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deleteProduct(p.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </AdminLayout>
//   );
// }

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import { SearchContext } from "../components/SearchContext";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    price: "",
    address: "",
  });
  const { searchTerm } = useContext(SearchContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://django8-zvkr.onrender.com/api/products/");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = async () => {
    if (!newProduct.productname || !newProduct.price || !newProduct.address) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("https://django8-zvkr.onrender.com/api/products/", newProduct);
      setNewProduct({ productname: "", price: "", address: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://django8-zvkr.onrender.com/api/products/${id}/`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateClick = (id) => {
    navigate(`/update-product/${id}`);
  };

  const filteredProducts = products.filter((p) =>
    p.productname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1>Add Product</h1>
      <div className="add-product-form">
        <input
          placeholder="Product Name"
          value={newProduct.productname}
          onChange={(e) =>
            setNewProduct({ ...newProduct, productname: e.target.value })
          }
        />
        <input
          placeholder="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <input
          placeholder="Address"
          value={newProduct.address}
          onChange={(e) =>
            setNewProduct({ ...newProduct, address: e.target.value })
          }
        />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <h2>Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No products found
              </td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.productname}</td>
                <td>{p.price}</td>
                <td>{p.address}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdateClick(p.id)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="cart-btn"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminLayout>
  );
}

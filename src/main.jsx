// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './App.css';


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { CartProvider } from "./components/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import  App from './App';
// import './App.css';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import login from './pages/LoginPage.jsx'
// import App from './App.jsx'   
// /import Admin from './admin.jsx'

// import {AuthContextProvider} from './services/context/AuthContext.jsx';
// import { Home } from './services/context/home.jsx';
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthContextProvider>
//     <Home />
//     </AuthContextProvider>
//   </StrictMode>,
// )
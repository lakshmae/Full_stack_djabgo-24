// // src/services/api/auth.jsx
// import axios from "axios";

// const API_BASE = "https://django8-zvkr.onrender.com/api/";

// const axiosInstance = axios.create({
//   baseURL: API_BASE,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Attach token automatically
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) config.headers.Authorization = `Token ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export const login = async (username, password) => {
//   const res = await axios.post(`${API_BASE}login/`, { username, password });
//   localStorage.setItem("authToken", res.data.token);
//   localStorage.setItem("username", res.data.username);
//   return res.data;
// };

// export const signup = async (username, email, password) => {
//   const res = await axios.post(`${API_BASE}signup/`, { username, email, password });
//   return res.data;
// };

// export default axiosInstance;


import axios from "axios";

const API_BASE = "https://django8-zvkr.onrender.com/api/";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ keep consistent name
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (username, password) => {
  const res = await axiosInstance.post("login/", { username, password });
  if (res.data.token) {
    localStorage.setItem("token", res.data.token); // ✅ consistent key
    localStorage.setItem("username", res.data.username);
  }
  return res.data;
};

export const signup = async (username, email, password) => {
  const res = await axiosInstance.post("signup/", { username, email, password });
  return res.data;
};

export default axiosInstance;

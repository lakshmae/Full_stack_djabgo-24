// src/pages/AddUser.js
import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";
import "./AddUser.css";

export default function AddUser() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("https://django8-zvkr.onrender.com/api/users/", form);
      setMsg("User added successfully!");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setMsg("Failed to add user");
    }
  };
return (
  <AdminLayout>
    <div className="adduser-container">
      <h1>Add User</h1>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Add User</button>
      {msg && (
        <p className={msg.includes("successfully") ? "success" : "error"}>
          {msg}
        </p>
      )}
    </div>
  </AdminLayout>
);
}

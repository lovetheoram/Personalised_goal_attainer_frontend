// src/components/Layout/AuthLayout.jsx
import React from "react";
import Navbar from "../Navbar/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AuthLayout;

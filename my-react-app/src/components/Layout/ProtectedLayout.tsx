// src/components/Layout/ProtectedLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16 bg-gray-50">
        <Outlet /> {/* renders the nested protected page */}
      </main>
    </div>
  );
};

export default ProtectedLayout;

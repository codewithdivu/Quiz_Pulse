import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/adminSidebar";

const AdminLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <AdminSidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { useSelector } from "react-redux";
const AdminDashboard = () => {

  
  return (
    <div className="flex">
      <PageTitle title={'Dashboard'} />
      <AdminSidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminDashboard;

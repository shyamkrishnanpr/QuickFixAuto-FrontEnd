import React from "react";
import Users from "../../../components/admin/userManagement/Users";
import Navbar from "../../../components/admin/dashboard/Navbar";
import Sidebar from "../../../components/admin/dashboard/sidebar";

const UsersManagement = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Users />
      </div>
    </>
  );
};

export default UsersManagement;

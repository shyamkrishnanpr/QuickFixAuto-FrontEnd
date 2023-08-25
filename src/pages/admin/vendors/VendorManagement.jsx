import React from 'react'
import Vendors from '../../../components/admin/vendorManagement/Vendors'
import Navbar from "../../../components/admin/dashboard/Navbar";
import Sidebar from "../../../components/admin/dashboard/sidebar";

const VendorManagement = () => {
  return (
    <>
     <Navbar />
    <div className="flex">
      <Sidebar />
      <Vendors />
    </div>
      
    </>
  )
}

export default VendorManagement

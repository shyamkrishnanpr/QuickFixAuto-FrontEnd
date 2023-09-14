import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import {Link} from 'react-router-dom'
import Navbar from "./Navbar";

const ConfirmationPage = (data) => {
  const location = useLocation();
  const { selectedDate, selectedTimeSlot, selectedAddress } = location?.state;

  const selectedService = useSelector((state) => state.booking.selectService);
  console.log(selectedService,"services")
  return <>
  <Navbar/>
   <div className="max-w-3xl mx-auto mt-8 p-4">
      <div className="bg-red-800 text-white p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Succefully booked ....</h2>
        <p className="text-lg">
          Thank you for choosing our service. Your booking details are confirmed.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
       {selectedService.map((service,index)=>(
        <div className="bg-white p-6 rounded-lg shadow-md ">
          <h3 className="text-xl font-semibold mb-4">Service Details</h3>
          <p className="mb-2">Category: {service.categoryId?.category}</p>
          <p className="mb-2">Subcategory: {service.subCategoryId.subCategory}</p>
          <p className="mb-2">Service Center: {service.vendorId.centerName}</p>
          <p className="mb-2">Address: {service.vendorId.address[0].area},{service.vendorId.address[0].city}</p>
        
        </div>
       ))}
        

     
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Booking Details</h3>
          <p className="mb-2">Date: {selectedDate}</p>
          <p className="mb-2">Time Slot: {selectedTimeSlot}</p>
          <p className="mb-2">Address: {selectedAddress}</p>
        </div>
      </div>

    
      <Link
        to="/user/bookingHistory"
        className="mt-6 block bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center font-semibold"
      >
        View Booking History
      </Link>
    </div>
    
  </>;
};

export default ConfirmationPage;

import React, { useEffect, useState } from "react";
import { fetchOrdersApi } from "../../services/vendorAPI";

const BookingManagement = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
   fetchOrdersApi()
   .then((data)=>{
    setOrders(data)
   })
   .catch((error)=>{
    console.log(error)
   })
  }, []);
  console.log(orders,"at page")
  return (
    <>
     
     <div className="max-w-3xl mx-auto p-4">
  <h1 className="text-3xl font-bold mb-4">Vendor Order Page</h1>
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Vendor Information</h2>
      <p className="text-gray-600">Vendor Name: Your Vendor Name</p>
      <p className="text-gray-600">Vendor Address: Vendor Address, City</p>
      <p className="text-gray-600">Contact Email: vendor@example.com</p>
    </div>
    <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
    <ul>
      {orders.map((order) => (
        <li key={order._id} className="mb-6 p-4 border rounded-lg">
          <div className="mb-2">
            <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
            <p className="text-gray-600">User: {order.userName}</p>
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Date: {order.selectedDate}</p>
            <p className="text-gray-600">Time Slot: {order.selectedTimeSlot}</p>
            <p className="text-gray-600">Address: {order.selectedAddress}</p>
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
            <p className="text-gray-600">Payment Status: {order.paymentStatus}</p>
            <p className="text-gray-600">Status: {order.status}</p>
          </div>
          <h4 className="text-xl font-semibold mt-4 mb-2">Service Details</h4>
          <p className="text-gray-600">Price: {order.service.price}</p>
          <p className="text-gray-600">Description: {order.service.description}</p>
          <p className="text-gray-600">Fuel Option: {order.service.fuelOption}</p>
          <h4 className="text-xl font-semibold mt-4 mb-2">Category and Subcategory</h4>
          <p className="text-gray-600">Category: {order.service.category}</p>
          <p className="text-gray-600">Subcategory: {order.service.subcategory}</p>
        </li>
      ))}
    </ul>
  </div>
</div>

    </>
  );
};

export default BookingManagement;

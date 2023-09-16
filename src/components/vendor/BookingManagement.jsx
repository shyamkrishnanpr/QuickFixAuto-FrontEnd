import React, { useEffect, useState } from "react";
import { fetchOrdersApi, updateOrderStatusApi } from "../../services/vendorAPI";

const BookingManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchOrdersApi()
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleStatusFilter = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredOrders = selectedStatus
    ? orders.filter((order) => order.status === selectedStatus)
    : orders;

  const selectOrder = (orderId) => {
    setSelectedOrderId(orderId);
    setNewStatus("");
  };

  const handleChangeStatus = () => {
    if (!selectedOrderId || !newStatus) {
      return;
    }

    updateOrderStatusApi(selectedOrderId, newStatus)
      .then((response) => {
        if (response.status === 200) {
          const updatedOrders = orders.map((order) => {
            if (order._id === selectedOrderId) {
              return { ...order, status: newStatus };
            } else {
              return order;
            }
          });
          setOrders(updatedOrders);

          setSelectedOrderId(null);
          setNewStatus("");
        } else {
          console.log("failed to update");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isSaveButtonEnabled = selectedOrderId !== null && newStatus !== "";

  function formatDate(dateString) {
    const rawDate = new Date(dateString);
    return `${rawDate.getFullYear()}-${String(rawDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(rawDate.getDate()).padStart(2, "0")}`;
  }

  return (
    <>
      <div className="bg-gray-100 m-8 w-full min-h-screen">
        <select
          className="block appearance-none w-full bg-gray-200 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={handleStatusFilter}
        >
          <option value="">All</option>
          <option value="booked">Booked</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        <div className="max-w-screen-xl mx-auto mt-2 p-4">
          {filteredOrders?.map((order) => (
            <div key={order._id} className="mb-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="grid grid-cols-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="col-span-12 md:col-span-1 lg:col-span-1 mb-4">
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <div className="mb-2">
                        <p className="text-gray-600">Name: {order.userName}</p>
                        <p className="text-gray-600">
                          Phone number: {order.phoneNumber}
                        </p>
                        <p className="text-gray-600">Email : {order.email}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-gray-600">
                          Date: {formatDate(order.selectedDate)}
                        </p>
                        <p className="text-gray-600">
                          Time Slot: {order.selectedTimeSlot}
                        </p>
                        <p className="text-gray-600">
                          Address: {order.selectedAddress}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-gray-600">
                          Payment Status: {order.paymentStatus}
                        </p>
                        <p className="text-blue-500 text-xl">
                          Service status: {order.status}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-1 lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <h4 className="text-xl font-semibold mb-2">
                        Service Details
                      </h4>
                      <p className="text-gray-600">
                        Vehicle: {order.service.vehicleBrand}{" "}
                        {order.service.VehicleModel}
                      </p>

                      <p className="text-gray-600">
                        Category: {order.service.category}
                      </p>
                      <p className="text-gray-600">
                        Subcategory: {order.service.subcategory}
                      </p>
                      <p className="text-gray-600">
                        Price: {order.service.price}
                      </p>
                    </div>

                    <button
                      className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 mt-2 px-4 rounded"
                      onClick={() => selectOrder(order._id)}
                    >
                      Change Status
                    </button>
                    {selectedOrderId === order._id && (
                      <div className="mt-2">
                        <select
                          onChange={(e) => {
                            e.preventDefault();
                            setNewStatus(e.target.value);
                          }}
                          value={newStatus}
                        >
                          <option value="">Select Status</option>
                          <option value="booked">Booked</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          className={`${
                            isSaveButtonEnabled
                              ? "bg-blue-500 hover:bg-blue-700"
                              : "bg-gray-400 cursor-not-allowed"
                          } text-white font-bold py-2 px-4 rounded mt-2`}
                          onClick={handleChangeStatus}
                          disabled={!isSaveButtonEnabled}
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingManagement;

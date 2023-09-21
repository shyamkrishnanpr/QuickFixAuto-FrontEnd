import React from "react";
import OrderHistory from "../../../components/user/OrderHistory";
import Navbar from "../../../components/user/Navbar";

const OrderHistoryPage = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <OrderHistory />
        </div>
      </div>
    </>
  );
};

export default OrderHistoryPage;

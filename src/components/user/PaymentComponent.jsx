import React, { useState } from "react";

const PaymentComponent = ({ onPlaceOrder, onPlaceOrders }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handlePlaceOrder = async () => {
    setIsLoading(true);

    try {
      await onPlaceOrder("cash");
    } catch (error) {
      console.error("Error while placing order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" w-full ml-2 mt-3 p-4 border rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Pay After Service</h3>
        <div className="mb-4"></div>
        <button
          className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
          onClick={handlePlaceOrder}
          disabled={isLoading}
        >
          {isLoading ? "Placing Order..." : "Confirm Order (Pay Cash)"}
        </button>
        <div className="mt-2">
          <h3 className="text-xl font-semibold mb-4">Pay Now</h3>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onPlaceOrders}
          >
            Pay Now (Razorpay)
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;

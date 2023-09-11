import React, { useState } from 'react'

const PaymentComponent = ({ onPlaceOrder, onPayNow }) => {

    const [paymentMethod, setPaymentMethod] = useState('online');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    // Simulate placing the order
    setIsLoading(true);
    // You can implement your order placement logic here
    // Replace the following setTimeout with your actual logic
    setTimeout(() => {
      setIsLoading(false);
      onPlaceOrder(paymentMethod);
    }, 2000); // Simulate a delay of 2 seconds
  };

  const handlePayNow = () => {
    // Trigger the Razorpay payment process here
    onPayNow();
  };
  return (
    <>
       <div className="bg-gray-100 w-8/12 ml-2 mt-3 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Pay After Service</h3>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="payOnline"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === 'online'}
            onChange={() => setPaymentMethod('online')}
          />
          <label htmlFor="payOnline" className="ml-2 text-gray-700">Pay Online</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="radio"
            id="payCash"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
          <label htmlFor="payCash" className="ml-2 text-gray-700">Pay Cash</label>
        </div>
      </div>
      <button
        className={`bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md ${
          isLoading ? 'cursor-not-allowed' : ''
        }`}
        onClick={handlePlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
      {paymentMethod === 'online' && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handlePayNow}
          >
            Pay Now (Razorpay)
          </button>
        </div>
      )}
    </div>
    </>
  )
}

export default PaymentComponent

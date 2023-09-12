import React, { useState } from 'react'

const PaymentComponent = ({ onPlaceOrder}) => {

   
  const [isLoading, setIsLoading] = useState(false);
  const handlePlaceOrder = async () => {
    setIsLoading(true);
  
    try {

      await onPlaceOrder('cash'); 
  
     
    } catch (error) {
     
      console.error('Error while placing order:', error);
      
    } finally {
      setIsLoading(false); 
    }
  };
  



  
  return (
    <>
      <div className=" w-full ml-2 mt-3 p-4 border rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Pay After Service</h3>
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="payCash"
            name="paymentMethod"
            value="cash"
            checked
            onChange={() => {}}
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
        {isLoading ? 'Placing Order...' : 'Confirm Order (Pay Cash)'}
      </button>
    </div>
    </>
  )
}

export default PaymentComponent

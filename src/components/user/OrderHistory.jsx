import React from 'react'
import OngoingOrders from './OngoingOrders'
import CompletedOrders from './CompletedOrders'

const OrderHistory = () => {
  return (
    <>
     <h1 className="text-3xl font-semibold text-center text-gray-600 mt-4 mb-8">ORDER HISTORY</h1>
     
     <div className="flex justify-center  ">
     <div className="w-1/2 px-4">
          <OngoingOrders />
        </div>
        <div className="w-1/2 px-4">
          <CompletedOrders />
        </div>
      </div>
       
   
      
      
    </>
  )
}

export default OrderHistory

import React, { useEffect, useState } from 'react'

import { fetchCompletedOrdersApi } from '../../services/userAPI'

const CompletedOrders = () => {

    const[completedOrders,setCompletedOrders] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchOrders=()=>{
            fetchCompletedOrdersApi().then((data)=>
            setCompletedOrders(data)).catch((error)=>{
                console.log(error)
            })
        }
        fetchOrders()
    },[])

  return (
    <>
      <div>
      <h2 className="text-xl text-red-500 font-semibold mb-2">COMPLETED ORDERS</h2>
      <hr/>
      <ul className="space-y-4 mt-2">
        {completedOrders.map((order) => (
          <li
            key={order._id}
            className="bg-white shadow-md  rounded-md overflow-hidden"
          >
            <div className="flex justify-between p-4">
              {/* Left side (vehicle details, category, price) */}
              <div>
                <p className="font-semibold text-lg">Category: {order.categoryName}</p>
                <p>Vehicle: {order.vehicleBrand.join(', ')} - {order.vehicleModel.join(', ')}</p>
                <p>Price: {order.Price}</p>
              </div>
              
              {/* Right side (status and cancel button) */}
              <div className="text-right">
                <p>Status: {order.status}</p>
             
              </div>
            </div>
            
            {/* Left bottom (slot and date) */}
            <div className="bg-gray-100 px-4 py-2">
              <p>Slot: {order.selectedTimeSlot}</p>
              <p>Date: {new Date(order.selectedDate).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default CompletedOrders

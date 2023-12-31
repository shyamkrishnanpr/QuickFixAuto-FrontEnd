import React, { useEffect, useState } from 'react'
import { fetchRunningOrdersApi,cancelOrderApi } from '../../services/userAPI'
import ConfirmationDialog from '../util/ConfirmationDialog'

const OngoingOrders = () => {
    const [onGoingOrders,setOngoingOrders] = useState([])
    const [loading,setLoading] = useState(true)
    const [selectedOrder,setSelectedOrder] = useState(null)

    useEffect(()=>{
        const fetchOrders = ()=>{
          
                 fetchRunningOrdersApi().then((data)=>
                 setOngoingOrders(data)
                 ).catch((error)=>{
                    console.log(error)
                 })

        }
        fetchOrders()
    },[])

    const handleCancelClick = (orderId)=>{
      setSelectedOrder(orderId)
    }

    const confirmCancelOrder = async()=>{
      if(selectedOrder){
        try {
          console.log(selectedOrder,"at ok")
          const canceledOrder = await cancelOrderApi(selectedOrder)
          setOngoingOrders((prevOrders)=>{
          return prevOrders.filter((orders)=>orders._id!==canceledOrder._id)
          })
          setSelectedOrder(null)
        } catch (error) {
          console.log(error)
        }
      }
    }

    const handleCancleOrder = ()=>{
      setSelectedOrder(null)
    }
    

    
  return (
    <>
        <div>
      <h2 className="text-xl text-red-500 font-semibold mb-2">ONGOING ORDERS</h2>
      <hr/>
      <ul className="space-y-4 mt-2 ">
        {onGoingOrders.map((order) => (
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
                {order.status === 'booked' && (
                  <button
                    className="bg-red-500 mt-5 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={()=>handleCancelClick(order._id)}
                  >
                    Cancel
                  </button>
                )}

                {selectedOrder &&(
                  <ConfirmationDialog
                  message="Are you want to cancel this order"
                  onConfirm={confirmCancelOrder}
                  onCancel={handleCancleOrder}
                  />
                )}
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

export default OngoingOrders

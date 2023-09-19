import React from 'react'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  return (
    <>
      <div className="bg-gradient-to-tr from-blue-500 to-black text-grey min-h-screen w-48 p-4">
      <h2 className="text-lg text-gray-100 font-bold mb-4">MANAGEMENT</h2>
      <ul className="space-y-2">
      <li>
        <Link to="/vendor/dashboard" className="block text-white hover:bg-blue-900 p-2 rounded">
            DASHBOARD
          </Link>
        </li>
        <li>
        <Link to="/vendor/profile" className="block  text-white hover:bg-blue-900 p-2 rounded">
            PROFILE
          </Link>
        </li>
        <li>
        <Link to="/vendor/services" className="block  text-white hover:bg-blue-900 p-2 rounded">
            SERVICE
          </Link>
        </li>
        <li>
        <Link to="/vendor/availability" className="block  text-white hover:bg-blue-900 p-2 rounded">
            AVAILABILITY
          </Link>
        </li>
        <li>
        <Link to="/vendor/orders" className="block  text-white hover:bg-blue-900 p-2 rounded">
            ORDERS
          </Link>
        </li>
        <li>
        <Link to="/vendor/chat" className="block  text-white hover:bg-blue-900 p-2 rounded">
            CHAT
          </Link>
        </li>
        
       
        
     
      </ul>
    </div>




    </>
  )
}

export default Sidebar

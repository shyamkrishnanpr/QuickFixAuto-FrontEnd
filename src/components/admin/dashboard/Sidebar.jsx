import React from 'react'
import {Link} from 'react-router-dom'


const Sidebar = () => {
  return (
    <>
    
      <div className="bg-gradient-to-tr from-gray-800 to-gray-300 text-grey min-h-screen w-2/12 p-4">
      <h2 className="text-lg text-gray-800 font-bold mb-4">MANAGEMENT</h2>
      <ul className="space-y-2">
      <li>
        <Link to="/admin" className="block text-white hover:bg-gray-600 p-2 rounded">
            DASHBOARD
          </Link>
        </li>
        <li>
        <Link to="/admin/users" className="block  text-white hover:bg-gray-600 p-2 rounded">
            USER
          </Link>
        </li>
        <li>
        <Link to="/admin/vendors" className="block  text-white hover:bg-gray-600 p-2 rounded">
            VENDOR
          </Link>
        </li>  
        <li>
        <Link to="/admin/category" className="block  text-white hover:bg-gray-600 p-2 rounded">
            CATEGORY
          </Link>
        </li>
        <li>
        <Link to="/admin/subCategory" className="block  text-white hover:bg-gray-600 p-2 rounded">
            SUB CATEGORY
          </Link>
        </li>
        <li>
        <Link to="/admin/vehicles" className="block  text-white hover:bg-gray-600 p-2 rounded">
            VEHICLE
          </Link>
        </li>
        <li>
        <Link to="/admin/services" className="block  text-white hover:bg-gray-600 p-2 rounded">
            SERVICES
          </Link>
        </li>
        
     
      </ul>
    </div>
    </>
  )
}

export default Sidebar

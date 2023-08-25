import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/sidebar'
import Vehicles from '../../../components/admin/vehicleManagement/Vehicles'

const VehicleManagement = () => {
  return (
    <>
         <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <Vehicles/>
    </div>
    </>
  )
}

export default VehicleManagement

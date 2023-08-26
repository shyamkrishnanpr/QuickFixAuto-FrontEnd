import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/sidebar'
import Service from '../../../components/admin/serviceManagement/Service'

const ServiceManagement = () => {
  return (
    <>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <Service/>
      </div>
    </>
  )
}

export default ServiceManagement

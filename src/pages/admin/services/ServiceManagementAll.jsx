import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/sidebar'
import ServiceList from '../../../components/admin/serviceManagement/ServiceList'
const ServiceManagementAll = () => {
  return (
    <>
      <Navbar/>
      <div className='flex'>
       <Sidebar/>
       <ServiceList/>
      </div>
    </>
  )
}

export default ServiceManagementAll

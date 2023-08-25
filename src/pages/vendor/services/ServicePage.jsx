import React from 'react'
import Service from '../../../components/vendor/Service'
import Navbar from '../../../components/vendor/Navbar'
import Sidebar from '../../../components/vendor/Sidebar'

const ServicePage = () => {
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

export default ServicePage

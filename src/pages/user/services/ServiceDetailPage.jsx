import React from 'react'
import Navbar from '../../../components/user/Navbar'
import ServiceDetails from '../../../components/user/ServiceDetails'

const ServiceDetailPage = () => {
  return (
    <>
     <div className=" min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ServiceDetails />
      </div>
    </div>
    </>
  )
}

export default ServiceDetailPage

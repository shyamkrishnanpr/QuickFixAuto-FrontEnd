import React from 'react'
import Availability from '../../../components/vendor/Availability'
import Navbar from '../../../components/vendor/Navbar'
import Sidebar from '../../../components/vendor/Sidebar'

const AvailabilityPage = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
        <Sidebar/>
        <Availability/>
    </div>
      
    </>
  )
}

export default AvailabilityPage

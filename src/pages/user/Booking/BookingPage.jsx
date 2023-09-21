import React from 'react'
import Booking from '../../../components/user/Booking'
import Navbar from '../../../components/user/Navbar'
const BookingPage = () => {
  return (
    <>
  


    <div className=" min-h-screen">
      <Navbar />
      <div className="container  mx-auto px-4 py-8">
      <Booking/>
      
      </div>
    </div>
      
    </>
  )
}

export default BookingPage

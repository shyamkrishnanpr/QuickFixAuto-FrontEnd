import React from 'react'
import BookingManagement from '../../../components/vendor/BookingManagement'
import Navbar from '../../../components/vendor/Navbar'
import Sidebar from '../../../components/vendor/Sidebar'
const BookingPage = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
        <Sidebar/>
    <BookingManagement/>
    </div>
      
    </>
  )
}

export default BookingPage

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchServiceDetailsAsync } from '../../store/reducers/user/UserServiceBookingSlice'
import { selectService } from '../../store/reducers/user/UserServiceBookingSlice'


const Booking = () => {
  const selectedService = useSelector((state)=>state.booking.selectService)
  
  const dispatch = useDispatch()
    const {serviceId} = useParams()
    console.log(serviceId,"in page")
    useEffect(()=>{
        dispatch(fetchServiceDetailsAsync(serviceId))

    },[])
   
    console.log(selectedService,"at abcde")
  return (
    <>
      <h2>booking</h2>


    </>
  )
}

export default Booking

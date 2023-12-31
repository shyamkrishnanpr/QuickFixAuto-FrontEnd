import React from 'react'
import {Route,Routes} from 'react-router'
import UserVerification from '../auth/userAuth'
import RegistrationPage from '../pages/user/Registration/RegistrationPage'
import OtpPage from '../pages/user/Otp/OtpPage'
import DashBoardPage from '../pages/user/Dashboard/DashBoardPage'
import LoginPage from '../pages/user/Login/LoginPage'
import ProfilePage from '../pages/user/Profile/ProfilePage'
import ServicePage from '../pages/user/services/ServicePage'
import ServiceDetailPage from '../pages/user/services/ServiceDetailPage'
import ForgotPasswordPage from '../pages/user/ForgotPassword/ForgotPasswordPage'
import ResetPasswordPage from '../pages/user/ResetPassword/ResetPasswordPage'
import BookingPage from '../pages/user/Booking/BookingPage'
import ConfirmationPages from "../pages/user/Confirmation/ConfirmationPage"
import OrderHistoryPage from '../pages/user/Orders/OrderHistoryPage'
import BookingFailurePage from '../pages/user/Booking/BookingFailurePage'
import Error404 from '../pages/common/Error404'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserVerification><RegistrationPage/></UserVerification>} />
        <Route path='/otp' element={<UserVerification><OtpPage/></UserVerification>} />
        <Route path='/dashboard' element={<DashBoardPage/>} />
        <Route path='/login' element={<UserVerification><LoginPage/></UserVerification>} />
        <Route path='/profile' element={<UserVerification><ProfilePage/></UserVerification>} />
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/resetPassword/:email' element={<ResetPasswordPage/>}/>

        <Route path='/services' element={<ServicePage/>} />
        <Route path='/serviceDetails/:serviceId' element={<ServiceDetailPage/>} />
        <Route path='/booking/:serviceId' element={<UserVerification><BookingPage/></UserVerification>}/>
        <Route path='/confirmPage' element={<UserVerification><ConfirmationPages/></UserVerification>}/>
        <Route path='/failurePage' element={<UserVerification><BookingFailurePage/></UserVerification>}/>
        <Route path='/orderHistory' element={<UserVerification><OrderHistoryPage/></UserVerification>}/>

        <Route path='/*' element={<Error404/>}/>
        

        
       


      
    </Routes>
  )
}

export default UserRoutes

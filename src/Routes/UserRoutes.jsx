import React from 'react'
import {Route,Routes} from 'react-router'
import UserVerification from '../auth/userAuth'
import RegistrationPage from '../pages/user/Registration/RegistrationPage'
import OtpPage from '../pages/user/Otp/OtpPage'
import DashBoardPage from '../pages/user/Dashboard/DashBoardPage'
import LoginPage from '../pages/user/Login/LoginPage'
import ProfilePage from '../pages/user/Profile/ProfilePage'
import ServicePage from '../pages/user/services/ServicePage'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<UserVerification><RegistrationPage/></UserVerification>} />
        <Route path='/otp' element={<UserVerification><OtpPage/></UserVerification>} />
        <Route path='/dashboard' element={<DashBoardPage/>} />
        <Route path='/login' element={<UserVerification><LoginPage/></UserVerification>} />
        <Route path='/profile' element={<UserVerification><ProfilePage/></UserVerification>} />
        <Route path='/services' element={<ServicePage/>} />
        

      
    </Routes>
  )
}

export default UserRoutes

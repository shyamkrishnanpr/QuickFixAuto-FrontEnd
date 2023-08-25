import React from 'react'
import {Route,Routes} from 'react-router'
import RegistrationPage from '../pages/user/Registration/RegistrationPage'
import OtpPage from '../pages/user/Otp/OtpPage'
import DashBoardPage from '../pages/user/Dashboard/DashBoardPage'
import LoginPage from '../pages/user/Login/LoginPage'
import ProfilePage from '../pages/user/Profile/ProfilePage'

const UserRoutes = () => {
  return (
    <Routes>
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/otp' element={<OtpPage/>} />
        <Route path='/dashboard' element={<DashBoardPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />

      
    </Routes>
  )
}

export default UserRoutes

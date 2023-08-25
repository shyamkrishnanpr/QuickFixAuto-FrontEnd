import React from 'react'
import Profile from '../../../components/vendor/Profile'
import Navbar from '../../../components/vendor/Navbar'
import Sidebar from '../../../components/vendor/Sidebar'

const ProfilePage = () => {
  return (
    <>
      <Navbar/>
   
    <div className='flex'>
    <Sidebar/>
    <Profile/>
    
    </div>
    
    </>
  )
}

export default ProfilePage

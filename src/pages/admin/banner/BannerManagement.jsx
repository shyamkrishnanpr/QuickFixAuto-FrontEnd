import React from 'react'
import Banners from '../../../components/admin/bannerManagement/Banners'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/sidebar'

const BannerManagement = () => {
  return (
    <>
        <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <Banners/>
    </div>
    </>
  )
}

export default BannerManagement

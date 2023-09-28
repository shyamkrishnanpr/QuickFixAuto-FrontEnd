import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/Sidebar'
import DashboardAdmin from '../../../components/admin/dashboard/DashboardAdmin'

const Dashboard = () => {
  return (
    <>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <DashboardAdmin/>
      </div>
     
      
    </>
  )
}

export default Dashboard

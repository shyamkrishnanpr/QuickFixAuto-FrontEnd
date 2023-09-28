import React from 'react'

import Navbar from '../../../components/vendor/Navbar'
import Sidebar from '../../../components/vendor/Sidebar'
import DashBoard from '../../../components/vendor/DashBoard'

const DashBoardPage = () => {
  return (
    <>
    <Navbar/>
   

    <div className='flex'>
        <Sidebar/>
    <DashBoard/>
    </div>
      
    </>
  )
}

export default DashBoardPage

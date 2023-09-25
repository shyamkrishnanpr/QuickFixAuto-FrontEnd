import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/Sidebar'
import Category from '../../../components/admin/categoryManagement/Category'

const CategoryManagement = () => {
  return (
    <>
    <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <Category/>
    </div>
    

      
    </>
  )
}

export default CategoryManagement

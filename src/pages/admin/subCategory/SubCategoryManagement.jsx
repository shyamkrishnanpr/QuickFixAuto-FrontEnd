import React from 'react'
import Navbar from '../../../components/admin/dashboard/Navbar'
import Sidebar from '../../../components/admin/dashboard/Sidebar'
import SubCategory from '../../../components/admin/subCategoryManagement/SubCategory'

const SubCategoryManagement = () => {
  return (
    <>
       <Navbar/>
    <div className='flex'>
    <Sidebar/>
    <SubCategory/>
    </div>
    </>
  )
}

export default SubCategoryManagement

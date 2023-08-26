import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Login from '../pages/admin/login/Login'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import CategoryManagement from '../pages/admin/category/CategoryManagement'
import SubCategoryManagement from '../pages/admin/subCategory/SubCategoryManagement'
import VehicleManagement from '../pages/admin/vehicles/vehicleManagement'
import UsersManagement from '../pages/admin/users/UsersManagement'
import VendorManagement from '../pages/admin/vendors/VendorManagement'
import ServiceManagement from '../pages/admin/services/ServiceManagement'
import AdminAuth from '../auth/adminAuth'
const AdminRoutes = () => {
  return (

            <Routes>
                <Route path='/login' element={<AdminAuth><Login /></AdminAuth>  } />
                <Route path='/' element={<AdminAuth><Dashboard /></AdminAuth>  } />
                <Route path='/Category' element={<CategoryManagement /> } />
                <Route path='/SubCategory' element={<SubCategoryManagement /> } />
                <Route path='/Vehicles' element={<VehicleManagement /> } />
                <Route path='/users' element={<UsersManagement /> } />
                <Route path='/vendors' element={<VendorManagement /> } />
                <Route path='/services' element={<ServiceManagement /> } />



            </Routes>
   
  )
}

export default AdminRoutes

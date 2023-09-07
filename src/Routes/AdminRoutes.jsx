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
import ServiceManagementAll from '../pages/admin/services/ServiceManagementAll'
import AdminAuth from '../auth/adminAuth'
const AdminRoutes = () => {
  return (

            <Routes>
                <Route path='/login' element={<AdminAuth><Login /></AdminAuth>  } />
                <Route path='/' element={<AdminAuth><Dashboard /></AdminAuth>  } />
                <Route path='/Category' element={<AdminAuth><CategoryManagement /></AdminAuth> } />
                <Route path='/SubCategory' element={<AdminAuth><SubCategoryManagement /></AdminAuth> } />
                <Route path='/Vehicles' element={<AdminAuth><VehicleManagement /></AdminAuth> } />
                <Route path='/users' element={<AdminAuth><UsersManagement /></AdminAuth> } />
                <Route path='/vendors' element={<AdminAuth><VendorManagement /></AdminAuth> } />
                <Route path='/services' element={<AdminAuth><ServiceManagement /></AdminAuth> } />
                <Route path='/servicesList' element={<ServiceManagementAll/> } />




            </Routes>
   
  )
}

export default AdminRoutes

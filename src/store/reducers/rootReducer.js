import {combineReducers} from '@reduxjs/toolkit'
import tokenReducer from '../reducers/admin/tokenReducer'
import categoryReducer from '../reducers/admin/categorySlice'
import subCategoryReduce from '../reducers/admin/subCategorySlice'
import vendorAuth from '../reducers/vendor/AuthSlice'
import userAuth from '../reducers/user/UserRegistrationSlice'
import booking from '../reducers/user/UserServiceBookingSlice'



const rootReducer = combineReducers({
    token:tokenReducer,
    category:categoryReducer,
    subCategory:subCategoryReduce,
    vendorAuth:vendorAuth,
    userAuth:userAuth,
    booking:booking
    
  

})

export default rootReducer
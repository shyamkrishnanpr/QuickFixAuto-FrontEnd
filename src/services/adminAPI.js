import axios from "../Axios/axios";

export const adminLoginApi = async(email,password)=>{
    try {
        const response = await axios.post('/admin/login',{
            email,password
        });
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchCategoryApi = async()=>{
    try {
        const response = await axios.get('/admin/category')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const addCategoryApi = async(category)=>{
    try {
        const response = await axios.post('/admin/addCategory',{category}) 
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const editCategoryApi = async(id,newName)=>{
    try {
        const response = await axios.put(`/admin/editCategory/${id}`,{newName})
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategoryApi = async(id) =>{
    try {
        const response = await axios.delete(`/admin/deleteCategory/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const fetchSubCategoryApi = async()=>{
    try {
        const response = await axios.get(`/admin/subCategory`)
        return response.data     
    } catch (error) {
        console.log(error)
    }
}

export const addSubCategoryApi = async(subCategory,categoryId)=>{
    try {
        const response = await axios.post('/admin/addSubCategory',{subCategory,categoryId})
        return response.data
    } catch (error) {
        console.log(error)
    }
}


export const deleteSubCategoryApi = async(id)=>{
    try {
        const response = await axios.delete(`/admin/deleteSubCategory/${id}`)
        return response.data
    } catch (error) {
        console.log("error in api",error)
    }
}

export const editSubCategoryApi = async(id,newName)=>{
    try {
        const response = await axios.put(`/admin/editSubCategory/${id}`,{newName})
               return response.data
    } catch (error) {
        console.log("error in editApi",error)
    }
}



export const fetchVehiclesApi = async()=>{
    try {
        const response = await axios.get(`/admin/vehicles`)
        return response.data
    } catch (error) {
        console.log("error in vehicle fetch",error)
    }
}

export const addVehicleApi = async(vehicleData)=>{
    console.log(vehicleData)
    try {
        const response = await axios.post(`/admin/addVehicle`,vehicleData,{headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        return response.data
    } catch (error) {
        console.log("error in adding vehicle",error)
    }
}


export const updateVehicleApi = async(vehicleId,vehicleData)=>{
    try {
        const response = await axios.put(`/admin/updateVehicle/${vehicleId}`,vehicleData)
        return response.data
    } catch (error) {
        console.log("error in updating vehicle",error)
    }
}

export const deleteVehicleApi = async(vehicleId)=>{
    try {
        const response = await axios.delete(`/admin/deleteVehicle/${vehicleId}`)
    } catch (error) {
        console.log("error in delete vehicle",error)
    }
}

export const blockVehicleApi = async(vehicleId,blocked)=>{
    try {
        const response = await axios.patch(`/admin/blockVehicle/${vehicleId}`,{blocked:!blocked})
        return response.data
    } catch (error) {
        console.log("error in toggle",error)
    }
}

export const fetchUsersApi = async()=>{
    try {
        const response = await axios.get(`/admin/users`)
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}

export const blockUserApi = async(userId,newBlockedStatus)=>{
    try {
        const response = await axios.patch(`/admin/users/${userId}`,{
            isBlock:newBlockedStatus
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}

export const fetchVendorsApi = async()=>{
    try {
        const response = await axios.get(`/admin/vendors`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const blockVendorApi = async(vendorId,newBlockedStatus)=>{
    try {
        const response = await axios.patch(`/admin/vendors/${vendorId}`,{
            isBlock:newBlockedStatus
        })
        return response.data
        
    } catch (error) {
        console.log(error)
    }
}


export const fetchServiceApi = async()=>{
    try {
        const response = await axios.get(`/admin/getServices`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const verifyServiceApi = async(serviceId)=>{
    try {
        const response = await axios.patch(`/admin/verifyService/${serviceId}`)
        console.log(response.data,"in api  veri")
        return response.data
    } catch (error) {
       console.log(error)
    }
}




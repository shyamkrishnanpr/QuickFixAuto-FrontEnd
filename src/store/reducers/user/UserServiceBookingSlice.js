import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { fetchServiceDetailApi } from "../../../services/userAPI";

export const fetchServiceDetailsAsync = createAsyncThunk(
    "booking/fetchServiceDetails",
    async(serviceId,thunkAPI)=>{
        try {
            const response = await fetchServiceDetailApi(serviceId)
            console.log(response,"at slice")
            return response
            
        } catch (error) {
            console.log(error)
        }
    }
)



const initialState = {
    selectService:[],
    loading:false
}

const bookingSlice = createSlice({
    name:'booking',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchServiceDetailsAsync.fulfilled,(state,action)=>{
            state.selectService=action.payload
        })
    }

})


export const {selectService} = bookingSlice.actions
export default bookingSlice.reducer
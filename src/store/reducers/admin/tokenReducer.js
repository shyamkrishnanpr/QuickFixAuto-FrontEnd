import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    token:null,
    email:null,

}
const tokenSlice = createSlice({
    name:"token",
    initialState,
    reducers:{
        storeToken:(state,action)=>{
            console.log("the action is ",action)
            const{email,token} = action.payload;
            state.email = email;
            state.token = token;

        },
        removeToken:(state)=>{
            state.token = null;
            state.email = null;
        }
    }
})

export const {storeToken,removeToken} = tokenSlice.actions;
export default tokenSlice.reducer;


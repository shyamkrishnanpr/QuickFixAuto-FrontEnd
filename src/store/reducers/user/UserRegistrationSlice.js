import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {userSignupApi,userOtpApi,userLoginApi,userResendOtpApi} from '../../../services/userAPI'



const user = JSON.parse(localStorage.getItem("userToken"));

export const userSignUpAsync = createAsyncThunk(
    "UserAuth/userSignUp",
    async(user,thunkApi)=>{
        try {
            const response = await userSignupApi(user)


            const expirationTimeInMinutes = 1;
            const expirationTime =
              new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

              localStorage.setItem(
                "otpTokenUser",
                JSON.stringify({
                  token: response.token,
                  expiresAt: expirationTime,
                })
              );
        
              return response;
            
        } catch (error) {
            console.log("error in thunk",error)
        }
    }
);

export const otpVerificationAsync = createAsyncThunk(
  "userAuth/otpVerification",
  async(otp,thunkAPI)=>{
    try {
      const otptoken = localStorage.getItem("otpTokenUser")
      const otpObj = JSON.parse(otptoken)
      const otpToken = otpObj.token
      const expirationTime = otpObj.expiresAt;
      const otpData = { otp, otpToken };

      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        console.log("otp expired");
        const message = "OTP Expired";
        
      }

      const response = await userOtpApi(otpData);

      if (response.success) {
        localStorage.removeItem("otpTokenUser");
        const expirationTimeInMinutes = 60;
        const expirationTime =
          new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

        localStorage.setItem(
          "userToken",
          JSON.stringify({
            token: response.token,
            userId: response._id,
            expiresAt:expirationTime
          })
        );
        return response;
      }
    } catch (error) {
      console.log("error in otp thunk",error)
    }
  }
);


export const resendOtpAsync = createAsyncThunk(
  "userAuth/resendOtp",
  async(thunkAPI)=>{
    try {
      const otptoken = localStorage.getItem("otpTokenUser")
      const otpObj = JSON.parse(otptoken)
      const otpToken = otpObj.token
      const otpData = { otpToken };
      const response = await userResendOtpApi(otpData)

      console.log("response in resendthunk",response)
      const expirationTimeInMinutes = 1;
      const expirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

        localStorage.removeItem("otpTokenUser")
        localStorage.setItem(
          "otpTokenUser",
          JSON.stringify({
            token: response.token,
            expiresAt: expirationTime,
          })
        );


    return response

    } catch (error) {
      console.log("error in resend otp thunk",error)
    }
  }
);


export const userLoginAsync = createAsyncThunk(
  "userAuth/login",
  async (vendor, thunkAPI) => {
    try {
      const response = await userLoginApi(vendor);

      const expirationTimeInMinutes = 60;
      const expirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

        localStorage.setItem(
          "userToken",
          JSON.stringify({
            token: response.token,
            userId: response._id,
            expiresAt:expirationTime
          })
        );
          return response
    } catch (error) {
      console.log(error);
    }
  }
);









const initialState = user
  ? { isLoggedInUser: true, loading: false }
  : { isLoggedInUser: false, userId: null, loading: false };

  const userAuthSlice =  createSlice({
    name:"userAuth",
    initialState,
    reducers:{
      logout: (state) => {
        localStorage.removeItem("userToken");
        state.isLoggedInUser = false;
        state.userId = null;
        state.loading = false;
      },
      
    },
    extraReducers:(builder)=>{
      builder
      .addCase(userSignUpAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userSignUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInUser = false;
      })
      .addCase(userSignUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInUser = false;
      })
      .addCase(otpVerificationAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(otpVerificationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInUser = true;
      })
      .addCase(otpVerificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInUser = false;
      })
    }
  })


  export const { logout } = userAuthSlice.actions;
export default userAuthSlice.reducer;
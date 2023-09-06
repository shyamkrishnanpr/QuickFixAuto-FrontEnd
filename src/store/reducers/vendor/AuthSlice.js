import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



import {
  vendorSignUpApi,
  vendorOtpApi,
  vendorLoginApi,
  vendorResendOtpApi,
} from "../../../services/vendorAPI";

const vendor = JSON.parse(localStorage.getItem("vendorToken"));

export const vendorSignUpAsync = createAsyncThunk(
  "vendorAuth/vendorAuth",
  async (vendor, thunkAPI) => {
    console.log("sdfsdc", vendor);
    try {
      const response = await vendorSignUpApi(vendor);
      console.log("dfd", response.token);

      const expirationTimeInMinutes = 1;
      const expirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

      localStorage.setItem(
        "otpToken",
        JSON.stringify({
          token: response.token,
          expiresAt: expirationTime,
        })
      );

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const otpVerificationAsync = createAsyncThunk(
  "vendorAuth/otpVerification",
  async (otp, thunkAPI) => {
    try {
      const otptoken = localStorage.getItem("otpToken");
      const otpObj = JSON.parse(otptoken);
      const otpToken = otpObj.token;
      const expirationTime = otpObj.expiresAt;
      const otpData = { otp, otpToken };

      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        console.log("otp expired");
        const message = "OTP Expired";
        message.error(message);
      }

      const response = await vendorOtpApi(otpData);
      console.log("at slice", response);

      if (response.success) {
        localStorage.removeItem("otpToken");

        const expirationTimeInMinutes = 60;
        const expirationTime =
          new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

        localStorage.setItem(
          "vendorToken",
          JSON.stringify({
            token: response.token,
            vendorId: response._id,
            expiresAt: expirationTime,
          })
        );
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const vendorResendOtpAsync = createAsyncThunk(
  "vendorAuth/resendOtp",
  async (thunkAPI) => {
    try {
      const otptoken = localStorage.getItem("otpToken");
      const otpObj = JSON.parse(otptoken);
      const otpToken = otpObj.token;
      const otpData = { otpToken };
      const response = await vendorResendOtpApi(otpData);
      const expirationTimeInMinutes = 1;
      const expirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

      localStorage.removeItem("otpToken");
      localStorage.setItem(
        "otpToken",
        JSON.stringify({
          token: response.token,
          expiresAt: expirationTime,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const vendorLoginAsync = createAsyncThunk(
  "vendorAuth/login",
  async (vendor, thunkAPI) => {
    try {
      const response = await vendorLoginApi(vendor);
      
      const expirationTimeInMinutes = 60;
      const expirationTime =
        new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

      localStorage.setItem(
        "vendorToken",
        JSON.stringify({
          token: response.token,
          vendorId: response._id,
          expiresAt: expirationTime,
        })
      );
      return response;
    } catch (error) {
      console.log("at thunk",error);
    }
  }
);

const initialState =
  vendor && vendor.vendorId
    ? { isLoggedInVendor: true, loading: false, vendorId: vendor.vendorId,errorMessage: null }
    : { isLoggedInVendor: false, vendorId: null, loading: false };

const vendorAuthSlice = createSlice({
  name: "vendorAuth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("vendorToken");
      state.isLoggedInVendor = false;
      state.vendorId = null;
      state.loading = false;
    },
    setErrorMessage:(state,action)=>{
      state.errorMessage=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorSignUpAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(vendorSignUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
      })
      .addCase(vendorSignUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
      })
      .addCase(otpVerificationAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(otpVerificationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = true;
        state.vendorId = action.payload._id;
      })
      .addCase(otpVerificationAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
      })
      .addCase(vendorLoginAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(vendorLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = true;
        state.errorMessage=null
       
      })
      .addCase(vendorLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { logout,setErrorMessage } = vendorAuthSlice.actions;
export default vendorAuthSlice.reducer;

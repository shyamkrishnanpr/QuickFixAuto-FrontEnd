import axios from "../Axios/axios";

export const userSignupApi = async (values) => {
  try {
    const response = await axios.post("/user/signUp", values);
    return response.data;
  } catch (error) {
    console.log("error in signupApi", error);
  }
};

export const userOtpApi = async (values) => {
  try {
    const response = await axios.post("/user/verifyOtp", values);
    return response.data;
  } catch (error) {
    console.log("error in otpApi", error);
  }
};



export const userResendOtpApi = async (values) => {
  try {
    const response = await axios.post("/user/resendOtp", values);
    return response.data;
  } catch (error) {
    console.log("error in resendOtpApi", error);
  }
};

export const userLoginApi = async (values) => {
  try {
    const response = await axios.post("/user/login", values);
    return response.data;
  } catch (error) {
    console.log("error in loginApi", error);
  }
};


export const forgotOtpApi = async(email)=>{
  try {
    const response = await axios.post("/user/forgotPassword",{email})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const verifyOtpAndResetPasswordApi = async(data)=>{
  try {
    const response = await axios.post("/user/verifyOtpForget",data);
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const resetPasswordApi = async(data)=>{
  try {
    
    const response = await axios.post("/user/resetPassword",data)
    console.log(response.data,"in api")
    return response.data
  } catch (error) {
    console.log(error)
  }
}






export const fetchServicesApi = async (userLocation) => {
  try {
    const response = await axios.post("/user/services", { userLocation });
    console.log(response.data, "in api");
    return response.data;
  } catch (error) {
    console.log(error, "errro in fetchApi");
  }
};

export const fetchCategoriesApi = async () => {
  try {
    const response = await axios.get("/user/categories");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVehicleDataApi = async()=>{
    try {
        const response = await axios.get("/user/vehicles")
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

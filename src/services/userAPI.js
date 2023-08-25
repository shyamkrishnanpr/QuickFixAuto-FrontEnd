import axios from "../Axios/axios";

export const userSignupApi = async(values)=>{
    try {
        const response = await axios.post('/user/signUp',values)
        return response.data     
    } catch (error) {
        console.log("error in signupApi",error)
    }
}

export const userOtpApi = async(values)=>{
    try {
        const response = await axios.post('/user/verifyOtp',values)
        return response.data
        
    } catch (error) {
        console.log("error in otpApi",error)
    }
}


export const userResendOtpApi = async(values)=>{
    try {
        const response = await axios.post('/user/resendOtp',values)
        return response.data
        
    } catch (error) {
        console.log("error in resendOtpApi",error)
    }
}


export const userLoginApi = async(values)=>{
    try {
        const response = await axios.post('/user/login',values)
        return response.data
    } catch (error) {
        console.log("error in loginApi",error)
    }
}




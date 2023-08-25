import React, { useEffect, useState } from "react";
import OTPInput  from "otp-input-react";
import { useDispatch, useSelector } from "react-redux";
import { otpVerificationAsync,vendorResendOtpAsync } from "../../store/reducers/vendor/AuthSlice";
import { useNavigate } from "react-router";


const Otp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [OTP, setOTP] = useState("");
  const [timer,setTimer] = useState("")
  const { loading } = useSelector((state) => state.vendorAuth);

  let startTimer = (timer) => {
    if (timer === 0) {
      return;
    }
    setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
  };

  useEffect(() => {
    const otpToken = localStorage.getItem("otpToken");
    if (otpToken) {
      const otpObj = JSON.parse(otpToken);
      const expirationTime = otpObj.expiresAt;
      const currentTime = Date.now();

      
      if (expirationTime > currentTime) {
        const newTimer = Math.floor((expirationTime - currentTime) / 1000);
        setTimer(newTimer);
        startTimer(timer);

      } else {
        setTimer(0);
      }
    }
  },[startTimer]);




  


  const handleOtpChange = (otp)=>{
      setOTP(otp)
      if(otp.length===6){
        dispatch(otpVerificationAsync(otp)).then((response)=>{
            console.log("response in otp submit",response.payload.success)

            if(response?.payload?.success){
                navigate('/vendor/dashboard')
            }else{
                console.log(response)
            }
        })
      }
  }
  const handleResendOtp = ()=>{
    dispatch(vendorResendOtpAsync()).then((response)=>{
      console.log("response in otp page",response)
      navigate('/vendor/otp')
    }).catch((err)=>{
      console.log(err)
    })
  }


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex w-full max-w-3xl">
          <div className="bg-gradient-to-tr from-blue-950 to-blue-500 p-8 rounded-l-lg shadow-md w-1/2">
            <h4 className="text-white text-center text-2xl font-bold  mt-6">
              QuickFix Autos
            </h4>
            <br />
            <p className="text-white text-sm text-center mb-4">
              Please check your inbox for the email containing the OTP. Once you
              receive it, enter the OTP in the field provided on the right side
              to complete the verification process and gain access to your
              account. 
              <br />
            </p>
          </div>
          <div className="bg-white p-8 rounded-r-lg shadow-md flex-1">
            <h2 className="text-xl text-blue-600 font-bold text-center mb-8">
              Enter the OTP here{" "}
            </h2>

            <OTPInput
              value={OTP}
              onChange={handleOtpChange}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              inputClassName="w-full rounded-2xl text-white bg-blue-900 text-center  focus:border-blue-500 focus:bg-blue-500 focus:outline-none shadow-lg shadow-teal-800/50"
              className="flex justify-center"
            />
            <button className="w-2/4 mt-6 my-5 py-2 p-2 bg-gradient-to-tr from-blue-500 to-blue-950 text-white font-semibold rounded-lg flex justify-between cursor-text">
            {loading ? "Loading..." : (timer > 0 ? `${timer} seconds ` : <p className='cursor-pointer' onClick={handleResendOtp} >Resend OTP</p>)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;

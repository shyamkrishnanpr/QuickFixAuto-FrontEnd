import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestOtpForPasswordResetAsync,
  verifyOtpForPasswordResetAsync,
} from "../../store/reducers/user/UserRegistrationSlice";
import { useNavigate } from "react-router";
import LoadSpinner from "../util/LoadSpinner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const { loading } = useSelector((state) => state.userAuth);

  const handleRequestOTP = async () => {
    try {
      await dispatch(requestOtpForPasswordResetAsync(email));
      setIsOtpRequested(true);
    } catch (error) {
      console.log("Error requesting OTP:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await dispatch(verifyOtpForPasswordResetAsync(otp)).then((response) => {
        console.log(response);
        if (response?.payload?.success) {
          navigate(`/user/resetPassword/${email}`);
        }
      });
    } catch (error) {
      console.log("Error verifying OTP:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string().required("OTP is required"),
  });

  return (
    <>
     {loading ? (
                <LoadSpinner />
              ) : (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h2 className="text-2xl text-red-700 font-bold mb-4">
            Forgot Password
          </h2>
          {isOtpRequested ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
             
                <button
                  onClick={handleVerifyOTP}
                  className="w-full my-5 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg"
                >
                  Verify OTP
                </button>
              
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
             
                <button
                  onClick={handleRequestOTP}
                  className="w-full my-5 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg"
                >
                  Request OTP
                </button>
              
            </>
          )}
        </div>
      </div>
              )}
    </>
  );
};

export default ForgotPassword;

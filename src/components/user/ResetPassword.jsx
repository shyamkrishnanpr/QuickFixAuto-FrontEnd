import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { resetPasswordAsync } from "../../store/reducers/user/UserRegistrationSlice";
import LoadSpinner from "../util/LoadSpinner";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((state) => state.userAuth);
  const { email } = useParams();

  console.log(email, "email in fffddd");

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      const data = {
        email: email,
        password: password,
      };
      dispatch(resetPasswordAsync(data)).then((response) => {
        if (response?.payload?.success) {
          navigate("/user/login");
        }
      });
    } else {
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
   
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl text-red-700 font-bold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your new password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Confirm your new password"
          />
        </div>

        
          <button
          onClick={handleResetPassword}
          className="w-full my-5 py-2 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg"
        >
          Reset Password
        </button>
  





        
      </div>
    </div>
  );
};

export default ResetPassword;

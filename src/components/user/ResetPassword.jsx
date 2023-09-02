import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { resetPasswordAsync } from '../../store/reducers/user/UserRegistrationSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const email= useParams()
  console.log(email,"email in fff")
  
  const handleResetPassword = () => {

   
    if (password === confirmPassword) {
      // Dispatch an action to reset the password here
      dispatch(resetPasswordAsync(email,password));
      // You may also want to redirect the user to the login page or a success page
    } else {
      alert('Passwords do not match. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl text-red-700 font-bold mb-4">Reset Password</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your new password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
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

import React, { useState } from 'react'
import {adminLoginApi} from '../../../services/adminAPI'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router'
import {storeToken} from '../../../store/actions/admin/tokenAction'

const Login = () => {
  const disapatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await adminLoginApi(email,password)
      
      if(response.status){
        const jwtToken = response.token
        console.log("token in login",jwtToken)
        disapatch(storeToken(response))
        navigate('/admin')
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  
  return (
   <>
   
    <div className=" flex justify-center items-center h-screen ">
   
    <div>
    
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
        <h2 className="text-xl flex justify-center items-center font-bold text-blue-500 mb-4">ADMIN LOGIN</h2>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="email"
            value={email}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handlePasswordChange}
          />
         
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            LOGIN
          </button>
          
        </div>
      </form>
      </div>
    </div>

    </>
  )
}

export default Login

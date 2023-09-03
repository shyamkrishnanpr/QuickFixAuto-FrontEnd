import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../store/reducers/user/UserRegistrationSlice';
import {Link} from 'react-router-dom'
const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userToken = localStorage.getItem("userToken")

    console.log(userToken)
   
    const handleLogout = async()=>{
      dispatch(logout());
      navigate('/user/dashboard')
    }
  return (
    <div>
        <div>
        <nav className="bg-gray-400 p-5">
          <div className="flex items-center justify-between">
            <Link to='/user/dashboard' className="text-red-700 font-bold text-xl">QuickFix Autos </Link>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-blue-300">
                  
                </a>
              </li>
              <li>
              {!userToken ? (<Link to="/user/login" className="block text-white hover:text-red-500 p-2 rounded">
            Login
          </Link>): (<a   onClick={handleLogout} className="text-white hover:text-red-500">
                  Logout
                </a>)}
                
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar

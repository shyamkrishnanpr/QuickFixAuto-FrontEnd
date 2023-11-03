import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/reducers/user/UserRegistrationSlice";
import { Link } from "react-router-dom";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const userName = userToken
    ? JSON.parse(atob(userToken.split(".")[1])).name
    : null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/user/dashboard");
  };


  



  return (
    <>
    
    <div>
  <nav className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 p-4 rounded-3xl m-1 ml-5 mr-5  ">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/user/dashboard"
            className="text-white font-bold text-2xl"
          >
            QuickFix Autos
          </Link>
        </div>

        <ul className="flex space-x-4 mt-4 md:mt-0">
          {userName ? (
            <li className="relative group">
              <button
                onClick={toggleDropdown}
                className="text-white hover:text-gray-300 px-2 py-1 rounded-md group-hover:bg-gray-600 transition duration-300"
              >
                {userName}
              </button>
              {isDropdownOpen && (
                <ul
                  className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md w-48 z-10"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-200 transition duration-300"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/orderHistory"
                      className="block px-4 py-2 hover:bg-gray-200 transition duration-300"
                    >
                      Order History
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          ) : null}

          <li>
            {!userToken ? (
              <Link
                to="/user/login"
                className="block text-white hover:text-gray-300 px-4 py-2 rounded transition duration-300"
              >
                Login
              </Link>
            ) : (
              <a
                onClick={handleLogout}
                className="text-white hover:text-gray-300 cursor-pointer px-4 py-2 rounded transition duration-300"
              >
                Logout
              </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>

  </>
  
  );
};

export default Navbar;

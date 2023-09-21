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
    <div>
      <div>
        <nav className="bg-gray-300 p-5">
          <div className="flex items-center justify-between">
            <Link
              to="/user/dashboard"
              className="text-red-700 font-bold text-2xl"
            >
              QuickFix Autos{" "}
            </Link>

            <ul className="flex space-x-4 ">
              <li className="relative">
                <button
                  onClick={toggleDropdown}
                  className="text-white relative hover:text-black bg-red-700 px-2 py-1 rounded-md"
                >
                  {userName}
                </button>
                {isDropdownOpen && (
                  <ul
                  className="absolute top-full left-0 mt-4 bg-white border border-red-700 rounded-md shadow-md"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-200  transition duration-300"
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

              <li>
                {!userToken ? (
                  <Link
                    to="/user/login"
                    className="block text-white hover:text-red-500 p-2 rounded"
                  >
                    Login
                  </Link>
                ) : (
                  <a
                    onClick={handleLogout}
                    className="text-white hover:text-red-500 cursor-pointer"
                  >
                    Logout
                  </a>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;

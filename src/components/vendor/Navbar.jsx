import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/reducers/vendor/AuthSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorToken = localStorage.getItem("vendorToken");

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/vendor/login");
  };
  return (
    <>
      <div>
        <nav className="bg-gradient-to-tr from-black to-blue-500 text-grey p-4">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold text-lg">Welcome  </div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-blue-950"></a>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-white hover:text-blue-950"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

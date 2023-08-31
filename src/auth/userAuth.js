import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export default function UserVerification({children}) {
  const navigate = useNavigate();
  const location = useLocation();
 

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log(token, "fd");
    if (!token) {
      console.log(location.pathname);
      
      if (
        location.pathname !== "/user/register" &&
        location.pathname !== "/user/otp"
      )
        navigate("/user/login");
    } else {
      if (
        location.pathname === "/user/login" ||
        location.pathname === "/user/otp" ||
        location.pathname === "/user/register"
      )
        navigate("/user/dashboard");
    }
  
  }, [location.pathname]);


    return children

}

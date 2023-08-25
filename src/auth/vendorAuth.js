import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


export default function VendorVerification({children}) {
  const navigate = useNavigate();
  const location = useLocation();
 

  useEffect(() => {
    const token = localStorage.getItem("vendorToken");
    console.log(token, "dfdsd");
    if (!token) {
      console.log(location.pathname);
      console.log("vendor login check 1");
      if (
        location.pathname !== "/vendor/register" &&
        location.pathname !== "/vendor/otp"
      )
        navigate("/vendor/login");
    } else {
      if (
        location.pathname === "/vendor/login" ||
        location.pathname === "/vendor/otp" ||
        location.pathname === "/vendor/register"
      )
        navigate("/vendor/dashboard");
    }
  
  }, [location.pathname]);


    return children

}

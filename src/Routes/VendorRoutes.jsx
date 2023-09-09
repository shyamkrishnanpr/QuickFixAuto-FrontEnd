import React from "react";
import { Route, Routes } from "react-router";
import VendorVerification from "../auth/vendorAuth";
import Register from "../pages/vendor/register/Register";
import OtpPage from "../pages/vendor/otp/OtpPage";
import DashBoardPage from "../pages/vendor/dashBoard/DashBoardPage";
import LoginPage from "../pages/vendor/login/LoginPage";
import ProfilePage from "../pages/vendor/profile/ProfilePage";
import ServicePage from "../pages/vendor/services/ServicePage";
import AvailabilityPage from "../pages/vendor/availability/AvailabilityPage";

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<VendorVerification><Register /></VendorVerification>} />
      <Route path="/otp" element={<VendorVerification><OtpPage /></VendorVerification>} />
      <Route path="/login" element={ <VendorVerification><LoginPage /></VendorVerification>} />
      <Route path="/dashBoard" element={<VendorVerification><DashBoardPage /></VendorVerification>} />
      <Route path="/profile" element={<VendorVerification><ProfilePage /></VendorVerification>} />
      <Route path="/services" element={<VendorVerification><ServicePage /></VendorVerification>} />
      <Route path="/availability" element={<AvailabilityPage />} />
    </Routes>
  );
};

export default VendorRoutes;

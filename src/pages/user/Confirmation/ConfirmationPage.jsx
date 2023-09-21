import React from "react";
import ConfirmationPage from "../../../components/user/ConfirmationPage";
import Navbar from "../../../components/user/Navbar";
const ConfirmationPages = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <ConfirmationPage />
        </div>
      </div>
    </>
  );
};

export default ConfirmationPages;

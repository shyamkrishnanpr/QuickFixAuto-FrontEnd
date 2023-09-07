import React, { useEffect, useState } from "react";
import { fetchServiceApi, verifyServiceApi } from "../../../services/adminAPI";
import ConfirmationDialog from "../../util/ConfirmationDialog";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;


  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceData = await fetchServiceApi(currentPage);     
        setServices(serviceData.services);
        const serviceCount = serviceData.count;
        const calculateTotalPage = Math.ceil(serviceCount / pageSize);
        setTotalPages(calculateTotalPage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceData();
  }, [currentPage]);

  const handleVerifyClick = (serviceId) => {
    setSelectedService(serviceId);
  };

  const confirmHandleVerify = async () => {
    if (selectedService) {
      try {
        const updatedService = await verifyServiceApi(selectedService);
        setServices((prevServices) => {
          return prevServices.filter(
            (service) => service._id !== updatedService._id
          );
        });
        setSelectedService(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancelVerify = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-700">
            SERVICE MANAGEMENT
          </h2>
          <Link
            to="/admin/servicesList"
            className="text-blue-500 mr-3 hover:underline"
          >
            All Services
          </Link>
        </div>

        <h4 className="text-xl align-middle justify-items-center text-gray-600 mt-2  ml-10 font-semibold mb-4">
          PENDING REQUESTS
        </h4>
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            onVerifyClick={handleVerifyClick}
          />
        ))}

        {selectedService && (
          <ConfirmationDialog
            message="Are you sure you want to verify this service...?"
            onConfirm={confirmHandleVerify}
            onCancel={handleCancelVerify}
          />
        )}


<div className="mt-4  text-center  space-x-2 ">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalPages * pageSize}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

      </div>
     
    </>
  );
};

export default Service;

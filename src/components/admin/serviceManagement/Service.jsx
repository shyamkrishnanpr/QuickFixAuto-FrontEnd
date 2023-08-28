import React, { useEffect, useState } from "react";
import { fetchServiceApi, verifyServiceApi } from "../../../services/adminAPI";
import ConfirmationDialog from "../../util/ConfirmationDialog";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceData = await fetchServiceApi();
        setServices(serviceData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceData();
  }, []);

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
      <h2 className="text-xl font-bold text-gray-700">SERVICE MANAGEMENT</h2>
        <h4 className="text-xl align-middle justify-items-center text-gray-600 mt-2  ml-10 font-semibold mb-4">PENDING REQUESTS</h4>
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
      </div>
    </>
  );
};

export default Service;

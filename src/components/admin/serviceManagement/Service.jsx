import React, { useEffect, useState } from "react";
import { fetchServiceApi, verifyServiceApi } from "../../../services/adminAPI";
import ConfirmationDialog from "../../util/ConfirmationDialog";

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
      <div>
        <h1>Pending requests</h1>
        <ul>
          {services &&
            services.map((service) => (
              <li key={service._id}>
                <button onClick={() => handleVerifyClick(service._id)}>
                  Verify
                </button>
              </li>
            ))}
        </ul>

        {/* Confirmation Dialog */}
        {selectedService && (
          <ConfirmationDialog
            message="Are you sure you want to verify this service?"
            onConfirm={confirmHandleVerify}
            onCancel={handleCancelVerify}
          />
        )}
      </div>
    </>
  );
};

export default Service;

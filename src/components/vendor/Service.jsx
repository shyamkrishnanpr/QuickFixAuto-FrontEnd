import React, { useEffect, useState } from "react";
import AddService from "./AddService";
import { addServiceApi, fetchServiceApi } from "../../services/vendorAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Service = () => {
  const [services, setServices] = useState([]);
  const [showAddService, setShowAddService] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 2;

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const serviceData = await fetchServiceApi();
        console.log("at service", serviceData);
        setServices(serviceData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServiceData();
  }, [currentPage]);

  const handleAddService = async (newServiceData) => {
    try {
      const response = await addServiceApi(newServiceData);
      setServices([...services, response]);
      setShowAddService(false);
      toast.success("Service added successfully!");
    } catch (error) {
      console.log(error);
    }
  };
  const totalPage = Math.ceil(services?.length / perPage);
  const nextPage = () => {
    if (currentPage <= totalPage) {
      setCurrentPage(currentPage + 1);
    }
    // setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        {showAddService && (
          <AddService
            onAddService={handleAddService}
            onCancel={() => setShowAddService(false)}
          />
        )}
        {!showAddService && (
          <div className= "mt-2 ml-2">
            <button
              className=" px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => setShowAddService(true)}
            >
              Add
            </button>
             
            <div className="  p-6">
              {services?.map((service) => (
                <div
                  key={service._id}
                  className="bg-white  rounded-lg border border-solid border-gray-300 shadow-lg p-4 mb-4"
                >
                  <div className="flex flex-col rounded-md bg-blue-200   md:flex-row">
                    <div className="md:w-4/12 rounded-lg bg-white border border-solid border-gray-300 p-4">
                      <img
                        // src={`http://localhost:3000/vehicleImages/${service?.vehicleId?.image}`} 
                        src={service?.vehicleId?.vehicleImages[0]?.url}
                        alt="Service"
                        className="w-full h-full md:h-42 rounded-md object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 md:pl-4">
                      <h2 className="text-2xl font-semibold mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        Category: {service.categoryId.category}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Subcategory: {service.subCategoryId.subCategory}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Vehicle: {service?.vehicleId?.brand}{" "}
                        {service?.vehicleId?.model}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Price: {service.price}
                      </p>
                      <p className="text-gray-600 mb-4">
                        Description: {service.description}
                      </p>
                      <p className="text-gray-600">
                        Verified:{" "}
                        <span
                          className={`${
                            service.isVerified
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {service.isVerified ? "VERIFIED" : "NOT VERIFIED"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            <div className="flex justify-center mt-1 ">
          <button
            className="bg-blue-500 mr-5 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={prevPage}
          >
            {"<<<<---"}
          </button>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={nextPage}
            disabled={currentPage > totalPage}
          >
            {"--->>>>"}
          </button>
        </div>
          </div>

     
        

        




        

        )}
      
      </div>
    </>
  );
};

export default Service;

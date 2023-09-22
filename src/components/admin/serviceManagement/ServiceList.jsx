import React, { useEffect, useState } from "react";
import { fetchAllServiceApi } from "../../../services/adminAPI";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    const fetchAllService = async () => {
      try {
        const serviceData = await fetchAllServiceApi(currentPage);
        console.log(serviceData,"at page")
        setServices(serviceData.services);
        const serviceCount = serviceData.count;
        const calculateTotalPage = Math.ceil(serviceCount / pageSize);
        setTotalPages(calculateTotalPage);
        console.log(serviceCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllService();
  }, [currentPage]);
  return (
    <>
      <div className="container mx-auto p-4">
        <div class="flex flex-col w-full  pt-2">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700">
              SERVICE MANAGEMENT
            </h2>
            <Link
              to="/admin/services"
              className="text-blue-500 mr-3 hover:underline"
            >
              Pending Requests
            </Link>
          </div>

          <h4 className="text-xl align-middle justify-items-center text-gray-600 mt-2  ml-10 font-semibold mb-4">
            SERVICE LIST
          </h4>
        </div>
        <ul className="w-full max-w-60rem">
          {services.map((service) => (
            <li
              key={service._id}
              className="bg-gray-200 rounded-lg shadow-md p-4 mb-4"
            >
              <div className="flex flex-col justify-between  w-60rem ">
                <div>
                <div className="flex">
                  <span className="text-gray-500 font-semibold">
                     Center Name :
                    </span>
                    <p className="text ">
                    {service?.vendorId?.centerName}
                  </p>
                  </div>
                  <div className="flex">
                    <span className="text-gray-500 font-semibold">
                      Category :
                    </span>
                    <p className="text"> {service?.categoryId?.category}</p>
                  </div>
                  <div className="flex">
                  <span className="text-gray-500 font-semibold">
                     Sub Category :
                    </span>
                    <p className="text ">
                    {service?.subCategoryId?.subCategory}
                  </p>
                  </div>
                  <div className="flex">
                  <span className="text-gray-500 font-semibold">
                     Vehicle :
                    </span>
                    <p className="text ">
                    {service?.vehicleId?.brand} {service.vehicleId?.model}
                  </p>
                  </div>


                 
                  <p className="text-gray-600">
                    Verified:{" "}
                    <span
                      className={`${
                        service.isVerified ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {service.isVerified ? "VERIFIED" : "NOT VERIFIED"}
                    </span>
                  </p>
                </div>
                <div></div>
              </div>
            </li>
          ))}
        </ul>

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

export default ServiceList;

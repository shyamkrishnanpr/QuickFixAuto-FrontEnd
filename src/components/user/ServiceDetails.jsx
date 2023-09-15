import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchServiceDetailApi } from "../../services/userAPI";
import { Link } from "react-router-dom";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  console.log(serviceId, "in page");

  console.log(serviceDetails, "state");
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        await fetchServiceDetailApi(serviceId).then((data) =>
          setServiceDetails(data)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  return (
    <>
      <div className="flex justify-center justify-items-center ">
        <h1 className="text-2xl text-red-700 font-bold">
          Service Package Details
        </h1>
      </div>

      <div className="flex h-auto p-4">
        <div className="w-8/12 flex flex-col m-2 p-8  bg-gray-100 rounded-lg shadow-md">
          {serviceDetails?.map((place, index) => (
            <div
              key={index}
              className="mb-6 border-b  mt-6 border-gray-300 pb-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                Category: {place.categoryId.category}
              </h2>
              <p className="text-gray-700 mb-2">
                Subcategory: {place.subCategoryId.subCategory}
              </p>
              <p className="text-gray-700 mb-2">
                Vendor Details: {place.vendorId.centerName}
              </p>
              <p className="text-gray-700 mb-2">
                Address: {place.vendorId.address[0].area},{" "}
                {place.vendorId.address[0].city},{" "}
                {place.vendorId.address[0].state} -{" "}
                {place.vendorId.address[0].pincode}
              </p>
              <p className="text-gray-700 mb-2">Details: {place.description}</p>
              <p className="text-green-600 font-semibold mb-2">
                Price: {place.price}
              </p>
              <div className="text-center">
                <Link
                  to={`/user/booking/${place._id}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {serviceDetails?.map((place, index) => (
          <div key={index} className="w-4/12 p-4 ">
            <img
              src={`http://localhost:3000/vehicleImages/${place.vehicleId.image}`}
              className="mx-auto w-full h-auto  "
              alt={`${place.vehicleId.brand} ${place.vehicleId.model}`}
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              {place.vehicleId.brand} {place.vehicleId.model}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceDetails;

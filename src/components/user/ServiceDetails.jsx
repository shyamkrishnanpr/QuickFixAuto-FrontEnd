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
      <div className="flex  mt-2 h-96">
        <div className="w-1/2 bg-gray-200 text-left   m-2 p-8">
          <h1 className="text-3xl mb-4">Service Package Details</h1>
          {serviceDetails?.map((place, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-lg font-semibold">
                Category: {place.categoryId.category}
              </h2>
              <p>Subcategory: {place.subCategoryId.subCategory}</p>
              <p>Vendor Details: {place.vendorId.centerName}</p>
              <p>Details: {place.description}</p>
              <p>Place: {place.price}</p>


              <div className="text-center">
            <Link
              to={`/user/booking/${place._id}`}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Book Now
            </Link>
          </div>
            </div>

            
          ))}
          
        </div>

        {serviceDetails?.map((place, index) => (
          <div className="w-1/2 m-2 text-center p-8 ">
            <img
              src={`http://localhost:3000/vehicleImages/${place.vehicleId.image}`}
              className="mx-auto "
            />
            <h2 className="text-xl font-semibold">
              {place.vehicleId.brand} {place.vehicleId.model}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceDetails;

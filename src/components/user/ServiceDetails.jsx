import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchServiceDetailApi } from "../../services/userAPI";
import { Link } from "react-router-dom";
import UserChatBox from "./UserChatBox";

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [serviceDetails, setServiceDetails] = useState(null);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const userToken = localStorage?.getItem("userToken");
  const parsedUserToken = JSON?.parse(userToken);
  
  const userId = parsedUserToken?.userId;


  const vendorId = serviceDetails && serviceDetails[0]?.vendorId?._id;

  console.log(vendorId,"at service ")
  

  useEffect(() => {
    const fetchServiceDetails =  () => {
      
      fetchServiceDetailApi(serviceId).then((data) =>
          setServiceDetails(data)
        ).catch((error)=>{
          console.log(error)
        });
     
    };
    fetchServiceDetails();
  }, [serviceId]);

  const handleChatToggle = () => {
    setIsChatOpen((prevIsChatOpen) => !prevIsChatOpen);
  };

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
              // src={`https://quickfixautos.shop/vehicleImages/${place.vehicleId.image}`}
              src={place.vehicleId.vehicleImages[0]?.url}
              className="mx-auto w-full h-auto  "
              alt={`${place.vehicleId.brand} ${place.vehicleId.model}`}
            />
            <h2 className="text-xl font-semibold text-center mt-2">
              {place.vehicleId.brand} {place.vehicleId.model}
            </h2>
          </div>
        ))}
      </div>
      {userId&& vendorId&& (
        <>
        <button
        className={`fixed transition duration-150 ease-out hover:ease-in right-4  sm:right-10 z-10 bg-red-500 hover:bg-red-400 rounded-full p-4 cursor-pointer  ${
          isChatOpen
            ? "opacity-75 bottom-2/4 sm:bottom-10 "
            : "opacity-100  bottom-10"
        }`}
        onClick={handleChatToggle}
      >
        {isChatOpen ? (
          <h4 className="text-red-800 flex ">
            <span className="text-white mr-2">Close</span>X
          </h4>
        ) : (
          <>
            <h4 className="text-white">Chat here..</h4>
          </>
        )}
      </button>
        </>
      )}

      
      {userId&&vendorId&&(
 <div
 className={`${
   isChatOpen ? "block" : "hidden"
 } fixed bottom-0 duration-500 right-0 left-0 rounded-lg bg-white p-4 shadow-lg sm:w-1/2 lg:w-1/3 lg:bottom-0 lg:right-4 mx-auto transition-opacity animate-inside-out ${
   isChatOpen ? "opacity-96" : "opacity-0"
 }`}
>
 {userId && <UserChatBox vendorId={vendorId} userId={userId} />}
</div>
      )}
     
    </>
  );
};

export default ServiceDetails;

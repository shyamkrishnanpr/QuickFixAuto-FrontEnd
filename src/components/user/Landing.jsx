import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");


  

  const handleLocationSelection = async () => {
    try {
      const position = await getCurrentLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const location = { latitude: `${latitude}`, longitude: `${longitude}` };

      navigate("/user/services", { state: { selectedLocation: location } });
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  return (
    <>
      <div className="flex justify-end ">
        <div className="bg-gray-200 rounded-lg shadow-lg p-6 w-1/4  mr-12 mt-14">
          <h1 className="text-2xl text-red-600 font-semibold mb-4">
            Search Service centers near you...
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle Brand:
            </label>
            <select className="w-full p-2 border rounded-lg">
              <option value="">Select Brand</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle Model:
            </label>
            <select className="w-full p-2 border rounded-lg">
              <option value="">Select Brand</option>
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
            onClick={handleLocationSelection}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {fetchVehicleDataApi} from "../../services/userAPI"


const Landing = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("Calicut"); // Set Calicut as the default location
  const [locationData, setLocationData] = useState({
    latitude: 11.2588,
    longitude: 75.7804,
    name: "Calicut",
  });
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const locationOptions = [
    {
      value: "Calicut",
      label: "Calicut",
      latitude: 11.2588,
      longitude: 75.7804,
    },
    {
      value: "Thrissur",
      label: "Thrissur",
      latitude: 10.5276,
      longitude: 76.2144,
    },
    {
      value: "Ernakulam",
      label: "Ernakulam",
      latitude: 9.9312,
      longitude: 76.2673,
    },
  ];


 useEffect(()=>{
  const fetchVehicleData = async()=>{
    try {
      const vehicleData = await fetchVehicleDataApi()
      
      setVehicles(vehicleData)
      const uniqueBrands = [
        ...new Set(vehicleData.map((vehicle)=>vehicle.brand))
      ]
      setBrand(uniqueBrands)
      
    } catch (error) {
      console.log(error)
    }
  }
  fetchVehicleData()
 },[])

  
 const handleBrandChange = (e) => {
  const selectedBrand = e.target.value;
  setSelectedBrand(selectedBrand)
  const modelForBrand = vehicles
    .filter((vehicle) => vehicle.brand === selectedBrand)
    .map((vehicle) => vehicle.model);

  setFilteredModels(modelForBrand);
  console.log(filteredModels,"mod")
};

const handleModelChange = (e) => {
  const selectedModel = e.target.value;
  setSelectedModel(selectedModel);
};




  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedLocation(selectedValue);

    const selectedLocationData = locationOptions.find(
      (location) => location.value === selectedValue
    );

    if (selectedLocationData) {
      setLocationData({
        latitude: selectedLocationData.latitude,
        longitude: selectedLocationData.longitude,
        name: selectedLocationData.label,
      });
    }
  };

  const handleLocationSelection = () => {
    try {
      if (locationData) {
        navigate("/user/services", {
          state: { selectedLocation: locationData },
        });
      } else {
        console.error("Please select a location.");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
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
              Select Location:
            </label>
            <select
              className="w-full p-2 border rounded-lg"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {locationOptions.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vehicle Brand:
            </label>
            <select
                  name="brand"
                  value={selectedBrand}
                  onChange={handleBrandChange}
                  className="w-full py-2  px-3 border rounded-lg "
                >
                  <option value="">Select a brand</option>
                  {brand.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
          </div>
          <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle Model:
          </label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedModel}
            onChange={handleModelChange} // Add a function to handle model selection
          >
            <option value="">Select Model</option>
            {filteredModels.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

          <button
            className="bg-blue-500 hover.bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
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

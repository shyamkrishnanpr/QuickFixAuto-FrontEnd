import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fetchVehicleDataApi } from "../../services/userAPI";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("Calicut"); 
  const [locationData, setLocationData] = useState({
    latitude: 11.2588,
    longitude: 75.7804,
    name: "Calicut",
    vehicleId: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [showError, setShowError] = useState(false);

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

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const vehicleData = await fetchVehicleDataApi();

        setVehicles(vehicleData);

        console.log(vehicles, "vehicle");
        const uniqueBrands = [
          ...new Set(vehicleData.map((vehicle) => vehicle.brand)),
        ];
        setBrand(uniqueBrands);

        const selectedVehicleId =
          vehicles.find((vehicle) => vehicle.model === selectedModel)?._id ||
          "";
        setLocationData((prevLocationData) => ({
          ...prevLocationData,
          vehicleId: selectedVehicleId,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleData();
  }, [selectedModel]);

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setSelectedBrand(selectedBrand);
    const modelForBrand = vehicles
      .filter((vehicle) => vehicle.brand === selectedBrand)
      .map((vehicle) => vehicle.model);

    setFilteredModels(modelForBrand);
    console.log(filteredModels, "mod");
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

  const isFormValid = () => {
    return selectedBrand !== "" && selectedModel !== "";
  };

  const handleLocationSelection = () => {
    try {
      if (locationData) {
        if (isFormValid()) {
          navigate("/user/services", {
            state: { selectedLocation: locationData },
          });
        } else {
          setShowError(true);
        }
      } else {
        console.error("Please select a location.");
      }
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  return (
    <>
      <div className="md:flex justify-end">
  <div className=" rounded-3xl  p-6 w-full md:w-3/4 md:mr-12 mt-14">
    <h2 className="text-3xl text-white font-bold mb-8">Experience The Best Car Services Near You..</h2>

    <div className="mb-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 md:mr-4 mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
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

      <div className="w-full md:w-1/3 md:mr-4 mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Vehicle Brand:
        </label>
        <select
          name="brand"
          value={selectedBrand}
          onChange={handleBrandChange}
          className="w-full p-2 border   rounded-lg"
        >
          <option value="">Select a brand</option>
          {brand.map((brand) => (
            <option   key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/3">
        <label className="block text-gray-300 text-sm font-bold mb-2">
          Vehicle Model:
        </label>
        <select
          className="w-full p-2 border rounded-lg"
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="">Select Model</option>
          {filteredModels.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </div>

    {showError && (
      <p className="text-red-600 text-sm mb-2">
        Please select both brand and model ....
      </p>
    )}

    <button
      className="bg-red-600 hover:bg-red-900 text-white  w-full font-semibold py-2 px-4 "
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

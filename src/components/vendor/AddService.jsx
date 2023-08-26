import React, { useEffect, useState } from "react";
import {
  fetchCategoryApi,
  fetchSubCategoryApi,
  fetchVehiclesApi,
} from "../../services/vendorAPI";

const AddService = ({ onAddService, onCancel }) => {
  const vendorToken = localStorage.getItem("vendorToken");
  const tokenData = JSON.parse(vendorToken);
  const vendorId = tokenData.vendorId;
  const [newService, setNewService] = useState({
    category: "",
    subCategory: "",
    brand: "",
    vehicle: "",
    fuelOption: "",
    price: 0,
    description: "",
    vendorId: vendorId,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [priceInput, setPriceInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [selectedVehicleModel, setSelectedVehicleModel] = useState("");
  const [selectedModelImage, setSelectedModelImage] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoryData = await fetchCategoryApi();
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchVehicleData = async () => {
      try {
        const vehicleData = await fetchVehiclesApi();
        setVehicles(vehicleData);
        console.log("vehicle data is ", vehicleData);
        const uniqueBrands = [
          ...new Set(vehicleData.map((vehicle) => vehicle.brand)),
        ];

        setBrand(uniqueBrands);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategoryData();
    fetchVehicleData();
  }, []);

  const handleAddPoint = () => {
    if (pointInput.trim() !== "") {
      setVendorPoints([...vendorPoints, pointInput]);
      setPointInput("");
    }
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setNewService({ ...newService, brand: selectedBrand });

    const modelForBrand = vehicles
      .filter((vehicle) => vehicle.brand === selectedBrand)
      .map((vehicle) => vehicle.model);

    setFilteredModels(modelForBrand);
    setSelectedVehicleModel("");
  };

  const handleModelChange = (e) => {
    const selectedModel = e.target.value;
    setSelectedVehicleModel(selectedModel);

    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.model === selectedModel
    );

    if (selectedVehicle) {
      setSelectedModelImage(
        `http://localhost:3000/vehicleImages/${selectedVehicle.image}`
      );
    } else {
      setSelectedModelImage("");
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setNewService({ ...newService, category: selectedCategory });
    try {
      const subCategories = await fetchSubCategoryApi(selectedCategory);
      setSubCategories(subCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubcategoryChange = (e) => {
    const selectedSubcategory = e.target.value;
    setNewService({ ...newService, subCategory: selectedSubcategory });
  };

  const handleSubmit = () => {
    const selectedVehicleId =
      vehicles.find((vehicle) => vehicle.model === selectedVehicleModel)?._id ||
      "";
    const updatedService = {
      ...newService,
      vehicle: selectedVehicleId,
      price: parseFloat(priceInput),
      description: descriptionInput.slice(0, 25).toUpperCase(),
    };
    onAddService(updatedService);
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-4">Add Service</h3>
      <div className=" flex ">
        <div className="w-12/12 p-4 ">
          <div className="border  rounded-md  grid grid-cols-3  gap-4 p-4">
            <form>
              <label className="block  mb-2">
                Brand:
                <select
                  name="brand"
                  value={newService.brand}
                  onChange={handleBrandChange}
                  className="w-full py-2  px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a brand</option>
                  {brand.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block  mb-2">
                Model:
                <select
                  name="vehicle"
                  value={selectedVehicleModel}
                  onChange={handleModelChange}
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a vehicle</option>
                  {filteredModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Fuel Option:
                <select
                  name="fuelOption"
                  value={newService.fuelOption}
                  onChange={(e) =>
                    setNewService({ ...newService, fuelOption: e.target.value })
                  }
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a Fuel Option</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Gas">Gas</option>
                </select>
              </label>

              <label className="block mb-2">
                Category:
                <select
                  name="category"
                  value={newService.category}
                  onChange={handleCategoryChange}
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2">
                Sub Category:
                <select
                  name="subCategory"
                  value={newService.subCategory}
                  onChange={handleSubcategoryChange}
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">Select the Subcategory</option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.Id} value={subCategory._id}>
                      {subCategory.subCategory}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mb-2">
                Price:
                <input
                  type="number"
                  name="price"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </label>

              <label className="block mb-2">
                Description (max 25 characters):
                <input
                  type="text"
                  name="description"
                  value={descriptionInput}
                  onChange={(e) =>
                    setDescriptionInput(e.target.value.slice(0, 25))
                  }
                  className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <span className="text-sm text-gray-500">
                  {descriptionInput.length}/25 characters
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
              >
                Add Service
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </form>

            <div className="w-full h-full p-4">
              <div className="border rounded-md p-4">
                {selectedModelImage && (
                  <img
                    src={selectedModelImage}
                    alt={`Image of ${selectedVehicleModel}`}
                    className="vehicle-image"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddService;

import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  fetchVehiclesApi,
  addVehicleApi,
  updateVehicleApi,
  deleteVehicleApi,
  blockVehicleApi,
} from "../../../services/adminAPI";

const colourOptions = [
  { value: "Petrol", label: "Petrol" },
  { value: "Diesel", label: "Diesel" },
  { value: "Gas", label: "Gas" },
];

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [image, setImage] = useState(null);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const vehicleData = await fetchVehiclesApi();
      console.log(vehicleData);
      setVehicles(vehicleData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectChange = (selected) => {
    setFuelTypes(selected);
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const newVehicle = await addVehicleApi({
        brand,
        model,
        image,
        fuelTypes,
      });
      setVehicles([...vehicles, newVehicle]);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (vehicleId) => {
    try {
      await deleteVehicleApi(vehicleId);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBrand("");
    setModel("");
    setImage(null);
  };

  return (
    <>
      <div className="bg-gray-50 w-full min-h-screen">
        <div className="p-4">
          <div className="bg-white p-4 rounded-md">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  VEHICLE MANAGEMENT
                </h2>
                <button
                  className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(true)}
                >
                  ADD
                </button>
              </div>

              <div>
                <div>
                  <div className="flex justify-between bg-gradient-to-tr from-gray-800 to-gray-300 rounded-md py-2 px-4 text-white font-bold text-md">
                    <div className="w-1/6"> 
                      <span>IMAGE</span>
                    </div>
                    <div className="w-1/6">
                      <span>BRAND</span>
                    </div>
                    <div className="w-1/6">
                      <span>MODEL</span>
                    </div>
                    <div className="w-1/6">
                      <span>FUEL TYPES</span>
                    </div>
                    <div className="w-1/6">
                      <span>BLOCK/UNBLOCK</span>
                    </div>
                    <div className="w-1/6">
                      <span>DELETE</span>
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <p>Loading....</p>
                ) : (
                  vehicles.map((vehicle) => {
                    const imageUrl = `http://localhost:3000/vehicleImages/${vehicle.image}`;
                    return (
                      <div
                        className="flex justify-between items-center py-2 px-4 border-b"
                        key={vehicle._id}
                      >
                        <div className="w-1/6">
                          <img src={imageUrl} className="w-8 h-8 " />
                        </div>

                        <div className="w-1/6">
                          <span>{vehicle.brand}</span>
                        </div>
                        <div className="w-1/6">
                          <span>{vehicle.model}</span>
                        </div>
                        <div className="w-1/6">
                          <span></span>
                        </div>
                        <div className="w-1/6">
                          <button
                            className="text-blue-500"
                            onClick={() =>
                              handleToggleBlock(vehicle._id, vehicle.blocked)
                            }
                          >
                            {vehicle.blocked ? "Unblock" : "Block"}
                          </button>
                        </div>
                        <div className="w-1/6">
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(vehicle._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className=" flex flex-col items-center justify-center h-full">
                {/* Modal */}
                {isModalOpen && (
                  <div
                    className={`fixed inset-0 flex items-center justify-center z-10 ${
                      isModalOpen ? "block" : "hidden"
                    }`}
                  >
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="modal z-20 p-4 rounded bg-white shadow-lg w-96">
                      <div className="modal-content">
                        <h3 className="text-lg font-semibold mb-4">
                          Add Vehicle
                        </h3>
                        <label>
                          Brand
                          <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="border rounded py-2 px-3 w-full mb-4"
                          />
                        </label>
                        <label>
                          Model
                          <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="border rounded py-2 px-3 w-full mb-4"
                          />
                        </label>

                        {/* <Select
                       
                       isMulti
                       name="colors"
                       options={colourOptions}
                       className="basic-multi-select"
                       classNamePrefix="select"
                       value={fuelTypes}
                       onChange={handleSelectChange}
                        /> */}

                        <label>
                          Image File
                          <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="border rounded py-2 px-3 w-full mb-4"
                          />
                        </label>

                        <div className="flex justify-end">
                          <button
                            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={handleAddVehicle}
                          >
                            Add
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={closeModal}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vehicles;

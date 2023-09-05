import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Map from "./Map";
import {
  fetchVendorDataApi,
  updateVendorDataApi,
} from "../../services/vendorAPI";

const Profile = () => {
  const { vendorId } = useSelector((state) => state.vendorAuth);

  const [vendorData, setVendorData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [editedVendorData, setEditedVendorData] = useState({
    fullName: "",
    centerName: "",
    address: [],
  });
  const [fieldErrors, setFieldErrors] = useState({
    fullName: "",
    centerName: "",
    // address: {
    //   area: "",
    //   city: "",
    //   pincode: "",
    //   landMark: "",
    //   state: "",
    // },
  });

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const vendorInfo = await fetchVendorDataApi(vendorId);
        console.log("ata profile data is ", vendorInfo);

        if (isEditMode) {
        
          setEditedVendorData({
            fullName: vendorInfo.fullName,
            centerName: vendorInfo.centerName,
            address: {
              area: vendorInfo.address[0]?.area || "",
              city: vendorInfo.address[0]?.city || "",
              pincode: vendorInfo.address[0]?.pincode || "",
              landMark: vendorInfo.address[0]?.landMark || "",
              state: vendorInfo.address[0]?.state || "",
            },
          });
        } else {
          
          setVendorData(vendorInfo);
          setEditedVendorData(vendorInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchVendorData();
  }, [vendorId, isEditMode]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = async () => {
    const errors = {};
    if (!editedVendorData.fullName) {
      errors.fullName = "Full name is required.";
    }
    if (!editedVendorData.centerName) {
      errors.centerName = "Center name is required.";
    }
    if (latitude === null || longitude === null) {
      errors.location = "Location is required.";
    }
    // if (!editedVendorData.address.area) {
    //   errors.address.area = "Area is required.";
    // }
    // if (!editedVendorData.address.city) {
    //   errors.address.city = "City is required.";
    // }
    // if (!editedVendorData.address.pincode) {
    //   errors.address.pincode = "Pincode is required.";
    // }
    // if (!editedVendorData.address.state) {
    //   errors.address.state = "State is required.";
    // }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      editedVendorData.latitude = latitude;
      editedVendorData.longitude = longitude;

      console.log("helo", editedVendorData);
      const response = await updateVendorDataApi(vendorId, editedVendorData);
      console.log("abcde", response);

      if (response.success) {
        setVendorData(editedVendorData);
        toast.success("Profile updated successfully!");
        setIsEditMode(false);
      } else {
        console.log("api error");
      }
    } catch (error) {
      console.log("error in click", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedData = { ...editedVendorData };

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      const updatedAddress = { ...updatedData.address }; // Create a copy of the address object
      updatedAddress[addressField] = value;
      updatedData.address = updatedAddress;
    } else {
      updatedData[name] = value;
    }

    setEditedVendorData(updatedData);
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <>
      <ToastContainer />
      <div className="p-12 w-full">
        <div className="px-4 sm:flex sm:justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Vendor Profile
          </h2>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              {!isEditMode ? (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {vendorData?.fullName}
                </dd>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="fullName"
                    value={editedVendorData?.fullName || ""}
                    onChange={handleInputChange}
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                  {fieldErrors.fullName && (
                    <p className="text-red-500">{fieldErrors.fullName}</p>
                  )}
                </dd>
              )}
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Center Name
              </dt>
              {!isEditMode ? (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {vendorData?.centerName}
                </dd>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    type="text"
                    name="centerName"
                    value={editedVendorData?.centerName || ""}
                    onChange={handleInputChange}
                    className="border rounded-lg px-3 py-2 w-full"
                  />
                  {fieldErrors.centerName && (
                    <p className="text-red-500">{fieldErrors.centerName}</p>
                  )}
                </dd>
              )}
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Address
              </dt>
              {!isEditMode ? (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* Display address fields here */}
                  Area: {vendorData?.address[0]?.area}
                  <br />
                  City: {vendorData?.address[0]?.city}
                  <br />
                  Pincode: {vendorData?.address[0]?.pincode}
                  <br />
                  Landmark: {vendorData?.address[0]?.landMark}
                  <br />
                  State: {vendorData?.address[0]?.state}
                </dd>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* Render address input fields here */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="address.area"
                      value={editedVendorData?.address?.area || ""}
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="Area"
                    />
                    {/* {fieldErrors.address.area && (
                      <p className="text-red-500">
                        {fieldErrors.address.area}
                      </p>
                    )} */}
                    <input
                      type="text"
                      name="address.city"
                      value={editedVendorData?.address?.city || ""}
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="City"
                    />
                    {/* {fieldErrors.address.city && (
                      <p className="text-red-500">
                        {fieldErrors.address.city}
                      </p>
                    )} */}
                    <input
                      type="number"
                      name="address.pincode"
                      value={editedVendorData?.address?.pincode || ""}
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="Pincode"
                    />
                    {/* {fieldErrors.address.pincode && (
                      <p className="text-red-500">
                        {fieldErrors.address.pincode}
                      </p>
                    )} */}
                    <input
                      type="text"
                      name="address.landMark"
                      value={editedVendorData?.address?.landMark || ""}
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="Landmark"
                    />
                    {/* {fieldErrors.address.landMark && (
                      <p className="text-red-500">
                        {fieldErrors.address.landMark}
                      </p>
                    )} */}
                    <input
                      type="text"
                      name="address.state"
                      value={editedVendorData?.address?.state || ""}
                      onChange={handleInputChange}
                      className="border rounded-lg px-3 py-2 w-full"
                      placeholder="State"
                    />
                    {/* {fieldErrors.address.state && (
                      <p className="text-red-500">
                        {fieldErrors.address.state}
                      </p>
                    )} */}
                  </div>
                </dd>
              )}
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Location
              </dt>
              {!isEditMode ? (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* Display latitude and longitude here */}
                  Latitude: {vendorData?.latitude}
                  <br />
                  Longitude: {vendorData?.longitude}
                </dd>
              ) : (
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {/* Render the Map component here */}
                  <Map
                    latitude={latitude}
                    longitude={longitude}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </dd>
              )}
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Actions
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {!isEditMode ? (
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 flex-row bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={handleSaveClick}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default Profile;

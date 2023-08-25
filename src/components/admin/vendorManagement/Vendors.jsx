import React, { useEffect, useState } from "react";
import { fetchVendorsApi, blockVendorApi } from "../../../services/adminAPI";

const Vendors = () => {
  const [vendor, setVendor] = useState([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const vendorInfo = await fetchVendorsApi();
        setVendor((prevVendors) => [...prevVendors, ...vendorInfo]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendorData();
  }, []);

  const handleToggle = (vendorId) => {
    const vendorToToggle = vendor.find((vendor) => vendor._id === vendorId);

    if (vendorToToggle) {
      const newBlockedStatus = !vendorToToggle.isBlock;
      blockVendorApi(vendorId, newBlockedStatus).then(() => {
        setVendor((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === vendorId
              ? { ...vendor, isBlock: newBlockedStatus }
              : vendor
          )
        );
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-700">VENDOR MANAGEMENT</h2>
        <table className="w-full border-collapse mt-3  ">
          <thead>
            <tr className="bg-gradient-to-tr from-gray-800 to-gray-300 ">
              <th className=" text-white border border-gray-400 px-4 py-2">
                Service Center
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Name of vendor
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Status
              </th>
              <th className=" text-white border border-gray-400 px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vendor.map((vendor) => {
              return (
                <tr key={vendor._id}>
                  <td className=" px-12 py-2 ">{vendor.centerName}</td>
                  <td className=" px-12 py-2 ">{vendor.fullName}</td>
                  <td className=" px-12 py-2 ">
                    {vendor.isBlock ? "Blocked" : "Active"}
                  </td>
                  <td className=" px-12 py-2 ">
                    <button
                      className={`${
                        vendor.isBlock ? "bg-red-600" : "bg-green-600"
                      } text-white px-2 py-1 rounded`}
                      onClick={() => handleToggle(vendor._id)}
                    >
                      {vendor.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Vendors;

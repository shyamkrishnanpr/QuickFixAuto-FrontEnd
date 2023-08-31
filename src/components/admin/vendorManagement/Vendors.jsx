import React, { useEffect, useState } from "react";
import { fetchVendorsApi, blockVendorApi } from "../../../services/adminAPI";
import ConfirmationDialog from "../../util/ConfirmationDialog";

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [confirmationAction, setConfirmationAction] = useState(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const vendorInfo = await fetchVendorsApi();
        setVendors((prevVendors) => [...prevVendors, ...vendorInfo]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVendorData();
  }, []);

  const handleCancelVerify = () => {
    setConfirmationAction(null);
    setSelectedVendor(null);
  };

  const handleActionConfirmation = (vendorId, action) => {
    const vendorToToggle = vendors.find((vendor) => vendor._id === vendorId);

    if (vendorToToggle) {
      const newBlockedStatus = action === "block" ? true : false;
      blockVendorApi(vendorId, newBlockedStatus).then(() => {
        setVendors((prevVendors) =>
          prevVendors.map((vendor) =>
            vendor._id === vendorId
              ? { ...vendor, isBlock: newBlockedStatus }
              : vendor
          )
        );
      });
    }

    setConfirmationAction(null);
    setSelectedVendor(null);
  };

  const confirmBlockVendor = (vendorId) => {
    setSelectedVendor(vendorId);
    setConfirmationAction("block");
  };

  const confirmUnblockVendor = (vendorId) => {
    setSelectedVendor(vendorId);
    setConfirmationAction("unblock");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="text-xl font-bold text-gray-700">VENDOR MANAGEMENT</h2>
        <table className="w-full border-collapse mt-3">
          <thead>
            <tr className="bg-gradient-to-tr from-gray-800 to-gray-300">
              <th className="text-white border border-gray-400 px-4 py-2">
                Service Center
              </th>
              <th className="text-white border border-gray-400 px-4 py-2">
                Name of vendor
              </th>
              <th className="text-white border border-gray-400 px-4 py-2">
                Status
              </th>
              <th className="text-white border border-gray-400 px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => {
              return (
                <tr key={vendor._id}>
                  <td className="px-12 py-2">{vendor.centerName}</td>
                  <td className="px-12 py-2">{vendor.fullName}</td>
                  <td className="px-12 py-2">
                    {vendor.isBlock ? "Blocked" : "Active"}
                  </td>
                  <td className="px-12 py-2">
                    <button
                      className={`${
                        vendor.isBlock ? "bg-red-600" : "bg-green-600"
                      } text-white px-2 py-1 rounded`}
                      onClick={() =>
                        vendor.isBlock
                          ? confirmUnblockVendor(vendor._id)
                          : confirmBlockVendor(vendor._id)
                      }
                    >
                      {vendor.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {confirmationAction && (
          <ConfirmationDialog
            message={`Are you sure you want to ${
              confirmationAction === "block" ? "block" : "unblock"
            } this vendor...?`}
            onConfirm={() =>
              handleActionConfirmation(selectedVendor, confirmationAction)
            }
            onCancel={handleCancelVerify}
          />
        )}
      </div>
    </>
  );
};

export default Vendors;

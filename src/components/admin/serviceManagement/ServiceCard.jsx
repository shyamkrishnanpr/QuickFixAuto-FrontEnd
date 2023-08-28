import React from "react";

const ServiceCard = ({ service, onVerifyClick }) => {
  return (
    <div
      className=" shadow-md rounded-md p-8 mb-4 ml-9 flex items-center bg-gray-100 justify-between"
      style={{ width: "1050px", height: "150px" }}
    >
      <div className="flex-1">
        <table>
          <tbody>
            <tr>
              <td className="font-semibold"style={{ width: "130px" }}>Vendor Name</td>:
              <td>{service.vendorId.fullName}</td>
            </tr>
            <tr>
              <td className="font-semibold" style={{ width: "110px" }}>Center Name</td>:
              <td>{service.vendorId.centerName}</td>
            </tr>
            <tr>
              <td className="font-semibold " style={{ width: "110px" }}>Category</td>:
              <td>{service.categoryId.category}</td>
            </tr>
            <tr>
              <td className="font-semibold " style={{ width: "110px" }}>Sub Category</td>:
              <td>{service.subCategoryId.subCategory}</td>
            </tr>
            <tr>
              <td className="font-semibold " style={{ width: "110px" }}>Price</td>:
              <td> {service.price}</td>
            </tr>
            <tr>
              <td className="font-semibold " style={{ width: "110px" }}>Details</td>:
              <td> {service.description}</td>
            </tr>
            
          </tbody>
        </table>
        
      </div>

      <button
        onClick={() => onVerifyClick(service._id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Verify
      </button>
    </div>
  );
};

export default ServiceCard;

import React, { useState, useEffect } from "react";
import { fetchServicesApi,fetchCategoriesApi } from "../../services/userAPI";
import { useLocation } from "react-router";

const Service = () => {
  const location = useLocation();
  const userLocation = location.state?.selectedLocation;
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState(null);
  useEffect(() => {

    




    const fetchNearbyVendors = async () => {
      if (userLocation) {
        try {
          const response = await fetchServicesApi(userLocation);

          console.log(response);
          setNearbyVendors(response);

          console.log(nearbyVendors, "vendorssss");
        } catch (error) {
          console.error("Error fetching nearby vendors:", error);
        }
      }
    };

    const fetchCategories = async()=>{
      try {
        const categoryData = await fetchCategoriesApi()
        console.log(categoryData,"cate")
        setCategories(categoryData);
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
    fetchNearbyVendors();
  }, [userLocation]);


  const handleCategoryClick = (event) => {
    console.log("clicked")
    const category = event.target.textContent;
    setSelectedCategory(category);
  };

  const filteredVendors = nearbyVendors.filter((vendor) => {
    return vendor.categoryId.category === selectedCategory;
  });

  return (
    <>
      
      <div className="mt-4">
        <h2 className="text-lg text-red-500 font-semibold">Nearby Services</h2>

        <div className="flex space-x-4 mt-4">
          {categories.map((category, index) => 
             <h3 key={index} onClick={handleCategoryClick}  className={
              selectedCategory === category.category
                ? "text-blue-500"
                : "text-gray-500"
            }>{category.category}</h3>
          )}
        </div>



        <div className="space-y-4">
        {filteredVendors.map((vendor, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <div className="w-4/5">
              <h3 className=" font-semibold">{vendor.vendorId.centerName}</h3>
              <h3 className=" font-semibold">{vendor.categoryId.category}</h3>
              <h3 className=" font-semibold">{vendor.price}</h3>

              {/* Display other vendor details here */}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Book
            </button>
          </div>
        ))}
      </div>














      </div>
    </>
  );
};

export default Service;

import React, { useState, useEffect } from "react";
import { fetchServicesApi, fetchCategoriesApi } from "../../services/userAPI";
import { useLocation } from "react-router";

const Service = () => {
  const location = useLocation();
  const userLocation = location.state?.selectedLocation;
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const [categories, setCategories] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState("PERIODIC SERVICES");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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

    const fetchCategories = async () => {
      try {
        const categoryData = await fetchCategoriesApi();
        console.log(categoryData, "cate");
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
    fetchNearbyVendors();
  }, [userLocation]);

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.textContent);
  };

  const handleSuggestionClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(category)
    setShowSuggestions(false);
    setSuggestions([]);
  };
  const filteredVendors = nearbyVendors.filter((vendor) => {
    return vendor.categoryId.category === selectedCategory;
  });

  const handleCategorySearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredSuggestions = categories.filter((category) =>
      category.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  return (
    <>
      <div className="mt-4 ">
        <div className="mt-4 bg-gray-100">
          <div className="flex items-center justify-between">
            <h1 className="text-lg text-black ml-2 mt-2 font-semibold">
              SERVICE PACKAGES
            </h1>
            <div className="ml-2 mr-5">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={handleCategorySearch}
                className="border border-gray-300 rounded-md p-2"
              />

             
              {showSuggestions && suggestions.length > 0 && (
                <ul className="mt-2 border border-gray-300 rounded-md absolute bg-white ">
                  {suggestions.map((category, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(category.category)}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                    >
                      {category.category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-4 ml-2 mr-2 mt-4 ">
          {categories.map((category, index) => (
            <h3
              key={index}
              onClick={handleCategorySelect}
              className={
                " bg-gray-100 px-4 py-2 rounded-md " +
                (selectedCategory === category.category
                  ? " text-red-500 "
                  : " text-gray-500")
              }
            >
              {category.category}
            </h3>
          ))}
        </div>

        <div className="space-y-4 ml-2 w-8/12 mt-2">
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

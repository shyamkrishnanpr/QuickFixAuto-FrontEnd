import React, { useState, useEffect } from "react";
import { fetchServicesApi, fetchCategoriesApi } from "../../services/userAPI";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const Service = () => {
  const location = useLocation();
  const userLocation = location.state?.selectedLocation;
  const [nearbyVendors, setNearbyVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await fetchCategoriesApi();
        console.log(categoryData, "categories at the page are");
        setCategories(categoryData);
        setSelectedCategory(categoryData[0]._id)
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchNearbyVendorsByCategory = async (selectedCategory) => {
      if (userLocation && selectedCategory) {
        try {
          const response = await fetchServicesApi(
            userLocation,
            selectedCategory,
            currentPage
          );

          console.log(response, "response at page is ");
          const count = response.totalcount;
          const calculateTotalPage = Math.ceil(count / pageSize);
          setTotalPages(calculateTotalPage);
          setNearbyVendors(response.services);
        } catch (error) {
          console.error("Error fetching nearby vendors:", error);
        }
      }
    };
    fetchNearbyVendorsByCategory(selectedCategory);
  }, [userLocation, selectedCategory, currentPage]);

  const handleCategorySelect = (event) => {
    const categoryId = event.target.getAttribute("data-category-id");
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleCategorySearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredSuggestions = categories.filter((category) =>
      category.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (category) => {
    console.log(category, "at click");
    setSelectedCategory(category);

    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="mt-2">
      <div className="bg-white">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg text-black font-semibold">SERVICE PACKAGES</h1>

          <div className="ml-2 mr-5">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleCategorySearch}
              className="border border-gray-300 rounded-md p-2"
            />

            {showSuggestions && suggestions.length > 0 && (
              <ul className="mt-1 border border-gray-300 rounded-md absolute bg-white ">
                {suggestions.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(category._id)}
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

      <div className="flex flex-col space-x-1 md:flex-row space-y-4 md:space-y-0 ml-2 mr-2 mt-2">
        {categories.map((category, index) => (
          <h3
            key={index}
            data-category-id={category._id}
            onClick={handleCategorySelect}
            className={
              "bg-gray-100 px-4 py-2 rounded-md text-center " +
              (selectedCategory === category._id
                ? "text-red-500"
                : "text-gray-500")
            }
          >
            {category.category}
          </h3>
        ))}
      </div>

      <div className="flex flex-col md:flex-row">
  <div className="md:w-8/12 mt-2 ml-2 space-y-4 md:ml-0 md:space-x-4 md:space-y-4">
    {nearbyVendors.map((vendor, index) => (
      <div
        key={index}
        className="bg-gray-200 rounded-lg shadow-md p-4 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="w-full md:w-3/5 text-center md:text-left">
          <h3 className="font-semibold">{vendor.vendorId.centerName}</h3>
          <h3 className="font-semibold">{vendor.categoryId.category}</h3>
          <h3 className="font-semibold">{vendor.price}</h3>
        </div>

        <div className="md:w-5/5 mt-2 md:mt-0 flex items-center justify-center">
          <Link
            to={`/user/serviceDetails/${vendor._id}`}
            className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Details
          </Link>
        </div>
      </div>
    ))}

    <div className="mt-4 text-center space-x-2">
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalPages * pageSize}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  </div>

  <div className="md:w-4/12 mt-2 md:ml-4">
    {nearbyVendors.length > 0 && (
      <div className="w-full flex flex-col justify-center items-center rounded-lg shadow-md">
        <img
          src={`http://localhost:3000/vehicleImages/${nearbyVendors[0].vehicleId.image}`} 
          alt="Vehicle"
          className="mx-auto w-10/12 h-auto"
        />
        <h3 className="font-semibold mt-2">
          {nearbyVendors[0].vehicleId.brand }  {nearbyVendors[0].vehicleId.model }
        </h3>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Service;

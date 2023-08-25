import React, { useEffect, useState } from "react";
import { fetchCategoriesAsync } from "../../../store/reducers/admin/categorySlice";
import {
  fetchSubCategoriesAsync,
  addSubCategoriesAsync,
  deleteSubCategoryAsync,
  editSubCategoryAsync,
} from "../../../store/reducers/admin/subCategorySlice";
import { useDispatch, useSelector } from "react-redux";
const SubCategory = () => {
  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.subCategory.subCategories);
  const categories = useSelector((state) => state.category.categories);
  console.log("categories in the state", categories);

  console.log("the subcategories in state ", subCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState("");
  const [editSubCategoryId, setEditSubCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchSubCategoriesAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleSubCategorySubmit = async () => {
    if (newSubcategory.trim() !== "" && selectedCategoryId.trim() !== "") {
      try {
        dispatch(
          addSubCategoriesAsync({
            subCategory: newSubcategory,
            categoryId: selectedCategoryId,
          })
        );
        console.log("subcategory added", newSubcategory, selectedCategoryId);
        setNewSubcategory("");
        setIsModalOpen(false);
        setSelectedCategoryId("");
        dispatch(fetchSubCategoriesAsync());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      dispatch(deleteSubCategoryAsync(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async () => {
    if (editSubCategory.trim() !== "") {
      try {
        dispatch(
          editSubCategoryAsync({
            id: editSubCategoryId,
            newName: editSubCategory,
          })
        );
        setEditSubCategory("");
        setEditSubCategoryId(null);
        setIsEditModalOpen(false);
        dispatch(fetchSubCategoriesAsync());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditSubCategory = (id, name) => {
    console.log();
    setEditSubCategoryId(id);
    setEditSubCategory(name);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="bg-gray-50 w-full min-h-screen">
        <div className="p-4">
          <div className="bg-white p-4 rounded-md">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-700">
                  SUB CATEGORY MANAGEMENT
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
                    <div>
                      <span>SUB CATEGORY</span>
                    </div>
                    <div>
                      <span>CATEGORY</span>
                    </div>
                    <div>
                      <span>ACTION</span>
                    </div>
                  </div>

                  <div>
                    {subCategories.map((subCategory) => {
                      const category = categories.find(
                        (cat) => cat.id == subCategory.categoryId
                      );
                      console.log("hello here", category);
                      return (
                        <div
                          key={subCategory.id}
                          className="flex items-left justify-between border-t text-sm font-normal mt-4 space-x-4"
                        >
                          <div className="w-2/5 px-4">
                            <span>{subCategory.subCategory}</span>
                          </div>
                          <div className="w-2/5 px-4">
                            <span>{category ? category.category : ""}</span>
                          </div>
                          <div className="flex items-center space-x-2 px-4">
                            <button
                              onClick={() =>
                                handleEditSubCategory(
                                  subCategory.id,
                                  subCategory.subCategory
                                )
                              }
                              className="text-blue-500 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSubCategory(subCategory.id)
                              }
                              className="text-red-500 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <h3 className="text-lg font-semibold mb-4">Add Subcategory</h3>
                <label>
                  Sub Category
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    className="border rounded py-2 px-3 w-full mb-4"
                  />
                </label>

                <select
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                  className="border rounded py-2 px-3 w-full mb-4"
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSubCategorySubmit}
                  >
                    Add
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {isEditModalOpen && (
          <div
            className={`fixed inset-0 flex items-center justify-center z-10 ${
              isEditModalOpen ? "block" : "hidden"
            }`}
          >
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="modal z-20 p-4 rounded bg-white shadow-lg w-96">
              <div className="modal-content">
                <h3 className="text-lg font-semibold mb-4">Edit Subcategory</h3>
                <input
                  type="text"
                  value={editSubCategory}
                  onChange={(e) => setEditSubCategory(e.target.value)}
                  className="border rounded py-2 px-3 w-full mb-4"
                />
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleEditSubmit}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditSubCategory("");
                      setEditSubCategoryId(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubCategory;

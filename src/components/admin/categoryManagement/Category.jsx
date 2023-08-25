import React, { useEffect, useState } from 'react'
import {
  fetchCategoriesAsync,
  addCategoriesAsync,
  editCategoryAsync,
  deleteCategoryAsync
} from '../../../store/reducers/admin/categorySlice'

import { useDispatch, useSelector } from "react-redux";

const Category = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state)=>state.category.categories)
  console.log("categories in the state",categories)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditModalOpen,setIsEditModalOpen] = useState(false)
  const [editCategory,setEditCategory] = useState("")
  const [editCategoryId,setEditCategoryId] = useState(null)

  
  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleCategorySubmit = async () => {
    if (newCategory.trim() !== "") {
      try {
        dispatch(addCategoriesAsync(newCategory));
        console.log("category added", newCategory);
        setNewCategory("");
        setIsModalOpen(false);
        dispatch(fetchCategoriesAsync());
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      dispatch(deleteCategoryAsync(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async () =>{
    if(editCategory.trim()!==""){
        try {
            dispatch(editCategoryAsync({id:editCategoryId,newName:editCategory}))
            setEditCategory("")
            setEditCategoryId(null)
            setIsEditModalOpen(false)
            dispatch(fetchCategoriesAsync())
        } catch (error) {
            console.log(error)
        }
    }
  };

  const handleEditCategory = (id,name)=>{
    console.log()
    setEditCategoryId(id)
    setEditCategory(name)
    setIsEditModalOpen(true)
  }




  return ( 
      <>
      <div className="bg-gray-50 w-full min-h-screen">
        <div>
          <div className="p-4">
            <div className="bg-white p-4 rounded-md">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-700">
                    CATEGORY MANAGEMENT
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
                        <span> CATEGORY</span>
                      </div>
                      <div>
                        <span></span>
                      </div>
                      <div>
                        <span>ACTION</span>
                      </div>
                    </div>

                    <div>
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-middle justify-between border-t text-sm font-normal mt-4 space-x-4"
                        >
                          <div className="px-8 flex-grow">
                            <span>{category.category}</span>
                          </div>
                          <div className="px-2 ">
                            <button onClick={()=>handleEditCategory(category.id,category.category)} className="text-blue-500">Edit</button>
                          </div>
                          <div className="px-4">
                            <button
                              onClick={() =>
                                handleDeleteCategory(category.id)
                              }
                              className="text-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
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
                <h3 className="text-lg font-semibold mb-4">Add Category</h3>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="border rounded py-2 px-3 w-full mb-4"
                />
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleCategorySubmit}
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
                <div className={`fixed inset-0 flex items-center justify-center z-10 ${isEditModalOpen ? 'block' : 'hidden'}`}>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="modal z-20 p-4 rounded bg-white shadow-lg w-96">
                        <div className="modal-content">
                            <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
                            <input
                                type="text"
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
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
                                        setEditCategory('');
                                        setEditCategoryId(null);
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
  )
}

export default Category

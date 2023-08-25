import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSubCategoryApi,
  addSubCategoryApi,
  deleteSubCategoryApi,
  editSubCategoryApi
} from "../../../services/adminAPI";

export const fetchSubCategoriesAsync = createAsyncThunk(
  "subCategory/fetchSubCategories",
  async (thunkAPI) => {
    try {
      const response = await fetchSubCategoryApi();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addSubCategoriesAsync = createAsyncThunk(
  "subCategory/addSubcategory",
  async ({subCategory,categoryId}, thunkAPI) => {
    console.log("in async",subCategory,categoryId)
    try {
      const response = await addSubCategoryApi(subCategory,categoryId);
      console.log(response)
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editSubCategoryAsync = createAsyncThunk(
  "subCategory/editSubCategories",
  async ({ id, newName }, thunkAPI) => {
    try {
      const response = await editSubCategoryApi(id,newName);
      return {id,newName}
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSubCategoryAsync = createAsyncThunk(
  "subCategory/deleteSubCategories",
  async (id, thunkAPI) => {
    try {
      await deleteSubCategoryApi(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  subCategories: [],
  loading: "idle",
  

};

const subCategorySlice = createSlice({
  name: "subCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategoriesAsync.pending, (state, action) => {
        state.loading === "loading";
      })
      .addCase(fetchSubCategoriesAsync.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.subCategories = action.payload.map((subCategory) => ({
          id: subCategory._id,
          subCategory: subCategory.subCategory,
          categoryId:subCategory.categoryId
   

        }));
      })
      .addCase(fetchSubCategoriesAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      .addCase(deleteSubCategoryAsync.fulfilled, (state, action) => {
        state.subCategories = state.subCategories.filter(
          (subCategory) => subCategory.id !== action.payload
        );
      });
  },
});

export default subCategorySlice.reducer;

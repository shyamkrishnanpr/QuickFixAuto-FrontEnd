import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoryApi,
  addCategoryApi,
  deleteCategoryApi,
  editCategoryApi
} from "../../../services/adminAPI";

export const fetchCategoriesAsync = createAsyncThunk(
  "category/fetchCategories",
  async (thunkAPI) => {
    try {
      const response = await fetchCategoryApi();
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addCategoriesAsync = createAsyncThunk(
  "category/addCategories",
  async (category, thunkAPI) => {
    try {
      const response = await addCategoryApi(category);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editCategoryAsync = createAsyncThunk(
  "category/editCategories",
  async ({ id, newName }, thunkAPI) => {
    try {
      const response = await editCategoryApi(id,newName);
      return response
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/deleteCategories",
  async (id, thunkAPI) => {
    try {
      await deleteCategoryApi(id);
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  categories: [],
  loading: "idle",
  

};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.pending, (state, action) => {
        state.loading === "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.categories = action.payload.map((category) => ({
          id: category._id,
          category: category.category,

        }));
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })

      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;

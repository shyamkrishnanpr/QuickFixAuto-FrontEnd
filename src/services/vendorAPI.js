import { toast } from "react-toastify";
import axios from "../Axios/axios";

export const vendorSignUpApi = async (values) => {
  try {
    const response = await axios.post("/vendor/signUp", values);
    console.log("response in api", response.data);
    return response.data;
  } catch (error) {
    console.log("error in signin", error);
    toast.error(error.response.data.message);
  }
};

export const vendorOtpApi = async (values) => {
  try {
    const response = await axios.post("/vendor/verifyOtp", values);
    return response.data;
  } catch (error) {
    console.log("error in otp api", error);
  }
};

export const vendorResendOtpApi = async (values) => {
  try {
    const response = await axios.post("/vendor/resendOtp", values);
    return response.data;
  } catch (error) {
    console.log("error in resend otp", error);
  }
};

export const vendorLoginApi = async (values) => {
  try {
    const response = await axios.post("/vendor/login", values);
    console.log("at api", response);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const fetchVendorDataApi = async (vendorId) => {
  try {
    const response = await axios.get(`/vendor/vendorInfo`);
    console.log("response in api ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateVendorDataApi = async (vendorId, editedVendorData) => {
  try {
    console.log(editedVendorData, "apiiii");
    const response = await axios.put(
      `/vendor/updateProfile/${vendorId}`,
      editedVendorData
    );
    console.log("response in ap", response.data);

    return response.data;
  } catch (error) {
    console.log("error in updateApi", error);
  }
};

export const fetchCategoryApi = async () => {
  try {
    const response = await axios.get("/vendor/category");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchSubCategoryApi = async (selectedCategory) => {
  try {
    const response = await axios.get(
      `/vendor/subCategory?categoryId=${selectedCategory}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchVehiclesApi = async () => {
  try {
    const response = await axios.get(`/vendor/vehicles`);
    return response.data;
  } catch (error) {
    console.log("error in vehicle fetch", error);
  }
};

export const addServiceApi = async (newServiceData) => {
  try {
    console.log("abc", newServiceData);
    const response = await axios.post(`/vendor/addService`, newServiceData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchServiceApi = async (page, perPage) => {
  try {
    const response = await axios.get(
      `/vendor/getServices?page=${page}&perPage=${perPage}`
    );
    console.log("at api", response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addAvailableSlotsApi = async (data) => {
  try {
    console.log(data, "in api");
    const response = await axios.post(`/vendor/addSlots`, data);
    console.log(response.data, "at api res");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOrdersApi = async () => {
  try {
    const response = await axios.get(`/vendor/getOrders`);
    
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

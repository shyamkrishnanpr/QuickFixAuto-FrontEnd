import axios from "axios";
import store from "../store/store";

const instance = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL:'https://quickfixautos.shop'
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getState()?.token.token;

    console.log("token in adminaxios",token)
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

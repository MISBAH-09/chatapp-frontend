import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("userToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default AxiosInstance;

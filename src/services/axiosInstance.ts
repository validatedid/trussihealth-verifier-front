import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error;    
  }
);

export default axiosInstance;

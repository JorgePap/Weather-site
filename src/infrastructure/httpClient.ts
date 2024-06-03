import axios from "axios";

export const axiosService = axios.create({
  baseURL: "http://api.weatherapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosService;
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL
export const axiosService = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosService;
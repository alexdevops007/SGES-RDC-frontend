import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://sges-rdc-backend.vercel.app/api"
    : "http://localhost:3000/api";

const apiService = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/"; // Redirection après réception de 401
    }
    return Promise.reject(error);
  }
);

export default apiService;

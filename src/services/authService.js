// frontend/services/authService.js
import apiClient from "./apiService";

const register = (userData) => {
  return apiClient.post("/auth/register", userData);
};

const login = (credentials) => {
  return apiClient.post("/auth/login", credentials).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};

import apiClient from "./apiService";

const getUsers = () => {
  return apiClient.get("/users");
};

const getUser = (id) => {
  return apiClient.get(`/users/${id}`);
};

const createUser = (userData) => {
  return apiClient.post("/users", userData);
};

const updateUser = (id, userData) => {
  return apiClient.put(`/users/${id}`, userData);
};

const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

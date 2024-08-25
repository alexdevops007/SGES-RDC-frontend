import apiClient from "./apiService";

const fetchNotifications = () => {
  return apiClient.get("/notifications");
};

const markAsRead = (notificationId) => {
  return apiClient.put(`/notifications/${notificationId}/read`);
};

export default {
  fetchNotifications,
  markAsRead,
};

import apiClient from "./apiService";

const getInquiries = () => {
  return apiClient.get("/inquiries");
};

const getInquiry = (id) => {
  return apiClient.get(`/inquiries/${id}`);
};

const createInquiry = (inquiryData) => {
  return apiClient.post("/inquiries", inquiryData);
};

const updateInquiry = (id, inquiryData) => {
  return apiClient.put(`/inquiries/${id}`, inquiryData);
};

const deleteInquiry = (id) => {
  return apiClient.delete(`/inquiries/${id}`);
};

export default {
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
};

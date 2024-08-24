import inquiryService from "../../services/inquiryService";

const state = {
  inquiries: [],
  inquiry: null,
};

const mutations = {
  SET_INQUIRIES(state, inquiries) {
    state.inquiries = inquiries;
  },
  SET_INQUIRY(state, inquiry) {
    state.inquiry = inquiry;
  },
  ADD_INQUIRY(state, inquiry) {
    state.inquiries.push(inquiry);
  },
  UPDATE_INQUIRY(state, updatedInquiry) {
    const index = state.inquiries.findIndex(
      (i) => i._id === updatedInquiry._id
    );
    if (index !== -1) {
      state.inquiries.splice(index, 1, updatedInquiry);
    }
  },
  DELETE_INQUIRY(state, inquiryId) {
    state.inquiries = state.inquiries.filter((i) => i._id !== inquiryId);
  },
};

const actions = {
  async fetchInquiries({ commit }) {
    const response = await inquiryService.getInquiries();
    commit("SET_INQUIRIES", response.data);
  },
  async fetchInquiry({ commit }, id) {
    const response = await inquiryService.getInquiry(id);
    commit("SET_INQUIRY", response.data);
  },
  async createInquiry({ commit }, inquiryData) {
    const response = await inquiryService.createInquiry(inquiryData);
    commit("ADD_INQUIRY", response.data);
  },
  async updateInquiry({ commit }, { id, inquiryData }) {
    const response = await inquiryService.updateInquiry(id, inquiryData);
    commit("UPDATE_INQUIRY", response.data);
  },
  async deleteInquiry({ commit }, id) {
    await inquiryService.deleteInquiry(id);
    commit("DELETE_INQUIRY", id);
  },
};

const getters = {
  inquiries: (state) => state.inquiries,
  inquiry: (state) => state.inquiry,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

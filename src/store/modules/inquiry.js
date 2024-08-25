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
    try {
      const response = await inquiryService.getInquiries();
      commit("SET_INQUIRIES", response.data);
      console.log("Inquiries fetched:", response.data); // Vérifier si les données sont bien récupérées
    } catch (error) {
      console.error("Erreur lors du chargement des enquêtes:", error);
    }
  },
  async fetchInquiry({ commit }, id) {
    try {
      const response = await inquiryService.getInquiry(id);
      commit("SET_INQUIRY", response.data);
    } catch (error) {
      console.error("Erreur lors du chargement de l'enquête:", error);
    }
  },
  async createInquiry({ commit }, inquiryData) {
    try {
      const response = await inquiryService.createInquiry(inquiryData);
      commit("ADD_INQUIRY", response.data);
    } catch (error) {
      console.error("Erreur lors de la création de l'enquête:", error);
    }
  },
  async updateInquiry({ commit }, { id, inquiryData }) {
    try {
      const response = await inquiryService.updateInquiry(id, inquiryData);
      commit("UPDATE_INQUIRY", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'enquête:", error);
    }
  },
  async deleteInquiry({ commit }, id) {
    try {
      await inquiryService.deleteInquiry(id);
      commit("DELETE_INQUIRY", id);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'enquête:", error);
    }
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

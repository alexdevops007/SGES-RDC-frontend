import reportService from "../../services/reportService";

const state = {
  reports: [],
  report: null,
};

const mutations = {
  SET_REPORTS(state, reports) {
    state.reports = reports;
  },
  SET_REPORT(state, report) {
    state.report = report;
  },
};

const actions = {
  async fetchReports({ commit }) {
    const response = await reportService.getReports();
    commit("SET_REPORTS", response.data);
  },
  async fetchReport({ commit }, id) {
    const response = await reportService.getReport(id);
    commit("SET_REPORT", response.data);
  },
  async generateReport({ dispatch, rootGetters }, reportType) {
    const userId = rootGetters["auth/user"]._id;
    await reportService.generateReport(reportType, userId);
    dispatch("fetchReports");
  },
};

const getters = {
  reports: (state) => state.reports,
  report: (state) => state.report,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import authService from "../../services/authService";

const state = {
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
  SET_AUTH(state, { token, user }) {
    state.token = token;
    state.user = user;
  },
  LOGOUT(state) {
    state.token = "";
    state.user = null;
  },
};

const actions = {
  async login({ commit }, credentials) {
    const userData = await authService.login(credentials);
    commit("SET_AUTH", { token: userData.token, user: userData });
  },
  logout({ commit }) {
    authService.logout();
    commit("LOGOUT");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

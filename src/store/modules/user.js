import userService from "../../services/userService";

const state = {
  users: [],
  user: null,
};

const mutations = {
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((user) => user._id === updatedUser._id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  DELETE_USER(state, userId) {
    state.users = state.users.filter((user) => user._id !== userId);
  },
};

const actions = {
  async fetchUsers({ commit }) {
    const response = await userService.getUsers();
    commit("SET_USERS", response.data);
  },
  async fetchUser({ commit }, id) {
    const response = await userService.getUser(id);
    commit("SET_USER", response.data);
  },
  async createUser({ commit }, userData) {
    const response = await userService.createUser(userData);
    commit("ADD_USER", response.data);
  },
  async updateUser({ commit }, { id, userData }) {
    const response = await userService.updateUser(id, userData);
    commit("UPDATE_USER", response.data);
  },
  async deleteUser({ commit }, id) {
    await userService.deleteUser(id);
    commit("DELETE_USER", id);
  },
};

const getters = {
  users: (state) => state.users,
  user: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import notificationService from "../../services/notificationService";
//import socketService from "../../services/socketService";

const state = {
  notifications: [],
};

const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications;
  },
  ADD_NOTIFICATION(state, notification) {
    state.notifications.unshift(notification);
  },
  MARK_AS_READ(state, notificationId) {
    const notification = state.notifications.find(
      (n) => n._id === notificationId
    );
    if (notification) {
      notification.isRead = true;
    }
  },
};

const actions = {
  async fetchNotifications({ commit }) {
    try {
      const response = await notificationService.fetchNotifications();
      commit("SET_NOTIFICATIONS", response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des notifications :",
        error
      );
    }
  },
  async markAsRead({ commit }, notificationId) {
    try {
      await notificationService.markAsRead(notificationId);
      commit("MARK_AS_READ", notificationId);
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la notification :",
        error
      );
    }
  },
  /*
  listenForNotifications({ commit }) {
    socketService.on("new-notification", (notification) => {
      commit("ADD_NOTIFICATION", notification);
    });
  },
  */
};

const getters = {
  unreadNotifications: (state) => state.notifications.filter((n) => !n.isRead),
  readNotifications: (state) => state.notifications.filter((n) => n.isRead),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

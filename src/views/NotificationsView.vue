<template>
  <div class="p-6 bg-pnc-dark text-pnc-white">
    <h2 class="text-2xl font-bold mb-4">Notifications</h2>
    <div class="mb-4">
      <button
        @click="filterRead('all')"
        :class="filterClass('all')"
        class="mr-4"
      >
        Toutes
      </button>
      <button
        @click="filterRead('unread')"
        :class="filterClass('unread')"
        class="mr-4"
      >
        Non lues
      </button>
      <button @click="filterRead('read')" :class="filterClass('read')">
        Lues
      </button>
    </div>
    <ul>
      <li
        v-for="notification in filteredNotifications"
        :key="notification._id"
        class="mb-2"
      >
        <div class="flex justify-between">
          <span>{{ notification.message }}</span>
          <button
            v-if="!notification.isRead"
            @click="markAsRead(notification._id)"
            class="text-pnc-gold hover:underline"
          >
            Marquer comme lu
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      filter: "all",
    };
  },
  computed: {
    ...mapGetters("notification", ["unreadNotifications", "readNotifications"]),
    filteredNotifications() {
      if (this.filter === "unread") {
        return this.unreadNotifications;
      } else if (this.filter === "read") {
        return this.readNotifications;
      } else {
        return [...this.unreadNotifications, ...this.readNotifications];
      }
    },
  },
  methods: {
    ...mapActions("notification", ["markAsRead"]),
    filterRead(filter) {
      this.filter = filter;
    },
    filterClass(filter) {
      return this.filter === filter ? "text-pnc-gold" : "text-pnc-gray";
    },
  },
  created() {
    this.$store.dispatch("notification/fetchNotifications");
  },
};
</script>

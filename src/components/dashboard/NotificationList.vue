<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Notifications</h2>
    <ul v-if="unreadNotifications.length > 0">
      <li v-for="notification in unreadNotifications" :key="notification._id" class="mb-2">
        <div class="flex justify-between">
          <span>{{ notification.message }}</span>
          <button @click="markAsRead(notification._id)" class="text-pnc-blue hover:underline">Marquer comme lu</button>
        </div>
      </li>
    </ul>
    <p v-else class="text-pnc-gray">Aucune notification disponible.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("notification", ["unreadNotifications"]),
  },
  methods: {
    ...mapActions("notification", ["markAsRead"]),
  },
  created() {
    this.$store.dispatch("notification/fetchNotifications");
  },
};
</script>

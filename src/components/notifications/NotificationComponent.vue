<template>
  <div class="fixed bottom-0 right-0 m-6">
    <div
      v-for="notification in unreadNotifications"
      :key="notification._id"
      class="bg-pnc-gold text-pnc-dark p-4 mb-2 rounded-lg shadow-lg"
    >
      <p>{{ notification.message }}</p>
      <button
        @click="markAsRead(notification._id)"
        class="text-pnc-blue hover:underline"
      >
        Marquer comme lu
      </button>
    </div>
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
};
</script>

<style scoped>
/* Ajoutez ici des styles personnalisés pour les notifications */
</style>

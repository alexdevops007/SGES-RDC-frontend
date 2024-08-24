<template>
  <div class="mt-6">
    <h2 class="text-xl font-bold mb-2">Notifications Récentes</h2>
    <ul>
      <li
        v-for="notification in notifications"
        :key="notification.id"
        class="bg-white shadow p-4 mb-2 rounded"
      >
        <span class="font-semibold">{{ notification.title }}</span> -
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        {
          id: 1,
          title: "Nouvelle enquête assignée",
          message: "Vous avez une nouvelle enquête à traiter.",
        },
        {
          id: 2,
          title: "Enquête mise à jour",
          message: "L'enquête X a été mise à jour.",
        },
        // Ajoutez d'autres notifications ici
      ],
    };
  },
};
</script>

<style scoped>
/* Ajout de styles personnalisés si nécessaire */
</style>

<!-- frontend/components/dashboard/Dashboard.vue -->
<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-pnc-blue text-white flex-shrink-0">
      <nav class="flex flex-col p-4">
        <router-link to="/dashboard" class="mb-4 flex items-center">
          <i class="fas fa-tachometer-alt mr-3"></i> Tableau de bord
        </router-link>
        <router-link to="/inquiries" class="mb-4 flex items-center">
          <i class="fas fa-clipboard-list mr-3"></i> Enquêtes
        </router-link>
        <router-link to="/users" class="mb-4 flex items-center">
          <i class="fas fa-users mr-3"></i> Utilisateurs
        </router-link>
        <router-link to="/reports" class="mb-4 flex items-center">
          <i class="fas fa-chart-bar mr-3"></i> Rapports
        </router-link>
        <router-link to="/notifications" class="mb-4 flex items-center">
          <i class="fas fa-bell mr-3"></i> Notifications
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex flex-col flex-1">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Tableau de bord</h1>
        <div class="flex items-center">
          <i class="fas fa-bell text-xl mr-6 cursor-pointer relative">
            <span
              class="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"
            ></span>
          </i>
          <span class="mr-4">Bienvenue, {{ userName }}</span>
          <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="p-4 flex-grow overflow-y-auto">
        <InquiryStats />
        <NotificationList />
      </main>
    </div>
  </div>
</template>

<script>
import InquiryStats from "./InquiryStats.vue";
import NotificationList from "./NotificationList.vue";

export default {
  components: {
    InquiryStats,
    NotificationList,
  },
  data() {
    return {
      userName: "Utilisateur", // Exemple de nom d'utilisateur
    };
  },
  methods: {
    logout() {
      // Logique de déconnexion
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
/* Ajout de styles personnalisés si nécessaire */
</style>

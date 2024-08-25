<!-- src/components/layouts/MainLayout.vue -->
<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Barre latérale -->
    <aside class="w-full lg:w-64 bg-pnc-dark text-pnc-white p-4">
      <h2 class="text-2xl font-bold mb-6 text-center lg:text-left">SGES-RDC</h2>
      <nav>
        <ul>
            <li class="mb-4">
            <router-link
              to="/dashboard"
              class="flex items-center justify-center lg:justify-start"
            >
              <i class="fas fa-gauge mr-2"></i> Tableau de bord
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/inquiries"
              class="flex items-center justify-center lg:justify-start"
            >
              <i class="fas fa-clipboard-list mr-2"></i> Enquêtes
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/users"
              class="flex items-center justify-center lg:justify-start"
            >
              <i class="fas fa-users mr-2"></i> Utilisateurs
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/reports"
              class="flex items-center justify-center lg:justify-start"
            >
              <i class="fas fa-chart-bar mr-2"></i> Rapports
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/notifications"
              class="flex items-center justify-center lg:justify-start"
            >
              <i class="fas fa-bell mr-2"></i> Notifications
              <span
                v-if="unreadNotifications.length"
                class="bg-pnc-gold text-pnc-dark ml-2 px-2 rounded-full text-sm"
              >
                {{ unreadNotifications.length }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Contenu principal -->
    <div class="flex-1 p-6 bg-gray-100">
      <header
        class="flex flex-col lg:flex-row justify-between items-center mb-6"
      ><div></div>
        <div class="flex items-center">
          <span class="mr-4">{{ user.name }}</span>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <!-- Affichage de la vue -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("notification", ["unreadNotifications"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
};
</script>

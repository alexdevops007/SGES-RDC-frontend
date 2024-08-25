<template>
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Barre latérale -->
    <aside class="w-full lg:w-64 bg-pnc-dark text-pnc-white p-4">
      <h2 class="text-2xl font-bold mb-6 text-center lg:text-left">SGES-RDC</h2>
      <nav>
        <ul>
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
      >
        <h1 class="text-3xl font-bold mb-4 lg:mb-0">Tableau de Bord</h1>
        <div class="flex items-center">
          <!-- Vérification si l'utilisateur est défini -->
          <span class="mr-4" v-if="user">{{ user.name }}</span>
          <button
            @click="handleLogout"
            class="bg-red-500 text-white px-4 py-2 rounded"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InquiryStats
          :reportData="inquiriesStats"
          v-if="inquiriesStatsAvailable"
        />
        <NotificationList />
        <UrgencyPieChart
          :reportData="urgencyStats"
          v-if="inquiriesStatsAvailable"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InquiryStats from "./InquiryStats.vue";
import UrgencyPieChart from "./UrgencyPieChart.vue";
import NotificationList from "./NotificationList.vue";

export default {
  components: {
    InquiryStats,
    UrgencyPieChart,
    NotificationList,
  },
  computed: {
    ...mapGetters("auth", ["user"]),
    ...mapGetters("notification", ["unreadNotifications"]),
    inquiries() {
      return this.$store.getters["inquiry/inquiries"];
    },
    inquiriesStats() {
      if (!this.inquiries || this.inquiries.length === 0) {
        return { enCours: 0, complete: 0, urgent: 0 };
      }

      const stats = {
        enCours: 0,
        complete: 0,
        urgent: 0,
      };

      this.inquiries.forEach((inquiry) => {
        if (inquiry.status === "En cours") stats.enCours++;
        else if (inquiry.status === "Complété") stats.complete++;
        else if (inquiry.status === "Urgent") stats.urgent++;
      });

      return stats;
    },
    urgencyStats() {
      if (!this.inquiries || this.inquiries.length === 0) {
        return { basse: 0, moyenne: 0, elevee: 0 };
      }

      const urgencyCounts = {
        basse: 0,
        moyenne: 0,
        elevee: 0,
      };

      this.inquiries.forEach((inquiry) => {
        if (inquiry.urgency === "Basse") urgencyCounts.basse++;
        else if (inquiry.urgency === "Moyenne") urgencyCounts.moyenne++;
        else if (inquiry.urgency === "Élevée") urgencyCounts.elevee++;
      });

      return urgencyCounts;
    },
    inquiriesStatsAvailable() {
      return this.inquiries && this.inquiries.length > 0;
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("inquiry", ["fetchInquiries"]),
    handleLogout() {
      this.logout();
      this.$router.push("/");
    },
  },
  created() {
    this.fetchInquiries();
  },
};
</script>

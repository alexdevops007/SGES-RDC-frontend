<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Tableau de Bord</h1>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <InquiryStats :reportData="inquiriesStats" v-if="inquiriesStatsAvailable" />
    <NotificationList />
    <UrgencyPieChart :reportData="urgencyStats" v-if="inquiriesStatsAvailable" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InquiryStats from "@/components/dashboard/InquiryStats.vue";
import UrgencyPieChart from "@/components/dashboard/UrgencyPieChart.vue";
import NotificationList from "@/components/dashboard/NotificationList.vue";

export default {
  components: {
    InquiryStats,
    UrgencyPieChart,
    NotificationList,
  },
  computed: {
    ...mapGetters("inquiry", ["inquiries"]),
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
    ...mapActions("inquiry", ["fetchInquiries"]),
  },
  created() {
    this.fetchInquiries();
  },
};
</script>

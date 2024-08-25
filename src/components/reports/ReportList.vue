<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Liste des Rapports</h2>
    <ul>
      <li v-for="report in reports" :key="report._id">
        <router-link :to="{ name: 'ReportDetail', params: { id: report._id } }">
          {{ report.type }} - Généré par {{ report.generatedBy.name }} le
          {{ formattedDate(report.createdAt) }}
        </router-link>
      </li>
    </ul>
    <button
      @click="generateNewReport"
      class="bg-pnc-blue text-white py-2 px-4 rounded mt-4"
    >
      Générer un Nouveau Rapport
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("report", ["reports"]),
  },
  methods: {
    ...mapActions("report", ["fetchReports", "generateReport"]),
    formattedDate(date) {
      return new Date(date).toLocaleString();
    },
    generateNewReport() {
      this.generateReport("Statistiques des Enquêtes");
    },
  },
  created() {
    this.fetchReports();
  },
};
</script>

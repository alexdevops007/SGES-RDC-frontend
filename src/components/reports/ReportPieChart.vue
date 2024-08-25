<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Urgence des Enquêtes (Camembert)</h2>
    <Pie :data="chartData" v-if="chartDataAvailable" />
    <p v-else class="text-pnc-gray">Pas de données disponibles</p>
  </div>
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: "ReportPieChart",
  props: {
    reportData: {
      type: Object,
      required: true,
    },
  },
  components: {
    Pie,
  },
  computed: {
    chartData() {
      if (!this.reportData || !this.reportData.byUrgency) {
        return null;
      }

      return {
        labels: Object.keys(this.reportData.byUrgency),
        datasets: [
          {
            label: "Nombre d'enquêtes",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            data: Object.values(this.reportData.byUrgency),
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Répartition des Enquêtes par Urgence",
          },
        },
      };
    },
    chartDataAvailable() {
      return (
        this.chartData &&
        this.chartData.datasets &&
        this.chartData.datasets.length > 0
      );
    },
  },
};
</script>

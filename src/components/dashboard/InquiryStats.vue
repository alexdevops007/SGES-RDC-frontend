<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Statistiques des Enquêtes</h2>
    <Bar :data="chartData" v-if="chartDataAvailable" />
    <p v-else class="text-pnc-gray">Pas de données disponibles</p>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "InquiryStats",
  props: {
    reportData: {
      type: Object,
      required: true,
    },
  },
  components: {
    Bar,
  },
  computed: {
    chartData() {
      if (!this.reportData) {
        return null;
      }

      return {
        labels: ["En cours", "Complété", "Urgent"],
        datasets: [
          {
            label: "Enquêtes",
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
            data: [
              this.reportData.enCours,
              this.reportData.complete,
              this.reportData.urgent,
            ],
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
            text: "Distribution des Enquêtes par Statut",
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

<style scoped>
canvas {
  max-width: 100%;
  height: auto;
}
</style>

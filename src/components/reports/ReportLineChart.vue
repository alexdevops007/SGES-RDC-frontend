<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Statistiques des Enquêtes (Lignes)</h2>
    <Line :data="chartData" v-if="chartDataAvailable" />
    <p v-else class="text-pnc-gray">Pas de données disponibles</p>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

export default {
  name: "ReportLineChart",
  props: {
    reportData: {
      type: Object,
      required: true,
    },
  },
  components: {
    Line,
  },
  computed: {
    chartData() {
      if (!this.reportData) {
        return null;
      }

      return {
        labels: Object.keys(this.reportData.byStatus),
        datasets: [
          {
            label: "Nombre d'enquêtes",
            backgroundColor: "#FF5733",
            data: Object.values(this.reportData.byStatus),
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

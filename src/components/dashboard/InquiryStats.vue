<!-- frontend/components/dashboard/InquiryStats.vue -->
<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-2">Statistiques des Enquêtes</h2>
      <bar-chart :chart-data="barChartData" :options="chartOptions"></bar-chart>
    </div>
    <div>
      <line-chart :chart-data="lineChartData" :options="chartOptions"></line-chart>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement);

export default {
  components: {
    'bar-chart': Bar,
  },
  data() {
    return {
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Enquêtes Ouvertes',
            backgroundColor: '#4B9CD3',
            data: [40, 20, 12, 39, 10, 40],
          },
          {
            label: 'Enquêtes Fermées',
            backgroundColor: '#FF6384',
            data: [12, 19, 3, 17, 6, 3],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style scoped>
/* Ajout de styles personnalisés si nécessaire */
</style>

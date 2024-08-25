<template>
  <div v-if="report" class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">{{ report.type }} - Détails</h2>
    <p>Généré par: {{ report.generatedBy.name }}</p>
    <p>Date: {{ formattedDate(report.createdAt) }}</p>
    <ReportLineChart :reportData="report.data" />
    <ReportPieChart :reportData="report.data" />
    <div class="mt-4">
      <button
        @click="exportPDF"
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full mr-4"
      >
        Exporter en PDF
      </button>
      <button
        @click="exportExcel"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
      >
        Exporter en Excel
      </button>
    </div>
  </div>
  <p v-else class="text-pnc-gray">Chargement du rapport...</p>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ReportLineChart from "./ReportLineChart.vue";
import ReportPieChart from "./ReportPieChart.vue";

export default {
  components: {
    ReportLineChart,
    ReportPieChart,
  },
  computed: {
    ...mapGetters("report", ["report"]),
  },
  methods: {
    ...mapActions("report", ["fetchReport"]),
    formattedDate(date) {
      return new Date(date).toLocaleString();
    },
    exportPDF() {
      const doc = new jsPDF();
      doc.text(`Rapport: ${this.report.type}`, 10, 10);
      doc.autoTable({ html: "#my-table" });
      doc.save("report.pdf");
    },
    exportExcel() {
      const ws = XLSX.utils.json_to_sheet(this.report.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report Data");
      XLSX.writeFile(wb, "report.xlsx");
    },
  },
  created() {
    this.fetchReport(this.$route.params.id);
  },
};
</script>

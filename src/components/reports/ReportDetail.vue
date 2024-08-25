<template>
  <div v-if="report" class="p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">{{ report.type }} - Détails</h2>
    <p>Généré par: {{ report.generatedBy.name }}</p>
    <p>Date: {{ formattedDate(report.createdAt) }}</p>
    <div class="mt-6 mb-6">
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
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ReportLineChart :reportData="report.data" />
      <ReportPieChart :reportData="report.data" />
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

      // Ajouter le titre
      doc.text(`Rapport: ${this.report.type}`, 10, 10);

      // Ajouter les détails du rapport
      doc.text(`Généré par: ${this.report.generatedBy.name}`, 10, 20);
      doc.text(`Date: ${this.formattedDate(this.report.createdAt)}`, 10, 30);

      // Ajouter les données dans un tableau
      const tableColumn = ["Statut", "Nombre"];
      const tableRows = [];

      Object.keys(this.report.data.byStatus).forEach((key) => {
        const rowData = [key, this.report.data.byStatus[key]];
        tableRows.push(rowData);
      });

      // Générer le tableau dans le PDF
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 40,
      });

      doc.save(`report_${this.report.type}.pdf`);
    },
    exportExcel() {
      const wsData = [
        ["Statut", "Nombre"],
        ...Object.entries(this.report.data.byStatus).map(([status, count]) => [
          status,
          count,
        ]),
      ];

      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report Data");

      XLSX.writeFile(wb, `report_${this.report.type}.xlsx`);
    },
  },
  created() {
    this.fetchReport(this.$route.params.id);
  },
};
</script>

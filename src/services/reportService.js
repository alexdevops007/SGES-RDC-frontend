import apiService from "./apiService";

const reportService = {
  async getReports() {
    try {
      const response = await apiService.get("/reports");
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des rapports:", error);
      throw error;
    }
  },

  async getReport(id) {
    try {
      const response = await apiService.get(`/reports/${id}`);
      return response;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération du rapport avec l'ID ${id}:`,
        error
      );
      throw error;
    }
  },

  async generateReport(type, userId) {
    try {
      const response = await apiService.post("/reports", { type, userId });
      return response;
    } catch (error) {
      console.error("Erreur lors de la génération du rapport:", error);
      throw error;
    }
  },
};

export default reportService;

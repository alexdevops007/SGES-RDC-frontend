<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Liste des Enquêtes</h2>

    <!-- Filtres -->
    <div class="mb-4 flex justify-between">
      <div class="flex space-x-4">
        <select v-model="selectedStatus">
          <option value="">Tous les états</option>
          <option value="En cours">En cours</option>
          <option value="Complété">Complété</option>
          <option value="Urgent">Urgent</option>
        </select>
        <select v-model="selectedUrgency">
          <option value="">Toutes les urgences</option>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
        </select>
        <input
          v-model="selectedAssignee"
          placeholder="Recherche par enquêteur"
          class="border rounded py-2 px-3"
        />
      </div>
    </div>

    <!-- Tableau des Enquêtes -->
<table class="min-w-full bg-white border-collapse shadow-lg">
  <thead>
    <tr class="bg-gray-200">
      <th class="py-3 px-4 text-left border-b-2 border-gray-300 text-gray-700">Titre</th>
      <th class="py-3 px-4 text-center border-b-2 border-gray-300 text-gray-700">Urgence</th>
      <th class="py-3 px-4 text-center border-b-2 border-gray-300 text-gray-700">État</th>
      <th class="py-3 px-4 text-left border-b-2 border-gray-300 text-gray-700">Assigné à</th>
      <th class="py-3 px-4 text-center border-b-2 border-gray-300 text-gray-700">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="inquiry in filteredInquiries" :key="inquiry._id" class="hover:bg-gray-100 transition-colors">
      <td class="py-3 px-4 text-left border-b border-gray-200">{{ inquiry.title }}</td>
      <td class="py-3 px-4 text-center border-b border-gray-200">
        <span :class="urgencyClass(inquiry.urgency)">
          {{ inquiry.urgency }}
        </span>
      </td>
      <td class="py-3 px-4 text-center border-b border-gray-200">
        <span :class="statusClass(inquiry.status)">
          {{ inquiry.status }}
        </span>
      </td>
      <td class="py-3 px-4 text-left border-b border-gray-200">
        {{ inquiry.assignedTo?.name || "Non assigné" }}
      </td>
      <td class="py-3 px-4 text-center border-b border-gray-200">
        <button
          @click="editInquiry(inquiry)"
          class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors mr-1"
        >
          Modifier
        </button>
        <button
          @click="viewInquiry(inquiry)"
          class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors mr-1"
        >
          Détails
        </button>
        <button
          @click="deleteInquiry(inquiry._id)"
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    inquiries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedStatus: "",
      selectedUrgency: "",
      selectedAssignee: "",
    };
  },
  computed: {
    ...mapGetters("inquiry", ["inquiries"]),
    filteredInquiries() {
      return this.inquiries.filter((inquiry) => {
        const statusMatch =
          !this.selectedStatus || inquiry.status === this.selectedStatus;
        const urgencyMatch =
          !this.selectedUrgency || inquiry.urgency === this.selectedUrgency;
        const assigneeMatch =
          !this.selectedAssignee ||
          (inquiry.assignedTo?.name || "")
            .toLowerCase()
            .includes(this.selectedAssignee.toLowerCase());

        return statusMatch && urgencyMatch && assigneeMatch;
      });
    },
  },
  methods: {
    ...mapActions("inquiry", ["fetchInquiries"]),
    urgencyClass(urgency) {
      return {
        "text-green-500": urgency === "Basse",
        "text-orange-500": urgency === "Moyenne",
        "text-red-500": urgency === "Élevée",
      };
    },
    statusClass(status) {
      return {
        "bg-green-200 text-green-800": status === "Complété",
        "bg-orange-200 text-orange-800": status === "En cours",
        "bg-red-200 text-red-800": status === "Urgent",
      };
    },
    editInquiry(inquiry) {
      this.$emit("edit", inquiry);
    },
    viewInquiry(inquiry) {
      this.$emit("view", inquiry); // Émettre un événement pour afficher les détails
    },
    deleteInquiry(inquiryId) {
      this.$emit("delete", inquiryId);
    },
  },
  async created() {
    await this.fetchInquiries();
  },
};
</script>

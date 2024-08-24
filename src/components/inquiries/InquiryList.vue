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
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Titre</th>
          <th class="py-2 px-4 border-b">Urgence</th>
          <th class="py-2 px-4 border-b">État</th>
          <th class="py-2 px-4 border-b">Assigné à</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="inquiry in filteredInquiries" :key="inquiry._id">
          <td class="py-2 px-4 border-b">{{ inquiry.title }}</td>
          <td class="py-2 px-4 border-b">
            <span :class="urgencyClass(inquiry.urgency)">
              {{ inquiry.urgency }}
            </span>
          </td>
          <td class="py-2 px-4 border-b">
            <span :class="statusClass(inquiry.status)">
              {{ inquiry.status }}
            </span>
          </td>
          <td class="py-2 px-4 border-b">
            {{ inquiry.assignedTo?.name || "Non assigné" }}
          </td>
          <td class="py-2 px-4 border-b">
            <button
              @click="editInquiry(inquiry)"
              class="bg-gray-500 text-white px-2 py-1 rounded mr-2"
            >
              Modifier
            </button>
            <button
              @click="viewInquiry(inquiry)"
              class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Détails
            </button>
            <button
              @click="deleteInquiry(inquiry._id)"
              class="bg-red-500 text-white px-2 py-1 rounded"
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
import { mapActions, mapGetters } from 'vuex';

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

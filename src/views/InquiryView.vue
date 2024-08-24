<template>
  <div class="p-4">
    <button @click="showCreateForm" class="bg-pnc-blue text-white font-bold py-2 px-4 rounded mb-4">Créer une nouvelle enquête</button>

    <!-- Affiche les détails de l'enquête -->
    <InquiryDetail
      v-if="selectedInquiry && !showForm"
      :inquiry="selectedInquiry"
      @back="deselectInquiry"
      @update-status="handleStatusUpdate"
    />

    <!-- Affiche le formulaire si `showForm` est vrai -->
    <InquiryForm
      v-if="showForm"
      :inquiry="selectedInquiry || {}"
      :isEdit="!!selectedInquiry"
      @save="handleSave"
      @cancel="cancelForm"
    />

    <!-- Affiche la liste des enquêtes si `showForm` est faux -->
    <InquiryList
      v-if="!showForm && !selectedInquiry"
      :inquiries="inquiries"
      @edit="editInquiry"
      @delete="deleteInquiry"
      @view="viewInquiry"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InquiryList from '@/components/inquiries/InquiryList.vue';
import InquiryForm from '@/components/inquiries/InquiryForm.vue';
import InquiryDetail from '@/components/inquiries/InquiryDetail.vue';

export default {
  components: {
    InquiryList,
    InquiryForm,
    InquiryDetail,
  },
  data() {
    return {
      selectedInquiry: null,
      showForm: false,
    };
  },
  computed: {
    ...mapGetters('inquiry', ['inquiries']),
  },
  methods: {
    ...mapActions('inquiry', ['fetchInquiries', 'createInquiry', 'updateInquiry', 'deleteInquiry']),
    editInquiry(inquiry) {
      this.selectedInquiry = inquiry;
      this.showForm = true;
    },
    viewInquiry(inquiry) {
      this.selectedInquiry = inquiry;
      this.showForm = false;
    },
    showCreateForm() {
      this.selectedInquiry = null;
      this.showForm = true;
    },
    deselectInquiry() {
      this.selectedInquiry = null;
      this.showForm = false;
    },
    handleSave(inquiry) {
      if (this.selectedInquiry) {
        this.updateInquiry({ id: inquiry._id, inquiryData: inquiry });
      } else {
        this.createInquiry(inquiry);
      }
      this.showForm = false;
      this.fetchInquiries();
    },
    handleStatusUpdate(inquiry) {
      this.updateInquiry({ id: inquiry._id, inquiryData: inquiry });
      this.fetchInquiries(); // Optionnel : Actualiser la liste après la mise à jour
    },
    cancelForm() {
      this.showForm = false;
      this.selectedInquiry = null;
    },
  },
  mounted() {
    this.fetchInquiries();
  },
};
</script>
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ inquiry.title }}</h2>
    <p class="mb-4"><strong>Description:</strong> {{ inquiry.description }}</p>
    <p class="mb-4"><strong>Urgence:</strong> <span :class="urgencyClass(inquiry.urgency)">{{ inquiry.urgency }}</span></p>

    <!-- Changer le statut de l'enquête -->
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="status">État :</label>
      <select v-model="localInquiry.status" @change="updateStatus">
        <option value="En cours">En cours</option>
        <option value="Complété">Complété</option>
        <option value="Urgent">Urgent</option>
      </select>
    </div>

    <p class="mb-4"><strong>Assigné à:</strong> {{ inquiry.assignedTo?.name || 'Non assigné' }}</p>

    <!-- Affichage des pièces jointes -->
    <h3 class="text-xl font-bold mb-2">Pièces Jointes</h3>
    <ul>
      <li v-for="attachment in inquiry.attachments" :key="attachment.filename">
        <a :href="attachment.filepath" target="_blank" class="text-pnc-blue hover:underline">{{ attachment.filename }}</a>
      </li>
    </ul>

    <!-- Timeline -->
    <h3 class="text-xl font-bold mb-2 mt-6">Timeline des Actions</h3>
    <ul class="timeline">
      <li v-for="event in inquiry.timeline" :key="event.date" class="timeline-item">
        <span class="timeline-date">{{ formatDate(event.date) }}</span>
        <p class="timeline-content">{{ event.description }}</p>
      </li>
    </ul>

    <button @click="$emit('back')" class="bg-pnc-blue text-white px-4 py-2 rounded mt-6">Retour</button>
  </div>
</template>

<script>
export default {
  props: {
    inquiry: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localInquiry: { ...this.inquiry },
    };
  },
  methods: {
    urgencyClass(urgency) {
      return {
        'text-green-500': urgency === 'Basse',
        'text-orange-500': urgency === 'Moyenne',
        'text-red-500': urgency === 'Élevée',
      };
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    updateStatus() {
      // Méthode pour mettre à jour le statut de l'enquête
      this.$emit('update-status', this.localInquiry);
    },
  },
};
</script>

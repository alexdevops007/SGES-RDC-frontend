<template>
  <div class="max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-4" v-if="!isEdit">Créer une Enquête</h2>
    <h2 class="text-2xl font-bold mb-4" v-else>Modifier l'Enquête</h2>
    <form @submit.prevent="saveInquiry">
      <!-- Section Titre -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"
          >Titre</label
        >
        <input
          v-model="localInquiry.title"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Titre de l'enquête"
        />
      </div>

      <!-- Section Description -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="description"
          >Description</label
        >
        <textarea
          v-model="localInquiry.description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Description de l'enquête"
        ></textarea>
      </div>

      <!-- Section Urgence -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="urgency"
          >Urgence</label
        >
        <select
          v-model="localInquiry.urgency"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="urgency"
        >
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevée">Élevée</option>
        </select>
      </div>

      <!-- Section Assignation -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="assignedTo"
          >Assigné à</label
        >
        <select
          v-model="localInquiry.assignedTo"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="assignedTo"
        >
          <option
            v-for="user in investigators"
            :key="user._id"
            :value="user._id"
          >
            {{ user.name }}
          </option>
        </select>
      </div>

      <!-- Section Pièces Jointes -->
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-bold mb-2"
          for="attachments"
          >Pièces Jointes</label
        >
        <input type="file" multiple @change="handleFileUpload" />
        <ul>
          <li
            v-for="(attachment, index) in localInquiry.attachments"
            :key="index"
          >
            <a
              :href="attachment.filepath"
              target="_blank"
              class="text-pnc-blue hover:underline"
              >{{ attachment.filename }}</a
            >
            <span
              @click="removeAttachment(index)"
              class="text-red-500 cursor-pointer ml-2"
              >[Supprimer]</span
            >
          </li>
        </ul>
      </div>

      <div class="flex items-center justify-between">
        <button
          class="bg-pnc-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enregistrer
        </button>
        <button
          @click="$emit('cancel')"
          class="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    inquiry: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        urgency: "Moyenne",
        assignedTo: "",
        attachments: [],
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      localInquiry: { ...this.inquiry },
      newAttachments: [], // Stocke les nouvelles pièces jointes
    };
  },
  computed: {
    ...mapGetters("user", ["investigators"]),
  },
  methods: {
    ...mapActions("user", ["fetchUsers"]),
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.newAttachments.push(files[i]);
      }
    },
    removeAttachment(index) {
      this.localInquiry.attachments.splice(index, 1);
    },
    async saveInquiry() {
      // Simuler l'upload de fichiers ici (par exemple, en utilisant un service d'upload)
      if (this.newAttachments.length > 0) {
        for (let i = 0; i < this.newAttachments.length; i++) {
          // Simulation d'upload et ajout du lien vers les fichiers téléchargés
          this.localInquiry.attachments.push({
            filename: this.newAttachments[i].name,
            filepath: URL.createObjectURL(this.newAttachments[i]),
          });
        }
      }

      this.$emit("save", this.localInquiry);
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

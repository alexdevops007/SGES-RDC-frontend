<template>
  <div class="p-4">
    <div class="flex justify-end mb-4">
      <button
        @click="openCreateModal"
        class="bg-pnc-blue text-white px-4 py-2 rounded"
      >
        Ajouter un utilisateur
      </button>
    </div>
    <div class="overflow-x-auto">
      <div v-if="users.length === 0" class="text-center text-gray-500">
        <p>Aucun utilisateur trouvé.</p>
      </div>
      <div v-else>
        <!-- Tableau des Utilisateurs -->
        <table class="min-w-full bg-white border-collapse shadow-lg">
          <thead>
            <tr class="bg-gray-200">
              <th
                class="py-3 px-4 text-left border-b-2 border-gray-300 text-gray-700"
              >
                Nom
              </th>
              <th
                class="py-3 px-4 text-left border-b-2 border-gray-300 text-gray-700"
              >
                Email
              </th>
              <th
                class="py-3 px-4 text-center border-b-2 border-gray-300 text-gray-700"
              >
                Rôle
              </th>
              <th
                class="py-3 px-4 text-center border-b-2 border-gray-300 text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user._id"
              class="hover:bg-gray-100 transition-colors"
            >
              <td class="py-3 px-4 text-left border-b border-gray-200">
                {{ user.name }}
              </td>
              <td class="py-3 px-4 text-left border-b border-gray-200">
                {{ user.email }}
              </td>
              <td class="py-3 px-4 text-center border-b border-gray-200">
                {{ user.role }}
              </td>
              <td class="py-3 px-4 text-center border-b border-gray-200">
                <button
                  @click="editUser(user)"
                  class="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors mr-1"
                >
                  Modifier
                </button>
                <button
                  @click="confirmDelete(user._id)"
                  class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form Modal for Creating/Editing Users -->
    <UserForm
      :is-edit="isEdit"
      :user="currentUser"
      @save="handleSave"
      ref="userFormModal"
    />

    <!-- Confirmation Modal for Deleting Users -->
    <Modal
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="deleteUser"
    >
      <p>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserForm from "./UserForm.vue";
import Modal from "../ModalPop.vue";

export default {
  components: {
    UserForm,
    Modal,
  },
  data() {
    return {
      showDeleteModal: false,
      currentUser: null,
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters("user", ["users"]),
  },
  methods: {
    ...mapActions("user", [
      "fetchUsers",
      "deleteUser",
      "createUser",
      "updateUser",
    ]),
    openCreateModal() {
      this.currentUser = null;
      this.isEdit = false;
      this.$refs.userFormModal.open();
    },
    editUser(user) {
      this.currentUser = user;
      this.isEdit = true;
      this.$refs.userFormModal.open();
    },
    confirmDelete(userId) {
      this.currentUser = { _id: userId };
      this.showDeleteModal = true;
    },
    deleteUser() {
      this.$store.dispatch("user/deleteUser", this.currentUser._id);
      this.showDeleteModal = false;
      this.fetchUsers();
    },
    handleSave(user) {
      if (this.isEdit) {
        this.updateUser({ id: user._id, userData: user });
      } else {
        this.createUser(user);
      }
      this.fetchUsers();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

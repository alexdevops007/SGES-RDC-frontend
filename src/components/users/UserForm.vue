<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full sm:max-w-lg md:max-w-xl"
    >
      <h2 v-if="isEdit" class="text-xl mb-4">Modifier Utilisateur</h2>
      <h2 v-else class="text-xl mb-4">Ajouter Utilisateur</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"
            >Nom</label
          >
          <input
            v-model="localUser.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Nom"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"
            >Email</label
          >
          <input
            v-model="localUser.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="mb-4" v-if="!isEdit">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
            >Mot de passe</label
          >
          <input
            v-model="localUser.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Mot de passe"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role"
            >Rôle</label
          >
          <select
            v-model="localUser.role"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
          >
            <option value="enquêteur">Enquêteur</option>
            <option value="responsable">Responsable</option>
            <option value="observateur">Observateur</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-pnc-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enregistrer
          </button>
          <button
            @click="close"
            class="text-gray-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        name: "",
        email: "",
        password: "",
        role: "enquêteur",
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      localUser: { ...this.user }, // Crée une copie locale des données de l'utilisateur
    };
  },
  watch: {
    user: {
      handler(newVal) {
        this.localUser = { ...newVal }; // Met à jour la copie locale lorsque la prop change
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    save() {
      this.$emit("save", this.localUser);
      this.close();
    },
  },
};
</script>

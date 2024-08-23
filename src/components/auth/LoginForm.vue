<template>
  <div class="flex justify-center items-center min-h-screen bg-pnc-blue">
    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
      <!-- Section Gauche -->
      <div class="w-full md:w-2/5 bg-pnc-blue text-white p-8 flex flex-col items-center justify-center">
        <div class="mb-4 text-center">
          <img src="@/assets/logo.png" alt="Security Shield" class="mb-4 w-52 h-auto mx-auto">
          <h1 class="text-3xl font-bold">SGES-RDC</h1>
          <p class="text-sm mt-4">Système de Gestion des Enquêtes de Sécurité</p>
        </div>
        <div class="mt-8">
          <div class="flex items-center mt-4">
            <img src="@/assets/icon-security.webp" alt="Icon Security" class="w-8 h-8 mr-3">
            <p class="text-sm">Sécurité Avancée</p>
          </div>
          <div class="flex items-center mt-4">
            <img src="@/assets/icon-encryption.png" alt="Icon Encryption" class="w-8 h-8 mr-3">
            <p class="text-sm">Protection des Données</p>
          </div>
          <div class="flex items-center mt-4">
            <img src="@/assets/icon-privacy.png" alt="Icon Privacy" class="w-8 h-8 mr-3">
            <p class="text-sm">Confidentialité</p>
          </div>
        </div>
      </div>

      <!-- Section Droite (Formulaire de Connexion) -->
      <div class="w-full md:w-3/5 p-8 flex items-center justify-center">
        <div class="w-full max-w-md">
          <div class="mb-4 text-center">
            <h1 class="text-3xl font-bold text-pnc-blue">Connexion</h1>
          </div>
          <form @submit.prevent="login">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
              </label>
              <div class="flex items-center border-b border-pnc-blue py-2">
                <img src="@/assets/icon-email.png" alt="Email Icon" class="w-6 h-6 mr-3">
                <input
                  v-model="email"
                  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Entrez votre email"
                >
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Mot de passe
              </label>
              <div class="flex items-center border-b border-pnc-blue py-2">
                <img src="@/assets/icon-password.png" alt="Password Icon" class="w-6 h-6 mr-3">
                <input
                  v-model="password"
                  class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="********"
                >
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="bg-pnc-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                LOGIN
              </button>
            </div>
            <div class="text-center mt-4">
              <a class="text-pnc-grey text-sm hover:text-pnc-blue" href="#">
                Mot de passe oublié ?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push({ name: 'dashboard' });
        })
        .catch((error) => {
          console.error('Login failed', error);
        });
    },
  },
};
</script>

<style scoped>
.bg-pnc-blue {
  background-color: #002B7F;
}

.text-pnc-blue {
  color: #002B7F;
}

.text-pnc-grey {
  color: #808080;
}
</style>
